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
          <h1 class="text-h3">$ {{ $numberWithCommas(portfolioBalance) }}</h1>
          <a
            target="_blank"
            class="text-h5 primary--text text-decoration-none"
            :href="`https://etherscan.io/address/${address}`"
          >
            {{ address }}
          </a>
        </v-col>
        <v-spacer />
        <v-col
          ><div class="text-right">
            <v-btn text icon color="red" @click="disconnect">
              <v-icon size="28">mdi-power-standby</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-card
            height="310"
            tile
            outlined
            :color="theme === 'dark' ? 'transparent' : ''"
            :style="
              theme === 'dark' ? 'border: 1px solid #424242 !important' : ''
            "
          >
            <v-card-title>Ethereum Overview</v-card-title>

            <v-simple-table class="transparent">
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td>Balance ETH</td>
                    <td>{{ etherData.contract_balance }} Ether</td>
                  </tr>
                  <tr>
                    <td>Balance USD</td>
                    <td>$ {{ etherData.balance_usd.toFixed(4) }}</td>
                  </tr>

                  <tr>
                    <td>Ethereum Price USD</td>
                    <td>$ {{ etherData.eth_price_usd }}</td>
                  </tr>

                  <tr>
                    <td>Gas Prices</td>

                    <td>
                      <span>
                        {{ gasPrice.slow }}
                        <small class="grey--text text--lighten-1">Slow</small>
                      </span>

                      <span class="mx-2">
                        {{ gasPrice.average }}
                        <small class="grey--text text--lighten-1"
                          >Average</small
                        >
                      </span>

                      <span>
                        {{ gasPrice.fast }}
                        <small class="grey--text text--lighten-1">Fast</small>
                      </span>
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
        <v-col>
          <v-divider />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card
            v-if="balances"
            height="100%"
            tile
            outlined
            :color="theme === 'dark' ? 'transparent' : ''"
          >
            <v-btn-toggle v-model="table" tile color="primary" group mandatory>
              <v-btn value="positions" class="px-2" height="38">
                Positions
              </v-btn>
              <v-btn value="transactions" class="px-2" height="38">
                Transactions
              </v-btn>

              <v-btn value="deposits" class="px-2" height="38"
                >Deposits/Stakes
              </v-btn>
              <v-btn value="loans" class="px-2" height="38">
                Loans/Debts
              </v-btn>
            </v-btn-toggle>
            <client-only>
              <balances-grid
                v-if="table === 'positions'"
                :data="balances"
                :portfolio-balance="portfolioBalance"
                :eth-price="etherData.eth_price_usd"
              />
              <transaction-grid v-if="table === 'transactions'" />
              <adapters-grid v-if="table === 'deposits'" type="Deposit" />
              <adapters-grid v-if="table === 'loans'" type="Debt" />
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
import TransactionGrid from '~/components/wallet/TransactionGrid.vue'
import AdaptersGrid from '~/components/wallet/AdaptersGrid.vue'

@Component({
  name: 'Index',
  components: { AdaptersGrid, TransactionGrid, BalancesGrid, Marketcap },
  // layout: 'wallet',
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
      adapters: (state: any) => state.wallet.adapters,
      theme: (state: any) => state.ui.theme,
      ui: (state: any) => state.ui,
      gasPrice: (state: any) => state.wallet.gasPrice,
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

  private table: 'positions' | 'transactions' | 'deposits' | 'loans' =
    'positions'

  balances!: HeatmapBalancesData[]
  address!: string
  gasPrices!: {
    Fast: 0
    Average: 0
    Slow: 0
  }

  get etherData() {
    return this.balances.find(
      (item: HeatmapBalancesData) => item.token_symbol === 'ETH'
    )
  }

  get portfolioBalance() {
    return this.balances
      .map((o) => o.balance_usd)
      .reduce((a, c) => {
        return a + c
      })
  }

  get fastPrice() {
    return this.gasPrices.Fast
  }

  get averagePrice() {
    return this.gasPrices.Average
  }

  get slowPrice() {
    return this.gasPrices.Slow
  }

  async mounted() {
    this.gasPrices = await this.$store.dispatch('wallet/gasPrices')
    await this.$store.dispatch('wallet/balances')
    await this.$store.dispatch('wallet/getAdapters', { address: this.address })

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
<style scoped></style>
