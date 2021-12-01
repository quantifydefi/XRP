/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ActionTree, MutationTree } from 'vuex'
import { Chain, GlobalStats } from '~/types/apollo/types'
import { GlobalStatsQueryGQL } from '~/apollo/config.query.graphql'
export const state = () => ({
  globalStats: null as GlobalStats | null,
  gasStats: null as {
    fastGasPrice: string
    gasUsedRatio: string
    lastBlock: string
    proposeGasPrice: string
    safeGasPrice: string
    suggestBaseFee: string
  } | null,
  currentChain: {
    chainId: '1',
    dbSchemaName: 'chain_eth_mainnet',
    isTestnet: false,
    label: 'Ethereum Mainnet',
    logoUrl:
      'https://www.covalenthq.com/static/images/icons/display-icons/ethereum-eth-logo.png',
    name: 'eth-mainnet',
  } as Chain,
  chains: [] as Chain[],
})
export type ConfigState = ReturnType<typeof state>

export const mutations: MutationTree<ConfigState> = {
  SET_CONFIG: (state, { globalStats, chains, gasStats }) => {
    state.chains = chains
    state.globalStats = globalStats
    state.gasStats = gasStats
  },
  SET_CHAIN: (state, chain: Chain) => {
    state.currentChain = chain
  },
}

export const actions: ActionTree<ConfigState, ConfigState> = {
  async initConfigs({ commit }): Promise<void> {
    try {
      const client = this.app.apolloProvider?.defaultClient
      const query = await client?.query({ query: GlobalStatsQueryGQL })
      if (query && query.data) {
        commit('SET_CONFIG', query.data)
      }
    } catch {}
  },

  changeChain({ commit }, chain: Chain) {
    commit('SET_CHAIN', chain)
  },
}
