/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ActionTree, MutationTree } from 'vuex'
import { plainToClass } from 'class-transformer'
import { TerminalGridData } from '~/models/terminal'

export const state = () => ({})
export type TerminalState = ReturnType<typeof state>

export const mutations: MutationTree<TerminalState> = {}

export const actions: ActionTree<TerminalState, TerminalState> = {
  async getTerminalData({ commit }, { numOfCoins }): Promise<TerminalGridData[]> {
    const { data } = await this.$axios.get(
      // `/api/defi/heatmap/uniswap-heatmap`,
      `https://defiheatmap.com/api/defi/heatmap/uniswap-heatmap`,
      {
        params: { num_of_coins: numOfCoins },
      }
    )

    return plainToClass(TerminalGridData, data.data as TerminalGridData[])
  },
}
