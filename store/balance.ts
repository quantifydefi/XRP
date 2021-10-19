import type { ActionTree, MutationTree } from 'vuex'
import { plainToClass } from 'class-transformer'
import { BalanceData } from '~/models/balance'

export const state = () => ({})
export type BalanceState = ReturnType<typeof state>

export const mutations: MutationTree<BalanceState> = {}

export const actions: ActionTree<BalanceState, BalanceState> = {
  async getBalances(_, { chainId, address }): Promise<BalanceData[]> {
    const balancesData: BalanceData[] = []

    try {
      const {
        data: {
          data: { items: balances },
        },
      } = await this.$axios.get(
        `https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2/?key=${process.env.COVALENT_API_KEY}`
      )

      if (balances) {
        for (const balance of balances) {
          if (balance.type !== 'dust') {
            const balanceRounded =
              balance.balance / 10 ** balance.contract_decimals

            const tokenBalanceData: BalanceData = {
              contract_address: balance.contract_address,
              contract_name: balance.contract_name,
              contract_ticker_symbol: balance.contract_ticker_symbol,
              balance: balanceRounded,
              quote_rate: balance.quote_rate,
              quote: balance.quote,
              chain_id: chainId,
              logo_url: balance.logo_url,
            }

            balancesData.push(tokenBalanceData)
          }
        }
      }

      return plainToClass(BalanceData, balancesData as BalanceData[])
    } catch {
      return []
    }
  },
}
