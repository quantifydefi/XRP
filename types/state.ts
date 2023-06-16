import { Chain, GasStats } from './apollo/main/types'
import { SearchResult } from '~/types/global'

export type ThemeOptions = 'dark' | 'light'

export interface ConfigState {
  title: string
  gasStats: GasStats[] | null
  chains: Chain[]
  balancesChains: number[]
  protocols: { name: string; symbol: string; id: string }[]
  globalSearchResult: SearchResult[]
}

export interface UiState {
  theme: ThemeOptions
  dark: { [key: string]: string }
  light: { [key: string]: string }
  walletSelectionDialog: boolean
}

export interface WalletState {
  address: string | null
  isWalletConnected: boolean
  totalBalance: string
}

export interface State {
  configs: ConfigState
  ui: UiState
  wallet: WalletState
}
