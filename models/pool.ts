import { Component, Ref, Vue, Watch } from 'vue-property-decorator'
import { plainToClass, Type } from 'class-transformer'
import { mapState } from 'vuex'
import { ethers, Signer } from 'ethers'
import { AavePoolGQL, CurvePoolsGQL } from '~/apollo/main/pools.query.graphql'
import {
  AaveAddress,
  AavePool,
  AavePoolPrice,
  CurvePool,
  CurveAddresses,
  CoingeckoInfo,
  CurveCoin,
  LpTokenInfo,
  PageMetaData,
  CurveRewards,
} from '~/types/apollo/main/types'
import { Helper } from '~/models/helper'
import { RAY_UNITS, SECONDS_PER_YEAR } from '~/constants/utils'
import { aaveActions, actionTypes, AavePoolAction, CurvePoolAction, curveActions } from '~/models/web3'
import { Events } from '~/types/global'
import erc20Abi from '~/constracts/abi/erc20Abi.json'
declare const window: any

interface PortfolioCompositionInterface {
  name: string
  data: { id: string; name: string; value: number }[]
}

export class CurveCoinCl implements CurveCoin {
  ID!: string
  address!: string
  coingeckoId!: string
  decimals!: number
  liquidity!: number
  symbol!: string
  tokenBalance!: number
  type!: string
  usdPrice!: number
  wrappedCoinType!: string
  isLpToken!: boolean
  walletBalance: number = 0
  get image() {
    return `https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${this.symbol.toLowerCase()}.png`
  }

  get amount() {
    return new Intl.NumberFormat('en').format(this.inputVal.value)
  }

  set amount(value: string) {
    if (value && value.length > 0) {
      const num = parseFloat(value.replace(/,/g, ''))
      if (!isNaN(num)) {
        this.inputVal.value = parseFloat(value.replace(/,/g, ''))
      } else this.inputVal.value = 0
    } else this.inputVal.value = 0
  }

  inputVal = {
    approvedToSpend: 0 as number,
    value: 0 as number,
    hidden: true as boolean,
    disabled: false as boolean,
    placeholder: 'Number Of tokens',
    rules: {
      mustBeNumber: (v: string) => !isNaN(parseFloat(v)) || 'Must be Number',
    },
  }
}

export class CurvePoolCl implements CurvePool {
  ID!: string
  addresses!: CurveAddresses
  adminFee!: string
  assetType!: string
  assets!: string
  baseAPY!: number
  coingeckoInfo!: CoingeckoInfo

  @Type(() => CurveCoinCl)
  coins!: CurveCoinCl[]

  isMetaPool!: boolean

  @Type(() => CurveCoinCl)
  metaCoins!: CurveCoinCl[]

  dataIndex!: number
  fee!: string
  hasAMultiplier!: boolean
  idAlias!: string
  isLendingPool!: boolean
  isOldPool!: boolean
  lpTokenInfo!: LpTokenInfo
  name!: string
  pageMetaData!: PageMetaData
  rewards!: CurveRewards
  totalDailyVolume!: number
  totalLiquidity!: number
  totalTokenBalance!: number

  @Type(() => CurveCoinCl)
  underlyingCoins!: CurveCoinCl[]

  virtualPrice!: string
  depositWrapped: boolean = true
  lpBalance: number = 0
  lpBalanceToWithdraw: number = 0

  resetCoinValues() {
    this.coins.forEach((coin) => {
      coin.inputVal.value = 0
      coin.inputVal.approvedToSpend = 0
    })
    this.metaCoins.forEach((coin) => {
      coin.inputVal.value = 0
      coin.inputVal.approvedToSpend = 0
    })
    this.lpBalanceToWithdraw = 0
  }

  async calculateBalance(signer: Signer) {
    try {
      const poolLPContract = new ethers.Contract(this.addresses.lpToken, erc20Abi, signer)
      const walletAddress = await signer.getAddress()
      const lpBal = await poolLPContract.balanceOf(walletAddress)
      const bal = parseInt(lpBal, 10) / 10 ** 18
      this.lpBalance = bal
      return bal
    } catch (e) {
      console.log('LP BAL ERROR', e)
      return 0
    }
  }

  /*  get formattedCoins(): CurveCoinCl[] {
    // Use regular coins if pool is not metaPool
    if (!this.isMetaPool) {
      return this.coins
    }
    if (this.isMetaPool) {
      if (!this.depositWrapped) {
        const coins: CurveCoinCl[] = []
        this.coins.forEach((coin) => {
          if (coin.symbol !== '3Crv') {
            coins.push(coin)
          }
        })
        this.metaCoins.forEach((coin) => {
          coins.push(coin)
        })
        return coins
      } else return this.coins
    } else return []
  } */
}

@Component({
  name: 'CurvePools',
  apollo: {
    curvePools: {
      fetchPolicy: 'cache-and-network',
      query: CurvePoolsGQL,
      update: ({ curvePools }) => plainToClass(CurvePoolCl, curvePools as CurvePoolCl[]),
    },
  },
})
export class CurvePools extends Vue {
  @Ref('poolAction') readonly poolAction!: CurvePoolAction

  provider: any = null
  signer!: Signer
  readonly curvePools: CurvePoolCl[] = []
  readonly curveActions = curveActions
  readonly cols = [
    {
      text: 'Pool',
      align: 'start',
      value: 'pool',
      width: '450px',
      class: ['px-2', 'text-truncate'],
    },

    {
      text: '',
      align: 'right',
      value: 'action',
      class: ['px-2', 'text-truncate'],
      cellClass: ['px-2', 'text-truncate'],
    },

    {
      text: 'LP Balance',
      align: 'start',
      value: 'lpBalance',
      class: ['px-2', 'text-truncate'],
      cellClass: ['px-2', 'text-truncate'],
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
      text: '',
      align: 'right',
      value: 'link',
      class: ['px-2', 'text-truncate'],
      width: 40,
      cellClass: ['px-2', 'text-truncate'],
    },
  ]

