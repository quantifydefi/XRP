import { Chain, EthGasStats } from './apollo/main/types'

export type ThemeOptions = 'dark' | 'light'

export interface MainState {
  version: string
  $localForage: any
}
export interface ConfigState {
  globalStats: Chain | null
  gasStats: EthGasStats | null
  currentChain: Chain | null
  chains: Chain[]
  protocols: { name: string; symbol: string; id: string }[]
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
