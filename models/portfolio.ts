/* eslint-disable camelcase */
import 'reflect-metadata'
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { plainToClass } from 'class-transformer'
import { BalancesGQL } from '~/apollo/main/portfolio.query.graphql'
import { Balance, BalanceItem, Chain } from '~/types/apollo/main/types'

export class ChainItem implements Chain {
  chainId!: number
  geckoId!: string
  isTestNet!: boolean
  label!: string
  logoUrl!: string
  name!: string
  symbol!: string

  get id() {
    return this.chainId
  }
}

@Component({
  computed: {
    ...mapState({
      chains: (state: any) => state.configs.chains,
      walletAddress: (state: any) => state.wallet.address,
      isWalletConnected: (state: any) => state.wallet.isWalletConnected,
    }),
  },
})
export class Portfolio extends Vue {
  chains!: ChainItem[]
  walletAddress!: string
  isWalletConnected!: boolean

  get mainNetChains(): ChainItem[] {
    return this.chains.filter((elem) => {
      return !elem.isTestNet
    })
  }

  get testNetChains(): ChainItem[] {
    return this.chains.filter((elem) => {
      return elem.isTestNet
    })
  }
}

export class PortfolioBalance implements Balance {
  address!: string
  chainId!: number
  items!: Array<BalanceItem>
  nextUpdateAt!: string
  quoteCurrency!: string
  updatedAt!: string

  get chainTotalBalance() {
    return this.items.reduce((n, { quote }) => n + quote, 0)
  }

  chainInfo(chains: Chain[]): Chain | null {
    const chain: Chain | undefined = chains.find((elem) => elem.chainId === this.chainId)
    if (chain) {
      return chain
    } else return null
  }
}

@Component({
  apollo: {
    balances: {
      prefetch: false,
      query: BalancesGQL,
      deep: false,
      variables() {
        return {
          chainIds: this.configs.selectedMainNets,
          address: this.walletAddress,
        }
      },
      update: (data) => {
        const balances: PortfolioBalance[] = plainToClass(PortfolioBalance, data.balances as PortfolioBalance[])
        return balances.sort((a, b) => {
          return a.chainId - b.chainId
        })
      },
      // Optional result hook
      result({ loading, data }) {
        console.log(loading, data)
        this.configs.balanceLoading = loading
      },
      watchLoading(isLoading) {
        this.loading = isLoading
      },
    },
  },
})
export class BalancesPortfolio extends Portfolio {
  balances: PortfolioBalance[] = []
  walletAddress!: string
  loading = false

  configs = {
    // loading
    balanceLoading: true as boolean,

    // toggle Flags
    toggleMainNetworks: false,
    toggleTestNetworks: false,

    selectedMainNets: [1, 56, 137, 43114, 250],
    cols: [
      {
        text: 'Token',
        align: 'start',
        value: 'contractTickerSymbol',
        class: 'px-2',
        width: 60,
      },
      {
        text: 'Balance',
        align: 'start',
        value: 'balance',
        class: 'px-2',
        width: 80,
      },
      {
        text: 'Price',
        align: 'start',
        value: 'quoteRate',
        class: 'px-2',
        width: 80,
      },
      {
        text: 'Value',
        align: 'start',
        value: 'quote',
        class: 'px-2',
        width: 90,
      },
    ],
    gridHeight: 435 as number,
    numberOfRows: '4',
    numOfRowsOptions: [
      { icon: 'mdi-curtains-closed', col: '6' },
      { icon: 'mdi-view-week', col: '4' },
    ],
  }

  get selectedChainIds() {
    return this.chains.map((obj) => {
      return obj.chainId
    })
  }

  get totalBalance() {
    return this.balances.reduce((n, { chainTotalBalance }) => n + chainTotalBalance, 0)
  }

  check() {
    console.log(this.balances, this.totalBalance)
    this.$apollo.queries.balances.refresh()
  }
}
