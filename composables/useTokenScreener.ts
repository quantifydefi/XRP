import { ref, Ref, computed, watch, inject } from '@nuxtjs/composition-api'
import { useQuery, useSubscription } from '@vue/apollo-composable/dist'
import { Pool } from '@/types/apollo/main/types'
import { ScreenerGQL, PriceStreamGQL } from '~/apollo/main/token.query.graphql'
import emitter from '~/types/emitter'
import useERC20 from '~/composables/useERC20'
import { ERC20Balance } from '~/types/global'
import { Web3, WEB3_PLUGIN_KEY } from '~/plugins/web3/web3'
export default function (networkId: Ref<string>, dex: Ref<string>, sortBy: Ref<string>, sort: Ref<string>) {
  // STATE
  const loading = ref<boolean>(true)
  const pageNumber = ref<number>(0)
  const balanceMap = ref<{ [a: string]: ERC20Balance }>({})

  // COMPOSABLES
  const { account, getCustomProviderByNetworkId, getNetworkById } = inject(WEB3_PLUGIN_KEY) as Web3
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

  const { result: liveData } = useSubscription(PriceStreamGQL, () => ({
    network: networkId.value,
    dex: dex.value,
    address: addresses.value,
  }))

  const nextPage = () => pageNumber.value++

  const updateBalances = async () => {
    const provider = getCustomProviderByNetworkId(networkId.value)
    const network = getNetworkById(networkId.value)
    if (provider && network) {
      const tokens = screenerData.value.map((a) => ({
        address: a.token0Address,
        chainId: network.chainIdentifier,
        name: a.token0Name,
        symbol: a.token0Symbol,
        decimals: a.token0Decimals,
      }))
      const balances = await balanceMulticall(tokens, account.value, provider)
      balanceMap.value = balances.reduce((obj, item) => ({ ...obj, [item.address.toLowerCase()]: item }), {})
    }
  }

  const currentPage = computed({
    get: () => pageNumber.value + 1,
    set: (v: number) => (pageNumber.value = v - 1),
  })

  // EVENTS
  onResult((queryResult) => {
    loading.value = queryResult.loading
  })

  watch(liveData, (val: any) => emitter.emit('priceStream', val))

  watch([addresses, account], async () => {
    if (addresses.value.length) {
      await updateBalances()
    }
  })

  return { screenerData, currentPage, loading, balanceMap, nextPage }
}
