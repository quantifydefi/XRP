<template>
  <v-row class="py-8">
    <v-col lg="7" md="12">
      <v-row align="center">
        <v-col>
          <div :class="[textClass, 'text-right', 'text-caption']">
            <v-btn color="red" fab tile height="10" width="10" class="pa-0 mr-1" />Total Borrowed
          </div>
          <div class="text-right text-h5" v-text="$f(aavePool.totalBorrowBalance, { minDigits: 3 })" />
          <div
            :class="[textClass, 'text-right']"
            v-text="$f(aavePool.totalBorrowBalanceUsd, { minDigits: 2, pre: '$ ' })"
          />
        </v-col>

        <v-col class="mt-2">
          <v-row justify="center">
            <client-only>
              <aave-composition-chart
                :data="utilizationChartData"
                tooltip-text="{category}: {value.percent.formatNumber('#.00')}%"
              />
            </client-only>
          </v-row>
        </v-col>
        <v-col>
          <div :class="[textClass, 'text-caption']">
            Available Liquidity
            <v-btn color="green" fab tile height="10" width="10" class="pa-0 mr-1"></v-btn>
          </div>
          <div class="text-h5" v-text="$f(aavePool.availableLiquidityBalance, { minDigits: 3 })" />
          <div :class="[textClass]" v-text="$f(aavePool.availableLiquidityUsd, { minDigits: 2, pre: '$ ' })" />
        </v-col>
      </v-row>
      <v-row no-gutters class="mt-6">
        <v-col class="mx-3">
          <div class="text-right">
            <span :class="textClass">Reserve size:</span>
            <span v-text="$f(aavePool.reserveSizeUsd, { minDigits: 2, pre: '$ ' })" />
          </div>
        </v-col>

        <v-col class="mx-3">
          <div>
            <span :class="textClass">Utilisation rate:</span>
            <span v-text="$f(aavePool.utilizationRatePtc, { minDigits: 2, after: ' %' })" />
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-simple-table>
            <template #default>
              <thead>
                <tr>
                  <th class="text-left">Deposits</th>
                  <th class="text-left"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td :class="textClass">Deposit APY</td>
                  <td>
                    <span v-if="aavePool.depositAPY === -1">--</span>
                    <span v-else v-text="$f(aavePool.depositAPY * 100, { minDigits: 2, after: ' %' })" />
                  </td>
                </tr>
                <tr>
                  <td :class="textClass">Deposit APR</td>
                  <td>
                    <span v-if="aavePool.depositAPR === -1">--</span>
                    <span v-else v-text="$f(aavePool.depositAPR * 100, { minDigits: 2, after: ' %' })" />
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>

        <v-col>
          <v-simple-table>
            <template #default>
              <thead>
                <tr>
                  <th class="text-left">Stable Borrowing</th>
                  <th class="text-left"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td :class="textClass">Borrow APY</td>
                  <td>
                    <span v-if="aavePool.stableBorrowAPY === -1">--</span>
                    <span v-else v-text="$f(aavePool.stableBorrowAPY * 100, { minDigits: 2, after: ' %' })" />
                  </td>
                </tr>
                <tr>
                  <td :class="textClass">Borrow APR</td>
                  <td>
                    <span v-if="aavePool.stableBorrowAPR === -1">--</span>
                    <span v-else v-text="$f(aavePool.stableBorrowAPR * 100, { minDigits: 2, after: ' %' })" />
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>

        <v-col>
          <v-simple-table>
            <template #default>
              <thead>
                <tr>
                  <th class="text-left">Variable Borrowing</th>
                  <th class="text-left"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td :class="textClass">Deposit APY</td>
                  <td>
                    <span v-if="aavePool.variableBorrowAPY === -1">--</span>
                    <span v-else v-text="$f(aavePool.variableBorrowAPY * 100, { minDigits: 2, after: ' %' })" />
                  </td>
                </tr>
                <tr>
                  <td :class="textClass">Deposit APR</td>
                  <td>
                    <span v-if="aavePool.variableBorrowAPR === -1">--</span>
                    <span v-else v-text="$f(aavePool.variableBorrowAPR * 100, { minDigits: 2, after: ' %' })" />
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
      <v-divider class="mb-3" />
      <v-row no-gutters justify="center" class="text-center">
        <v-col>
          <div>Maximum LTV</div>
          <div class="font-weight-bold">
            {{ aavePool.loanToValue > 0 ? $f(aavePool.loanToValue, { minDigits: 2, after: ' %' }) : '-' }}
          </div>
        </v-col>
        <v-col>
          <div>Liquidation threshold</div>
          <div class="font-weight-bold">
            {{
              aavePool.liquidationThreshold > 0 ? $f(aavePool.liquidationThreshold, { minDigits: 2, after: ' %' }) : '-'
            }}
          </div>
        </v-col>
        <v-col>
          <div>Liquidation Penalty</div>
          <div class="font-weight-bold">
            {{ aavePool.liquidationPenalty > 0 ? $f(aavePool.liquidationPenalty, { minDigits: 2, after: ' %' }) : '-' }}
          </div>
        </v-col>
        <v-col>
          <div>Used as collateral</div>
          <div :class="['font-weight-bold', aavePool.usageAsCollateralEnabled ? 'green--text' : 'red--text']">
            {{ aavePool.usageAsCollateralEnabled ? 'Yes' : 'No' }}
          </div>
        </v-col>
      </v-row>
    </v-col>
    <v-col class="text-center">
      <client-only>
        <v-btn v-if="!walletReady" tile depressed @click="dispatch('ui/walletDialogStatus', true)">
          Connect To Wallet
        </v-btn>
        <aave-balance-chart v-else :data="balanceChartData" />
      </client-only>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType, useStore } from '@nuxtjs/composition-api'
