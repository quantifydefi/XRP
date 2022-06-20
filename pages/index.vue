<template>
  <v-row no-gutters justify="center">
    <vue-particles />

    <v-col cols="12" style="z-index: 1">
      <v-row justify="center" class="text-center">
        <v-col cols="12" class="mt-6">
          <h1 class="v-heading text-h2 font-weight-regular">EVM Finance</h1>
          <div class="v-heading text-h4 font-weight-light mt-3 grey--text">DeFi and NFT Portfolio Manager</div>
        </v-col>

        <v-col cols="12">
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
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" style="z-index: 1">
      <defi-node-tree />
    </v-col>

    <v-col cols="11" lg="10" class="text-center mt-16 pt-16" style="z-index: 1">
      <v-row>
        <v-col cols="12">
          <h2 class="text-h4 text-left">Roadmap</h2>
        </v-col>
        <v-col cols="12" class="justify-center">
          <v-row justify="center">
            <v-col v-for="item in items" :key="item.header" cols="12" sm="6" md="4">
              <outline-glow color="black">
                <v-avatar size="40" class="mt-5">
                  <v-icon size="30" color="primary">{{ item.icon }}</v-icon>
                </v-avatar>

                <p class="text-h5 pt-5 px-5" v-text="item.header" />
                <p class="pt-5 px-5 grey--text" v-text="item.desc" />
              </outline-glow>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useStore } from '@nuxtjs/composition-api'

import { State } from '~/types/state'
import { useMetaTags } from '~/composables/useMetaTags'
import OutlineGlow from '~/components/common/ui/custom/OutlineGlow.vue'
import DefiNodeTree from '~/components/common/DefiNodeTree.vue'
import VueParticles from '~/components/common/ui/custom/VueParticless.vue'

export default defineComponent({
  components: { VueParticles, DefiNodeTree, OutlineGlow },
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
        desc: 'Support for Ethereum Mainnet, Binance Smart Chain, Matic, Fantom Opera, Avalanche networks and more',
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

    // META TAGS
    useMetaTags({ title: 'EVM Finance' })

    return { items, animatedFeatures, ui, theme }
  },
  head: {},
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
