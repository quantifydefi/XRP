import { computed, inject, useStore } from '@nuxtjs/composition-api'
import { State } from '~/types/state'
import { Web3, WEB3_PLUGIN_KEY } from '~/plugins/web3/web3'
import { Chain } from '~/types/apollo/main/types'

const defaultChain = {
  blockExplorerUrl: 'https://etherscan.io/',
  chainId: 1,
  geckoId: 'ethereum',
  isTestNet: false,
  label: 'Ethereum Mainnet',
  logoUrl: 'https://www.covalenthq.com/static/images/icons/display-icons/ethereum-eth-logo.png',
  name: 'Ethereum',
  rpcUrl: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161/',
  symbol: 'ETH',
}

export default function useMarketSelector() {
  // COMPOSABLE
  const { state } = useStore<State>()
  const { walletReady, chainId, changeChain } = inject(WEB3_PLUGIN_KEY) as Web3

  // COMPUTED
  const chains = computed(() => state.configs.chains)
  const currentChain = computed(() => chains.value.find((elem) => elem.chainId === chainId.value) ?? defaultChain)

  function onSelect(chain: Chain) {
    changeChain(chain)
  }

  return {
    chainId,
    chains,

    // COMPUTED
    currentChain,
    walletReady,

    // METHODS
    onSelect,
  }
}
