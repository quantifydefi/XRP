/* eslint-disable @typescript-eslint/no-unused-vars */
import { ref, useContext, inject, Ref, computed, useStore, watch, onMounted } from '@nuxtjs/composition-api'
import { useQuery, useSubscription } from '@vue/apollo-composable/dist'
import { findMap } from '@amcharts/amcharts4/.internal/core/utils/Iterator'
import { UniswapToken, Chain, ScreenerItem, PriceStream, Pool } from '@/types/apollo/main/types'
import { ScreenerGQL, TimeGQL, PriceStreamGQL } from '~/apollo/main/token.query.graphql'
import { Web3, WEB3_PLUGIN_KEY } from '~/plugins/web3/web3'
import { State } from '~/types/state'
import emitter from '~/types/emitter'

export default function (dex: Ref<string>, sortBy: Ref<string>, sort: Ref<string>) {
  // STATE
  const { getters } = useStore<State>()
  const context = useContext()
  const loading = ref<boolean>(true)
  const rawTokenList = ref<UniswapToken[]>([])
  const pageNumber = ref<number>(0)
  const { chainId } = inject(WEB3_PLUGIN_KEY) as Web3

  // COMPUTED
  const currentChain = computed<Chain>(() => getters['configs/chainInfo'](chainId.value ?? 1))

  // COMPOSABLES
  const { result, onResult } = useQuery(
    ScreenerGQL,
    () => ({
      network: currentChain.value.id,
      dex: dex.value,
      pageNumber: pageNumber.value,
      sortBy: sortBy.value,
      sort: sort.value,
    }),
    { fetchPolicy: 'no-cache', pollInterval: 60000 }
  )

  const screenerData = computed<Pool[]>(() => result.value?.poolScreener ?? [])
  const addresses = computed<string[]>(() => screenerData.value.map((a) => a.address))

  const { result: liveData } = useSubscription(PriceStreamGQL, () => ({
    network: currentChain.value.id,
    dex: dex.value,
    address: addresses.value,
  }))

  const nextPage = () => pageNumber.value++

  const currentPage = computed({
    get: () => pageNumber.value + 1,
    set: (v: number) => (pageNumber.value = v - 1),
  })

  // EVENTS
  onResult((queryResult) => {
    loading.value = queryResult.loading
  })

  watch(liveData, (val: any) => emitter.emit('priceStream', val))

  return { screenerData, currentPage, loading, nextPage }
}
