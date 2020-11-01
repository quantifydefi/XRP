/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionTree, MutationTree } from 'vuex'
import { plainToClass } from 'class-transformer'
import { HeatmapData } from '~/models/heatmap'

export const state = () => ({})
export type HeatmapState = ReturnType<typeof state>

export const mutations: MutationTree<HeatmapState> = {}

export const actions: ActionTree<HeatmapState, HeatmapState> = {
  async getHeatmapData({ commit }, { numOfCoins }): Promise<HeatmapData[]> {
    const { data } = await this.$axios.get(`/api/v1.0/heatmaps/defi/uniswap`, {
      params: { num_of_coins: numOfCoins },
    })
    return plainToClass(HeatmapData, data as HeatmapData[])
  },

  async requestHeatmap({ commit }, { address }): Promise<string> {
    const { data } = await this.$axios.post(
      `/api/v1.0/heatmaps/defi/ethereum-request`,
      {
        address,
      }
    )
    return data
  },

  async requestHeatmapStatus({ commit }, { jobId }): Promise<boolean> {
    const { data } = await this.$axios.get(
      `/api/v1.0/heatmaps/defi/status/${jobId}`
    )
    return data
  },

  async ethereumHeatmap({ commit }, { address }): Promise<HeatmapData[]> {
    const { data } = await this.$axios.post(
      `/api/v1.0/heatmaps/defi/ethereum-heatmap`,
      {
        address,
      }
    )
    return plainToClass(HeatmapData, data as HeatmapData[])
  },
}
