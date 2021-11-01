import type { ActionTree, MutationTree } from 'vuex'
import { plainToClass } from 'class-transformer'
import { AaveAssetData, AaveBalanceData } from '~/models/aave'
import { Balance } from '~/models/balance'

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

      const networkBalance = Balance.getInstance(store)

      let array: any | null = null

      if (chainId === 1) {
        array = networkBalance.ethereumBalance
      }

      if (chainId === 137) {
        array = networkBalance.polygonBalance
      }

      if (balances) {
        for (const asset of balances) {
          const aaveBalance: AaveBalanceData = {
            balance: {
              available_balance: 0,
              atoken_contract_address: asset.balance.atoken_contract_address,
              atoken_contract_ticker_symbol:
                asset.balance.atoken_contract_ticker_symbol,
              atoken_contract_name: asset.balance.atoken_contract_name,
              atoken_contract_decimals: asset.balance.atoken_contract_decimals,
              atoken_balance:
                asset.balance.atoken_balance ** 10 /
                asset.balance.atoken_contract_decimals,
              asset_contract_address: asset.balance.asset_contract_address,
              asset_contract_ticker_symbol:
                asset.balance.asset_contract_ticker_symbol,
              asset_contract_decimals: asset.balance.asset_contract_decimals,
              logo_url: asset.balance.logo_url,
              liquidity_rate: asset.balance.liquidity_rate,
              quote_rate: asset.balance.quote_rate,
              quote: asset.balance.quote,
              borrow_balance: parseInt(asset.balance.borrow_balance),
              borrow_rate: asset.balance.borrow_rate,
              borrow_quote: asset.balance.borrow_quote,
            },
            supply_position: {
              supplied: asset.supply_position.supplied,
              balance: asset.supply_position.balance,
              balance_quote: asset.supply_position.balance_quote,
              apy: asset.supply_position.apy,
            },
            borrow_position: {
              borrowed: asset.borrow_position.borrowed,
              balance: asset.borrow_position.balance,
              balance_quote: asset.borrow_position.balance_quote,
              apr: asset.borrow_position.apr,
            },
          }

          for (const item of array) {
            if (
              item.contract_address ===
              aaveBalance.balance.asset_contract_address
            ) {
              aaveBalance.balance.available_balance = item.balance
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
  async getAaveAssets(_, { chainId }): Promise<AaveAssetData[]> {
    try {
      const {
        data: { data: items },
      } = await this.$axios.get(
        `https://api.covalenthq.com/v1/${chainId}/networks/aave_v2/assets/?key=${process.env.COVALENT_API_KEY}`
      )

      return plainToClass(AaveAssetData, items.items as AaveAssetData[])
    } catch {
      return []
    }
  },
}
