/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionTree, MutationTree } from 'vuex'
import { plainToClass } from 'class-transformer'
import { HeatmapData, HeatmapBalancesData } from '~/models/heatmap'

export const state = () => ({})
export type HeatmapState = ReturnType<typeof state>

export const mutations: MutationTree<HeatmapState> = {}

export const actions: ActionTree<HeatmapState, HeatmapState> = {
  async getHeatmapData({ commit }, { numOfCoins }): Promise<HeatmapData[]> {
    const { data } = await this.$axios.get(
      `/api/defi/heatmap/uniswap-heatmap`,
      {
        params: { num_of_coins: numOfCoins },
      }
    )
    return plainToClass(HeatmapData, data.data as HeatmapData[])
  },

  async balanceHeatmap(
    { commit },
    { address }
  ): Promise<HeatmapBalancesData[]> {
    const { data } = await this.$axios.get(`/api/defi/balances/${address}`)
    return plainToClass(HeatmapBalancesData, data.data as HeatmapBalancesData[])
  },
}
