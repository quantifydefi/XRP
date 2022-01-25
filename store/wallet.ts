/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  address: null as unknown as string,
  isWalletConnected: false as boolean,
  // isWalletConnected: true as boolean,
  // address: '0xF705b9ba1908cA505537F309B08E6949C1b8f31F',
  totalBalance: '' as string,
})
export type WalletState = ReturnType<typeof state>

export const mutations: MutationTree<WalletState> = {
  SET_WALLET_STATUS: (state, { status, wallet }) => {
    state.isWalletConnected = status
    state.address = wallet
  },

  SET_TOTAL_BALANCE: (state, balance: string) => {
    state.totalBalance = balance
  },
}

export const actions: ActionTree<WalletState, WalletState> = {
  connectToWallet({ commit }, { status, wallet }) {
    commit('SET_WALLET_STATUS', { status, wallet })
  },

  disconnectToWallet({ commit }) {
    commit('SET_WALLET_STATUS', { status: false, wallet: null })
  },

  totalBalance({ commit }, balance) {
    commit('SET_TOTAL_BALANCE', balance)
  },
}
