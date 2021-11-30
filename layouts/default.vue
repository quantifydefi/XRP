<template>
  <v-app>
    <v-app-bar app class="text-no-wrap" elevation="0">
      <v-btn v-if="$vuetify.breakpoint.mdAndDown" class="mr-1 mt-1" icon>
        <v-icon>mdi-menu</v-icon>
      </v-btn>

      <!--      Change it to separate component-->
      <v-toolbar-title v-if="$vuetify.breakpoint.mdAndUp">
        <v-avatar
          v-if="$route.name === 'app-id-aave' || $route.name === 'app-id-curve'"
          size="28"
          class="mr-2"
        >
          <img
            :src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${
              protocolSrc[$route.name]
            }.png`"
          />
        </v-avatar>
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
          <span class="ml-1 subtitle-1 font-weight-medium border-bottom">
            Balance — {{ totalBalance }}
          </span>
        </span>
      </v-btn>

      <client-only>
        <v-menu
          v-if="currentChain"
          :close-on-content-click="false"
          :nudge-width="500"
          :nudge-left="0"
          nudge-bottom="13"
          offset-y
          max-width="500"
        >
          <template #activator="{ on, attrs }">
            <div class="d-flex">
              <v-btn
                width="280"
                tile
                class="text-capitalize text-subtitle-2"
                depressed
                color="transparent"
                v-bind="attrs"
                v-on="on"
              >
                <v-row no-gutters>
                  <v-col cols="2">
                    <v-avatar size="18px">
                      <v-img :src="currentChain.logoUrl" />
                    </v-avatar>
                  </v-col>

                  <v-col class="text-left">
                    {{ currentChain.label }}
                  </v-col>
                </v-row>

                <v-icon right>mdi-chevron-down</v-icon>
              </v-btn>
            </div>
          </template>

          <v-card outlined tile width="600">
            <v-row no-gutters>
              <v-col>
                <v-list dense>
                  <v-subheader>MAIN NET</v-subheader>
                  <v-list-item-group
                    v-model="conf.selectedChainId"
                    color="primary"
                  >
                    <v-list-item
                      v-for="item in mainNetChains"
                      :key="item.chainId"
                      :value="item.chainId"
                    >
                      <v-list-item-avatar size="24">
                        <v-img :src="item.logoUrl"></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.label"
                        ></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>
              <v-col>
                <v-list dense>
                  <v-subheader>TEST NET</v-subheader>
                  <v-list-item-group
                    v-model="conf.selectedChainId"
                    color="primary"
                  >
                    <v-list-item
                      v-for="item in testNetChains"
                      :key="item.chainId"
                      :value="item.chainId"
                    >
                      <v-list-item-avatar size="24">
                        <v-img s :src="item.logoUrl"></v-img>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.label"
                        ></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-col>
            </v-row>
          </v-card>
        </v-menu>
      </client-only>

      <v-menu
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
              class="mt-1 subtitle-2 text-capitalize font-weight-regular"
              text
              tile
              :class="
                ui[theme].headerTextClass +
                ` subtitle-2 text-capitalize elevation-0`
              "
              v-bind="attrs"
              v-on="on"
            >
              <div>
                <v-icon>mdi-gas-station</v-icon>
                <span class="ml-1">
                  {{ gas.fast }}
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

      <!--      Wallet Menu-->
      <v-btn
        class="mt-1 subtitle-2 text-capitalize font-weight-regular"
        text
        tile
        @click="initMetamask"
      >
        <div :class="ui[theme].headerTextClass">
          <v-icon :color="walletConnected ? 'green' : 'orange'"
            >mdi-wallet
          </v-icon>
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
    </v-app-bar>
    <v-main>
      <v-container style="max-width: 3000px">
        <nuxt />
      </v-container>
    </v-main>

    <main-navigation-menu />

    <notification ref="notificationComponent" />

    <deposit-modal></deposit-modal>
    <borrow-modal></borrow-modal>
    <lend-modal></lend-modal>
    <withdraw-modal></withdraw-modal>
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
import { appConfig } from '~/models/app'
import { AppConfigInterface } from '~/types/app'
import { Balance } from '~/models/balance'
import DepositModal from '~/components/app/DepositModal.vue'
import BorrowModal from '~/components/app/BorrowModal.vue'
import LendModal from '~/components/app/LendModal.vue'
import WithdrawModal from '~/components/app/WithdrawModal.vue'
import { MetamaskConnector } from '~/models/wallet'
import { Config } from '~/models/config'

@Component({
  name: 'Default',
  components: {
    WithdrawModal,
    LendModal,
    BorrowModal,
    DepositModal,
    ApiMenuHeader,
    Notification,
    MainNavigationMenu,
  },
  computed: {
    ...mapState({
      theme: (state: any) => state.ui.theme,
      ui: (state: any) => state.ui,
      gas: (state: any) => state.wallet.gasPrice,
      address: (state: any) => state.wallet.address,
      walletConnected: (state: any) => state.wallet.isWalletConnected,
      totalBalance: (state: any) => state.wallet.totalBalance,
    }),
  },
})
export default class Default extends mixins(
  LayoutMixin,
  MetamaskConnector,
  Config
) {
  $refs!: { notificationComponent: any }
  walletConnected: any

  allowApiBar =
    process.env.runEnv === 'development' || process.env.runEnv === 'staging'

  configs: AppConfigInterface | null = appConfig
  balances: Balance | null = null

  pageTitle = {
    index: 'Dashboard',
    terminal: 'Terminal',
    'portfolio-balances': 'Balances',
    heatmap: 'Heatmap',
    'trading-101': 'Trading 101',
    team: 'Our Team',
    'wallet-id': 'Portfolio',
    'app-id-aave': 'Aave v2',
    'app-id-curve': 'Curve',
  }

  protocolSrc = {
    'app-id-aave': 'aave',
    'app-id-curve': 'crv',
  }

  async mounted() {
    /** Fetch CoinGecko supported tokens **/
    // await this.$store.dispatch('coinList/getCoinGeckoTokenList')

    this.$root.$on(Events.GLOBAL_NOTIFICATION, (data: any) => {
      try {
        this.$refs.notificationComponent.openNotification(data.text)
      } catch {}
    })
    await this.$store.dispatch('wallet/gasPrices')
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

//------------------ Global background---------------

.theme--dark.v-application {
  background-color: #121212;
}

.theme--light.v-application {
  background-color: #fafafa;
}

// -------------- Header ---------------------------
.theme--dark.v-app-bar.v-toolbar.v-sheet {
  background-color: #121212;
  margin-top: -1px;
  border-bottom: 1px solid #2f2f2f;
}

.theme--light.v-app-bar.v-toolbar.v-sheet {
  background-color: #fff;
  margin-top: -1px;
  border-bottom: 1px solid #e0e0e0;
}

// -------------- v-list ---------------------------
.theme--dark.v-list {
  background: #121212;
}

.theme--light.v-list {
  background: #ffffff;
}

//------------------------ v-card-------------------------

.theme--dark.v-card {
  background-color: #121212;
  color: #ffffff;
}

//-------------------------- nav-bar---------------------------
.theme--dark.v-navigation-drawer {
  background-color: #121212;
}

// ---------------------------Data-Table---------------------

.theme--dark.v-data-table {
  background-color: #121212;
  color: #ffffff;
}

//----------------------------V-Menu--------------------------

.v-menu__content {
  overflow-y: inherit;
  overflow-x: inherit;
  contain: inherit;
  max-height: 500px !important;
  max-width: 100%;
  text-align: left;
}

.theme--light .v-card .v-data-table__wrapper::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background-color: #e6e6e6;
}

.theme--light .v-card .v-data-table__wrapper::-webkit-scrollbar-track {
  background: #e6e6e6;
  border-left: 1px solid #dadada;
}

.theme--light .v-card .v-data-table__wrapper::-webkit-scrollbar-thumb {
  background: #b0b0b0;
  border: solid 1px #e6e6e6;
  border-radius: 7px;
}

.theme--dark .v-card .v-data-table__wrapper::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.theme--dark .v-card .v-data-table__wrapper::-webkit-scrollbar-track {
  background: #202020;
  border-left: 1px solid #2c2c2c;
}

.theme--dark .v-card .v-data-table__wrapper::-webkit-scrollbar-thumb {
  background: #3e3e3e;
  border: solid 1px #202020;
  border-radius: 7px;
}
</style>
