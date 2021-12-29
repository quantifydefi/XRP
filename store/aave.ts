import type { ActionTree, MutationTree } from 'vuex'
import { plainToClass } from 'class-transformer'
import gql from 'graphql-tag'
import { RAY_UNITS } from '~/constants/decimals'

import { AaveAssetData, AaveBalanceData, AaveBalance } from '~/models/aave'
import { Balance, BalanceData } from '~/models/balance'

const AAVE_V2_RESERVES_QUERY = gql`
  query {
    reserves(subgraphError: allow, where: { borrowingEnabled: true }) {
      underlyingAsset
      name
      symbol
      decimals
      price {
        id
        priceInEth
      }
      liquidityRate
      stableBorrowRate
      variableBorrowRate
    }
  }
`

export const state = () => ({})
export type AaveState = ReturnType<typeof state>
export const mutations: MutationTree<AaveState> = {}
export const actions: ActionTree<AaveState, AaveState> = {
  async getAaveBalances(_, { chainId, address, store }): Promise<AaveBalanceData[]> {
    const aaveBalances: AaveBalanceData[] = []

    try {
      const {
        data: {
          data: {
            aave: { balances },
          },
        },
      } = await this.$axios.get(
        `https://api.covalenthq.com/v1/${chainId}/address/${address}/stacks/aave_v2/balances/?key=${process.env.COVALENT_API_KEY}`
      )

      if (balances) {
        for (const item of balances) {
          const aaveBalance: AaveBalanceData = {
            underlying: {
              contract_decimals: item.balance.asset_contract_decimals,
              contract_symbol: item.balance.asset_contract_ticker_symbol,
              contract_address: item.balance.asset_contract_address,
              logo_url: item.balance.logo_url,
              available_balance: 0,
              quote_rate: item.balance.quote_rate,
            },
            supply_position: {
              supplied: item.supply_position.supplied,
              balance: item.supply_position.balance,
              balance_quote: item.supply_position.balance_quote,
              apy: item.supply_position.apy,
            },
            borrow_position: {
              borrowed: item.borrow_position.borrowed,
              balance: item.borrow_position.balance,
              balance_quote: item.borrow_position.balance_quote,
              apr: item.borrow_position.apr,
            },
          }

          const balanceInstance = Balance.getInstance(store)

          let portfolioBalance: BalanceData[] = []

          if (chainId === 1) {
            portfolioBalance = balanceInstance.ethereumBalance
          }

          if (chainId === 137) {
            portfolioBalance = balanceInstance.polygonBalance
          }

          /**
           * Iterates through portfolioBalance, and matches available balance (if any) to current aave asset
           ***/
          for (const item of portfolioBalance) {
            if (item.contract_address === aaveBalance.underlying.contract_address) {
              aaveBalance.underlying.available_balance = item.balance
            }
          }

          aaveBalances.push(aaveBalance)
        }
      }

      return plainToClass(AaveBalanceData, aaveBalances as AaveBalanceData[])
    } catch {
      return []
    }
  },

  /**
   *  Fetches all the market assets within the selected network (ie, Ethereum or Polygon).
   *  Also checks if you have any available balances compared to your portfolio
   * **/
  async getAaveAssets(_, { chainId, store, address, apollo }): Promise<AaveAssetData[]> {
    try {
      const aaveBalance = new AaveBalance(store, chainId, address)
      await aaveBalance.getData()

      const balanceInstance = Balance.getInstance(store)
      let balances: BalanceData[] = []

      const assets = []

      const {
        data: { reserves },
      } = await apollo.query({
        client: 'aaveV2',
        query: AAVE_V2_RESERVES_QUERY,
      })

      for (const asset of reserves) {
        const item: AaveAssetData = {
          underlying: {
            contract_decimals: asset.decimals,
            contract_name: asset.name,
            contract_symbol: asset.symbol,
            contract_address: asset.underlyingAsset,
            logo_url: `https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${asset.symbol.toLowerCase()}.png`,
            available_balance: 0,
            quote_rate: asset.price.priceInEth / 10 ** 18 / store.state.rate.ethUsdRate,
          },
          supply_position: {
            supplied: '',
            balance: 0,
            balance_quote: 0,
            apy: 0,
          },
          borrow_position: {
            borrowed: '',
            balance: 0,
            balance_quote: 0,
            apr: 0,
          },
          variable_borrow_apr: asset.variableBorrowRate / 10 ** RAY_UNITS,
          stable_borrow_apr: asset.stableBorrowRate / 10 ** RAY_UNITS,
          supply_apy: asset.liquidityRate / 10 ** RAY_UNITS,
        }

        if (chainId === 1) {
          balances = balanceInstance.ethereumBalance
        }

        if (chainId === 137) {
          balances = balanceInstance.polygonBalance
        }

        /** For each element in balances, if balance contract_address matches the current asset in your portfolio, -> assign available balance **/
        for (const balance of balances) {
          if (item.underlying.contract_address === balance.contract_address) {
            item.underlying.available_balance = balance.balance
          }
        }

        /** For each element in balanceData, if any open borrow or supply balances, match with aave market asset **/
        for (const balance of aaveBalance.balanceData) {
          if (balance.underlying.contract_address === item.underlying.contract_address) {
            item.supply_position = balance.supply_position
            item.borrow_position = balance.borrow_position

            item.borrow_position.balance = balance.borrow_position.balance / 10 ** item.underlying.contract_decimals
            item.supply_position.balance = balance.supply_position.balance / 10 ** item.underlying.contract_decimals
          }
        }

        if (!item.underlying.contract_symbol.includes('Amm')) {
          assets.push(item)
        }
      }

      return plainToClass(AaveAssetData, assets as AaveAssetData[])
    } catch {
      return []
    }
  },
}
