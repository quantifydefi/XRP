import { useQuery } from '@vue/apollo-composable/dist'
import { computed, inject, Ref, ref, useRoute, useStore, watch } from '@nuxtjs/composition-api'
import { TokenQueryGQL } from '~/apollo/main/token.query.graphql'
import { TimeInterval, Token } from '~/types/apollo/main/types'
import { Web3, WEB3_PLUGIN_KEY } from '~/plugins/web3/web3'
import { State } from '~/types/state'

export default function () {
  // STATE
  const { state } = useStore<State>()
  const loading = ref(true)
  const interval = ref<`${TimeInterval}`>('INTERVAL_24H')
  const aaveMarketChainId = computed(() => state.configs.currentAaveMarket.chainId)

  // COMPOSABLES
  const { account } = inject(WEB3_PLUGIN_KEY) as Web3
  const route = useRoute()
  const contractAddress = computed(() => route.value.query?.contract ?? '') as Ref<string>
  const { result, onResult } = useQuery(
    TokenQueryGQL,
    () => ({
      qcKey: route.value.params?.id ?? '',
      walletAddress: account.value ?? '',
      interval: interval.value,
      contractAddress: contractAddress.value,
      chainId: aaveMarketChainId.value,
      decimals: route.value.query?.decimals ?? 18,
    }),
    { fetchPolicy: 'no-cache', prefetch: false, pollInterval: 30000 }
  )

  // COMPUtED
  const tokenData = computed(() => result.value?.token ?? null) as Ref<Token>

  // EVENTS
  onResult((queryResult) => (loading.value = queryResult.loading))

  // WATCHERS
  watch(account, () => (loading.value = true))

  // METHODS
  const setInterval = (int: `${TimeInterval}`) => (interval.value = int)

  return { tokenData, loading, contractAddress, setInterval }
}
