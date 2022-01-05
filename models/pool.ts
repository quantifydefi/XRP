import { Component, Vue } from 'vue-property-decorator'
import { plainToClass } from 'class-transformer'
import { mapState } from 'vuex'
import { CurvePoolsGQL, UsdPriceGQL, AavePoolGQL } from '~/apollo/main/pools.query.graphql'
import { CurvePool, AavePool, AavePoolPrice } from '~/types/apollo/main/types'
import { Helper } from '~/models/helper'
// import { PriceOracleAsset, Reserve } from '~/types/apollo/aaveV2/types'
import { RAY_UNITS, SECONDS_PER_YEAR } from '~/constants/utils'

@Component({
  name: 'CurvePools',
  apollo: {
    curvePools: {
      prefetch: false,
      query: CurvePoolsGQL,
      deep: false,
      result({ loading }) {
        this.isPoolsLoading = loading
      },
      watchLoading(isLoading) {
        this.loading = isLoading
      },
    },
  },
})
export class CurvePools extends Vue {
  curvePools: CurvePool[] = []
  cols = [
    {
      text: 'Pool',
      align: 'start',
      value: 'pool',
      class: ['px-2', 'text-truncate'],
      // cellClass: ['px-2', 'text-truncate'],
      // width: '35%',
    },

    {
      text: 'Base vAPY',
      align: 'start',
      value: 'baseAPY',
      class: ['px-2', 'text-truncate'],
      cellClass: ['px-2', 'text-truncate'],
    },

    {
      text: 'Rewards tAPR',
      align: 'start',
      value: 'rewards',
      class: ['px-2', 'text-truncate'],
      cellClass: ['px-2', 'text-truncate'],
    },

    {
      text: 'Liquidity, USD',
      align: 'start',
      value: 'liquidityUsd',
      class: ['px-2', 'text-truncate'],
      cellClass: ['px-2', 'text-truncate'],
    },

    {
      text: 'Daily Volume, USD',
      align: 'start',
      value: 'dailyVolume',
      class: ['px-2', 'text-truncate'],
      cellClass: ['px-2', 'text-truncate'],
    },

    {
      text: 'Token Balance',
      align: 'start',
      value: 'totalBalance',
      class: ['px-2', 'text-truncate'],
      cellClass: ['px-2', 'text-truncate'],
    },

    {
      text: 'Fee',
      align: 'start',
      value: 'fee',
      class: ['px-2', 'text-truncate'],
      cellClass: ['px-2', 'text-truncate'],
    },

    {
      text: '',
      align: 'right',
      value: 'link',
      class: ['px-2', 'text-truncate'],
      width: 40,
      cellClass: ['px-2', 'text-truncate'],
    },

    {
      text: '',
      align: 'right',
      value: 'action',
      class: ['px-2', 'text-truncate'],
      cellClass: ['px-2', 'text-truncate'],
    },
  ]

  isPoolsLoading = true

  valueFormatter(value: number, maximumSignificantDigits: number = 6, minimumSignificantDigits: number = 6): string {
    return new Intl.NumberFormat('en', {
      maximumSignificantDigits,
      minimumSignificantDigits,
    }).format(value)
  }

  setAltImg(event: any) {
    return Helper.setAltImg(event)
  }

  async copyAddressToClipboard(address: string) {
    try {
      await navigator.clipboard.writeText(address)
    } catch (e) {}
  }

  navigateToExplorer(address: string) {
    const url = `https://etherscan.io/address/${address}`
    window.open(url)
  }

  invest(poolAddress: string) {
    const pool: CurvePool | undefined = this.curvePools?.find((elem) => elem.id === poolAddress)
    console.log(poolAddress, pool)
  }
}

class AavePoolCl implements AavePool {
  aEmissionPerSecond!: string
  availableLiquidity!: string
  decimals!: number
  id!: string
  liquidityRate!: string
  name!: string
  price!: AavePoolPrice
  sEmissionPerSecond!: string
  stableBorrowRate!: string
  symbol!: string
  totalATokenSupply!: string
  totalCurrentVariableDebt!: string
  totalLiquidity!: string
  totalPrincipalStableDebt!: string
  underlyingAsset!: string
  utilizationRate!: string
  vEmissionPerSecond!: string
  variableBorrowRate!: string
  usdPrice: number = 0

  get depositAPR(): number {
    return parseFloat(this.liquidityRate) / RAY_UNITS
  }

  get depositAPY(): number {
    return (1 + this.depositAPR / SECONDS_PER_YEAR) ** SECONDS_PER_YEAR - 1
  }

  get stableBorrowAPR(): number {
    return parseFloat(this.stableBorrowRate) / RAY_UNITS
  }

  get stableBorrowAPY(): number {
    return (1 + this.stableBorrowAPR / SECONDS_PER_YEAR) ** SECONDS_PER_YEAR - 1
  }

  get variableBorrowAPR(): number {
    return parseFloat(this.variableBorrowRate) / RAY_UNITS
  }

  get variableBorrowAPY(): number {
    return (1 + this.variableBorrowAPR / SECONDS_PER_YEAR) ** SECONDS_PER_YEAR - 1
  }

