<template>
  <v-toolbar-items>
    <v-btn
      class="mt-1 subtitle-2 text-capitalize font-weight-regular"
      text
      color="primary"
      @click="connectToWallet()"
    >
      <div class="white--text">
        Balance —
        <span
          v-if="!walletConnected"
          class="ml-1 subtitle-1 font-weight-medium border-bottom"
          >{{ '$0.00' }}</span
        >

        <!--        <span v-else class="ml-1 subtitle-1 font-weight-medium border-bottom">
          {{ balances.totalBalance }}
        </span>-->
      </div>
    </v-btn>

    <v-btn
      class="mt-1 subtitle-2 text-capitalize font-weight-regular"
      text
      color="primary"
      @click="connectToWallet"
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
            <div :style="{ color: `${$vuetify.theme.themes[theme].baseText}` }">
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
            <v-text-field class="pa-0 ma-0" prepend-inner-icon="mdi-magnify" />
          </v-col>
        </v-row>
      </v-card>
    </v-menu>
  </v-toolbar-items>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { mixins } from 'vue-class-component'
import { MetamaskConnector } from '~/models/wallet'
import { appConfig } from '~/models/app'
import { Balance } from '~/models/balance'
@Component({
  name: 'MainHeaderMenu',
  computed: {
    ...mapState({
      theme: (state: any) => state.ui.theme,
      gas: (state: any) => state.wallet.gasPrice,
      address: (state: any) => state.wallet.address,
      walletConnected: (state: any) => state.wallet.isWalletConnected,
    }),
  },
})
export default class MainHeaderMenu extends mixins(MetamaskConnector) {
  balances: Balance | null = null
  configs = appConfig

  /*  mounted() {
    await this.balances.getBalances()
  } */
}
</script>
