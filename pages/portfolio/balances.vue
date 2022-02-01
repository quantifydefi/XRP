<template>
  <client-only>
    <div>
      <v-row v-if="loading">
        <v-col cols="4">
          <v-card height="285" tile outlined>
            <v-skeleton-loader type="table-tbody,table-tbody" height="285" />
          </v-card>
        </v-col>

        <v-col cols="8">
          <v-card height="285" tile outlined>
            <v-skeleton-loader type="image, image" height="285" />
          </v-card>
        </v-col>

        <v-col v-for="i in 5" :key="i" cols="4">
          <v-card height="640" tile outlined>
            <v-skeleton-loader type="table-tbody,table-tbody" />
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="!loading" justify="center">
        <v-col cols="11">
          <v-row>
            <v-col cols="4">
              <v-card class="py-2 px-4" height="100%" tile outlined>
                <h4 :class="['text-subtitle-1 text-truncate pink--text font-weight-medium']">Total Balance</h4>
                <div class="d-inline-block text-truncate text-h3" style="max-width: 100%">
                  {{ '$ ' + totalBalance.toLocaleString() }}
                </div>
                <v-simple-table class="mt-3">
                  <template #default>
                    <tbody class="text-subtitle-1 text-no-wrap">
                      <tr v-for="item in balances" :key="item.chainId">
                        <td :class="[ui[theme].innerCardLighten]">{{ chainInfo(item.chainId).label }}</td>
                        <td>{{ '$ ' + item.chainTotalBalance.toLocaleString() + ' USD' }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card>
            </v-col>
            <v-col>
              <v-card tile outlined>
                <client-only>
                  <balances-chart :data="chartData" />
                </client-only>
              </v-card>
            </v-col>
          </v-row>
          <v-row align="center">
            <v-col cols="6" class="py-0">
              <v-chip-group v-model="configs.selectedMainNets" multiple active-class="primary--text">
                <v-chip v-for="item in mainNetChains" :key="item.chainId" :value="item.chainId" outlined>
                  <v-img :src="item.logoUrl" max-width="16" class="mr-2" /> {{ item.name }}
                </v-chip>
              </v-chip-group>
            </v-col>
            <v-spacer />
            <v-col class="py-0">
              <div class="text-right">
                <v-menu
                  :close-on-content-click="false"
                  :nudge-width="200"
                  :nudge-right="-200"
                  :nudge-bottom="5"
                  offset-y
                >
                  <template #activator="{ on, attrs }">
                    <v-btn
                      width="140"
                      tile
                      v-bind="attrs"
                      class="text-capitalize text-subtitle-2"
                      depressed
                      color="transparent"
                      v-on="on"
                    >
                      <span class="primary--text mx-1 pr-2"> Grid Height </span>
                      <v-icon right>mdi-chevron-down</v-icon>
                    </v-btn>
                  </template>

                  <v-card tile outlined height="60">
                    <v-card-text>
                      <v-slider v-model="configs.gridHeight" :min="400" :max="1000" />
                    </v-card-text>
                  </v-card>
                </v-menu>
                <v-btn-toggle v-model="configs.numberOfRows" mandatory background-color="transparent">
                  <v-btn
                    v-for="(item, index) in configs.numOfRowsOptions"
                    :key="index"
                    tile
                    outlined
                    class="ml-1 mt-1"
                    color="primary"
                    :value="item.col"
                    :height="30"
                  >
                    <v-icon size="18">{{ item.icon }}</v-icon>
                  </v-btn>
                </v-btn-toggle>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col v-for="item in balances" :key="item.chainId" :cols="configs.numberOfRows">
              <balances-grid
                :balance="item"
                :cols="configs.cols"
                :grid-height="configs.gridHeight"
                :chain-id="item.chainId"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </client-only>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { mapGetters, mapState } from 'vuex'
import { BalancesPortfolio, PortfolioBalance } from '~/models/portfolio'
import BalancesGrid from '~/components/portfolio/grids/BalancesGrid.vue'
import { Helper } from '~/models/helper'
import BalancesChart from '~/components/portfolio/BalancesChart.vue'
@Component({
  name: 'Balances',
  components: { BalancesGrid, BalancesChart },
  computed: {
    ...mapState({ ui: (state: any) => state.ui, theme: (state: any) => state.ui.theme }),
    ...mapGetters({ chainInfo: 'configs/chainInfo' }),
  },
  head(): object {
    return {
      title: 'DeFi Asset Management | EVM Ethereum Virtual Machine',
      meta: [
        {
          name: 'description',
          hid: 'description',
          content: 'DeFi balances for Ethereum Mainnet, Matic, Binance Smart Chain, Fantom Opera and more',
        },

        // Open Graph
        {
          name: 'og:title',
          content: 'DeFi Asset Management | EVM Ethereum Virtual Machine',
        },
        {
          name: 'og:description',
          content: 'DeFi balances for Ethereum Mainnet, Matic, Binance Smart Chain, Fantom Opera and more',
        },
        { name: 'og:type', content: 'website' },
        { name: 'og:url', content: process.env.baseURL },
        {
          name: 'og:image',
          content: 'https://quantifycrypto.s3.us-west-2.amazonaws.com/pictures/website-img/EVMXBalancesPage.jpg',
        },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@Quantify_Crypto' },
        {
          name: 'twitter:title',
          content: 'DeFi Asset Management | EVM Ethereum Virtual Machine',
        },
        {
          name: 'twitter:description',
          content: 'DeFi balances for Ethereum Mainnet, Matic, Binance Smart Chain, Fantom Opera and more',
        },
        {
          name: 'twitter:image',
          content: 'https://quantifycrypto.s3.us-west-2.amazonaws.com/pictures/website-img/EVMXBalancesPage.jpg',
        },
        {
          name: 'twitter:image:alt',
          content: 'https://quantifycrypto.s3.us-west-2.amazonaws.com/pictures/website-img/EVMXBalancesPage.jpg',
        },
      ],
    }
  },
})
export default class Balances extends mixins(BalancesPortfolio) {
  @Watch('balances')
  async onBalanceChange(newVal: PortfolioBalance[]) {
    const totalBalance = newVal.reduce((n, { chainTotalBalance }) => n + chainTotalBalance, 0)
    await this.$store.dispatch('wallet/totalBalance', Helper.priceFormatter(totalBalance))
  }
}
</script>

<style>
.v-list-item__action {
  align-self: center;
  margin: 0 0;
}
</style>
