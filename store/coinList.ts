/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ActionTree, MutationTree } from 'vuex'
import { CoinGeckoTokenData } from '~/models/tokenList'

export const state = () => ({
  coinGeckoTokenList: [] as CoinGeckoTokenData[],
})
export type CoinListState = ReturnType<typeof state>

export const mutations: MutationTree<CoinListState> = {
  SET_COIN_GECKO_LIST: (state, tokenList: CoinGeckoTokenData[]) => {
    state.coinGeckoTokenList = tokenList
  },
}

export const actions: ActionTree<CoinListState, CoinListState> = {
  async getCoinGeckoTokenList({ commit }) {
    const {
      data: { tokens },
    } = await this.$axios.get('https://tokens.coingecko.com/uniswap/all.json')

    commit('SET_COIN_GECKO_LIST', tokens)
  },
}
