<template>
  <v-app>
    <v-app-bar app class="text-no-wrap" elevation="0">
      <v-btn v-if="$vuetify.breakpoint.mdAndDown" class="mr-1 mt-1" icon>
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <!--      Change it to separate component-->
      <v-toolbar-title v-if="$vuetify.breakpoint.mdAndUp">
        {{ pageTitle[$route.name] }}
      </v-toolbar-title>
      <v-spacer />

      <v-btn
        v-if="totalBalance.length"
        class="mt-1 subtitle-2 text-capitalize font-weight-regular"
        text
        tile
        depressed
        color="transparent"
        to="/portfolio/balances"
      >
        <span :class="ui[theme].headerTextClass">
          <span class="ml-1 subtitle-1 font-weight-medium border-bottom"> Balance — {{ totalBalance }} </span>
        </span>
      </v-btn>

      <!--  Network Menu    -->
      <client-only>
        <v-menu v-if="currentChain" :close-on-content-click="false" nudge-bottom="13" offset-y>
          <template #activator="{ on, attrs }">
            <v-badge dot overlap :color="address ? 'green' : 'red'" class="mr-2">
              <v-btn
                fab
                x-small
                width="30"
                height="30"
                elevation="1"
                :color="$vuetify.theme.dark ? 'grey darken-4' : 'grey lighten-4'"
                class="mt-1 mr-2"
                v-bind="attrs"
                v-on="on"
              >
                <v-avatar size="26"><v-img :src="currentChain.logoUrl"></v-img></v-avatar>
              </v-btn>
            </v-badge>
          </template>

          <v-card outlined tile>
            <v-row no-gutters>
              <v-col>
                <v-list dense>
                  <v-subheader>Select Network</v-subheader>
                  <v-list-item-group v-model="conf.selectedChainId" color="primary">
                    <v-list-item v-for="item in mainNetChains" :key="item.chainId" :value="item.chainId">
                      <v-list-item-avatar size="24">
                        <v-img :src="item.logoUrl"></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title v-text="item.label"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>
            </v-row>
          </v-card>
        </v-menu>
      </client-only>

      <client-only>
        <v-menu
          v-if="gas"
          :close-on-content-click="false"
          :nudge-width="300"
          :nudge-left="200"
          nudge-bottom="10"
          offset-y
          max-width="300"
        >
          <template #activator="{ on, attrs }">
            <div class="d-flex">
              <v-btn
                class="mt-1 subtitle-2 px-2 text-capitalize font-weight-regular"
                text
                tile
                :class="ui[theme].headerTextClass + ` subtitle-2 text-capitalize elevation-0`"
                v-bind="attrs"
                v-on="on"
              >
                <div>
                  <v-icon>mdi-gas-station</v-icon>
                  <span class="ml-1">
                    {{ gas.fastGasPrice }}
                  </span>
                  <v-icon small>mdi-chevron-down</v-icon>
                </div>
              </v-btn>
            </div>
          </template>

          <v-card outlined tile>
            <v-row no-gutters class="px-3 py-1">
              <v-col cols="12">
                <div class="text-subtitle-2">Current Gas Prices</div>
              </v-col>
              <v-col cols="12">
                <span class="text-caption grey--text lighten-2"> Gas fees on the Ethereum Network </span></v-col
              >
            </v-row>
            <v-divider class="my-1" />
            <v-row no-gutters class="text-center caption pb-2">
              <v-col>
                <div>Fast</div>
                <div class="subtitle-2">{{ gas.fastGasPrice }} GWEI</div>
              </v-col>
              <v-col>
                <div>Average</div>
                <div class="subtitle-2">{{ gas.proposeGasPrice }} GWEI</div>
              </v-col>
              <v-col>
                <div>Slow</div>
                <div class="subtitle-2">{{ gas.safeGasPrice }} GWEI</div>
              </v-col>
            </v-row>
          </v-card>
        </v-menu>
      </client-only>

      <!--      Wallet Menu-->
      <client-only>
        <v-btn class="mt-1 px-2 subtitle-2 text-capitalize font-weight-regular" text tile @click="openMetamaskDialog()">
          <div :class="ui[theme].headerTextClass">
            <v-icon v-if="!walletConnected" :color="walletConnected ? 'green' : 'orange'">mdi-wallet </v-icon>
            <v-avatar v-else tile size="24" class="rounded"><v-img :src="iconSrc"></v-img></v-avatar>
            <span v-if="$vuetify.breakpoint.mdAndUp" class="ml-2">
              {{
                !walletConnected
                  ? 'connect wallet'
                  : `${address.slice(0, 5)}...${address.slice(address.length - 4, address.length)}`
              }}
            </span>
          </div>
        </v-btn>
      </client-only>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>

    <main-navigation-menu />
    <notification ref="notificationComponent" />
  </v-app>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { mapState } from 'vuex'
import { create } from 'blockies-ts'

import Notification from '../components/common/Notification.vue'
import ApiMenuHeader from '../components/common/ApiMenuHeader.vue'
import MainNavigationMenu from '~/components/common/ui/menu/MainNavigationMenu.vue'
import { Events } from '~/types/global'
import LayoutMixin from '~/mixins/LayoutMixin.vue'
import { MetamaskConnector } from '~/models/wallet'
import { Config } from '~/models/config'

@Component({
  name: 'Default',
  components: {
    ApiMenuHeader,
    Notification,
    MainNavigationMenu,
  },
  computed: {
    ...mapState({
      theme: (state: any) => state.ui.theme,
      ui: (state: any) => state.ui,
      gas: (state: any) => state.configs.gasStats,
      address: (state: any) => state.wallet.address,
      walletConnected: (state: any) => state.wallet.isWalletConnected,
      totalBalance: (state: any) => state.wallet.totalBalance,
    }),
  },
})
export default class Default extends mixins(LayoutMixin, MetamaskConnector, Config) {
  address!: any
  $refs!: { notificationComponent: any }
  walletConnected: any
  allowApiBar = process.env.runEnv === 'development' || process.env.runEnv === 'staging'

  pageTitle = {
    index: 'Dashboard',
    terminal: 'Terminal',
    protocols: 'Protocols',
    'portfolio-balances': 'Balances',
    'portfolio-transactions': 'Transactions',
    heatmap: 'Heatmap',
    'trading-101': 'Trading 101',
    team: 'Our Team',
    'wallet-id': 'Portfolio',
    'app-id-aave': 'Aave v2',
    'app-id-curve': 'Curve',
  }

  get iconSrc() {
    return process.client ? create({ seed: this.address }).toDataURL() : ''
  }

  async mounted() {
    await this.$root.$on(Events.GLOBAL_NOTIFICATION, (data: any) => {
      try {
        this.$refs.notificationComponent.openNotification(data.text)
      } catch {}
    })
  }
}
</script>

<style lang="scss">
.coin-link:hover {
  color: #536aff !important;
  font-weight: 500 !important;
}

.border-bottom {
  border-bottom: 3px solid #e91e63;
  padding-bottom: 3px;
}
</style>
