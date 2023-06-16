import { Chain } from '~/types/apollo/main/types'

export interface ERC20Balance {
  address: string
  balance: number
  isNative: boolean
  isWrapped?: boolean
  nativeBalance?: number
  nativeSymbol?: string
  uniqueKeyOrSymbol?: string
}

export type SearchResult = {
  isWallet: boolean
  isContract: boolean
  searchString: string
  network: Chain
  desc: string
}
