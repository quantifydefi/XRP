import { Component, Ref, Vue } from 'vue-property-decorator'
import { plainToClass } from 'class-transformer'
import { mapState } from 'vuex'
import { AavePoolGQL, CurvePoolsGQL } from '~/apollo/main/pools.query.graphql'
import { AaveAddress, AavePool, AavePoolPrice, AavePortfolio, CurvePool } from '~/types/apollo/main/types'
import { Helper } from '~/models/helper'
import { RAY_UNITS, SECONDS_PER_YEAR } from '~/constants/utils'
import { aaveActions, aaveActionTypes, AavePoolAction } from '~/models/web3'
import { Events } from '~/types/global'

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
  readonly curvePools: CurvePool[] = []
  readonly cols = [
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

export class AavePoolCl implements AavePool {
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
  addresses!: AaveAddress
  portfolio!: AavePortfolio
  usdPrice!: number
  baseLTVasCollateral!: string
  reserveLiquidationBonus!: string
  reserveLiquidationThreshold!: string
  totalLiquidityAsCollateral!: string
  usageAsCollateralEnabled!: boolean

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

  get loanToValue() {
    return parseFloat(this.baseLTVasCollateral) / 100
  }

  get liquidationThreshold() {
    return parseFloat(this.reserveLiquidationThreshold) / 100
  }

  get liquidationPenalty() {
    return parseFloat(this.reserveLiquidationBonus) / 100 - 100
  }

  get logoUrl() {
    return `https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${this.symbol.toLowerCase()}.png`
  }
}

@Component({
  name: 'AavePools',
  computed: {
    ...mapState({
      chainId: (state: any) => state.configs.currentChain.chainId,
      userWalletAddress: (state: any) => state.wallet.address,
    }),
  },
  apollo: {
    aavePools: {
      fetchPolicy: 'cache-and-network',
      // pollInterval: 60000,
      deep: false,
      query: AavePoolGQL,
      variables() {
        return {
          chainId: this.chainId,
          userWallet: this.userWalletAddress || '',
        }
      },
      update: ({ aavePools }) => plainToClass(AavePoolCl, aavePools as AavePool[]),
    },
  },
})
export class AavePools extends Vue {
  @Ref('poolAction') readonly poolAction!: AavePoolAction
  readonly aavePools: AavePoolCl[] = []
  readonly aaveActions = aaveActions

  readonly config = {
    cols: [
      {
        text: 'Assets',
        align: 'left',
        value: 'symbol',
        width: '230',
        class: ['px-2', 'text-truncate'],
        cellClass: ['px-2', 'text-truncate'],
      },

      {
        text: 'Your Balance',
        align: 'left',
        value: 'walletTokenBal',
        class: ['px-2', 'text-truncate'],
        cellClass: ['px-2', 'text-truncate'],
      },

      {
        text: 'Your Deposits',
        align: 'left',
        value: 'deposits',
        class: ['px-2', 'text-truncate'],
        cellClass: ['px-2', 'text-truncate'],
      },

      {
        text: 'Your Borrows',
        align: 'left',
        value: 'borrows',
        class: ['px-2', 'text-truncate'],
        cellClass: ['px-2', 'text-truncate'],
      },

      {
        text: '',
        value: 'action',
        width: 300,
        sortable: false,
        class: ['px-2', 'text-truncate'],
        cellClass: ['px-2', 'text-truncate'],
      },

      // {
      //   text: 'Your Balance USD',
      //   align: 'left',
      //   value: 'walletTokenBalUsd',
      //   class: ['px-2', 'text-truncate'],
      //   cellClass: ['px-2', 'text-truncate'],
      // },

      // {
      //   text: 'Token Balance',
      //   align: 'left',
      //   value: 'tokenBalance',
      //   class: ['px-2', 'text-truncate'],
      //   cellClass: ['px-2', 'text-truncate'],
      // },

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
        text: 'Balance, USD',
        align: 'left',
        value: 'usdBalance',
        class: ['px-2', 'text-truncate'],
        cellClass: ['px-2', 'text-truncate'],
      },

      // {
      //   text: 'Borrow Balance',
      //   align: 'left',
      //   value: 'totalBorrowBalance',
      //   class: ['px-2', 'text-truncate'],
      //   cellClass: ['px-2', 'text-truncate'],
      // },

      {
        text: 'Borrow Balance, USD',
        align: 'center',
        value: 'totalBorrowBalanceUsd',
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

  /** Filtered AAve pools, exclude AMM and LP assets */
  get aaveMainPoolsFiltered() {
    return this.aavePools.filter((elem: AavePoolCl) => !(elem.symbol.startsWith('Amm') || elem.symbol.startsWith('Lp')))
  }

  get isPoolsLoading() {
    return this.$apollo.queries.aavePools.loading
  }

  async transactionResult(status: 'error' | 'success') {
    if (status === 'success') {
      // await this.$apollo.queries.aavePools.stop()
      // await this.$apollo.queries.aavePools.start()
      await this.$apollo.queries.aavePools.refetch()
    }
  }

  /**  Sum of deposits of all the pools with usageAsCollateralEnabled flag in USD */
  get totalCollateral(): number {
    const collateralPools = this.aaveMainPoolsFiltered.filter((elem) => elem.usageAsCollateralEnabled)
    return collateralPools.reduce((a, b) => a + b.usdPrice * b.portfolio.totalDeposits, 0)
  }

  /** Sum of all the  borrowed assets in user wallet */
  get totalBorrowed(): number {
    return this.aaveMainPoolsFiltered.reduce((a, b) => a + b.usdPrice * b.portfolio.variableBorrow, 0)
  }

  /** When H f < 1 the position may be liquidated to maintain solvency as described in the diagram below. */
  get healthFactor(): number {
    const collateralPools = this.aaveMainPoolsFiltered.filter((elem) => elem.usageAsCollateralEnabled)
    const collateralOnLiqThreshold = collateralPools.reduce(
      (a, b) => a + (b.usdPrice * b.portfolio.totalDeposits * b.liquidationThreshold) / 100,
      0
    )

    return collateralOnLiqThreshold / this.totalBorrowed || 0
  }

  /**
   * The Loan to Value (LTV) ratio defines the maximum amount of currency that can be borrowed with a specific collateral.
   * It’s expressed in percentage: at LTV=75%, for every 1 ETH worth of collateral, borrowers will be able to borrow
   * 0.75 ETH worth of the corresponding currency. Once a borrow is taken, the LTV evolves with market conditions.
   *
   * Max Loan To Value Ratio (sum of oll collateral assets in ethereum multiplied by weighted average LTV constant
   * and divided by total collateral in ETH)
   *
   * https://docs.aave.com/risk/asset-risk/risk-parameters
   * */
  get maxTLV(): number {
    const collateralPools = this.aaveMainPoolsFiltered.filter((elem) => elem.usageAsCollateralEnabled)
    const collateralOnLTV = collateralPools.reduce(
      (a, b) => a + (b.usdPrice * b.portfolio.totalDeposits * b.loanToValue) / 100,
      0
    )
    return (collateralOnLTV / this.totalCollateral) * 100 || 0
  }

  get currentLTV(): number {
    return (this.totalBorrowed / this.totalCollateral) * 100 || 0
  }

  get borrowingPowerUsed() {
    return (this.totalBorrowed * 100) / ((this.totalCollateral * this.liquidationThreshold) / 100)
  }

  get liquidationThreshold(): number {
    const collateralPools = this.aaveMainPoolsFiltered.filter((elem) => elem.usageAsCollateralEnabled)
    const collateralOnLTV = collateralPools.reduce(
      (a, b) => a + (b.usdPrice * b.portfolio.totalDeposits * b.liquidationThreshold) / 100,
      0
    )
    return (collateralOnLTV / this.totalCollateral) * 100 || 0
  }

  get portfolioComposition() {
    const wallet: Record<string, any> = { name: 'Your Wallet Composition', data: [] }
    const deposits: Record<string, any> = { name: 'Deposits Composition', data: [] }
    const borrows: Record<string, any> = { name: 'Borrows Composition', data: [] }

    this.aaveMainPoolsFiltered.forEach((elem) => {
      if (elem.portfolio.walletBal > 0) {
        wallet.data.push({ id: elem.id, name: elem.symbol, value: elem.portfolio.walletBal * elem.usdPrice })
      }
      if (elem.portfolio.totalDeposits > 0) {
        deposits.data.push({ id: elem.id, name: elem.symbol, value: elem.portfolio.totalDeposits * elem.usdPrice })
      }
      if (elem.portfolio.variableBorrow > 0) {
        borrows.data.push({ id: elem.id, name: elem.symbol, value: elem.portfolio.variableBorrow * elem.usdPrice })
      }
    })
    return [wallet, deposits, borrows]
  }

  valueFormatter(value: number, maximumSignificantDigits: number = 6, minimumSignificantDigits: number = 6): string {
    return new Intl.NumberFormat('en', { maximumSignificantDigits, minimumSignificantDigits }).format(value)
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

  async invest(poolAddress: string, action: aaveActionTypes) {
    const pool: AavePoolCl | undefined = this.aavePools.find((elem) => elem.id === poolAddress)
    if (pool) {
      await this.poolAction.init(pool, this.healthFactor, this.totalCollateral, this.totalBorrowed, this.maxTLV, action)
    }
  }

  importToMetamask(poolAddress: string) {
    const pool: AavePoolCl | undefined = this.aavePools.find((elem) => elem.id === poolAddress)
    if (pool) {
      this.$root.$emit(Events.IMPORT_METAMASK_TOKEN, {
        address: pool.underlyingAsset,
        symbol: pool.symbol,
        decimals: pool.decimals,
        image: pool.logoUrl,
      })
    }
  }
}
