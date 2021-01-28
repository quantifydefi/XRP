<template>
  <v-row justify="center">
    <v-col v-if="!etherData" cols="12">
      <div class="text-center">
        <v-progress-circular
          indeterminate
          size="40"
          color="primary"
          width="5"
        />
      </div>
    </v-col>

    <v-col v-if="etherData" cols="9">
      <v-row>
        <v-col cols="8">
          <h1 class="text-h3">$ {{ portfolioSum.toFixed(2) }}</h1>
          <h1 class="text-h5">{{ address }}</h1>
        </v-col>
        <v-spacer />
        <v-col
          ><div class="text-right">
            <v-menu open-on-hover bottom offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  tile
                  color="green accent-4"
                  text
                  class="mt-1"
                  v-bind="attrs"
                  v-on="on"
                  >Connected
                  <v-icon right>mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list tile>
                <v-list-item dense link @click="disconnect">
                  <v-list-item-title>Disconnect</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-card height="310" tile outlined>
            <v-card-title>Overview</v-card-title>

            <v-simple-table>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td>Address</td>
                    <td>{{ address }}</td>
                  </tr>
                  <tr></tr>

                  <tr>
                    <td>Balance ETH</td>
                    <td>{{ etherData.contract_balance }} Ether</td>
                  </tr>
                  <tr>
                    <td>Balance USD</td>
                    <td>
                      $ {{ etherData.balance_usd.toFixed(4) }} |
                      {{ etherData.eth_price_usd }}/ETH
                    </td>
                  </tr>

                  <tr>
                    <td>MarketCap</td>
                    <td>
                      $
                      {{ (etherData.market_cap_usd / 10 ** 6).toFixed(4) }}
                      Million
                    </td>
                  </tr>
                  <tr>
                    <td>Uniswap Pool</td>
                    <td>{{ etherData.token_pair }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card height="310" tile outlined>
            <client-only>
              <marketcap
                :data="balances"
                :tile-tooltip="heatmapConfig.blockSize.toolTip"
                :data-field="heatmapConfig.blockSize.dataField"
                :tile-body="heatmapConfig.blockSize.tile"
                :chart-height="310"
                :color-field="heatmapConfig.colorField"
              />
            </client-only>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="mt-2">
          <v-card v-if="balances" height="700" tile outlined>
            <v-card-title>Positions</v-card-title>
            <client-only>
              <balances-grid :data="balances" />
            </client-only>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import detectEthereumProvider from '@metamask/detect-provider'
import Marketcap from '~/components/heatmap/Marketcap.vue'
import BalancesGrid from '~/components/wallet/BalancesGrid.vue'
import { HeatmapBalancesData } from '~/models/heatmap'
import walletMiddleware from '~/middleware/wallet'

@Component({
  name: 'Index',
  components: { BalancesGrid, Marketcap },
  layout: 'wallet',
  middleware: [walletMiddleware],
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
  computed: {
    ...mapState({
      address: (state: any) => state.wallet.address,
      balanceUsd: (state: any) => state.wallet.balanceUsd,
      balances: (state: any) => state.wallet.balances,
    }),
  },
})
export default class Index extends Vue {
  private heatmapConfig = {
    colorField: 'color24h',
    blockSize: {
      dataField: 'balance_usd',
      value: 'balanceUsd',
      title: 'Balance USD',
      tile: `[font-size: {fontSize}px font-weight: 400;]{token_symbol}[/]
            [font-size: {fontSizeLev2}px; font-weight: 400;]
            $ {balance_usd}
            {time-data}`,

      toolTip: `[bold]{token_name}[/]
              ---------------------
              Balance USD: $ {balance_usd} [font-size: 12px] | {eth_price_usd}/ETH[/]
              Contract Balance: {contract_balance}
              Price USD: $ {rate_usd}
              Liquidity: $ {liquidityTransformed}m
              Uniswap Pool: {token_pair}`,
    },
    timeFrame: {
      value: '24h',
      title: '1 Day',
      tile: `{percent_change_liq_24h}% [font-size: {fontSizeLev3}px] 24h`,
      colorField: 'color24h',
    },
  }

  balances!: HeatmapBalancesData[]

  get etherData() {
    return this.balances.find(
      (item: HeatmapBalancesData) => item.token_symbol === 'ETH'
    )
  }

  get portfolioSum() {
    return this.balances
      .map((o) => o.balance_usd)
      .reduce((a, c) => {
        return a + c
      })
  }

  async mounted() {
    await this.$store.dispatch('wallet/balances')

    /**
     Listener for account change
     */
    const provider: any = await detectEthereumProvider()
    if (provider) {
      await provider.request({ method: 'eth_accounts' })
      provider.on('accountsChanged', (accounts: string[]) => {
        if (!accounts.length) {
          this.$store.dispatch('wallet/metamaskLogout')
          this.$router.push('/')
        }
      })
    }
  }

  disconnect(): void {
    this.$store.dispatch('wallet/metamaskLogout')
    this.$router.push('/')
  }
}
</script>
