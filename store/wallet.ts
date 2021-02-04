/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionTree, MutationTree } from 'vuex'
import detectEthereumProvider from '@metamask/detect-provider'
import { plainToClass } from 'class-transformer'
import { HeatmapBalancesData } from '~/models/heatmap'
import { Adapter, Trade } from '~/models/transaction'

export const state = () => ({
  isWalletConnected: false as boolean,
  address: (null as unknown) as string,
  // address: '0x66A51330b37938f414cBf09ebd2E1eB9c70051A1',
  balances: [] as HeatmapBalancesData[],
  transactions: [] as Trade[],
  adapters: ((null as unknown) as Adapter[]) || null,
})
export type WalletState = ReturnType<typeof state>

export const mutations: MutationTree<WalletState> = {
  SET_BALANCES: (state, balances: HeatmapBalancesData[]) =>
    (state.balances = balances),

  SET_ADDRESS: (state, address: string) => {
    state.address = address
  },

  SET_WALLET_STATUS: (state, status: boolean) => {
    state.isWalletConnected = status
  },

  SET_TRANSACTIONS: (state, transactions: Trade[]) => {
    state.transactions = transactions
  },

  SET_ADAPTERS: (state, adapters: Adapter[]) => {
    state.adapters = adapters
  },
}

export const actions: ActionTree<WalletState, WalletState> = {
  async balances({ commit, dispatch, state }): Promise<void> {
    const balances = await dispatch(
      'heatmap/balanceHeatmap',
      {
        address: state.address,
      },
      { root: true }
    )

    commit('SET_BALANCES', balances)
  },

  async transactions({ commit }, { address }): Promise<Trade[]> {
    const { data } = await this.$axios.get(`/api/defi/transactions/${address}`)
    const classData = plainToClass(Trade, data.data as Trade[])
    commit('SET_TRANSACTIONS', classData)
    return classData
  },

  connectToWallet({ commit }, { wallet, status }) {
    commit('SET_ADDRESS', wallet)
    commit('SET_WALLET_STATUS', status)
  },

  async isWalletConnected({
    commit,
  }): Promise<{ address: null | string; status: boolean }> {
    const connected = { status: false, address: null }
    if (process.browser) {
      const provider: any = await detectEthereumProvider()

      if (provider === (window.ethereum as any)) {
        // @ts-ignore
        // eslint-disable-next-line no-undef
        const accounts: string[] = await ethereum.request({
          method: 'eth_accounts',
        })

        if (accounts.length > 0) {
          commit('SET_ADDRESS', accounts[0])
          commit('SET_WALLET_STATUS', true)
          return { status: true, address: accounts[0] }
        }
      }
      return connected
    }
    return connected
  },

  async getAdapters({ commit }, { address }): Promise<Adapter[]> {
    const { data } = await this.$axios.get(`/api/defi/adapters/${address}`)
    const classData = plainToClass(Adapter, data.data as Adapter[])
    commit('SET_ADAPTERS', classData)
    return classData
  },

  metamaskLogout({ commit }) {
    commit('SET_ADDRESS', null)
    commit('SET_WALLET_STATUS', false)
    commit('SET_BALANCES', [])
    commit('SET_ADAPTERS', null)
  },
}
