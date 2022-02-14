import 'reflect-metadata'
import { plainToClass } from 'class-transformer'
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { TransactionsGQL, TransactionLogEventsGQL } from '@/apollo/main/portfolio.query.graphql'
import { ChainlinkEthUsdPriceGQL } from '@/apollo/main/config.query.graphql'
import { ChainItem } from '~/models/portfolio'
import { LogEvent, Transaction, Token } from '~/types/apollo/main/types'
import { Helper } from '~/models/helper'

export class TransactionItem implements Transaction {
  blockHash!: string
  blockNumber!: string
  confirmations!: string
  contractAddress!: string
  cumulativeGasUsed!: string
  from!: string
  function!: string
  gas!: string
  gasPrice!: string
  gasUsed!: string
  hash!: string
  input!: string
  isError!: string
  methodId!: string
  nonce!: string
  timeStamp!: string
  to!: string
  tokenTo!: Token
  transactionIndex!: string
  txreceiptStatus!: string
  value!: string

  get txnFee() {
    return (+this.gasPrice / 10 ** 18) * +this.gasUsed
  }

  get method() {
    return this.function
      .replace(/ *\([^)]*\) */g, '') // removes the params after function name
      .replace(/[^a-zA-Z0-9 ]/g, '') // removes special characters
      .replace(/([A-Z](?=[a-z]+)|[A-Z]+(?![a-z]))/g, ' $1') // puts a space between camel case string
      .trim()
  }
}

@Component({
  computed: {
    ...mapState({
      ui: (state: any) => state.ui,
      theme: (state: any) => state.ui.theme,
      isWalletConnected: (state: any) => state.wallet.isWalletConnected,
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
          // address: this.walletAddress,
          address: '0x66A51330b37938f414cBf09ebd2E1eB9c70051A1',
          pageNumber: 0,
          pageSize: 500,
        }
      },
      result({ loading }) {
        this.isTransactionsLoading = loading
      },
      update: (data) => {
        return plainToClass(TransactionItem, data.transactions as TransactionItem[])
      },
      watchLoading(isLoading) {
        this.isTransactionsLoading = isLoading
      },
    },
    transactionLogEventsDetails: {
      prefetch: false,
      query: TransactionLogEventsGQL,
      variables() {
        return {
          chainId: this.currentChain.chainId,
          txHash: this.transactionHash,
        }
      },
      result({ loading }) {
        this.isLogEventLoading = loading
      },
      update: (data) => {
        return data.transactionLogEvents
      },
      watchLoading(isLoading) {
        this.isLogEventLoading = isLoading
      },
    },
  },
})
export default class Transactions extends Vue {
  isTransactionsLoading = true
  isLogEventLoading = true
  ethUsdPrice!: number
  walletAddress!: string
  isWalletConnected!: boolean
  currentChain!: ChainItem
  readonly transactions!: TransactionItem[]
  readonly transactionLogEventsDetails!: LogEvent[]
  transactionHash = ''

  methodList = ['transfer', 'withdraw', 'deposit']

  onExpandButtonClick(expand: any, txHash: string) {
    expand(true)
    this.transactionHash = txHash
  }

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
      value: 'method',
      class: 'py-2',
    },
    {
      text: 'Txn Hash',
      align: 'start',
      value: 'hash',
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
      width: 140,
    },
    {
      text: '',
      value: 'data-table-expand',
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
      value: 'txnFee',
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

  /**
   * Truncates a string
   * @param str string
   * @param zeroIndexTo number
   * @param endIndexMinus number
   * @returns string
   ***/
  stringTruncate(str: string, zeroIndexTo: number, endIndexMinus: number): string {
    return str ? str.slice(0, zeroIndexTo) + '...' + str.slice(str.length - endIndexMinus, str.length) : ''
  }

  /**
   * Sets an alternate image if image src encounters an error
   * @param event
   ***/
  setAltImg(event: Event): void {
    return Helper.setAltImg(event)
  }
}
