import { Chain, GasStats } from './apollo/main/types'

export type ThemeOptions = 'dark' | 'light'

export interface ConfigState {
  title: string
  gasStats: GasStats[] | null
  currentAaveMarket: Chain
  currentTransactionChain: Chain
  chains: Chain[]
  balancesChains: number[]
  aaveMarketsSupportedChains: number[]
  transactionsSupportedChains: number[]
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
