import 'reflect-metadata'

import { AppMenuConfigInterface } from '~/types/app'

const appMenu: AppMenuConfigInterface = {
  networkOptions: [
    { networkName: 'Ethereum Mainnet', chainId: 1, icon: 'eth' },
    { networkName: 'Polygon/Matic', chainId: 137, icon: 'matic' },
    { networkName: 'Binance', chainId: 56, icon: 'bnb' },
    { networkName: 'Fanthom Opera', chainId: 250, icon: 'ftm' },
    { networkName: 'Avalanche', chainId: 43114, icon: 'avax' },
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
