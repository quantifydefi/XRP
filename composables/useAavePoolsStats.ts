import { computed, Ref, useContext } from '@nuxtjs/composition-api'
import type { AavePoolModel } from '~/composables/useAavePools'

interface PortfolioCompositionInterface {
  name: string
  data: { name: string; value: number }[]
  headers?: { name: string; value: string }[]
}

export default function useAavePoolsStats(pools: Ref<AavePoolModel[]>) {
  const { $f } = useContext()
  const collateralPools = computed(() => pools.value.filter((elem) => elem.usageAsCollateralEnabled))

  /** Stats */
  const totalLiquidityUsd = computed(() => pools.value.reduce((a, b) => a + b.usdBalance, 0))
  const totalBorrowsUsd = computed(() => pools.value.reduce((a, b) => a + b.totalBorrowBalanceUsd, 0))
  const numberOfMarkets = computed(() => pools.value.length)

  /**  Sum of deposits of all the pools with usageAsCollateralEnabled flag in USD */
  const totalCollateralUsd = computed(() =>
    collateralPools.value.reduce((a, b) => a + b.price.priceUsd * b.portfolio.totalDeposits, 0)
  )
  const totalCollateralEth = computed(() =>
    collateralPools.value.reduce((a, b) => a + b.price.priceInEth * b.portfolio.totalDeposits, 0)
  )

  /** Sum of all the  borrowed assets in user wallet */
  const totalBorrowedUsd = computed(() =>
    pools.value.reduce((a, b) => a + b.price.priceUsd * b.portfolio.variableBorrow, 0)
  )

  const totalBorrowedEth = computed(() =>
    pools.value.reduce((a, b) => a + b.price.priceInEth * b.portfolio.variableBorrow, 0)
  )

  const totalDepositsUsd = computed(() =>
    pools.value.reduce((a, b) => a + b.price.priceUsd * b.portfolio.totalDeposits, 0)
  )
  const totalWalletBalanceUsd = computed(() =>
    pools.value.reduce((a, b) => a + b.price.priceUsd * b.portfolio.walletBal, 0)
  )

  /** When H f < 1 the position may be liquidated to maintain solvency as described in the diagram below. */
  const healthFactor = computed(
    () =>
      collateralPools.value.reduce(
        (a, b) => a + (b.price.priceInEth * b.portfolio.totalDeposits * b.liquidationThreshold) / 100,
        0
      ) / totalBorrowedEth.value
  )

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
  const maxLtv = computed(
    () =>
      (collateralPools.value.reduce(
        (a, b) => a + (b.price.priceInEth * b.portfolio.totalDeposits * b.loanToValue) / 100,
        0
      ) /
        totalCollateralEth.value) *
      100
  )

  const currentLtv = computed(() => (totalBorrowedEth.value / totalCollateralEth.value) * 100)

  const liquidationThreshold = computed(
    () =>
      (collateralPools.value.reduce(
        (a, b) => a + (b.price.priceInEth * b.portfolio.totalDeposits * b.liquidationThreshold) / 100,
        0
      ) /
        totalCollateralEth.value) *
      100
  )

  const borrowingPowerUsed = computed(
    () => (totalBorrowedEth.value * 100) / ((totalCollateralEth.value * liquidationThreshold.value) / 100)
  )

  const portfolioComposition = computed(() => {
    const wallet: PortfolioCompositionInterface = {
      name: 'Wallet Composition',
      data: [],
      headers: [{ name: 'Total Balance', value: $f(totalWalletBalanceUsd.value, { pre: '$ ' }) }],
    }
    const deposits: PortfolioCompositionInterface = {
      name: 'Deposits Composition',
      data: [],
      headers: [{ name: 'Total Deposits', value: $f(totalDepositsUsd.value, { pre: '$ ' }) }],
    }
    const variableBorrows: PortfolioCompositionInterface = {
      name: 'Borrows Composition',
      data: [],
      headers: [{ name: 'Total Borrowed', value: $f(totalBorrowedUsd.value, { pre: '$ ' }) }],
    }

    pools.value.forEach((elem) => {
      if (elem.portfolio.walletBal > 0) {
        wallet.data.push({ name: elem.symbol, value: elem.portfolio.walletBal * elem.price.priceUsd })
      }
      if (elem.portfolio.totalDeposits > 0) {
        deposits.data.push({ name: elem.symbol, value: elem.portfolio.totalDeposits * elem.price.priceUsd })
      }
      if (elem.portfolio.variableBorrow > 0) {
        variableBorrows.data.push({ name: elem.symbol, value: elem.portfolio.variableBorrow * elem.price.priceUsd })
      }
    })
    return [wallet, deposits, variableBorrows]
  })

  return {
    totalLiquidityUsd,
    totalBorrowsUsd,
    numberOfMarkets,

    totalCollateralEth,
    totalCollateralUsd,
    totalDepositsUsd,
    totalBorrowedEth,
    totalBorrowedUsd,
    healthFactor,
    maxLtv,
    currentLtv,
    liquidationThreshold,
    borrowingPowerUsed,
    portfolioComposition,
  }
}
