<template>
  <div class="mb-4">
    <v-row justify="center" class="mt-4">
      <v-col cols="11" class="text-center">
        <h1 class="v-heading text-h2 font-weight-regular">EVMX <span class="title">[Beta]</span></h1>
        <div class="v-heading text-h4 font-weight-light mt-3 grey--text">DeFi and NFT Portfolio Manager</div>
        <div class="mt-4">
          <client-only>
            <vue-typer
              class="v-heading text-h4 font-weight-light"
              :text="animatedFeatures"
              :repeat="Infinity"
              :shuffle="false"
              initial-action="typing"
              :pre-type-delay="70"
              :type-delay="100"
              :pre-erase-delay="2000"
              :erase-delay="250"
              erase-style="clear"
              :erase-on-complete="false"
              caret-animation="smooth"
            ></vue-typer>
          </client-only>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col><recent-prices-chart /></v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="10">
        <v-row>
          <v-col>
            <div class="text-h4 mt-5">Roadmap</div>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col v-for="item in items" :key="item.header" cols="12" md="4" sm="6">
            <v-hover v-slot="{ hover }">
              <v-card height="100%" tile outlined class="pa-2 text-center" :elevation="hover ? 10 : 0">
                <v-avatar size="40" class="mt-3" :color="ui[theme].innerCardLighten">
                  <v-icon size="30" color="primary">{{ item.icon }}</v-icon>
                </v-avatar>

                <p class="text-h5 mt-5" v-text="item.header" />
                <p class="mt-5 grey--text" v-text="item.desc" />
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useStore } from '@nuxtjs/composition-api'
import { State } from '~/types/state'
import RecentPricesChart from '~/components/common/RecentPricesChart.vue'

export default defineComponent({
  components: { RecentPricesChart },
  setup() {
    // STATE
    const items = ref([
      {
        color: 'primary lighten-2',
        icon: 'mdi-transit-connection-variant',
        header: 'DeFi Gateway',
        desc: 'Actionable interfaces for leading DeFi platforms',
      },
      {
        color: 'red lighten-2',
        icon: 'mdi-panorama-variant',
        header: 'NFT Aggregator',
        desc: 'Favorite NFTs and your balances together',
      },

      {
        color: 'orange lighten-2',
        icon: 'mdi-desktop-mac-dashboard',
        header: 'Token Pages',
        desc: 'Balances, investment options, and metrics on a single screen',
      },
      {
        color: 'primary lighten-2',
        icon: 'mdi-bridge',
        header: 'Multi Chain Bridging',
        desc: 'Support for Ethereum Mainnet, Binance Smart Change, Matic, Fantom, Avalanche networks and more',
      },
      {
        color: 'red lighten-2',
        icon: 'mdi-history',
        header: 'Transaction History',
        desc: 'Providing a transaction displays',
      },
      {
        color: 'red lighten-2',
        icon: 'mdi-rocket-launch-outline',
        header: 'NFT Launch',
        desc: 'Check this site for future updates',
      },
    ])
    const animatedFeatures = ref([
      'DeFi Gateway',
      'NFT Aggregator',
      'Advanced Portfolio Visualization',
      'Uniswap Trader',
      'Easier DeFi and NFT Transactions',
      'Aave Smart Connect',
      'Token Pages',
      'Curve Crypto Pools Interface',
      'Balancer Index Manager',
      'Transaction History',
      'NFT Manager',
      'Multi Chain Swaps',
    ])

    // COMPOSABLE
    const store = useStore<State>()

    // COMPUTED
    const ui = computed(() => store.state.ui)
    const theme = computed(() => store.state.ui.theme)

    return { items, animatedFeatures, ui, theme }
  },
})
</script>

<style lang="scss">
.vue-typer .custom.char.typed {
  color: #e91e63ff;
  align-items: center;
}
.vue-typer .custom.caret {
  animation: rocking 1s ease-in-out 0s infinite;
}
.vue-typer .custom.caret {
  width: 5px;
  background-color: #e91e63ff;
  margin-right: 50px;
}
</style>
