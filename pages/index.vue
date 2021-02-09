<template>
  <div class="mb-4">
    <v-row justify="center" style="height: 800px; margin-top: 100px">
      <v-col cols="10">
        <v-row align="center">
          <v-col cols="7">
            <v-row>
              <v-col cols="12">
                <p class="v-heading text-h3 font-weight-regular">
                  Quantify Crypto
                </p>

                <p class="v-heading text-h3 font-weight-regular mb-8">
                  Decentralize Finance Platform
                </p>

                <p class="text-uppercase">
                  Technical Analysis and Intelligence for Cryptocurrency Traders
                </p>
              </v-col>
              <client-only>
                <v-col cols="7">
                  <token-search />
                </v-col>
                <v-col cols="1"><connect-to-wallet-button /></v-col>
              </client-only>
            </v-row>
          </v-col>

          <v-col cols="5">
            <div style="height: 550px">
              <v-img
                max-width="600"
                :src="'/img/landing/Lovepik_com-828897720-25D Business Blockchain Bitcoin Gradient Elements.png'"
                :lazy-src="'/img/landing/Lovepik_com-828897720-25D Business Blockchain Bitcoin Gradient Elements.png'"
                max-height="550"
              />
            </div>
          </v-col>
        </v-row>
        <v-row v-if="isButtonVisible" style="margin-top: 140px">
          <v-col class="py-0"
            ><p class="text-center">
              <v-btn depressed tile height="42" @click="goTo">
                <v-icon size="42"> mdi-chevron-down </v-icon>
              </v-btn>
            </p></v-col
          >
        </v-row>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="10">
        <v-row>
          <v-col
            ><p id="#roadmap" class="text-center text-h3 mt-5">
              Features
            </p></v-col
          >
        </v-row>

        <v-row align="center">
          <v-col
            v-for="item in featureItems"
            :key="item.header"
            cols="auto"
            md="4"
            sm="6"
            style="width: 100%"
          >
            <v-hover v-slot="{ hover }">
              <v-card
                height="250"
                tile
                outlined
                class="px-5"
                :class="{ 'on-hover': hover }"
                :elevation="hover ? 10 : 0"
              >
                <p class="text-center mt-5">
                  <v-icon color="primary" size="50">{{ item.icon }}</v-icon>
                </p>
                <p class="text-center text-h5" v-text="item.header" />
                <p class="text-center" v-text="item.desc" />
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="10">
        <v-row>
          <v-col
            ><p id="#roadmap" class="text-center text-h3 mt-5">
              Roadmap
            </p></v-col
          >
        </v-row>

        <v-row align="center">
          <v-col
            v-for="item in items"
            :key="item.header"
            cols="auto"
            md="4"
            sm="6"
            style="width: 100%"
          >
            <v-hover v-slot="{ hover }">
              <v-card
                height="250"
                tile
                outlined
                class="px-5"
                :class="{ 'on-hover': hover }"
                :elevation="hover ? 10 : 0"
              >
                <p class="text-center mt-5">
                  <v-icon color="primary" size="50">{{ item.icon }}</v-icon>
                </p>
                <p class="text-center text-h5 mt-5" v-text="item.header" />
                <p class="text-center mt-5" v-text="item.desc" />
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TokenSearch from '~/components/common/TokenSearch.vue'
import ConnectToWalletButton from '~/components/wallet/ConnectToWalletButton.vue'

@Component({
  name: 'Index',
  components: { ConnectToWalletButton, TokenSearch },
  head(): object {
    return {
      title: 'DeFi Portfolio Tracker | Account Analysis | Defi Heatmap',
      meta: [
        {
          name: 'description',
          hid: 'description',
          content:
            'NexGen Defi Tools, Tracking, Explorer, Price Alerts and Analysis | Defi Heatmap',
        },
      ],
    }
  },
})
export default class Index extends Vue {
  items = [
    {
      color: 'primary lighten-2',
      icon: 'mdi-star',
      header: 'Ethereum Wallet Connector',
      desc: 'Support for additional software wallets',
    },
    {
      color: 'red lighten-2',
      icon: 'mdi-filter',
      header: 'Liquidity Filters',
      desc: 'Determine the most tradable projects using our liquidity filters',
    },

    {
      color: 'orange lighten-2',
      icon: 'mdi-desktop-mac-dashboard',
      header: 'DeFi Market Overview',
      desc: 'Big picture view of the whole DeFi Market on a single screen.',
    },
    {
      color: 'primary lighten-2',
      icon: 'mdi-currency-usd-circle',
      header: 'Uniswap Screener',
      desc: 'Daily and hourly trends for tokens and token pairs.',
    },
    {
      color: 'red lighten-2',
      icon: 'mdi-bell',
      header: 'Price Alerts',
      desc: 'Customize price alert notifications for your favorite DeFI tokens',
    },
    {
      color: 'red lighten-2',
      icon: 'mdi-information',
      header: 'Information',
      desc: 'Providing all the critical DeFi information you need',
    },
    {
      color: 'red lighten-2',
      icon: 'mdi-newspaper',
      header: 'News',
      desc: 'Latest news for the Defi space',
    },
    {
      color: 'red lighten-2',
      icon: 'mdi-finance',
      header: 'DeFi Movers',
      desc: 'Daily leaders and decliners, New DeFi tokens',
    },
  ]

  featureItems = [
    {
      color: 'primary lighten-2',
      icon: 'mdi-star',
      header: 'Metamask Wallet Connector',
      desc: 'Connect to your Metamask wallet with a single click',
    },
    {
      color: 'primary lighten-2',
      icon: 'mdi-account-reactivate-outline',
      header: 'Uniswap Trader',
      desc:
        'Automated Smart Contract Links for Uniswap Trading, part of our Token Pages',
    },
    {
      color: 'red lighten-2',
      icon: 'mdi-information',
      header: 'Uniswap Analytics',
      desc: 'Providing all the critical DeFi information you need',
    },
    {
      color: 'red lighten-2',
      icon: 'mdi-format-columns',
      header: 'Pairs Heatmap',
      desc:
        'Visually display hundreds of trading pairs on a single screen. Perform search for desired trading pair',
    },
    {
      color: 'red lighten-2',
      icon: 'mdi-chart-box',
      header: 'Token Pages',
      desc:
        'Single screen with Analytics, Price Chart and Uniswap I-frame trading link with Metamask interface',
    },
    {
      color: 'orange lighten-2',
      icon: 'mdi-telegram',
      header: 'Telegram Group',
      desc: 'Exclusive Telegram Group with the latest DeFi intel',
    },
  ]

  isButtonVisible = true

  goTo() {
    this.$vuetify.goTo(1000)
    this.isButtonVisible = false
  }
}
</script>
