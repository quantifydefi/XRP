import 'reflect-metadata'
import { plainToClass } from 'class-transformer'
import { useQuery } from '@vue/apollo-composable/dist'
import { computed, inject, reactive, Ref, ref, useStore, watch } from '@nuxtjs/composition-api'
import { TransactionsGQL } from '~/apollo/main/portfolio.query.graphql'
import { Transactions } from '~/models/transaction'

import { Web3, WEB3_PLUGIN_KEY } from '~/plugins/web3/web3'
import { State } from '~/types/state'
import { Chain } from '~/types/apollo/main/types'

export default function () {
  const { state, dispatch, getters } = useStore<State>()
  const chains = computed(() => getters['configs/transactionsChains'])
  const currentChain = computed(() => state.configs.currentTransactionChain)

  /** STATE **/
  const loading = ref(true)
  const currentPage = ref(1)
  const hasMore = ref(false)

  const pagination = reactive({
    page: 0,
    total: 1,
    perPage: 15,
  })

  /** COMPOSABLES **/
  const { account, walletReady } = inject(WEB3_PLUGIN_KEY) as Web3
  const { result, error, onResult } = useQuery(
    TransactionsGQL,
    () => ({
      chainId: currentChain.value.chainId,
      // address: account.value,
      address: '0xF705b9ba1908cA505537F309B08E6949C1b8f31F',
      pageNumber: pagination.page,
      pageSize: pagination.perPage,
    }),
    { fetchPolicy: 'no-cache', prefetch: false }
  )

  /** COMPUTED **/
  const transactionsData = computed(() => {
    return plainToClass(Transactions, result.value.transactions.items as Transactions[]) ?? []
  }) as Ref<Transactions[]>

  /** EVENTS **/
  onResult((queryResult) => {
    hasMore.value = queryResult.data.transactions.pagination.hasMore
    loading.value = queryResult.loading

    if (hasMore.value && pagination.total <= currentPage.value) {
      pagination.total++
    }
  })

  // On chain network or account change, reset currentPage and pagination.total
  watch([currentChain, account], () => {
    loading.value = true
    currentPage.value = 1
    pagination.total = 1
  })

  // Offset page index
  watch(currentPage, (newVal) => {
    loading.value = true
    pagination.page = newVal - 1
  })

  /** METHODS **/
  async function onNetworkSelectChange(chain: Ref<Chain>) {
    await dispatch('configs/changeCurrentTransactionChain', chain.value)
  }

  function navigateToExplorer(address: string): void {
    const url = `${currentChain.value.blockExplorerUrl}/tx/${address}`
    window.open(url)
  }

  return {
    loading,
    error,
    walletReady,
    account,
    chains,
    currentChain,
    transactionsData,
    hasMore,
    currentPage,
    pagination,

    onNetworkSelectChange,
    navigateToExplorer,
  }
}
