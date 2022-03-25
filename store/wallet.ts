/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ActionTree, MutationTree } from 'vuex'
import { WalletState } from '~/types/state'

export const state = () =>
  ({
    address: null,
    isWalletConnected: false,
    totalBalance: '',
    // isWalletConnected: true as boolean,
    // address: '0xF705b9ba1908cA505537F309B08E6949C1b8f31F',
  } as WalletState)

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
