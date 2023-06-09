import { ref, Ref, computed, watch } from '@nuxtjs/composition-api'
import { useQuery, useSubscription } from '@vue/apollo-composable/dist'
import { Pool, UniswapToken } from '@/types/apollo/main/types'
import { ScreenerGQL, PriceStreamGQL } from '~/apollo/main/token.query.graphql'
import emitter from '~/types/emitter'
import useERC20 from '~/composables/useERC20'
// import useERC20 from '~/composables/useERC20'
import { ERC20Balance } from '~/types/global'
export default function (
  networkId: Ref<string>,
  dex: Ref<string>,
  sortBy: Ref<string>,
  sort: Ref<string>,
  chainId: Ref<number | null> = ref(1),
  isWalletReady: Ref<boolean> = ref(false)
) {
  // STATE
  const loading = ref<boolean>(true)
  const pageNumber = ref<number>(0)
  const balanceMap = ref<{ [a: string]: ERC20Balance }>({})

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
  const { balanceMulticall } = useERC20()

  const screenerData = computed<Pool[]>(() => result.value?.poolScreener ?? [])
  const addresses = computed<string[]>(() => screenerData.value.map((a) => a.address))
  const uniswapTokens = computed<UniswapToken[]>(() =>
    screenerData.value.map((a) => ({
      address: a.token0Address,
      chainId: 1,
      name: a.token0Name,
      symbol: a.token0Symbol,
      decimals: a.token0Decimals,
    }))
  )

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
  watch([uniswapTokens, isWalletReady, chainId], async ([tokens]) => {
    const balances = await balanceMulticall(tokens, <number>chainId.value)
    balanceMap.value = balances.reduce((obj, item) => ({ ...obj, [item.address.toLowerCase()]: item }), {})
  })

  return { screenerData, currentPage, loading, balanceMap, nextPage }
}
