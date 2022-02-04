import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { TransactionsGQL } from '@/apollo/main/portfolio.query.graphql'
import { ChainlinkEthUsdPriceGQL } from '@/apollo/main/config.query.graphql'
import { ChainItem } from '~/models/portfolio'
// import { TransactionItem } from '~/types/apollo/main/types'
import { Transaction } from '~/types/apollo/main/types'

@Component({
  computed: {
    ...mapState({
      ui: (state: any) => state.ui,
      theme: (state: any) => state.ui.theme,
      walletAddress: (state: any) => state.wallet.address,
      currentChain: (state: any) => state.configs.currentChain,
    }),
  },
  apollo: {
    ethUsdPrice: {
      prefetch: false,
      query: ChainlinkEthUsdPriceGQL,
      deep: false,
      update: (data) => {
        return data.chainLinkPrice['ETH-USD']
      },
    },
    transactions: {
      prefetch: false,
      query: TransactionsGQL,
      deep: false,
      variables() {
        return {
          chainId: this.currentChain.chainId,
          address: this.walletAddress,
          pageNumber: 0,
          pageSize: 1000,
        }
      },
      result({ loading }) {
        this.isTransactionsLoading = loading
      },
      update: (data) => {
        return data.transactions
      },
      watchLoading(isLoading) {
        this.isTransactionsLoading = isLoading
      },
    },
  },
})
export default class Transactions extends Vue {
  isTransactionsLoading = true
  ethUsdPrice!: number
  walletAddress!: string
  currentChain!: ChainItem
  readonly transactions!: Transaction[]

  readonly cols = [
    {
      text: 'Txn Date',
      align: 'start',
      value: 'timeStamp',
      class: 'py-2',
    },
    {
      text: 'Method',
      align: 'start',
      value: 'function',
      class: 'py-2',
    },
    {
      text: 'Txn Hash',
      align: 'start',
      value: 'hash',
      class: 'py-2',
    },
    // {
    //   text: 'Age',
    //   align: 'start',
    //   value: 'txnAge',
    // },

    // {
    //   text: 'From',
    //   align: 'start',
    //   value: 'from',
    // },
    // {
    //   text: 'To',
    //   align: 'start',
    //   value: 'to',
    // },
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
      width: 140,
    },

    {
      text: 'Value',
      align: 'start',
      value: 'value',
      width: 140,
      class: 'py-2',
    },
    {
      text: 'Txn Fee',
      align: 'start',
      value: 'cumulativeGasUsed',
      class: 'py-2',
    },
    {
      text: 'Status',
      align: 'start',
      value: 'isError',
      class: 'py-2',
    },
    {
      text: '',
      align: 'start',
      value: 'action',
      class: 'py-2',
    },
  ]

  calculateEthUsdPrice(amount: number): number {
    return this.ethUsdPrice * amount
  }

  async copyAddressToClipboard(address: string) {
    try {
      await navigator.clipboard.writeText(address)
    } catch (e) {}
  }

  navigateToExplorer(address: string) {
    const url = `https://etherscan.io/tx/${address}`
    window.open(url)
  }

  stringTruncate(str: string, zeroIndexTo: number, endIndexMinus: number): string {
    return str ? str.slice(0, zeroIndexTo) + '...' + str.slice(str.length - endIndexMinus, str.length) : ''
  }
}
