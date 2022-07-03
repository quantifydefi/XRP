import type { ActionTree, MutationTree, GetterTree } from 'vuex'
import { Context } from '@nuxt/types'
import { Chain } from '~/types/apollo/main/types'
import { SupportedChainsGQL } from '~/apollo/main/config.query.graphql'
import { ConfigState } from '~/types/state'

const defaultChain: Chain = {
  chainId: 1,
  name: 'Ethereum',
  geckoId: 'ethereum',
  symbol: 'ETH',
  label: 'Ethereum Mainnet',
  logoUrl: 'https://www.covalenthq.com/static/images/icons/display-icons/ethereum-eth-logo.png',
  isTestNet: false,
  rpcUrl: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161/',
  blockExplorerUrl: 'https://etherscan.io/',
  __typename: 'Chain',
}

export const state = () =>
  ({
    title: 'EVM',
    globalStats: null,
    gasStats: null,
    chains: [],
    currentAaveMarket: defaultChain,
    currentTransactionChain: defaultChain,
    balancesChains: [1, 56, 137, 250],
    aaveMarketsSupportedChains: [1, 137],
    transactionsSupportedChains: [1, 56, 137, 250],
    protocols: [],
  } as ConfigState)

export const mutations: MutationTree<ConfigState> = {
  SET_CONFIG: (state, { chains }) => {
    state.chains = chains
  },

  SET_AAVE_CHAIN: (state, chain: Chain) => {
    state.currentAaveMarket = chain
  },

  SET_TRANSACTION_CHAIN: (state, chain: Chain) => {
    state.currentTransactionChain = chain
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

  changeAaveMarket({ commit }, chain: Chain) {
    commit('SET_AAVE_CHAIN', chain)
  },

  changeCurrentTransactionChain({ commit }, chain: Chain) {
    commit('SET_TRANSACTION_CHAIN', chain)
  },
}
export const getters: GetterTree<ConfigState, ConfigState> = {
  chainInfo: (state: ConfigState) => (chainId: number) =>
    state.chains.find((elem: Chain) => elem.chainId === chainId) || null,
  aaveMarkets: (state: ConfigState) =>
    state.chains.filter((elem) => state.aaveMarketsSupportedChains.includes(elem.chainId)),
  transactionsChains: (state: ConfigState) =>
    state.chains.filter((elem) => state.transactionsSupportedChains.includes(elem.chainId)),
} as any
