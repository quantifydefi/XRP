import { plainToClass } from 'class-transformer'
import { computed, inject, reactive, Ref, ref, useRoute, useStore, watch } from '@nuxtjs/composition-api'
import { useQuery } from '@vue/apollo-composable/dist'
import { TransfersGQL } from '~/apollo/main/portfolio.query.graphql'
import { Web3, WEB3_PLUGIN_KEY } from '~/plugins/web3/web3'
import { State } from '~/types/state'
import { BlockTransactionContractTransfer, TokenTransferItem } from '~/types/apollo/main/types'

export class TransactionTransfer implements BlockTransactionContractTransfer {
  blockSignedAt!: string
  gasPrice!: number
  gasQuote!: number
  gasSpent!: number
  successful!: boolean
  transfers!: TokenTransferItem[]
  txHash!: string

  get txDate(): string {
    return new Date(this.blockSignedAt).toLocaleString()
  }

  get txnValue(): number {
    return +this.transfers[0].delta / 10 ** this.transfers[0].contractDecimals
  }

  get txnFee(): number {
    return (this.gasPrice / 10 ** 18) * this.gasSpent
  }

  get isSuccess(): { text: string; color: string } {
    return this.successful ? { text: 'Success', color: 'green' } : { text: 'Failed', color: 'pink' }
  }

  get transferType(): { text: string; color: string } {
    return this.transfers[0].transferType === 'IN' ? { text: 'IN', color: 'green' } : { text: 'OUT', color: 'pink' }
  }

  get from(): { label: string; isContract: boolean } {
    if (this.transfers[0].fromAddressLabel.length > 0) {
      return {
        label: this.transfers[0].fromAddressLabel,
        isContract: true,
      }
    }

    return {
      label: this.transfers[0].fromAddressName,
      isContract: this.transfers[0].fromAddressIsContract,
    }
  }

  get to(): { label: string; isContract: boolean } {
    if (this.transfers[0].toAddressLabel.length > 0) {
      return {
        label: this.transfers[0].toAddressLabel,
        isContract: true,
      }
    }

    return {
      label: this.transfers[0].toAddressName,
      isContract: this.transfers[0].toAddressIsContract,
    }
  }
}

export default function () {
  //  STATE
  const contractAddress = computed(() => route.value.query?.contract ?? '') as Ref<string>

  const loading = ref(true)
  const currentPage = ref(1)
  const hasMore = ref(false)
  const pagination = reactive({ page: 0, total: 1, perPage: 5, visible: 30 })

  // COMPOSABLES
  const { state } = useStore<State>()
  const route = useRoute()
  const currentChain = computed(() => state.configs.currentTransactionChain.chainId)
  const { account } = inject(WEB3_PLUGIN_KEY) as Web3

  const { result, error, onResult } = useQuery(
    TransfersGQL,
    () => ({
      chainId: currentChain.value,
      address: account.value ?? '',
      contractAddress: contractAddress.value,
      pageNumber: pagination.page,
      pageSize: pagination.perPage,
    }),
    { fetchPolicy: 'no-cache', pollInterval: 60000 }
  )

  // COMPUTED
  const transfersData = computed(
    () => plainToClass(TransactionTransfer, result.value?.transfers?.items as TransactionTransfer[]) ?? []
  ) as Ref<TransactionTransfer[]>

  // EVENTS
  onResult((queryResult) => {
    hasMore.value = queryResult.data.transfers.pagination.hasMore
    loading.value = queryResult.loading

    if (hasMore.value && pagination.total <= currentPage.value) {
      pagination.total++
    }
  })

  // On chain network or account change, reset currentPage and pagination.total
  watch([account, currentChain], () => {
    currentPage.value = 1
    pagination.total = 1
  })

  // Offset page index
  watch(currentPage, (newVal) => {
    pagination.page = newVal - 1
  })

  return { account, loading, error, contractAddress, transfersData, hasMore, currentPage, pagination }
}
