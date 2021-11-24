/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ActionTree, MutationTree } from 'vuex'
import { pointToGeo } from '@amcharts/amcharts4/maps'

export const state = () => ({
  stablePoolStats: null,
  cryptoPoolStats: null,
  apys: null,
})
export type CurveState = ReturnType<typeof state>
export const mutations: MutationTree<CurveState> = {
  SET_STABLE_POOL_STATS: (state, stablePoolStats: any) =>
    (state.stablePoolStats = stablePoolStats),
  SET_CRYPTO_POOL_STATS: (state, cryptoPoolStats: any) =>
    (state.cryptoPoolStats = cryptoPoolStats),
  SET_APYS_REWARDS: (state, apys: any) => (state.apys = apys),
}
export const actions: ActionTree<CurveState, CurveState> = {
  async stablePoolStats({ commit }) {
    try {
      const { data } = await this.$axios.get(
        'https://stats.curve.fi/raw-stats/apys.json'
      )
      commit('SET_STABLE_POOL_STATS', data)
    } catch (err) {
      console.log(err)
    }
  },

  async cryptoPoolStats({ commit }) {
    try {
      const { data } = await this.$axios.get(
        'https://stats.curve.fi/raw-stats-crypto/apys.json'
      )
      commit('SET_CRYPTO_POOL_STATS', data)
    } catch (err) {
      console.log(err)
    }
  },

  async getApys({ commit }) {
    try {
      const {
        data: { data },
      } = await this.$axios.get('https://api.curve.fi/api/getApys')
      commit('SET_APYS_REWARDS', data)
    } catch (err) {
      console.log(err)
    }
  },
}
