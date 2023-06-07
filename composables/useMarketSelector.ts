import { computed, inject, useStore } from '@nuxtjs/composition-api'
import { State } from '~/types/state'
import { Web3, WEB3_PLUGIN_KEY } from '~/plugins/web3/web3'
import { Chain } from '~/types/apollo/main/types'

const defaultChain: Chain = {
  dex: [
    { value: 'uniswap_v2', name: 'Uniswap V2', symbol: 'UNI' },
    { value: 'uniswap_v3', name: 'Uniswap V3', symbol: 'UNI' },
  ],
  id: 'ethereum',
  blockExplorerUrl: 'https://etherscan.io/',
  chainIdentifier: 1,
  name: 'Ethereum Main Net',
  rpcUrl: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161/',
  symbol: 'ETH',
}

export default function useMarketSelector() {
  // COMPOSABLE
  const { state } = useStore<State>()
  const { walletReady, chainId, changeChain } = inject(WEB3_PLUGIN_KEY) as Web3

  // COMPUTED
  const allChains = computed(() => state.configs.chains)
  const currentChain = computed(
    () => allChains.value.find((elem) => elem.chainIdentifier === chainId.value) ?? defaultChain
  )
  const getChainById = (id: string): Chain | null => allChains.value.find((elem) => elem.id === id) || null

  function onSelect(chain: Chain) {
    changeChain(chain)
  }

  return {
    chainId,
    allChains,

    // COMPUTED
    currentChain,
    walletReady,

    // METHODS
    onSelect,
    getChainById,
  }
}
