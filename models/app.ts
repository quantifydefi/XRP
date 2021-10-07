import { NetworkMenuInterface, AppConfigInterface } from '~/types/app'

const networks: NetworkMenuInterface = {
  networkOptions: [
    { networkName: 'Ethereum Mainnet', chainId: 1, symbol: 'eth' },
    { networkName: 'Polygon/Matic', chainId: 137, symbol: 'matic' },
    { networkName: 'Binance', chainId: 56, symbol: 'bnb' },
    { networkName: 'Fanthom Opera', chainId: 250, symbol: 'ftm' },
    { networkName: 'Avalanche', chainId: 43114, symbol: 'avax' },
  ],
}

export const appConfig: AppConfigInterface = {
  networks: {
    defaultNetwork: {
      networkName: 'Ethereum Mainnet',
      chainId: 1,
      symbol: 'eth',
    },
    networkOptions: networks.networkOptions,
  },
}
