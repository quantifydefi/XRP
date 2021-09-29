import 'reflect-metadata'

import { AppMenuConfigInterface } from '~/types/app'

const appMenu: AppMenuConfigInterface = {
  networkOptions: [
    { networkName: 'Ethereum Mainnet', chainId: 1, icon: 'eth' },
    { networkName: 'Polygon/Matic Mainnet', chainId: 137, icon: 'matic' },
    { networkName: 'Binance Mainnet', chainId: 56, icon: 'bnb' },
    { networkName: 'Fanthom Opera Mainnet', chainId: 250, icon: 'ftm' },
    { networkName: 'Avalanche Mainnet', chainId: 43114, icon: 'avax' },
  ],
}

export class DefiApp {
  configs = {
    networks: {
      defaultNetwork: {
        networkName: 'Ethereum Mainnet',
        chainId: 1,
        icon: 'eth',
      },
      networkOptions: appMenu.networkOptions,
    },
  }
}
