import { ChainOptions } from '~/types/balance'

export interface NetworkInterface {
  networkName: string
  chainId: ChainOptions
  symbol: string
}

export interface NetworkMenuInterface {
  networkOptions: NetworkInterface[]
}

export interface AppConfigInterface {
  networks: {
    defaultNetwork: NetworkInterface
    networkOptions: NetworkInterface[]
  }
}
