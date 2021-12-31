import { Component, Vue } from 'vue-property-decorator'
import { plainToClass } from 'class-transformer'
import { CurvePoolsGQL } from '~/apollo/main/pools.query.graphql'
import { CurvePool } from '~/types/apollo/main/types'
import { Helper } from '~/models/helper'
import { PriceOracleAsset, Reserve } from '~/types/apollo/aaveV2/types'
import { AaveReservesGQL } from '~/apollo/aaveV2/aaveV2.query.graphql'

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

class AavePool implements Reserve {
  aEmissionPerSecond!: string
  aIncentivesLastUpdateTimestamp!: number
  aToken!: any
  aTokenIncentivesIndex!: number
  availableLiquidity!: number
  averageStableRate!: number
  baseLTVasCollateral!: number
  baseVariableBorrowRate!: number
  borrowHistory!: Array<any>
  borrowingEnabled!: boolean
  configurationHistory!: Array<any>
  decimals!: number
  depositHistory!: Array<any>
  deposits!: Array<any>
  flashLoanHistory!: Array<any>
  id!: string
  isActive!: boolean
  isFrozen!: boolean
  lastUpdateTimestamp!: number
  lifetimeBorrows!: number
  lifetimeCurrentVariableDebt!: number
  lifetimeDepositorsInterestEarned!: number
  lifetimeFlashLoanPremium!: number
  lifetimeFlashLoans!: number
  lifetimeLiquidated!: number
  lifetimeLiquidity!: number
  lifetimePrincipalStableDebt!: number
  lifetimeRepayments!: number
  lifetimeReserveFactorAccrued!: number
  lifetimeScaledVariableDebt!: number
  lifetimeWithdrawals!: number
  liquidationCallHistory!: Array<any>
  liquidityIndex!: number
  liquidityRate!: string
  name!: string
  optimalUtilisationRate!: number
  originationFeeLiquidationHistory!: Array<any>
  paramsHistory!: Array<any>
  pool!: any
  price!: PriceOracleAsset
  rebalanceStableBorrowRateHistory!: Array<any>
  redeemUnderlyingHistory!: Array<any>
  repayHistory!: Array<any>
  reserveFactor!: number
  reserveInterestRateStrategy!: any
  reserveLiquidationBonus!: number
  reserveLiquidationThreshold!: number
  sEmissionPerSecond!: string
  sIncentivesLastUpdateTimestamp!: number
  sToken!: any
  sTokenIncentivesIndex!: number
  stableBorrowRate!: string
  stableBorrowRateEnabled!: boolean
  stableDebtLastUpdateTimestamp!: number
  stableRateSlope1!: number
  stableRateSlope2!: number
  swapHistory!: Array<any>
  symbol!: string
  totalATokenSupply!: string
  totalCurrentVariableDebt!: string
  totalDeposits!: number
  totalLiquidity!: number
  totalLiquidityAsCollateral!: number
  totalPrincipalStableDebt!: number
  totalScaledVariableDebt!: number
  underlyingAsset!: string
  usageAsCollateralEnabled!: boolean
  usageAsCollateralHistory!: Array<any>
  userReserves!: Array<any>
  utilizationRate!: number
  vEmissionPerSecond!: string
  vIncentivesLastUpdateTimestamp!: number
  vToken!: any
  vTokenIncentivesIndex!: number
  variableBorrowIndex!: number
  variableBorrowRate!: string
  variableRateSlope1!: number
  variableRateSlope2!: number
}

@Component({
  name: 'AavePools',
  apollo: {
    aaveMainNetPools: {
      client: 'aaveV2Mainnet',
      prefetch: false,
      query: AaveReservesGQL,
      deep: false,
      result({ loading }) {
        this.isPoolsLoading = loading
      },
      update: ({ reserves }) => {
        const res: AavePool[] = plainToClass(AavePool, reserves as AavePool[])
        console.log(res)
        return res
      },
      watchLoading(isLoading) {
        this.loading = isLoading
      },
    },
  },
})
export class AavePools extends Vue {
  aaveMainNetPools: AavePool[] = []
  config = {
    cols: [
      {
        text: 'Assets',
        align: 'left',
        class: 'text-no-wrap justify-content-between',
        value: 'symbol',
      },
      {
        text: 'Balance',
        align: 'left',
        class: 'text-no-wrap',
        value: 'availableBalance',
      },
      {
        text: 'Supply APY',
        align: 'center',
        class: 'text-no-wrap',
        value: 'depositAPY',
      },
      {
        text: 'Variable Borrow APY',
        align: 'center',
        class: 'text-no-wrap',
        value: 'variableBorrowAPY',
      },
      {
        text: 'Stable Borrow APY',
        align: 'center',
        class: 'text-no-wrap',
        value: 'stableBorrowAPY',
      },
      {
        text: '',
        align: 'center',
        class: 'text-no-wrap',
        value: 'actions',
        sortable: false,
      },
    ],
  }

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
}
