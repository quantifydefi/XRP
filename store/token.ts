/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ActionTree, MutationTree } from 'vuex'
import { plainToClass } from 'class-transformer'
import { Token, ChartData } from '~/models/token'

export const state = () => ({})
export type HeatmapState = ReturnType<typeof state>

export const mutations: MutationTree<HeatmapState> = {}

export const actions: ActionTree<HeatmapState, HeatmapState> = {
  async getTokenData({ commit }, { tokeId }): Promise<Token> {
    const { data } = await this.$axios.get(`/api/defi/pair/${tokeId}`)
    return plainToClass(Token, data.data as Token)
  },

  async getTokenChart({ commit }, { tokenId, timeRange }): Promise<ChartData[]> {
    const { data } = await this.$axios.get(`/api/defi/pair/${tokenId}/chart`, {
      params: { time_range: timeRange },
    })
    return plainToClass(ChartData, data.data as ChartData[])
  },

  async search({ commit }, { searchString }): Promise<any> {
    const { data } = await this.$axios.get(`api/defi/search`, {
      params: { q: searchString },
    })
    if (data.data) {
      return data.data
    } else return []
  },
}
