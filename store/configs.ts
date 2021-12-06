/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ActionTree, MutationTree } from 'vuex'
import { plainToClass } from 'class-transformer'
import { Chain, GlobalStats } from '~/types/apollo/types'
import { GlobalStatsQueryGQL } from '~/apollo/curve/config.query.graphql'
import { ChainItem, PortfolioBalance } from '~/models/portfolio'
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
  } as ChainItem,
  chains: [] as ChainItem[],
})
export type ConfigState = ReturnType<typeof state>

export const mutations: MutationTree<ConfigState> = {
  SET_CONFIG: (state, { globalStats, chains, gasStats }) => {
    state.chains = plainToClass(ChainItem, chains as ChainItem[])
    state.globalStats = globalStats
    state.gasStats = gasStats
  },
  SET_CHAIN: (state, chain: ChainItem) => {
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
