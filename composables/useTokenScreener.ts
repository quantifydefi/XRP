/* eslint-disable @typescript-eslint/no-unused-vars */
import { ref, useContext, inject, Ref, computed, useStore } from '@nuxtjs/composition-api'
import { useQuery } from '@vue/apollo-composable/dist'
import { plainToClass } from 'class-transformer'
import { UniswapToken, Chain, ScreenerItem } from '@/types/apollo/main/types'
import { ScreenerGQL } from '~/apollo/main/token.query.graphql'
import { Web3, WEB3_PLUGIN_KEY } from '~/plugins/web3/web3'
import { State } from '~/types/state'
import { AavePoolModel } from '~/composables/useAavePools'

export default function () {
  // STATE
  const { getters } = useStore<State>()
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
      pageNumber: pageNumber.value,
    }),
    { fetchPolicy: 'no-cache', pollInterval: 60000 }
  )
  const screenerData = computed<ScreenerItem[]>(() => result.value?.screener ?? [])

  const nextPage = () => pageNumber.value++

  const currentPage = computed({
    get: () => pageNumber.value + 1,
    set: (v: number) => (pageNumber.value = v - 1),
  })

  // EVENTS
  onResult((queryResult) => {
    loading.value = queryResult.loading
  })

  return { screenerData, currentPage, loading, nextPage }
}
