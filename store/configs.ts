/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ActionTree, MutationTree, GetterTree } from 'vuex'
import { plainToClass } from 'class-transformer'
import { Chain, GlobalStats } from '~/types/apollo/main/types'
import { GlobalStatsQueryGQL } from '~/apollo/main/config.query.graphql'
import { ChainItem } from '~/models/portfolio'
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
    name: 'Ethereum',
    chainId: 1,
    label: 'Ethereum Mainnet',
    logoUrl: 'https://www.covalenthq.com/static/images/icons/display-icons/ethereum-eth-logo.png',
    symbol: 'ETH',
    isTestNet: false,
  } as ChainItem,
  chains: [] as ChainItem[],
  protocols: [] as { name: string; symbol: string; id: string }[],
})
export type ConfigState = ReturnType<typeof state>

export const mutations: MutationTree<ConfigState> = {
  SET_CONFIG: (state, { globalStats, chains, protocols, gasStats }) => {
    state.chains = plainToClass(ChainItem, chains as ChainItem[])
    state.globalStats = globalStats
    state.gasStats = gasStats
    state.protocols = protocols
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
export const getters: GetterTree<ConfigState, ConfigState> = {
  chainInfo: (state: any) => (chainId: number) => state.chains.find((elem: Chain) => elem.chainId === chainId) || null,
}
