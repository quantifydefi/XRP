import type { ActionTree, MutationTree } from 'vuex'
import gql from 'graphql-tag'

const TICKER_QUERY = gql`
  query {
    ticker(product: "ETH-USD") {
      price
    }
  }
`

export const state = () => ({
  ethUsdRate: 0,
})
export type RateState = ReturnType<typeof state>
export const mutations: MutationTree<RateState> = {
  SET_ETH_USD_RATE: (state, rate: number) => (state.ethUsdRate = rate),
}
export const actions: ActionTree<RateState, RateState> = {
  async getEthUsdRate({ commit }, { apollo }) {
    try {
      const {
        data: { ticker },
      } = await apollo.query({ query: TICKER_QUERY })

      const rate = 1 / ticker.price

      commit('SET_ETH_USD_RATE', rate)
    } catch (err) {
      console.log(err)
    }
  },
}
