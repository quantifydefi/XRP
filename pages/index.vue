<template>
  <div class="mb-4">
    <v-row justify="center" class="mt-4">
      <v-col cols="11" class="text-center">
        <h1 class="v-heading text-h2 font-weight-regular">EVMx <span class="title">[Beta]</span></h1>
        <div class="v-heading text-h4 font-weight-light mt-3 grey--text">
          Platform for Decentralized finance with variety of features:
        </div>
        <div class="mt-4">
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
        </div>
      </v-col>
    </v-row>

    <v-row>
      <client-only>
        <v-col>
          <recent-prices-chart />
        </v-col>
      </client-only>
    </v-row>

    <v-row justify="center">
      <v-col cols="10">
        <v-row>
          <v-col>
            <div class="text-h4 mt-5">Roadmap</div>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col v-for="item in items" :key="item.header" cols="12" md="4" sm="6">
            <v-hover v-slot="{ hover }">
              <v-card height="100%" tile outlined class="pa-2 text-center" :elevation="hover ? 10 : 0">
                <v-avatar size="40" class="mt-3" :color="$vuetify.theme.dark ? 'grey darken-4' : 'grey lighten-3'">
                  <v-icon size="30" color="primary">{{ item.icon }}</v-icon>
                </v-avatar>

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
import RecentPricesChart from '~/components/common/RecentPricesChart.vue'
@Component({
  name: 'Index',
  components: { TokenSearch, RecentPricesChart },
  head(): object {
    return {
      title: 'NFT and DeFi Investments” | EVM Ethereum Virtual Machine',
      meta: [
        {
          name: 'description',
          hid: 'description',
          content:
            'Premiere Decentralize Financial interface for NFTs, Aave, Curve, Balancer, Uniswap and leading DeFi protocols',
        },

        // Open Graph
        {
          name: 'og:title',
          content: 'NFT and DeFi Investments” | EVM Ethereum Virtual Machine',
        },
        {
          name: 'og:description',
          content:
            'Premiere Decentralize Financial interface for NFTs, Aave, Curve, Balancer, Uniswap and leading DeFi protocols',
        },
        { name: 'og:type', content: 'website' },
        { name: 'og:url', content: process.env.baseURL },
        {
          name: 'og:image',
          content: 'https://quantifycrypto.s3.us-west-2.amazonaws.com/pictures/website-img/EVMXHomePage.jpg',
        },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@Quantify_Crypto' },
        {
          name: 'twitter:title',
          content: 'NFT and DeFi Investments” | EVM Ethereum Virtual Machine',
        },
        {
          name: 'twitter:description',
          content:
            'Premiere Decentralize Financial interface for NFTs, Aave, Curve, Balancer, Uniswap and leading DeFi protocols',
        },
        {
          name: 'twitter:image',
          content: 'https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/website-img/EVMXHomepage.jpg',
        },
        {
          name: 'twitter:image:alt',
          content: 'https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/website-img/EVMXHomepage.jpg',
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
      icon: 'mdi-currency-usd',
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
