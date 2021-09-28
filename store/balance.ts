import type { ActionTree, MutationTree } from 'vuex'
import { plainToClass } from 'class-transformer'
import { BalanceGridData } from '~/models/balance'

export const state = () => ({})
export type BalanceState = ReturnType<typeof state>

export const mutations: MutationTree<BalanceState> = {}

export const actions: ActionTree<BalanceState, BalanceState> = {
  async getGridBalances(_, { chainId, address }): Promise<BalanceGridData[]> {
    const balancesData: BalanceGridData[] = []

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

            const tokenBalanceData: BalanceGridData = {
              tokenAddress: balance.contract_address,
              tokenName: balance.contract_name,
              tokenSymbol: balance.contract_ticker_symbol,
              tokenBalance: balanceRounded,
              tokenPrice: balance.quote_rate,
              totalValue: balance.quote,
              chainId,
              logoUrl: balance.logo_url,
            }

            balancesData.push(tokenBalanceData)
          }
        }
      }

      return plainToClass(BalanceGridData, balancesData as BalanceGridData[])
    } catch {
      return []
    }
  },
}
