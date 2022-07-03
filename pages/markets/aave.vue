<template>
  <v-row justify="center">
    <v-col cols="12" lg="10">
      <protocol-header
        :name="header.name"
        :symbol="header.symbol"
        :twitter="header.twitter"
        :title="header.title"
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
                      <tr v-for="(headerElem, i) in item.headers" :key="i">
                        <td :class="[textClass]" v-text="headerElem.name" />
                        <td class="font-weight-bold" v-text="headerElem.value"></td>
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
        <v-col cols="3" class="hidden-sm-and-down">
          <v-text-field v-model="searchString" append-icon="mdi-magnify" color="primary" outlined dense hide-details />
        </v-col>
        <v-col class="text-right">
          <switch-network-dialog ref="switchNetworkDialog"></switch-network-dialog>
          <network-selection />
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0">
          <aave-markets :loading="loading" :pools="pools" :search="searchString" @init-action="initAction" />
        </v-col>
      </v-row>
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
import { computed, defineComponent, inject, ref, useRoute, useStore, watch } from '@nuxtjs/composition-api'
import protocolHeader from '~/components/ProtocolHeader.vue'
import useAavePools, { AavePoolModel, actionTypes } from '~/composables/useAavePools'
import AaveMarkets from '~/components/pools/AaveMarkets.vue'
import usePortfolio, { PortfolioMap } from '~/composables/usePortfolio'
import { Web3, WEB3_PLUGIN_KEY } from '~/plugins/web3/web3'
import UseAavePoolsStats from '~/composables/useAavePoolsStats'
import AaveCompositionChart from '~/components/pools/AaveCompositionChart.vue'
import AaveMarketStats from '~/components/pools/AaveMarketStats.vue'
import AaveActionDialog from '~/components/pools/AaveActionDialog.vue'
import { State } from '~/types/state'
import NetworkSelection from '~/components/common/NetworkSelection.vue'
import useAaveMarketSelector from '~/composables/useAaveMarketSelector'
import SwitchNetworkDialog from '~/components/common/SwitchNetworkDialog.vue'
import { useMetaTags } from '~/composables/useMetaTags'

export default defineComponent({
  components: {
    SwitchNetworkDialog,
    NetworkSelection,
    AaveActionDialog,
    AaveMarketStats,
    AaveCompositionChart,
    AaveMarkets,
    protocolHeader,
  },
  setup() {
    const header = ref({
      id: '111',
      name: 'AAVE',
      symbol: 'AAVE',
      twitter: 'AaveAave',
      title: 'Aave Professional Dashboard',
      description:
        'Aave is the leading DeFi lending protocol for cryptocurrency loans. Our interface uses Aave smart ' +
        'contracts to Deposit, Borrow, Repay and Withdraw. Our Aave grant award proudly supports the development ' +
        'of this UI.',
      url: 'https://aave.com',
    })

    const portfolio = ref<PortfolioMap>({})
    const poolAction = ref<any>(null)
    const actionDialog = ref<any>(null)
    const searchString = ref('')
    const switchNetworkDialog = ref<any>(null)

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
      const pools: AavePoolModel[] = []
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
    watch([loading, walletReady, account, chainId, marketId, isChainAndMarketMismatched], async () => {
      // Refresh portfolio of loading of aave pools query is set to false
      if (!loading.value) await updatePortfolio()

      if (isChainAndMarketMismatched.value && isChainAndMarketMismatched.value.chainId !== chainId.value) {
        switchNetworkDialog.value.toggleDialog(true)
      }
    })

    // METHODS
    async function updatePortfolio() {
      portfolio.value = await fetchPortfolio()
    }

    function initAction({ action, pool }: { action: actionTypes; pool: AavePoolModel }) {
      actionDialog.value.init(action, pool)
    }

    // META TAGS
    useMetaTags('aave_v2', useRoute().value.path)

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
      switchNetworkDialog,

      // METHODS
      initAction,
      updatePortfolio,
      changeToRequiredChain,
    }
  },
  head: {},
})
</script>

<style scoped></style>
