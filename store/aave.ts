import type { ActionTree, MutationTree } from 'vuex'
import { plainToClass } from 'class-transformer'
import { AaveAssetData, AaveBalanceData } from '~/models/aave'

export const state = () => ({})
export type AaveState = ReturnType<typeof state>
export const mutations: MutationTree<AaveState> = {}

export const actions: ActionTree<AaveState, AaveState> = {
  async getAaveBalances(_, { chainId }): Promise<AaveBalanceData[]> {
    try {
      const {
        data: {
          data: {
            aave: { balances },
          },
        },
      } = await this.$axios.get(
        // `https://api.covalenthq.com/v1/${chainId}/address/${address}/stacks/aave_v2/balances/?key=${process.env.COVALENT_API_KEY}`
        `https://api.covalenthq.com/v1/${chainId}/address/0xf705b9ba1908ca505537f309b08e6949c1b8f31f/stacks/aave_v2/balances/?key=${process.env.COVALENT_API_KEY}`
      )

      return plainToClass(AaveBalanceData, balances as AaveBalanceData[])
    } catch {
      return []
    }
  },
  async getAaveAssets(): Promise<AaveAssetData[]> {
    try {
      const {
        data: { data: items },
      } = await this.$axios.get(
        'https://api.covalenthq.com/v1/1/networks/aave_v2/assets/?key=ckey_8c009f2c57b24a2d8e8b0553b0d5'
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
