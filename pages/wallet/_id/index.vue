<template>
  <v-row no-gutters justify="center">
    <v-overlay
      :value="showOverlay"
      :opacity="1"
      absolute
      :color="$vuetify.theme.themes[theme].overlay"
    >
      <img :src="'/img/logo/logo.svg'" height="100" width="100" alt="logo" />
      <v-progress-linear
        color="primary"
        indeterminate
        rounded
        height="6"
      ></v-progress-linear>
    </v-overlay>

    <v-col cols="12">
      <v-row no-gutters>
        <!--        <v-col cols="12">-->
        <!--          <h1 class="text-h4">Portfolio</h1>-->
        <!--        </v-col>-->

        <client-only>
          <v-row v-if="!showOverlay && balances" class="px-1" data-nosnippet>
            <v-col cols="12" md="6" lg="4" class="pa-1">
              <v-card
                tile
                outlined
                height="522"
                :style="{ backgroundColor: $vuetify.theme.themes[theme].appBg }"
              >
                <v-card-title
                  class="pa-0 ma-0"
                  :style="{
                    backgroundColor: $vuetify.theme.themes[theme].appBg,
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

                <v-card-title
                  v-for="(item, i) in balances.networks"
                  :key="i"
                  class="pa-0 ma-0"
                >
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
            <v-col
              v-for="(network, i) in balances.networks"
              :key="network.chainId"
              cols="12"
              md="6"
              lg="4"
              class="pa-1"
            >
              <v-card tile outlined height="522" style="border-bottom: none">
                <client-only>
                  <balances-grid
                    :grid-height="435"
                    :chain-id="network.chainId"
                    :address="address"
                    :network="network.network"
                    :icon="network.symbol"
                    :cols="balances.cols"
                    :grid-data="balances.data[i]"
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
import { BalanceGrid } from '~/models/balance'
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
      address: (state: any) => state.wallet.address,
    }),
  },
})
export default class Portfolio extends Vue {
  showOverlay = true
  balances: BalanceGrid | null = null
  address!: string
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

    this.balances = new BalanceGrid(this.$store)
    await this.balances.getData()

    setTimeout(() => {
      this.showOverlay = false
    }, 1500)
  }
}
</script>

<style scoped></style>