  @Watch('curvePools', { immediate: false })
  async onCurePoolsCHanged() {
    await this._calculateLPBalance()
  }

  async mounted() {
    try {
      this.provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
      this.signer = await this.provider.getSigner()
    } catch (e) {
      console.log(e)
    }
  }

  get isPoolsLoading() {
    return this.$apollo.queries.curvePools.loading
  }

  private async _calculateLPBalance() {
    const promises: any = []
    this.curvePools.forEach((elem) => {
      promises.push(elem.calculateBalance(this.signer))
    })
    await Promise.all(promises)
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

  async invest(poolAddress: string, action: actionTypes) {
    const pool: CurvePoolCl | undefined = this.curvePools?.find((elem) => elem.ID === poolAddress)
    if (pool) {
      await this.poolAction.init(pool, action)
    }
  }
}

export interface AavePortfolio {
  walletBal: number
  totalDeposits: number
  stableBorrow: number
  variableBorrow: number
}

export class AavePoolCl implements AavePool {
  readonly id!: string
  readonly aEmissionPerSecond!: number
  readonly availableLiquidity!: number
  readonly decimals!: number
  readonly liquidityRate!: number
  readonly name!: string
  readonly price!: AavePoolPrice
  readonly sEmissionPerSecond!: number
  readonly stableBorrowRate!: number
  readonly symbol!: string
  readonly totalATokenSupply!: number
  readonly totalCurrentVariableDebt!: number
  readonly totalLiquidity!: number
  readonly totalPrincipalStableDebt!: number
  readonly underlyingAsset!: string
  readonly utilizationRate!: number
  readonly vEmissionPerSecond!: number
  readonly variableBorrowRate!: number
  readonly addresses!: AaveAddress
  private portfolioVal: AavePortfolio = { walletBal: 0, totalDeposits: 0, stableBorrow: 0, variableBorrow: 0 }

  // TODO needs to be removed
  readonly usdPrice!: number

  readonly baseLTVasCollateral!: number
  readonly reserveLiquidationBonus!: number
  readonly reserveLiquidationThreshold!: number
  readonly totalLiquidityAsCollateral!: number
  readonly usageAsCollateralEnabled!: boolean
  readonly borrowingEnabled!: boolean
  readonly stableBorrowRateEnabled!: boolean

  get depositAPR(): number {
    return this.borrowingEnabled ? this.liquidityRate / RAY_UNITS : -1
  }

  get depositAPY(): number {
    return this.borrowingEnabled ? (1 + this.depositAPR / SECONDS_PER_YEAR) ** SECONDS_PER_YEAR - 1 : -1
  }

  get stableBorrowAPR(): number {
    return this.borrowingEnabled && this.stableBorrowRateEnabled ? this.stableBorrowRate / RAY_UNITS : -1
  }

  get variableBorrowAPR(): number {
    return this.borrowingEnabled ? this.variableBorrowRate / RAY_UNITS : -1
  }

  get stableBorrowAPY(): number {
    return this.borrowingEnabled && this.stableBorrowRateEnabled
      ? (1 + this.stableBorrowAPR / SECONDS_PER_YEAR) ** SECONDS_PER_YEAR - 1
      : -1
  }

  get variableBorrowAPY(): number {
    return this.borrowingEnabled ? (1 + this.variableBorrowAPR / SECONDS_PER_YEAR) ** SECONDS_PER_YEAR - 1 : -1
  }

  get tokenBalance(): number {
    return this.totalLiquidity / 10 ** this.decimals
  }

  get usdBalance(): number {
    return this.tokenBalance * this.price.priceUsd
  }

  get totalBorrowBalance() {
    return this.totalCurrentVariableDebt / 10 ** this.decimals + this.totalPrincipalStableDebt / 10 ** this.decimals
  }

  get totalBorrowBalanceUsd() {
    return this.totalBorrowBalance * this.price.priceUsd
  }

  get availableLiquidityBalance() {
    return this.availableLiquidity / 10 ** this.decimals
  }

  get availableLiquidityUsd() {
    return this.availableLiquidityBalance * this.price.priceUsd
  }

  get reserveSizeUsd() {
    return this.totalBorrowBalanceUsd + this.availableLiquidityUsd
  }

  get utilizationRatePtc() {
    return Math.abs(this.utilizationRate * 100)
  }

  get loanToValue() {
    return this.baseLTVasCollateral / 100
  }

  get liquidationThreshold() {
    return this.reserveLiquidationThreshold / 100
  }

  get liquidationPenalty() {
    return this.reserveLiquidationBonus / 100 - 100
  }

  get portfolio(): AavePortfolio {
    return this.portfolioVal
  }

  set portfolio(p: AavePortfolio) {
    this.portfolioVal = p
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
      (a, b) => a + (b.price.priceUsd * b.portfolio.totalDeposits * b.liquidationThreshold) / 100,
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
    const wallet: PortfolioCompositionInterface = { name: 'Your Wallet Composition', data: [] }
    const deposits: PortfolioCompositionInterface = { name: 'Deposits Composition', data: [] }
    const borrows: PortfolioCompositionInterface = { name: 'Variable Borrows Composition', data: [] }

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

  async invest(poolAddress: string, action: actionTypes) {
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
