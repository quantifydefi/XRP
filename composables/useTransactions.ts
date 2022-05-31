import 'reflect-metadata'
import { plainToClass } from 'class-transformer'
import { useQuery } from '@vue/apollo-composable/dist'
import { computed, inject, Ref, ref, useStore, watch } from '@nuxtjs/composition-api'
import { CovalentTransactionsGQL } from '~/apollo/main/portfolio.query.graphql'
import { Transactions } from '~/models/transaction'

import { Web3, WEB3_PLUGIN_KEY } from '~/plugins/web3/web3'
import { State } from '~/types/state'
import { Chain, LogEvent, TransactionItem } from '~/types/apollo/main/types'

export default function () {
  const { state, dispatch, getters } = useStore<State>()
  const chains = computed(() => getters['configs/transactionsChains'])
  const currentChain = computed(() => state.configs.currentTransactionChain)
  /** STATE **/
  const loading = ref(true)
  const cols = ref([
    {
      text: '',
      value: 'data-table-expand',
    },
    {
      text: 'Txn Date',
      align: 'start',
      value: 'blockSignedAt',
      class: 'py-2',
    },
    {
      text: 'Method',
      align: 'start',
      value: 'method',
      class: 'py-2',
    },
    {
      text: 'Txn Hash',
      align: 'start',
      value: 'txHash',
      class: 'py-2',
    },
    {
      text: '',
      align: 'start',
      value: 'isOut',
      class: 'py-2',
    },
    {
      text: '',
      align: 'start',
      value: 'fromTo',
      class: 'py-2',
    },
    {
      text: 'Value',
      align: 'start',
      value: 'value',
      class: 'py-2',
    },
    {
      text: 'Txn Fee',
      align: 'start',
      value: 'txnFee',
      class: 'py-2',
    },
    {
      text: 'Status',
      align: 'start',
      value: 'successful',
      class: 'py-2',
    },

    {
      text: '',
      align: 'start',
      value: 'action',
      class: 'py-2',
    },
  ])

  const logEvents = ref<LogEvent[]>([])
  const loadedEventsLength = ref(5)

  /** COMPOSABLES **/
  const { account, walletReady } = inject(WEB3_PLUGIN_KEY) as Web3
  const { result, error, onResult } = useQuery(
    CovalentTransactionsGQL,
    () => ({
      chainId: currentChain.value.chainId,
      address: account.value,
      pageNumber: 0,
      pageSize: 200,
    }),
    { fetchPolicy: 'no-cache', prefetch: false }
  )

  /** COMPUTED **/
  const transactionsData = computed(
    () => plainToClass(Transactions, result.value?.covalentTransactions.items as Transactions[]) ?? []
  ) as Ref<Transactions[]>

  const logEventsLoaded = computed<LogEvent[]>(() => logEvents.value.slice(0, loadedEventsLength.value))

  /** EVENTS **/
  onResult((queryResult) => {
    loading.value = queryResult.loading
  })
  watch(
    () => currentChain.value.chainId,
    () => (loading.value = true)
  )

  /** METHODS **/
  async function onNetworkSelectChange(chain: Ref<Chain>) {
    await dispatch('configs/changeCurrentTransactionChain', chain.value)
  }

  // On button click, navigate to blockchain explorer to view transaction
  function navigateToExplorer(address: string): void {
    const url = `${currentChain.value.blockExplorerUrl}/tx/${address}`
    window.open(url)
  }

  // On expandRow, reset loadedEventsLength to default = 5
  function expandRow(expand: any, isExpand: boolean, item: LogEvent[]): void {
    expand(isExpand)

    if (isExpand) {
      logEvents.value = item
      loadedEventsLength.value = 5
    }
  }

  // increment loadedEventsLength by 3 if more logEvents to show
  function loadMore() {
    if (loadedEventsLength.value > logEvents.value.length) return
    loadedEventsLength.value = loadedEventsLength.value + 3
  }

  /** Styling Methods **/
  function isOutStyleRenderer(item: TransactionItem): { color: string; text: string } {
    if (item.toAddress.toLowerCase() === item.fromAddress.toLowerCase()) {
      return { color: 'grey', text: 'SELF' }
    }

    if (item.toAddress.toLowerCase() === account.value.toLowerCase()) {
      return { color: 'green', text: 'IN' }
    }

    return { color: 'pink', text: 'OUT' }
  }

  // list method names separated by comma
  function methodRenderer(events: LogEvent[]): string {
    let logs = events.map((event: any) => {
      return event.decoded.name.replace(/([A-Z])/g, ' $1').trim()
    })

    logs = logs.filter(Boolean)

    if (logs.length === 0) {
      return 'Transfer'
    }

    if (logs.length > 2) {
      return 'Multicall'
    }

    return logs.join(', ')
  }

  return {
    loading,
    error,
    walletReady,
    cols,
    account,
    chains,
    currentChain,
    transactionsData,
    logEventsLoaded,
    logEvents,
    loadedEventsLength,

    onNetworkSelectChange,
    navigateToExplorer,
    isOutStyleRenderer,
    methodRenderer,
    expandRow,
    loadMore,
  }
}
