import { useQuery } from '@vue/apollo-composable/dist'
import { computed, inject, ref, watch } from '@nuxtjs/composition-api'
import { plainToClass } from 'class-transformer'
import { AavePoolGQL } from '~/apollo/main/pools.query.graphql'
import { AaveAddress, AavePool, AavePoolPrice, AavePortfolio } from '@/types/apollo/main/types'
import { RAY_UNITS, SECONDS_PER_YEAR } from '~/constants/utils'
import { Web3, WEB3_PLUGIN_KEY } from '~/plugins/web3/web3'

export type actionTypes = 'deposit' | 'borrow' | 'repay' | 'withdraw'
export const aaveActions = ref<Array<actionTypes>>(['deposit', 'borrow', 'withdraw', 'repay'])

export class AavePoolModel implements AavePool {
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
  portfolioVal!: AavePortfolio
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

export default function () {
  // STATE
  const loading = ref(true)
  // COMPOSABLES
  const { chainId } = inject(WEB3_PLUGIN_KEY) as Web3
  const { result, onResult } = useQuery(
    AavePoolGQL,
    () => ({
      chainId: chainId.value ?? 1,
    }),
    { fetchPolicy: 'no-cache', pollInterval: 30000 }
  )

  // COMPUTED
  const aavePoolsData = computed(() => plainToClass(AavePoolModel, result.value?.aavePools as AavePoolModel[]) ?? [])

  // EVENTS
  onResult((queryResult) => {
    loading.value = queryResult.loading
  })
  watch(chainId, () => (loading.value = true))

  return {
    loading,
    aavePoolsData,
  }
}
