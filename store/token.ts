/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionTree, MutationTree } from 'vuex'
import { plainToClass } from 'class-transformer'
import { Token, ChartData } from '~/models/token'

export const state = () => ({})
export type HeatmapState = ReturnType<typeof state>

export const mutations: MutationTree<HeatmapState> = {}

export const actions: ActionTree<HeatmapState, HeatmapState> = {
  async getTokenData({ commit }, { tokeId }): Promise<Token> {
    const { data } = await this.$axios.get(`/api/defi/common/token/${tokeId}`)
    return plainToClass(Token, data as Token)
  },

  async getTokenChart(
    { commit },
    { tokenId, timeRange }
  ): Promise<ChartData[]> {
    const { data } = await this.$axios.get(
      `/api/defi/common/token/${tokenId}/chart`,
      {
        params: { time_range: timeRange },
      }
    )
    return plainToClass(ChartData, data as ChartData[])
  },
}
