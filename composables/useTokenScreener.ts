import { ref, Ref, computed, watch } from '@nuxtjs/composition-api'
import { useQuery, useSubscription } from '@vue/apollo-composable/dist'
import { Pool } from '@/types/apollo/main/types'
import { ScreenerGQL, PriceStreamGQL } from '~/apollo/main/token.query.graphql'
import emitter from '~/types/emitter'

export default function (networkId: Ref<string>, dex: Ref<string>, sortBy: Ref<string>, sort: Ref<string>) {
  // STATE
  const loading = ref<boolean>(true)
  const pageNumber = ref<number>(0)

  // COMPOSABLES
  const { result, onResult } = useQuery(
    ScreenerGQL,
    () => ({
      network: networkId.value,
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
    network: networkId.value,
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
