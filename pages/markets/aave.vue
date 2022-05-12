<template>
  <v-row justify="center">
    <v-col cols="11">
      <protocol-header
        :name="header.name"
        :symbol="header.symbol"
        :twitter="header.twitter"
        :description="header.description"
        :url="header.url"
      />
      <aave-market-stats
        v-if="walletReady"
        :total-deposit-usd="totalDepositsUsd"
        :total-borrowed-usd="totalBorrowedUsd"
        :health-factor="healthFactor"
        :max-ltv="maxLtv"
        :current-ltv="currentLtv"
        :liquidation-threshold="liquidationThreshold"
        :borrowing-power-used="borrowingPowerUsed"
        :loading="loading"
      />
      <v-row v-if="walletReady">
        <v-col v-for="(item, index) in portfolioComposition" :key="index" lg="4" md="4" cols="12">
          <v-card tile outlined height="280" class="pa-2">
            <v-skeleton-loader v-if="loading" type="card-heading, image" height="280" />
            <div v-else>
              <span class="text-subtitle-1" v-text="item.name" />
              <client-only>
                <aave-composition-chart
                  :chart-height="180"
                  :data="item.data"
                  :labels-disabled="false"
                  :ticks-disabled="false"
                  tooltip-text="{category}: ${value.formatNumber('#.00')}"
                />
                <v-divider class="my-3" />
                <v-simple-table>
                  <template #default>
                    <tbody class="text-subtitle-1 text-no-wrap">
                      <tr v-for="(header, i) in item.headers" :key="i">
                        <td :class="[textClass]" v-text="header.name" />
                        <td class="font-weight-bold" v-text="header.value"></td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </client-only>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-6" align="center">
        <v-col cols="3">
          <v-text-field v-model="searchString" append-icon="mdi-magnify" color="primary" outlined dense hide-details />
        </v-col>
        <v-col class="text-right">
          <a v-if="isChainAndMarketMismatched" href="#" class="text-decoration-none" @click="changeToRequiredChain">
            <small class="grey--text">
              Please Switch To
              <span class="red--text text--lighten-1 mr-4 font-weight-bold" v-text="isChainAndMarketMismatched.label" />
            </small>
          </a>
          <network-selection />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0">
          <aave-markets :loading="loading" :pools="pools" :search="searchString" @init-action="initAction" />
        </v-col>
      </v-row>
      <aave-pool-actions ref="poolAction" @transaction-result="updatePortfolio" />
      <aave-action-dialog
        ref="actionDialog"
        :health-factor="healthFactor"
        :total-borrowed-usd="totalBorrowedUsd"
        :total-collateral-usd="totalCollateralUsd"
        :max-ltv="maxLtv"
        @transaction-success="updatePortfolio"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref, useStore, watch } from '@nuxtjs/composition-api'
import protocolHeader from '~/components/ProtocolHeader.vue'
import useAavePools from '~/composables/useAavePools'
import AaveMarkets from '~/components/pools/AaveMarkets.vue'
import usePortfolio, { PortfolioMap } from '~/composables/usePortfolio'
import { AavePoolCl } from '~/models/pool'
import { Web3, WEB3_PLUGIN_KEY } from '~/plugins/web3/web3'
import { actionTypes } from '~/models/web3'
import AavePoolActions from '~/components/pools/aave-pool-actions.vue'
import UseAavePoolsStats from '~/composables/useAavePoolsStats'
import AaveCompositionChart from '~/components/pools/AaveCompositionChart.vue'
import AaveMarketStats from '~/components/pools/AaveMarketStats.vue'
import AaveActionDialog from '~/components/pools/AaveActionDialog.vue'
import { State } from '~/types/state'
import NetworkSelection from '~/components/common/NetworkSelection.vue'
import useAaveMarketSelector from '~/composables/useAaveMarketSelector'
export default defineComponent({
  components: {
    NetworkSelection,
    AaveActionDialog,
    AaveMarketStats,
    AaveCompositionChart,
    AavePoolActions,
    AaveMarkets,
    protocolHeader,
  },
  setup() {
    const header = ref({
      id: '111',
      name: 'AAVE',
      symbol: 'AAVE',
      twitter: 'AaveAave',
      description: 'Aave is an Open Source and Non-Custodial protocol to earn interest on deposits and borrow assets',
      url: 'https://aave.com',
    })

    const portfolio = ref<PortfolioMap>({})
    const poolAction = ref<any>(null)
    const actionDialog = ref<any>(null)
    const searchString = ref('')

    // COMPOSABLE
    const { walletReady, account, chainId } = inject(WEB3_PLUGIN_KEY) as Web3
    const { loading, aavePoolsData } = useAavePools()
    const { state } = useStore<State>()
    const { isChainAndMarketMismatched, changeToRequiredChain } = useAaveMarketSelector()

    // COMPUTED
    const textClass = computed(() => state.ui[state.ui.theme].innerCardLighten)
    const addresses = computed(() =>
      aavePoolsData.value.reduce((elem, item) => ({ ...elem, [item.id]: item.addresses }), {})
    )
    const marketId = computed(() => state.configs.currentAaveMarket.chainId)

    const { fetchPortfolio } = usePortfolio(addresses)

    const pools = computed(() => {
      const pools: AavePoolCl[] = []
      aavePoolsData.value.forEach((elem) => {
        elem.portfolio = portfolio.value[elem.id] || elem.portfolio
        pools.push(elem)
      })
      return pools
    })

    const {
      totalCollateralUsd,
      totalBorrowedUsd,
      healthFactor,
      maxLtv,
      currentLtv,
      liquidationThreshold,
      borrowingPowerUsed,
      portfolioComposition,
      totalDepositsUsd,
    } = UseAavePoolsStats(pools)

    // WATCHERS
    watch([loading, walletReady, account, chainId, marketId], async () => {
      // Refresh portfolio of loading of aave pools query is set to false
      if (!loading.value) await updatePortfolio()
    })

    // METHODS
    async function updatePortfolio() {
      portfolio.value = await fetchPortfolio()
    }

    function initAction({ action, pool }: { action: actionTypes; pool: AavePoolCl }) {
      actionDialog.value.init(action, pool)
    }

    return {
      // COMPUTED
      loading,
      walletReady,
      header,
      pools,
      totalCollateralUsd,
      totalBorrowedUsd,
      healthFactor,
      maxLtv,
      currentLtv,
      liquidationThreshold,
      borrowingPowerUsed,
      poolAction,
      actionDialog,
      portfolioComposition,
      textClass,
      totalDepositsUsd,
      searchString,
      isChainAndMarketMismatched,

      // METHODS
      initAction,
      updatePortfolio,
      changeToRequiredChain,
    }
  },
})
</script>

<style scoped></style>
