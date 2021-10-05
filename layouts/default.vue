<template>
  <v-app v-if="defiApp">
    <v-app-bar
      app
      tile
      class="text-no-wrap"
      :color="$vuetify.theme.themes[theme].overlay"
      elevation="0"
      :style="{
        marginTop: '-2px',
        borderBottom: `1px solid ${$vuetify.theme.themes[theme].outline}`,
      }"
    >
      <v-btn
        v-if="$vuetify.breakpoint.mdAndDown"
        class="mr-1 pt-1"
        icon
        @click="toggleNavigationMenu"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title v-if="$vuetify.breakpoint.mdAndUp">{{
        pageTitle[$route.name]
      }}</v-toolbar-title>
      <v-spacer />

      <v-btn
        class="pt-1 subtitle-1 text-capitalize font-weight-regular"
        tile
        text
        color="primary"
        @click="initMetamask('/portfolio')"
      >
        <div :style="{ color: `${$vuetify.theme.themes[theme].baseText}` }">
          Balance —
          <span class="text-h6 font-weight-medium">{{
            !walletConnected ? '$0.00' : '$10,000.00'
          }}</span>
        </div>
      </v-btn>

      <v-btn
        class="pt-1 subtitle-1 text-capitalize font-weight-regular"
        tile
        text
        color="primary"
        @click="initMetamask('/')"
      >
        <div :style="{ color: `${$vuetify.theme.themes[theme].baseText}` }">
          <v-icon>mdi-wallet</v-icon>
          <span v-if="$vuetify.breakpoint.mdAndUp" class="ml-2">
            {{
              !walletConnected
                ? 'connect wallet'
                : `${address.slice(0, 5)}...${address.slice(
                    address.length - 4,
                    address.length
                  )}`
            }}
          </span>
        </div>
      </v-btn>

      <!-- Network Menu -->
      <div class="mr-2">
        <v-menu offset-y tile>
          <template #activator="{ on, attrs }">
            <v-btn
              class="subtitle-1 text-capitalize justify-start elevation-0"
              style="border: 0"
              outlined
              color="primary"
              tile
              dark
              v-bind="attrs"
              v-on="on"
            >
              <v-row
                no-gutters
                :style="{ color: $vuetify.theme.themes[theme].baseText }"
              >
                <div style="margin-top: 1px; margin-left: -7px">
                  <v-avatar size="24">
                    <img
                      :src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${defiApp.configs.networks.defaultNetwork.icon}.png`"
                  /></v-avatar>
                </div>

                <div
                  v-if="$vuetify.breakpoint.mdAndUp"
                  class="mt-1 pl-2 d-flex"
                >
                  <div>
                    {{ defiApp.configs.networks.defaultNetwork.networkName }}
                  </div>
                </div>
                <v-icon small class="pl-2">mdi-chevron-down</v-icon>
              </v-row>
            </v-btn>
          </template>
          <v-list
            outlined
            :style="{ backgroundColor: $vuetify.theme.themes[theme].appBg }"
          >
            <v-list-item
              v-for="item in defiApp.configs.networks.networkOptions"
              :key="item.chainId"
              :style="{ backgroundColor: $vuetify.theme.themes[theme].appBg }"
              @click="changeNetwork(item)"
            >
              <v-list-item-title class="subtitle-2 font-weight-regular">
                <v-avatar size="20" class="mr-2">
                  <img
                    :src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${item.icon}.png`"
                /></v-avatar>
                {{ item.networkName }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <!-- Gas Menu -->
      <v-menu
        :close-on-content-click="false"
        :nudge-width="300"
        offset-y
        max-width="300"
      >
        <template #activator="{ on, attrs }">
          <div class="d-flex">
            <v-btn
              tile
              icon
              text
              target="_blank"
              height="24"
              width="24"
              v-bind="attrs"
              color="primary"
              v-on="on"
            >
              <v-icon
                :color="$vuetify.theme.themes[theme].baseText"
                class="pr-2"
                >mdi-gas-station</v-icon
              >
            </v-btn>
            <div class="mr-3">
              {{ gas.fast }}
            </div>
          </div>
        </template>

        <v-card
          tile
          outlined
          :style="{ backgroundColor: $vuetify.theme.themes[theme].appBg }"
        >
          <v-row no-gutters class="px-3 py-1">
            <v-col cols="12">
              <div class="text-subtitle-2">Current Gas Prices</div>
            </v-col>
            <v-col cols="12">
              <span class="text-caption grey--text lighten-2">
                Gas fees on the Ethereum Network
              </span></v-col
            >
          </v-row>
          <v-divider class="my-1" />
          <v-row no-gutters class="text-center caption pb-2">
            <v-col>
              <div>Fast</div>
              <div class="subtitle-2">{{ gas.fast }} GWEI</div>
            </v-col>
            <v-col>
              <div>Average</div>
              <div class="subtitle-2">{{ gas.average }} GWEI</div>
            </v-col>
            <v-col>
              <div>Slow</div>
              <div class="subtitle-2">{{ gas.slow }} GWEI</div>
            </v-col>
          </v-row>
        </v-card>
      </v-menu>

      <!-- Search Menu -->
      <v-menu :close-on-content-click="false" :nudge-width="300" offset-y>
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            target="_blank"
            height="24"
            width="24"
            class="mx-2"
            v-bind="attrs"
            color="primary"
            v-on="on"
          >
            <v-icon
              :color="$vuetify.theme.themes[theme].baseText"
              class="pa-0 ma-0"
              >mdi-magnify</v-icon
            >
          </v-btn>
        </template>

        <v-card
          tile
          outlined
          :style="{ backgroundColor: $vuetify.theme.themes[theme].appBg }"
        >
          <v-row no-gutters class="px-3 py-1">
            <v-col cols="12">
              <span class="text-subtitle-2">Search</span>
            </v-col>
            <v-col cols="12">
              <span class="text-caption grey--text lighten-2">
                Search Coins by name
              </span></v-col
            >
          </v-row>
          <v-divider class="my-1" />
          <v-row no-gutters>
            <v-col class="px-2">
              <v-text-field
                class="pa-0 ma-0"
                prepend-inner-icon="mdi-magnify"
              />
            </v-col>
          </v-row>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container style="max-width: 3000px">
        <nuxt />
      </v-container>
    </v-main>

    <main-navigation-menu />

    <!--    <v-footer-->
    <!--      fixed-->
    <!--      app-->
    <!--      :color="$vuetify.theme.themes[theme].overlay"-->
    <!--      :style="{-->
    <!--        borderTop: `1px solid ${$vuetify.theme.themes[theme].outline}`,-->
    <!--      }"-->
    <!--    >-->
    <!--      <span>Defi Heatmap &copy; {{ new Date().getFullYear() }}</span>-->
    <!--    </v-footer>-->
    <notification ref="notificationComponent" />
  </v-app>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { mapState } from 'vuex'
