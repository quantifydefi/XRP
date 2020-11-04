<template>
  <v-row justify="center">
    <v-col cols="8">
      <h1 class="text-h3">Roadmap</h1>
      <client-only>
        <v-timeline align-top :dense="$vuetify.breakpoint.smAndDown">
          <v-timeline-item
            v-for="(item, i) in items"
            :key="i"
            :color="item.color"
            :icon="item.icon"
            fill-dot
          >
            <v-card tile outlined :color="item.color">
              <v-card-title class="title"> {{ item.header }} </v-card-title>
              <v-card-text class="white text--primary">
                <p>{{ item.desc }}</p>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </client-only>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'Roadmap',
  components: {},
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
      header: 'Ethereum Wallet connector',
      desc: 'Ethereum wallet connector for viewing your Uniswap portfolio',
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
      header: 'Token Pairs',
      desc: 'Daily and hourly trends for tokens and token pairs.',
    },
    {
      color: 'red lighten-2',
      icon: 'mdi-bell',
      header: 'Price Alerts',
      desc: 'Customize price alert notifications for your favorite DeFI tokens',
    },
    {
      color: 'orange lighten-2',
      icon: 'mdi-telegram',
      header: 'Telegram Group',
      desc: 'Exclusive Telegram Group with the latest DeFi intel',
    },
    {
      color: 'primary lighten-2',
      icon: 'mdi-account-reactivate-outline',
      header: 'Uniswap Treader',
      desc: 'Build for the Uniswap Trader',
    },
    {
      color: 'red lighten-2',
      icon: 'mdi-information',
      header: 'Information',
      desc: 'Providing all the critical DeFi information you need.  ',
    },
  ]
}
</script>
