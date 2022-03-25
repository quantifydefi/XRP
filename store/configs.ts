import type { ActionTree, MutationTree, GetterTree } from 'vuex'
import { Chain } from '~/types/apollo/main/types'
import { GlobalStatsQueryGQL } from '~/apollo/main/config.query.graphql'
import { ConfigState } from '~/types/state'

export const state = () =>
  ({
    globalStats: null,
    gasStats: null,
    currentChain: {
      name: 'Ethereum',
      geckoId: 'ethereum',
      rpcUrl: '',
      chainId: 1,
      label: 'Ethereum Mainnet',
      logoUrl: 'https://www.covalenthq.com/static/images/icons/display-icons/ethereum-eth-logo.png',
      symbol: 'ETH',
      isTestNet: false,
      asda: 'sadsa',
    },
    chains: [],
    protocols: [],
  } as ConfigState)

export const mutations: MutationTree<ConfigState> = {
  SET_CONFIG: (state, { globalStats, chains, protocols, gasStats }) => {
    state.chains = chains
    state.globalStats = globalStats
    state.gasStats = gasStats
    state.protocols = protocols
  },

  SET_CHAIN: (state, chain: Chain) => {
    state.currentChain = chain
  },
}

export const actions: ActionTree<ConfigState, ConfigState> = {
  async initConfigs({ commit }): Promise<void> {
    try {
      const client = this.app.apolloProvider?.defaultClient
      const query = await client?.query({ query: GlobalStatsQueryGQL, fetchPolicy: 'no-cache' })
      if (query && query.data) {
        commit('SET_CONFIG', query.data)
      }
    } catch {}
  },

  changeChain({ commit }, chain: Chain) {
    commit('SET_CHAIN', chain)
  },
}
export const getters: GetterTree<ConfigState, ConfigState> = {
  chainInfo: (state: any) => (chainId: number) => state.chains.find((elem: Chain) => elem.chainId === chainId) || null,
}
