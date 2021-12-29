<template>
  <v-row no-gutters justify="center">
    <v-overlay :value="showOverlay" :opacity="1" absolute :color="$vuetify.theme.themes[theme].overlay">
      <img :src="'/img/logo/logo.svg'" height="100" width="100" alt="logo" />
      <v-progress-linear color="primary" indeterminate rounded height="6"></v-progress-linear>
    </v-overlay>

    <v-col cols="12">
      <v-row no-gutters>
        <client-only>
          <v-row v-if="!showOverlay && balances" class="px-1" data-nosnippet>
            <v-col cols="12" md="6" lg="4" class="pa-1">
              <v-card
                tile
                outlined
                height="522"
                :style="{
                  backgroundColor: $vuetify.theme.themes[theme].background,
                }"
              >
                <v-card-title
                  class="pa-0 ma-0"
                  :style="{
                    backgroundColor: $vuetify.theme.themes[theme].background,
                  }"
                >
                  <v-col cols="6" class="d-flex">
                    <h1 class="title">My Assets</h1>
                  </v-col>

                  <v-col cols="6" class="text-right"
                    ><h1 class="title">
                      {{ balances.totalBalance }}
                    </h1></v-col
                  >
                </v-card-title>
                <v-divider />

                <v-card-title v-for="(item, i) in balances.networks" :key="i" class="pa-0 ma-0">
                  <v-col cols="6" class="d-flex">
                    <v-avatar size="26px">
                      <v-img
                        :src="balances.tokenImage(item.symbol)"
                        :lazy-src="balances.tokenImage(item.symbol)"
                      ></v-img>
                    </v-avatar>
                    <h1 class="subtitle-1 font-weight-medium pl-3">
                      {{ item.network }}
                    </h1>
                  </v-col>
                </v-card-title>
              </v-card>
            </v-col>

            <!--      Ethereum Balances      -->
            <v-col cols="12" md="6" lg="4" class="pa-1">
              <v-card tile outlined height="522" style="border-bottom: none">
                <client-only>
                  <balances-grid
                    :grid-height="435"
                    network="Ethereum"
                    icon="eth"
                    :cols="balances.cols"
                    :grid-data="balances.ethereumBalance"
                  ></balances-grid>
                </client-only>
              </v-card>
            </v-col>

            <!--      Binance Balances      -->
            <v-col cols="12" md="6" lg="4" class="pa-1">
              <v-card tile outlined height="522" style="border-bottom: none">
                <client-only>
                  <balances-grid
                    :grid-height="435"
                    network="Binance"
                    icon="bnb"
                    :cols="balances.cols"
                    :grid-data="balances.binanceBalance"
                  ></balances-grid>
                </client-only>
              </v-card>
            </v-col>

            <!--      Polygon Balances      -->
            <v-col cols="12" md="6" lg="4" class="pa-1">
              <v-card tile outlined height="522" style="border-bottom: none">
                <client-only>
                  <balances-grid
                    :grid-height="435"
                    network="Polygon"
                    icon="matic"
                    :cols="balances.cols"
                    :grid-data="balances.polygonBalance"
                  ></balances-grid>
                </client-only>
              </v-card>
            </v-col>

            <!--      Fanthom Opera Balances      -->
            <v-col cols="12" md="6" lg="4" class="pa-1">
              <v-card tile outlined height="522" style="border-bottom: none">
                <client-only>
                  <balances-grid
                    :grid-height="435"
                    network="Fantom"
                    icon="ftm"
                    :cols="balances.cols"
                    :grid-data="balances.fanthomBalance"
                  ></balances-grid>
                </client-only>
              </v-card>
            </v-col>

            <!--      Avalanche Balances      -->
            <v-col cols="12" md="6" lg="4" class="pa-1">
              <v-card tile outlined height="522" style="border-bottom: none">
                <client-only>
                  <balances-grid
                    :grid-height="435"
                    network="Avalanche"
                    icon="avax"
                    :cols="balances.cols"
                    :grid-data="balances.avalancheBalance"
                  ></balances-grid>
                </client-only>
              </v-card>
            </v-col>
          </v-row>
        </client-only>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import detectEthereumProvider from '@metamask/detect-provider'
import walletMiddleware from '~/middleware/wallet'
import { Balance } from '~/models/balance'
import { UiState } from '~/store/ui'

const BalancesGrid: any = () => ({
  component: new Promise((resolve) => {
    setTimeout(() => {
      resolve(import('@/components/portfolio/grids/BalancesGrid.vue'))
    }, 1)
  }),
})

@Component({
  name: 'Portfolio',
  components: {
    BalancesGrid,
    BaseGrid: () => import('~/components/terminal/BaseGrid.vue'),
  },
  middleware: [walletMiddleware],

  computed: {
    ...mapState({
      theme: (state: any) => state.ui.theme,
    }),
  },
})
export default class Portfolio extends Vue {
  showOverlay = true
  balances: Balance | null = null
  theme!: UiState

  async mounted() {
    /**
     Listener for account change
     */
    const provider: any = await detectEthereumProvider()

    if (provider) {
      await provider.request({ method: 'eth_accounts' })
      provider.on('accountsChanged', (accounts: string[]) => {
        if (!accounts.length) {
          this.$store.dispatch('wallet/metamaskLogout')
          this.$router.push('/')
        }
      })
    }

    this.balances = Balance.getInstance(this.$store)

    /** Allow time for rendering and getting instance of balance **/
    setTimeout(() => {
      this.showOverlay = false
    }, 2000)
  }
}
</script>

<style scoped></style>