  get tokenBalance(): number {
    return parseFloat(this.totalLiquidity) / 10 ** this.decimals
  }

  get usdBalance(): number {
    return this.tokenBalance * this.usdPrice
  }

  get totalBorrowBalance() {
    return (
      parseFloat(this.totalCurrentVariableDebt) / 10 ** this.decimals +
      parseFloat(this.totalPrincipalStableDebt) / 10 ** this.decimals
    )
  }

  get totalBorrowBalanceUsd() {
    return this.totalBorrowBalance * this.usdPrice
  }

  get availableLiquidityBalance() {
    return parseFloat(this.availableLiquidity) / 10 ** this.decimals
  }

  get availableLiquidityUsd() {
    return this.availableLiquidityBalance * this.usdPrice
  }

  get reserveSizeUsd() {
    return this.totalBorrowBalanceUsd + this.availableLiquidityUsd
  }

  get utilizationRatePtc() {
    return parseFloat(this.utilizationRate) * 100
  }
}

@Component({
  name: 'AavePools',
  computed: {
    ...mapState({
      chainId: (state: any) => state.configs.currentChain.chainId,
    }),
  },
  apollo: {
    aavePools: {
      prefetch: false,
      query: AavePoolGQL,
      deep: false,
      variables() {
        return {
          chainId: this.chainId,
        }
      },
      result({ loading }) {
        this.isPoolsLoading = loading
      },
      update: ({ aavePools }) => {
        return plainToClass(AavePoolCl, aavePools as AavePool[])
      },
      watchLoading(isLoading) {
        this.loading = isLoading
      },
    },
    recentPrices: {
      prefetch: false,
      query: UsdPriceGQL,
      deep: false,
    },
  },
})
export class AavePools extends Vue {
  aavePools: AavePoolCl[] = []
  recentPrices: { [k: string]: number } = {}

  config = {
    cols: [
      {
        text: 'Assets',
        align: 'left',
        value: 'symbol',
        width: '250',
        class: ['px-2', 'text-truncate'],
        cellClass: ['px-2', 'text-truncate'],
      },
      {
        text: 'Token Balance',
        align: 'left',
        value: 'tokenBalance',
        class: ['px-2', 'text-truncate'],
        cellClass: ['px-2', 'text-truncate'],
      },

      {
        text: 'Balance, USD',
        align: 'left',
        value: 'usdBalance',
        class: ['px-2', 'text-truncate'],
        cellClass: ['px-2', 'text-truncate'],
      },

      {
        text: 'Borrow Balance',
        align: 'left',
        value: 'totalBorrowBalance',
        class: ['px-2', 'text-truncate'],
        cellClass: ['px-2', 'text-truncate'],
      },

      {
        text: 'Borrow Balance, USD',
        align: 'left',
        value: 'totalBorrowBalanceUsd',
        class: ['px-2', 'text-truncate'],
        cellClass: ['px-2', 'text-truncate'],
      },

      {
        text: 'Deposit APY',
        align: 'center',
        value: 'depositAPY',
        class: ['px-2', 'text-truncate'],
        cellClass: ['px-2', 'text-truncate'],
      },
      {
        text: 'Variable Borrow APY',
        align: 'center',
        value: 'variableBorrowAPY',
        class: ['px-2', 'text-truncate'],
        cellClass: ['px-2', 'text-truncate'],
      },
      {
        text: 'Stable Borrow APY',
        align: 'center',
        value: 'stableBorrowAPY',
        class: ['px-2', 'text-truncate'],
        cellClass: ['px-2', 'text-truncate'],
      },

      {
        text: '',
        align: 'right',
        value: 'link',
        sortable: false,
        class: ['px-2', 'text-truncate'],
        cellClass: ['px-2', 'text-truncate'],
      },
    ],
  }

  isPoolsLoading = true

  get aaveMainPoolsFiltered() {
    const poolFilter = this.aavePools.filter((elem: AavePoolCl) => {
      return !(elem.symbol.startsWith('Amm') || elem.symbol.startsWith('Lp'))
    })
    poolFilter.forEach((elem: AavePoolCl) => {
      elem.usdPrice = this.recentPrices[elem.symbol] || 0
      elem.name = elem.symbol === 'WETH' ? 'Ethereum' : elem.name
      elem.symbol = elem.symbol === 'WETH' ? 'ETH' : elem.symbol
    })

    return poolFilter
  }

  valueFormatter(value: number, maximumSignificantDigits: number = 6, minimumSignificantDigits: number = 6): string {
    return new Intl.NumberFormat('en', {
      maximumSignificantDigits,
      minimumSignificantDigits,
    }).format(value)
  }

  setAltImg(event: any) {
    return Helper.setAltImg(event)
  }

  async copyAddressToClipboard(address: string) {
    try {
      await navigator.clipboard.writeText(address)
    } catch (e) {}
  }

  navigateToExplorer(address: string) {
    const url = `https://etherscan.io/address/${address}`
    window.open(url)
  }
}
