import { ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  heatmapData: [] as object,
})
export type HeatmapState = ReturnType<typeof state>

export const mutations: MutationTree<HeatmapState> = {
  SET_HEATMAP_DATA: (state, data: any) => (state.heatmapData = data),
}

export const actions: ActionTree<HeatmapState, HeatmapState> = {
  async getHeatmapData(
    { commit },
    { display, exchange, numOfCoins }
  ): Promise<Array<Record<string, any>>> {
    const { data } = await this.$axios.get(`/api/v1.0/heatmaps/config`, {
      params: {
        display,
        exchange,
        num_of_coins: numOfCoins,
      },
    })
    commit('SET_HEATMAP_DATA', data)
    return data
  },
}
