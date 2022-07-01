<template>
  <div class="mt-4">
    <v-row align="center">
      <v-col class="align-center d-flex">
        <v-avatar size="30" class="mr-2">
          <v-img :src="$imageUrlBySymbol('aave')" :lazy-src="$imageUrlBySymbol('aave')" @error="$setAltImageUrl" />
        </v-avatar>
        <nuxt-link to="/markets/aave" class="text-h5 font-weight-medium ml-2 white--text text-hover-primary">
          AAVE V2
        </nuxt-link>
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
      <v-col>
        <aave-markets :loading="loading" :pools="poolsToDisplay" expand-first-row @init-action="initAction" />
      </v-col>
      <aave-action-dialog
        ref="actionDialog"
        :health-factor="healthFactor"
        :total-borrowed-usd="totalBorrowedUsd"
        :total-collateral-usd="totalCollateralUsd"
        :max-ltv="maxLtv"
        @transaction-success="updatePortfolio"
      />
    </v-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref, useStore, watch } from '@nuxtjs/composition-api'
import useAavePools, { AavePoolModel, actionTypes } from '~/composables/useAavePools'
import usePortfolio, { PortfolioMap } from '~/composables/usePortfolio'
import AaveMarkets from '~/components/pools/AaveMarkets.vue'
import { Web3, WEB3_PLUGIN_KEY } from '~/plugins/web3/web3'
import NetworkSelection from '~/components/common/NetworkSelection.vue'
import { State } from '~/types/state'
import useAaveMarketSelector from '~/composables/useAaveMarketSelector'
import AaveActionDialog from '~/components/pools/AaveActionDialog.vue'
import UseAavePoolsStats from '~/composables/useAavePoolsStats'

export default defineComponent({
  components: { NetworkSelection, AaveMarkets, AaveActionDialog },
  props: {
    tokenKey: { type: String, required: true },
  },

  setup(props) {
    // COMPOSABELS
    const portfolio = ref<PortfolioMap>({})
    const actionDialog = ref<any>(null)
    const { walletReady, account, chainId } = inject(WEB3_PLUGIN_KEY) as Web3
    const { state } = useStore<State>()
    const { isChainAndMarketMismatched, changeToRequiredChain } = useAaveMarketSelector()

    // COMPUTED
    const { loading, aavePoolsData } = useAavePools()
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

    const poolsToDisplay = computed(() => pools.value.filter((elem) => elem.symbol === props.tokenKey))

    const { totalCollateralUsd, totalBorrowedUsd, healthFactor, maxLtv } = UseAavePoolsStats(pools)

    // METHODS
    async function updatePortfolio() {
      portfolio.value = await fetchPortfolio()
    }
    function initAction({ action, pool }: { action: actionTypes; pool: AavePoolModel }) {
      actionDialog.value.init(action, pool)
    }

    // WATCHERS
    watch([loading, walletReady, account, chainId, marketId, isChainAndMarketMismatched], async () => {
      // Refresh portfolio of loading of aave pools query is set to false
      if (!loading.value) await updatePortfolio()
    })

    return {
      actionDialog,
      poolsToDisplay,
      loading,
      isChainAndMarketMismatched,
      healthFactor,
      maxLtv,
      totalBorrowedUsd,
      totalCollateralUsd,
      initAction,
      changeToRequiredChain,
      updatePortfolio,
    }
  },
})
</script>