import { AavePoolModel } from '~/composables/useAavePools'
import { State } from '~/types/state'
import AaveCompositionChart from '~/components/pools/AaveCompositionChart.vue'
import AaveBalanceChart from '~/components/pools/AaveBalanceChart.vue'
import { Web3, WEB3_PLUGIN_KEY } from '~/plugins/web3/web3'

type Props = {
  pool: AavePoolModel
}
export default defineComponent<Props>({
  components: {
    AaveBalanceChart,
    AaveCompositionChart,
  },
  props: {
    pool: { type: Object as PropType<AavePoolModel>, required: true },
  },
  setup(props) {
    // COMPOSABLE
    const { state, dispatch } = useStore<State>()
    const { walletReady } = inject(WEB3_PLUGIN_KEY) as Web3

    // COMPUTED
    const textClass = computed(() => state.ui[state.ui.theme].innerCardLighten)
    const utilizationChartData = computed(() => [
      { name: 'Available Liquidity', value: 100 - props.pool.utilizationRatePtc, color: '#4CAF50' },
      { name: 'Total Borrowed', value: props.pool.utilizationRatePtc, color: '#F44336' },
    ])

    const balanceChartData = computed(() => [
      {
        name: 'Wallet Balance',
        balance: props.pool.portfolio.walletBal,
        balanceUsd: props.pool.portfolio.walletBal * props.pool.price.priceUsd,
      },
      {
        name: 'Deposits',
        balance: props.pool.portfolio.totalDeposits,
        balanceUsd: props.pool.portfolio.totalDeposits * props.pool.price.priceUsd,
      },
      {
        name: 'Borrows',
        balance: props.pool.portfolio.variableBorrow,
        balanceUsd: props.pool.portfolio.variableBorrow * props.pool.price.priceUsd,
      },
    ])

    return {
      textClass,
      aavePool: props.pool,
      utilizationChartData,
      balanceChartData,
      walletReady,

      // COMPOSABLE
      dispatch,
    }
  },
})
</script>
