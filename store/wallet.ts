/* eslint-disable @typescript-eslint/no-unused-vars */
import { ActionTree, MutationTree } from 'vuex'
import detectEthereumProvider from '@metamask/detect-provider'
import { HeatmapBalancesData } from '~/models/heatmap'

export const state = () => ({
  isWalletConnected: false as boolean,
  address: (null as unknown) as string,
  // address: '0xF705b9ba1908cA505537F309B08E6949C1b8f31F',
  balances: [] as HeatmapBalancesData[],
  transactions: [] as any,
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

  metamaskLogout({ commit }) {
    commit('SET_ADDRESS', null)
    commit('SET_WALLET_STATUS', false)
    commit('SET_BALANCES', [])
  },
}
