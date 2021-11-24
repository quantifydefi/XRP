<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <v-app-bar
      v-if="configs"
      app
      class="text-no-wrap"
      :color="$vuetify.theme.themes[theme].background"
      elevation="0"
      :style="{
        marginTop: '-1px',
        borderBottom: `1px solid ${$vuetify.theme.themes[theme].outline}`,
      }"
    >
      <v-btn
        v-if="$vuetify.breakpoint.mdAndDown"
        class="mr-1 mt-1"
        icon
        @click="toggleNavigationMenu"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
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
        class="mt-1 subtitle-2 text-capitalize font-weight-regular"
        text
        color="primary"
        @click="initMetamask('/portfolio')"
      >
        <div :style="{ color: `${$vuetify.theme.themes[theme].baseText}` }">
          Balance —
          <span
            v-if="!walletConnected"
            class="ml-1 subtitle-1 font-weight-medium border-bottom"
            >{{ '$0.00' }}</span
          >

          <span v-else class="ml-1 subtitle-1 font-weight-medium border-bottom">
            {{ balances.totalBalance }}
          </span>
        </div>
      </v-btn>

      <v-btn
        class="mt-1 subtitle-2 text-capitalize font-weight-regular"
        text
        color="primary"
        @click="initMetamask($route.path)"
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
      <v-menu offset-y>
        <template #activator="{ on, attrs }">
          <v-btn
            class="
              subtitle-2
              font-weight-regular
              text-capitalize
              justify-start
              elevation-0
            "
            style="border: 0"
            outlined
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            <v-row
              no-gutters
              :style="{
                color: $vuetify.theme.themes[theme].baseText,
                marginRight: '-5px',
              }"
            >
              <div style="margin-top: 1px; margin-left: -5px">
                <v-avatar size="20">
                  <img
                    :src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${configs.networks.defaultNetwork.symbol}.png`"
                /></v-avatar>
              </div>

              <div v-if="$vuetify.breakpoint.mdAndUp" class="pl-2 mt-1 d-flex">
                <div>
                  {{ configs.networks.defaultNetwork.networkName }}
                </div>
              </div>
              <v-icon small class="pl-2">mdi-chevron-down</v-icon>
            </v-row>
          </v-btn>
        </template>
        <v-list
          outlined
          :style="{ backgroundColor: $vuetify.theme.themes[theme].background }"
        >
          <v-list-item
            v-for="item in configs.networks.networkOptions"
            :key="item.chainId"
            :style="{
              backgroundColor: $vuetify.theme.themes[theme].background,
            }"
            @click="changeNetwork(item)"
          >
            <v-list-item-title class="subtitle-2 font-weight-regular">
              <v-avatar size="20" class="mr-1">
                <img
                  :src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${item.symbol}.png`"
              /></v-avatar>
              {{ item.networkName }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Gas Menu -->
      <!--   Only show gas prices if chain id is ethereum -->
      <v-menu
        v-if="configs.networks.defaultNetwork.chainId === 1"
        :close-on-content-click="false"
        :nudge-width="300"
        offset-y
        max-width="300"
      >
        <template #activator="{ on, attrs }">
          <div class="d-flex">
            <v-btn
              class="mt-1 subtitle-2 text-capitalize font-weight-regular"
              text
              color="primary"
              v-bind="attrs"
              v-on="on"
            >
              <div
                :style="{ color: `${$vuetify.theme.themes[theme].baseText}` }"
              >
                <v-icon>mdi-gas-station</v-icon>
                <span class="ml-1">
                  {{ gas.fast }}
                </span>
                <v-icon small>mdi-chevron-down</v-icon>
              </div>
            </v-btn>
          </div>
        </template>

        <v-card
          outlined
          :style="{ backgroundColor: $vuetify.theme.themes[theme].background }"
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
            class="mx-2 mt-1"
            v-bind="attrs"
            color="primary"
            v-on="on"
          >
            <v-icon
              :color="$vuetify.theme.themes[theme].baseText"
              class="pa-0 ma-0"
              >mdi-magnify
            </v-icon>
          </v-btn>
        </template>

        <v-card
          outlined
          :style="{ backgroundColor: $vuetify.theme.themes[theme].background }"
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
import detectEthereumProvider from '@metamask/detect-provider'
import Notification from '../components/common/Notification.vue'
import ApiMenuHeader from '../components/common/ApiMenuHeader.vue'
import MainNavigationMenu from '~/components/common/ui/menu/MainNavigationMenu.vue'
import { Events } from '~/types/global'
import LayoutMixin from '~/mixins/LayoutMixin.vue'
import MetamaskMixin from '~/mixins/MetamaskMixin.vue'
import { EmitEvents } from '~/types/events'
import { appConfig } from '~/models/app'
import { ChainOptions } from '~/types/balance'
import { AppConfigInterface } from '~/types/app'
import { Balance } from '~/models/balance'
import DepositModal from '~/components/app/DepositModal.vue'
import BorrowModal from '~/components/app/BorrowModal.vue'
import LendModal from '~/components/app/LendModal.vue'
import WithdrawModal from '~/components/app/WithdrawModal.vue'

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
      gas: (state: any) => state.wallet.gasPrice,
      address: (state: any) => state.wallet.address,
      walletConnected: (state: any) => state.wallet.isWalletConnected,
    }),
  },
})
export default class Default extends mixins(LayoutMixin, MetamaskMixin) {
  $refs!: { notificationComponent: any }
  walletConnected: any

  allowApiBar =
    process.env.runEnv === 'development' || process.env.runEnv === 'staging'

  configs: AppConfigInterface | null = null
  balances: Balance | null = null

  pageTitle = {
    index: 'Dashboard',
    terminal: 'Terminal',
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
    await this.$store.dispatch('coinList/getCoinGeckoTokenList')

    this.configs = appConfig

    this.balances = Balance.getInstance(this.$store)

    this.$root.$on(Events.GLOBAL_NOTIFICATION, (data: any) => {
      try {
        this.$refs.notificationComponent.openNotification(data.text)
      } catch {}
    })

    await this.$store.dispatch('wallet/gasPrices')

    await this.initMetamask(this.$route.path)
    /**
     Listener for account change
     */
    const provider: any = await detectEthereumProvider()

    if (provider) {
      await provider.request({ method: 'eth_accounts' })
      provider.on('accountsChanged', (accounts: string[]) => {
        if (!accounts.length) {
          this.$store.dispatch('wallet/metamaskLogout')
          // this.$router.push('/')
        }
      })
    }

    await this.balances.getBalances()
  }

  /** On network change, redirect page to selected network. **/
  changeNetwork(network: {
    networkName: string
    chainId: ChainOptions
    symbol: string
  }) {
    if (this.configs) {
      this.configs.networks.defaultNetwork = network
      const pages: string[] = ['app-id-aave', 'app-id-transactions']
      const route: string = this.$route.name!

      if (pages.includes(route)) {
        const path = this.$route.path.split('/')
        path[2] = network.chainId.toString()

        this.$router.push(path.join('/'))
      }
    }
  }

  toggleNavigationMenu() {
    this.$root.$emit(EmitEvents.toggleNavigationMenu)
  }
}
</script>

<style lang="scss">
.coin-link:hover {
  color: #536aff !important;
  font-weight: 500 !important;
}

.border-bottom {
  border-bottom: 2px solid #536aff;
  padding-bottom: 3px;
}
</style>
