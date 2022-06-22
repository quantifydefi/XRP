import 'reflect-metadata'
import { plainToClass } from 'class-transformer'
import { useQuery } from '@vue/apollo-composable/dist'
import { computed, inject, reactive, Ref, ref, useStore, watch } from '@nuxtjs/composition-api'
import { TransactionsGQL } from '~/apollo/main/portfolio.query.graphql'

import { Web3, WEB3_PLUGIN_KEY } from '~/plugins/web3/web3'
import { State } from '~/types/state'
import { Chain, LogEvent, TransactionItem } from '~/types/apollo/main/types'

export class Transactions implements TransactionItem {
  readonly blockSignedAt!: string
  readonly fromAddress!: string
  readonly fromAddressIsContract!: boolean
  readonly fromAddressName!: string
  readonly fromAddressSymbol!: string
  readonly gasPrice!: number
  readonly gasQuote!: number
  readonly gasSpent!: number
  readonly logEvents!: LogEvent[]
  readonly successful!: boolean
  readonly toAddress!: string
  readonly toAddressIsContract!: boolean
  readonly toAddressName!: string
  readonly toAddressSymbol!: string
  readonly txHash!: string
  readonly value!: string
  readonly valueQuote!: number

  get txnValue(): number {
    return +this.value / 10 ** 18
  }

  get txnFee(): number {
    return (this.gasPrice / 10 ** 18) * this.gasSpent
  }

  get isSuccess(): { text: string; color: string } {
    return this.successful ? { text: 'Success', color: 'green' } : { text: 'Failed', color: 'pink' }
  }
}

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
      address: account.value,
      pageNumber: pagination.page,
      pageSize: pagination.perPage,
    }),
    { fetchPolicy: 'no-cache', pollInterval: 60000 }
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
