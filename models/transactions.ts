import 'reflect-metadata'
import { plainToClass } from 'class-transformer'
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { BigNumber, ethers } from 'ethers'
import { Log, Provider } from '@ethersproject/abstract-provider/lib'
import { LogDescription } from '@ethersproject/abi'
import { ContractInterface } from '@ethersproject/contracts/lib'
import { TransactionsGQL, TransactionLogEventsGQL } from '@/apollo/main/portfolio.query.graphql'
import { ChainlinkEthUsdPriceGQL } from '@/apollo/main/config.query.graphql'
import { ChainItem } from '~/models/portfolio'
import { Transaction, Token } from '~/types/apollo/main/types'
import { Helper } from '~/models/helper'
import { LogEventInterface, Param } from '~/types/transactions'
import { Events } from '~/types/global'
import erc20Abi from '~/constracts/abi/erc20Abi.json'

declare const window: any

export class LogEvent implements LogEventInterface {
  name!: string
  address!: string
  symbol!: string
  decimals?: number
  function!: string
  signature!: string
  methodId!: string
  params!: Param[]
}

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
      fetchPolicy: 'cache-and-network',
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
          txHash: '',
        }
      },
      update: (data) => {
        return data.transactionLogEvents
      },
    },
  },
})
export default class Transactions extends Vue {
  provider: Provider | null = null
  isCopied = false
  isTransactionsLoading = true
  isLogEventLoading = true
  ethUsdPrice!: number
  walletAddress!: string
  isWalletConnected!: boolean
  transactionLogEventsDetails!: any
  currentChain!: ChainItem
  transactions: TransactionItem[] = []

  transactionHash = ''
  logEvents: LogEvent[] = []

  readonly methodList = [
    'transfer',
    'withdraw',
    'withdrawal',
    'deposit',
    'approval',
    'approvalforall',
    'redeem',
    'reflinkrewards',
    'swap',
  ]

  readonly excludeMethod = ['cancel order', '60806040', '600d8060', '1aa3a008', 'redeem', 'commit', 'echo']

