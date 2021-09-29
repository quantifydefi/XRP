import type { ActionTree, MutationTree } from 'vuex'
import { plainToClass } from 'class-transformer'
import { AaveAssetData, AaveBalanceData } from '~/models/aave'

export const state = () => ({})
export type AaveState = ReturnType<typeof state>
export const mutations: MutationTree<AaveState> = {}

export const actions: ActionTree<AaveState, AaveState> = {
  async getAaveBalances(_, { chainId, address }): Promise<AaveBalanceData[]> {
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

      return plainToClass(AaveBalanceData, balances as AaveBalanceData[])
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

      return plainToClass(
        AaveAssetData,
        items.items.splice(0, 10) as AaveAssetData[]
      )
    } catch {
      return []
    }
  },
}
