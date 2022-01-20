<template>
  <div class="mb-4">
    <v-row justify="center" style="margin-top: 100px">
      <v-col cols="8" class="text-center">
        <div class="v-heading text-h2">Quantify Crypto</div>
        <div class="v-heading text-h3 font-weight-light mt-3 grey--text">
          Platform for Decentralized finance with verity of features:
        </div>
        <div class="mt-4">
          <client-only>
            <vue-typer
              class="v-heading text-h3 font-weight-light"
              erase-style="backspace"
              :text="animatedFeatures"
              :shuffle="false"
              initial-action="erasing"
              :pre-type-delay="70"
              :type-delay="70"
              :pre-erase-delay="2000"
              :erase-delay="250"
              :erase-on-complete="false"
              caret-animation="smooth"
            ></vue-typer>
          </client-only>
        </div>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="10">
        <v-row>
          <v-col><div class="text-h4 mt-5">Roadmap</div></v-col>
        </v-row>

        <v-row>
          <v-col v-for="item in items" :key="item.header" cols="auto" md="4" sm="6">
            <v-hover v-slot="{ hover }">
              <v-card height="100%" tile outlined class="text-center pa-2" :elevation="hover ? 10 : 0">
                <v-icon color="primary" size="36">{{ item.icon }}</v-icon>
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
import { Vue, Component } from 'vue-property-decorator'
import TokenSearch from '~/components/common/TokenSearch.vue'

@Component({
  name: 'Index',
  components: { TokenSearch },
  head(): object {
    return {
      title: 'Uniswap Trading | Metamask | DeFi Heatmap',
      meta: [
        {
          name: 'description',
          hid: 'description',
          content: 'Automated DEX trading with single click smart contract interface',
        },

        // Open Graph
        {
          name: 'og:title',
          content: 'Uniswap Trading | Metamask | DeFi Heatmap',
        },
        {
          name: 'og:description',
          content: 'Automated DEX trading with single click smart contract interface',
        },
        { name: 'og:type', content: 'website' },
        { name: 'og:url', content: process.env.baseURL },
        {
          name: 'og:image',
          content: 'https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/website-img/DeFiHeatmapHomepage.jpg',
        },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@Quantify_Crypto' },
        {
          name: 'twitter:title',
          content: 'Uniswap Trading | Metamask | DeFi Heatmap',
        },
        {
          name: 'twitter:description',
          content: 'Automated DEX trading with single click smart contract interface',
        },
        {
          name: 'twitter:image',
          content: 'https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/website-img/DeFiHeatmapHomepage.jpg',
        },
        {
          name: 'twitter:image:alt',
          content: 'https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/website-img/DeFiHeatmapHomepage.jpg',
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
      header: 'Portfolio Visualization',
      desc: '',
    },

    {
      color: 'primary lighten-2',
      icon: 'mdi-star',
      header: 'Interactive trading Using recent blockchain data',
      desc: '',
    },
    {
      color: 'primary lighten-2',
      icon: 'mdi-star',
      header: 'Support of the Latest DeFi Protocols',
      desc: '',
    },
    {
      color: 'primary lighten-2',
      icon: 'mdi-star',
      header: 'Latest Blockchain Data',
      desc: '',
    },
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
      desc: 'Automated Smart Contract Links for Uniswap Trading, part of our Token Pages',
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
      desc: 'Visually display hundreds of trading pairs on a single screen. Perform search for desired trading pair',
    },
    {
      color: 'red lighten-2',
      icon: 'mdi-chart-box',
      header: 'Token Pages',
      desc: 'Single screen with Analytics, Price Chart and Uniswap I-frame trading link with Metamask interface',
    },
    {
      color: 'orange lighten-2',
      icon: 'mdi-send',
      header: 'Telegram Group',
      desc: 'Exclusive Telegram Group with the latest DeFi intel',
    },
  ]

  get animatedFeatures() {
    return this.featureItems.map((elem) => elem.header)
  }

  isButtonVisible = true
}
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