import Notification from '../components/common/Notification.vue'
import ApiMenuHeader from '../components/common/ApiMenuHeader.vue'
import MainNavigationMenu from '~/components/common/ui/menu/MainNavigationMenu.vue'
import { Events } from '~/types/global'
import LayoutMixin from '~/mixins/LayoutMixin.vue'
import MetamaskMixin from '~/mixins/MetamaskMixin.vue'
import { EmitEvents } from '~/types/events'
import { DefiApp } from '~/models/app'
import { ChainOptions } from '~/types/balance'

@Component({
  name: 'Default',
  components: { ApiMenuHeader, Notification, MainNavigationMenu },
  computed: {
    ...mapState({
      theme: (state: any) => state.ui.theme,
      gas: (state: any) => state.wallet.gasPrice,
      address: (state: any) => state.wallet.address,
      walletConnected: (state: any) => state.wallet.isWalletConnected,
    }),
  },
})
export default class Default extends mixins(LayoutMixin, MetamaskMixin) {
  clipped = false
  drawer = false
  fixed = false
  miniVariant = false
  $refs!: { notificationComponent: any }

  allowApiBar =
    process.env.runEnv === 'development' || process.env.runEnv === 'staging'

  defiApp: DefiApp | null = null

  pageTitle = {
    index: 'Dashboard',
    terminal: 'Terminal',
    heatmap: 'Heatmap',
    'trading-101': 'Trading 101',
    team: 'Our Team',
    'wallet-id': 'Portfolio',
  }

  /** On network change, redirect page to selected network. **/
  changeNetwork(network: {
    networkName: string
    chainId: ChainOptions
    icon: string
  }) {
    if (this.defiApp) {
      this.defiApp.configs.networks.defaultNetwork = network

      // if (this.$route.name !== 'app') {
      //   const path = this.$route.path.split('/')
      //   path[2] = network.chainId.toString()
      //
      //   this.$router.push(path.join('/'))
      // }
    }
  }

  mounted() {
    this.defiApp = new DefiApp()

    this.$root.$on(Events.GLOBAL_NOTIFICATION, (data: any) => {
      try {
        this.$refs.notificationComponent.openNotification(data.text)
      } catch {}
    })

    this.$store.dispatch('wallet/gasPrices')
  }

  toggleNavigationMenu() {
    this.$root.$emit(EmitEvents.toggleNavigationMenu)
  }
}
</script>
