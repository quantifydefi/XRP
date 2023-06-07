import type { ActionTree, MutationTree, GetterTree } from 'vuex'
import { Context } from '@nuxt/types'
import { Chain } from '~/types/apollo/main/types'
import { SupportedChainsGQL } from '~/apollo/main/config.query.graphql'
import { ConfigState } from '~/types/state'

const defaultChain: Chain = {
  dex: [
    { value: 'uniswap_v2', name: 'Uniswap V2', symbol: 'UNI' },
    { value: 'uniswap_v3', name: 'Uniswap V3', symbol: 'UNI' },
  ],
  id: 'ethereum',
  blockExplorerUrl: 'https://etherscan.io/',
  chainIdentifier: 1,
  name: 'Ethereum Main Net',
  rpcUrl: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161/',
  symbol: 'ETH',
}

export const state = () =>
  ({
    title: 'EVM',
    globalStats: null,
    gasStats: null,
    chains: [],
    protocols: [],
    balancesChains: [1, 56, 137, 250, 10000],
  } as ConfigState)

export const mutations: MutationTree<ConfigState> = {
  SET_CONFIG: (state, { chains }) => {
    state.chains = chains
  },
}

export const actions: ActionTree<ConfigState, ConfigState> = {
  async initConfigs({ commit }, context: Context): Promise<void> {
    try {
      const client = context.app.apolloProvider?.defaultClient
      const query = await client?.query({ query: SupportedChainsGQL, fetchPolicy: 'no-cache' })
      if (query && query.data) {
        commit('SET_CONFIG', query.data)
      }
    } catch {}
  },
}
export const getters: GetterTree<ConfigState, ConfigState> = {
  chainInfo: (state: ConfigState) => (chainId: number) =>
    state.chains.find((elem: Chain) => elem.chainIdentifier === chainId) ?? defaultChain,
} as any