  readonly methodSignatureMap = {
    '60806040': 'Contract Created',
    '600d8060': 'Contract Created',
    '4e71d92d': 'Claim',
    '6a068b13': 'Claim',
    '93a750cc': 'Claim',
    d0e30db0: 'Deposit',
    '1aa3a008': 'Register',
    '3ccfd60b': 'Withdraw',
    '3d18b912': 'Get Reward',
    e9fad8ee: 'Exit',
    cff410b4: 'Exit',
    de1b0992: 'Mint Opensale',
    fd0f65a4: 'Get Approved To Free Mint',
    a0bd0d90: 'Claim Tokens',
    d25acb2e: 'Mint Ape',
    ddd81f82: 'Register Proxy',
    c18766c0: 'Apply Signed With Attribute And Permit',
    '050da5c6': 'Open Mint Redeem',
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

  /**
   * Converts ETH Price to USD
   * @param amount number
   * @returns number
   ***/
  calculateEthUsdPrice(amount: number): number {
    return this.ethUsdPrice * amount
  }

  /**
   * On Datatable row double click, expand row and fetch transaction event log
   ***/
  async onDoubleClickRow(_: Event, item: any): Promise<void> {
    if (
      item.item.isError === '0' &&
      item.item.input.length > 3 &&
      !this.excludeMethod.includes(this.cleanMethodSignature(item.item.function)) &&
      !this.excludeMethod.includes(item.item.input.substring(2, 10))
    ) {
      item.expand(!item.isExpanded)
      await this.fetchEventLogs(item.item.hash)
    }
  }

  /**
   * On Datatable row double click, expand row and fetch transaction event log
   ***/
  async onExpandButtonClick(expand: any, isExpanded: boolean, txHash: string): Promise<void> {
    expand(isExpanded)
    this.transactionHash = txHash

    await this.fetchEventLogs(txHash)
  }

  /**
   * Copies address to clipboard
   * @param address string
   ***/
  async copyAddressToClipboard(address: string) {
    try {
      await navigator.clipboard.writeText(address)
      this.isCopied = true
      setTimeout(() => {
        this.isCopied = false
      }, 1000)
    } catch (e) {}
  }

  /**
   * Opens a new browser tab to view transactions on etherscan
   * @param address string
   ***/
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

  /**
   * Returns log events from raw transaction receipt
   * @param {string} txnHash
   * @returns {Promise<Log[]>}
   ***/
  private async _getEventLogs(txnHash: string): Promise<Log[]> {
    try {
      const tx = await this.provider!.waitForTransaction(txnHash)
      return tx.logs
    } catch (err: any) {
      this.$nuxt.$emit(Events.GLOBAL_NOTIFICATION, { text: err.message })
      return []
    }
  }

  /**
   * Returns contract's basic information
   * @param {string} txnHash
   * @param {ContractInterface} abi
   * @param {any} provider
   * @return  {Promise<{ name: string; symbol: string; decimals: number }>}
   ***/
  private async _getContractInfo(
    address: string,
    abi: ContractInterface,
    provider: Provider
  ): Promise<{ name: string; symbol: string; decimals: number }> {
    const contract = new ethers.Contract(address, abi, provider)

    const contractInfo = {
      name: '',
      symbol: '',
      decimals: 0,
    }

    try {
      contractInfo.name = await contract.name()
      contractInfo.symbol = await contract.symbol()
    } catch (err) {}

    /**
     * Separating decimals on another try catch because some contracts have
     * name and symbols but no decimals. (like ERC-721)
     * @see https://docs.openzeppelin.com/contracts/3.x/erc721
     **/
    try {
      // this is why metamask is showing error on console because the contract does not have decimals
      contractInfo.decimals = await contract.decimals()
    } catch (err) {}

    return contractInfo
  }

  /**
   * Fetches Transaction Log Events from our graphql backend that interfaces with Covalent API,
   * and formats it to same schema as LogEvent
   * @param {string} txnHash
   * @return {Promise<LogEvent[]>}
   ***/
  private async _fetchLogEventsFromCovalent(txHash: string): Promise<LogEvent[]> {
    const events = []
    await this.$apollo.queries.transactionLogEventsDetails.refetch({ txHash })
    if (this.transactionLogEventsDetails.length > 0) {
      for (const i in this.transactionLogEventsDetails) {
        const decoded: LogEvent = {
          name: '',
          symbol: this.transactionLogEventsDetails[i].senderContractTickerSymbol,
          decimals: this.transactionLogEventsDetails[i].senderContractDecimals || 0,
          address: this.transactionLogEventsDetails[i].senderAddress,
          function: this.transactionLogEventsDetails[i].decoded.name,
          methodId: '',
          signature: '',
          params: this.transactionLogEventsDetails[i].decoded.params,
        }

        events.push(decoded)
      }
    }

    return events
  }

  /**
   * Fetches Transaction Log Events
   * @param {string} txnHash
   ***/
  async fetchEventLogs(txnHash: string): Promise<void> {
    this.isLogEventLoading = true
    const logs = await this._getEventLogs(txnHash)

    const events: LogEvent[] = []

    try {
      for (const i in logs) {
        const contractAddress = logs[i].address
        const contractInfo = await this._getContractInfo(logs[i].address, erc20Abi, this.provider!)

        const contractAbi: string = await this.$store.dispatch('transactions/getContractAbi', {
          contractAddress,
        })

        const iface = new ethers.utils.Interface(contractAbi)
        const decodedInput: LogDescription = iface.parseLog({ topics: logs[i].topics, data: logs[i].data })

        const params: Param[] = []
        const input = decodedInput.eventFragment.inputs
        for (const j in input) {
          const param = {
            name: input[j].name,
            type: input[j].type,
            value: '',
          }

          const value = decodedInput.args[param.name]

          if (typeof value === 'object') {
            param.value = BigNumber.from(value._hex).toString()
          } else {
            param.value = value
          }

          params.push(param)
        }

        const decoded: LogEvent = {
          ...contractInfo,
          address: logs[i].address,
          function: decodedInput.name,
          signature: decodedInput.signature,
          methodId: decodedInput.topic.substring(2, 10),
          params,
        }

        events.push(decoded)

        this.logEvents = plainToClass(LogEvent, events as LogEvent[])
      }
    } catch (err) {
      const events = await this._fetchLogEventsFromCovalent(txnHash)
      this.logEvents = plainToClass(LogEvent, events as LogEvent[])
    }

    this.isLogEventLoading = false
  }

  /**
   * Filters out function params and returns only function name
   * @param signature string
   ***/
  cleanMethodSignature(signature: string): string {
    return (
      signature
        .replace(/ *\([^)]*\) */g, '')
        .replace(/[^a-zA-Z0-9 ]/g, '')
        .replace(/([A-Z](?=[a-z]+)|[A-Z]+(?![a-z]))/g, ' $1')
        .trim()
        .toLowerCase() || ''
    )
  }

  mounted() {
    try {
      this.provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    } catch (e) {
      console.log(e)
    }
  }
}
