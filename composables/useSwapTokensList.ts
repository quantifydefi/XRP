import { computed, ref, useContext, inject, Ref, watch } from '@nuxtjs/composition-api'
import { useQuery } from '@vue/apollo-composable/dist'
import { UniswapToken, UniswapTokenSource } from '@/types/apollo/main/types'
import { UniswapTokensGQL } from '~/apollo/main/config.query.graphql'
import { WEB3_PLUGIN_KEY, Web3 } from '~/plugins/web3/web3'

interface SwapTokenInterface {
  name: string
  source: UniswapTokenSource
  image: string
  active: boolean
}

export default function () {
  const { $imageUrlBySymbol } = useContext()
  const { account } = inject(WEB3_PLUGIN_KEY) as Web3

  // STATE
  const loading = ref<boolean>(true)
  const searchString = ref<string>('')
  const pageSize = ref<number>(20)
  const pageNumber = ref<number>(0)
  const sources = ref<SwapTokenInterface[]>([
    {
      name: 'Your Wallet',
      source: UniswapTokenSource.UserBalances,
      image: $imageUrlBySymbol('wallet'),
      active: true,
    },
    {
      name: 'CoinGecko',
      source: UniswapTokenSource.CoinGecko,
      image: $imageUrlBySymbol('coingecko'),
      active: false,
    },
    {
      name: 'Uniswap',
      source: UniswapTokenSource.Uniswap,
      image: $imageUrlBySymbol('uni'),
      active: true,
    },
    {
      name: 'Aave',
      source: UniswapTokenSource.Aave,
      image: $imageUrlBySymbol('aave'),
      active: false,
    },
  ])

  // COMPOSABLES
  const source = computed(() => sources.value.filter((elem) => elem.active === true).map(({ source }) => source))
  const { result, onResult } = useQuery(
    UniswapTokensGQL,
    () => ({
      chainId: 1,
      userWallet: account.value ?? '',
      searchString: searchString.value ?? '',
      source: source.value,
      pageNumber: pageNumber.value,
      pageSize: pageSize.value,
    }),
    { fetchPolicy: 'no-cache' }
  )

  const tokenList = ref<UniswapToken[]>([])
  const hasMoreElements = computed(() => result.value?.uniswapTokens.pagination.hasMore ?? true) as Ref<boolean>

  // EVENTS
  onResult((queryResult) => {
    queryResult.data.uniswapTokens.items.forEach((elem: UniswapToken) => tokenList.value.push(elem))
    loading.value = queryResult.loading
  })

  // METHODS
  function onSearchChange(val: string) {
    loading.value = true
    const searchTimeout: any = null
    clearTimeout(searchTimeout)
    setTimeout(() => {
      searchString.value = val
      tokenList.value = []
    }, 200)
  }

  function nextPage() {
    pageNumber.value++
  }

  watch(source, () => {
    searchString.value = ''
    tokenList.value = []
  })

  return {
    loading,
    searchString,
    tokenList,
    sources,
    source,
    hasMoreElements,
    onSearchChange,
    nextPage,
  }
}
