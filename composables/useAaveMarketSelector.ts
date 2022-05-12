import { computed, inject, ref, useStore, watch } from '@nuxtjs/composition-api'
import { State } from '~/types/state'
import { Web3, WEB3_PLUGIN_KEY } from '~/plugins/web3/web3'
import { Chain } from '~/types/apollo/main/types'

export default function useAaveMarketSelector() {
  // COMPOSABLE
  const { state, dispatch, getters } = useStore<State>()
  const { walletReady, chainId, changeChain } = inject(WEB3_PLUGIN_KEY) as Web3

  // STATE
  const selectedChainId = ref(1)

  // COMPUTED
  const chains = computed(() => getters['configs/aaveMarkets'])
  const currentChain = computed(() => state.configs.currentAaveMarket)
  const isChainAndMarketMismatched = computed(() => {
    if (!walletReady.value) return null
    else if (chainId.value !== currentChain.value.chainId) return currentChain.value
    else return null
  })

  // METHODS
  function findChainById(id: number): Chain | null {
    const chain: Chain | undefined = chains.value.find((elem: { chainId: number }) => elem.chainId === id)
    if (chain) {
      return chain
    } else return null
  }
  const changeToRequiredChain = () => changeChain(currentChain.value)

  // WATCH
  watch(selectedChainId, async (currentValue) => {
    const chain = findChainById(currentValue)
    if (chain) await dispatch('configs/changeAaveMarket', chain)
  })

  return {
    // STATE
    selectedChainId,

    // COMPUTED
    chains,
    currentChain,
    walletReady,
    isChainAndMarketMismatched,

    // METHODS
    changeToRequiredChain,
  }
}
