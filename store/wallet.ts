/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line import/named
import { ActionTree, MutationTree } from 'vuex'
import detectEthereumProvider from '@metamask/detect-provider'
import { plainToClass } from 'class-transformer'
import { HeatmapBalancesData } from '~/models/heatmap'
import { Adapter, Trade } from '~/models/transaction'

export const state = () => ({
  isWalletConnected: false as boolean,
  address: null as unknown as string,
  // address: '0xF705b9ba1908cA505537F309B08E6949C1b8f31F',
  balances: [] as HeatmapBalancesData[],
  transactions: [] as Trade[],
  adapters: (null as unknown as Adapter[]) || null,
  gasPrice: { fast: 0, average: 0, slow: 0 },
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

  SET_GAS: (state: WalletState, { fast, average, slow }) => {
    state.gasPrice.slow = slow
    state.gasPrice.average = average
    state.gasPrice.fast = fast
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
    try {
      const { data } = await this.$axios.get(
        `/api/defi/transactions/${address}`
      )
      const classData = plainToClass(Trade, data.data as Trade[])
      commit('SET_TRANSACTIONS', classData)
      return classData
    } catch {
      return []
    }
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
    try {
      const { data } = await this.$axios.get(`/api/defi/adapters/${address}`)
      const classData = plainToClass(Adapter, data.data as Adapter[])
      commit('SET_ADAPTERS', classData)
      return classData
    } catch {
      return []
    }
  },

  metamaskLogout({ commit }) {
    commit('SET_ADDRESS', null)
    commit('SET_WALLET_STATUS', false)
    commit('SET_BALANCES', [])
    commit('SET_ADAPTERS', null)
  },

  async gasPrices({ commit }): Promise<any> {
    try {
      const { data } = await this.$axios.get(
        'https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=PAZS11XR4CSXFTQJZ8SK61IAB4UTPR5K6C'
      )
      const fast = parseFloat(data.result.FastGasPrice)
      const average = parseFloat(data.result.ProposeGasPrice)
      const slow = parseFloat(data.result.SafeGasPrice)
      commit('SET_GAS', { fast, average, slow })
    } catch {
      return null
    }
  },
}
