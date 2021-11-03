import type { ActionTree, MutationTree } from 'vuex'
import { plainToClass } from 'class-transformer'
import { AaveAssetData, AaveBalanceData, AaveBalance } from '~/models/aave'
import { Balance, BalanceData } from '~/models/balance'

export const state = () => ({})
export type AaveState = ReturnType<typeof state>
export const mutations: MutationTree<AaveState> = {}

export const actions: ActionTree<AaveState, AaveState> = {
  async getAaveBalances(
    _,
    { chainId, address, store }
  ): Promise<AaveBalanceData[]> {
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
            if (
              item.contract_address === aaveBalance.underlying.contract_address
            ) {
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
  async getAaveAssets(
    _,
    { chainId, store, address }
  ): Promise<AaveAssetData[]> {
    try {
      const aaveBalance = new AaveBalance(store, chainId, address)

      await aaveBalance.getData()

      const {
        data: { data: items },
      } = await this.$axios.get(
        `https://api.covalenthq.com/v1/${chainId}/networks/aave_v2/assets/?key=${process.env.COVALENT_API_KEY}`
      )

      const assets = []

      for (const asset of items.items) {
        const item: AaveAssetData = {
          underlying: {
            contract_decimals: asset.underlying.contract_decimals,
            contract_name: asset.underlying.contract_name,
            contract_symbol: asset.underlying.contract_ticker_symbol,
            contract_address: asset.underlying.contract_address,
            logo_url: asset.underlying.logo_url,
            available_balance: 0,
            quote_rate: asset.underlying.quote_rate,
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
          variable_borrow_apr: asset.variable_borrow_apr,
          stable_borrow_apr: asset.stable_borrow_apr,
          supply_apy: asset.supply_apy,
        }

        const balanceInstance = Balance.getInstance(store)

        let balances: BalanceData[] = []

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
          if (
            balance.underlying.contract_address ===
            item.underlying.contract_address
          ) {
            item.supply_position = balance.supply_position
            item.borrow_position = balance.borrow_position

            item.borrow_position.balance =
              balance.borrow_position.balance /
              10 ** item.underlying.contract_decimals
            item.supply_position.balance =
              balance.supply_position.balance /
              10 ** item.underlying.contract_decimals
          }
        }

        assets.push(item)
      }

      return plainToClass(AaveAssetData, assets as AaveAssetData[])
    } catch {
      return []
    }
  },
}
