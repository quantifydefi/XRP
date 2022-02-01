/* eslint-disable camelcase */
import 'reflect-metadata'
import { Component, Vue } from 'vue-property-decorator'
import { mapGetters, mapState } from 'vuex'
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
    }),
    ...mapGetters({ chainInfo: 'configs/chainInfo' }),
  },
})
export class Portfolio extends Vue {
  chains!: ChainItem[]
  chainInfo!: (number: number) => Chain | null

  get mainNetChains(): ChainItem[] {
    return this.chains.filter((elem) => !elem.isTestNet)
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

  /**
   * Balances more than 0
   * */
  get filteredItems() {
    return this.items.filter((el) => el.quote > 0)
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
      result({ loading }) {
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
  loading = false
  configs = {
    // loading
    balanceLoading: true as boolean,

    // toggle Flags
    toggleMainNetworks: false,
    toggleTestNetworks: false,

    selectedMainNets: [1, 56, 137, 250],
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
    gridHeight: 450 as number,
    numberOfRows: '6',
    numOfRowsOptions: [
      { icon: 'mdi-curtains-closed', col: '6' },
      { icon: 'mdi-view-week', col: '4' },
    ],
  }

  get totalBalance() {
    return this.balances.reduce((n, { chainTotalBalance }) => n + chainTotalBalance, 0)
  }

  get chartData(): { category: string; value: number; breakdown: Record<string, any> }[] {
    const chartData: { category: string; value: number; breakdown: Record<string, any> }[] = []
    this.balances.forEach((elem) => {
      const breakDown: { category: string; value: number }[] = []
      elem.items.forEach((bal) => {
        const val = bal.quote
        if (val > 1 / 10 ** 6) {
          breakDown.push({ category: `${bal.contractTickerSymbol.slice(0, 16)}`, value: val })
        }
      })
      const info = this.chainInfo(elem.chainId)
      if (info) {
        chartData.push({
          category: info.name,
          value: elem.chainTotalBalance,
          breakdown: breakDown.sort((a, b) => (a.value < b.value ? 1 : -1)),
        })
      }
    })
    return chartData
  }
}
