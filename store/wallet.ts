/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  isWalletConnected: true as boolean,
  // address: null as unknown as string,
  address: '0xF705b9ba1908cA505537F309B08E6949C1b8f31F',
  totalBalance: '' as string,
})
export type WalletState = ReturnType<typeof state>

export const mutations: MutationTree<WalletState> = {
  SET_ADDRESS: (state, address: string) => {
    state.address = address
  },

  SET_WALLET_STATUS: (state, status: boolean) => {
    state.isWalletConnected = status
  },

  SET_TOTAL_BALANCE: (state, balance: string) => {
    state.totalBalance = balance
  },
}

export const actions: ActionTree<WalletState, WalletState> = {
  connectToWallet({ commit }, { wallet, status }) {
    commit('SET_ADDRESS', wallet)
    commit('SET_WALLET_STATUS', status)
  },

  totalBalance({ commit }, balance) {
    commit('SET_TOTAL_BALANCE', balance)
  },
}
