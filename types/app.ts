import { ChainOptions } from '~/types/balance'

export interface NetworkInterface {
  networkName: string
  chainId: ChainOptions
  icon: string
}

export interface AppMenuConfigInterface {
  networkOptions: NetworkInterface[]
}
