import type { ActionTree, MutationTree, GetterTree } from 'vuex'
import { Context } from '@nuxt/types'
import { Chain } from '~/types/apollo/main/types'
import { AaveMarketsGQL } from '~/apollo/main/config.query.graphql'
import { ConfigState } from '~/types/state'

export const state = () =>
  ({
    title: 'EVMX',
    globalStats: null,
    gasStats: null,
    chains: [],
    currentAaveMarket: {
      chainId: 1,
      name: 'Ethereum',
      geckoId: 'ethereum',
      symbol: 'ETH',
      label: 'Ethereum Mainnet',
      logoUrl: 'https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/eth.png',
      isTestNet: false,
      rpcUrl: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161/',
      blockExplorerUrl: 'https://etherscan.io/',
      __typename: 'Chain',
    },
    balancesChains: [1, 56, 137, 250],
    aaveMarketsSupportedChains: [1, 137],
    protocols: [],
  } as ConfigState)

export const mutations: MutationTree<ConfigState> = {
  SET_CONFIG: (state, { chains }) => {
    state.chains = chains
  },

  SET_CHAIN: (state, chain: Chain) => {
    state.currentAaveMarket = chain
  },
}

export const actions: ActionTree<ConfigState, ConfigState> = {
  async initConfigs({ commit }, context: Context): Promise<void> {
    try {
      const client = context.app.apolloProvider?.defaultClient
      const query = await client?.query({ query: AaveMarketsGQL, fetchPolicy: 'no-cache' })
      if (query && query.data) {
        commit('SET_CONFIG', query.data)
      }
    } catch {}
  },

  changeAaveMarket({ commit }, chain: Chain) {
    commit('SET_CHAIN', chain)
  },
}
export const getters: GetterTree<ConfigState, ConfigState> = {
  chainInfo: (state: ConfigState) => (chainId: number) =>
    state.chains.find((elem: Chain) => elem.chainId === chainId) || null,
  aaveMarkets: (state: ConfigState) =>
    state.chains.filter((elem) => state.aaveMarketsSupportedChains.includes(elem.chainId)),
} as any
