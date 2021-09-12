<template>
  <v-row no-gutters justify="center">
    <v-col cols="12">
      <v-row no-gutters>
        <v-col cols="12">
          <h1 class="text-h4">Portfolio</h1>
        </v-col>

        <v-row v-if="showSkeleton" class="px-1 pt-3" data-nosnippet>
          <v-col v-for="i in 6" :key="i" cols="12" md="4" class="pa-1">
            <v-card tile outlined>
              <v-skeleton-loader
                type="table-heading, table-tbody, table-tbody"
                height="536"
                tile
              ></v-skeleton-loader>
            </v-card>
          </v-col>
        </v-row>

        <client-only>
          <v-row v-if="!showSkeleton" class="px-1 pt-3" data-nosnippet>
            <v-col cols="12" md="6" lg="4" class="pa-1">
              <v-card tile outlined height="535">
                <v-card-title class="pa-0 ma-0">
                  <v-col cols="6" class="d-flex">
                    <h1 class="title">My Assets</h1>
                  </v-col>

                  <v-col cols="6" class="text-right"
                    ><h1 class="title">
                      {{ priceFormatter(totalBalance) }}
                    </h1></v-col
                  >
                </v-card-title>
                <v-divider />

                <v-card-title
                  v-for="(network, i) in networks"
                  :key="i"
                  class="pa-0 ma-0"
                >
                  <v-col cols="6" class="d-flex">
                    <v-avatar size="26px">
                      <v-img
                        :src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${network.icon}.png`"
                        :lazy-src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${network.icon}.png`"
                      ></v-img>
                    </v-avatar>
                    <h1 class="subtitle-1 font-weight-medium pl-3">
                      {{ network.network }}
                    </h1>
                  </v-col>

                  <!--                  <v-col cols="6" class="text-right"
                    ><h1 class="subtitle-1">
                      {{ priceFormatter(getTotalBalance(totalHoldings[i])) }}
                    </h1></v-col
                  >-->
                </v-card-title>
              </v-card>
            </v-col>
            <v-col
              v-for="(network, i) in networks"
              :key="network.chainId"
              cols="12"
              md="6"
              lg="4"
              class="pa-1"
            >
              <v-card tile outlined height="535">
                <client-only>
                  <balances-grid
                    :chain-id="network.chainId"
                    :address="address"
                    :network="network.network"
                    :icon="network.icon"
                    :grid-data="totalHoldings[i]"
                  ></balances-grid>
                </client-only>
              </v-card>
            </v-col>
          </v-row>
        </client-only>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import detectEthereumProvider from '@metamask/detect-provider'
import walletMiddleware from '~/middleware/wallet'

const BalancesGrid: any = () => ({
  component: new Promise((resolve) => {
    setTimeout(() => {
      resolve(import('@/components/portfolio/grids/BalancesGrid.vue'))
    }, 1)
  }),
})

@Component({
  name: 'Portfolio',
  components: {
    BalancesGrid,
  },
  middleware: [walletMiddleware],

  computed: {
    ...mapState({
      address: (state: any) => state.wallet.address,
    }),
  },
})
export default class Portfolio extends Vue {
  showSkeleton = true
  address!: string
  networks = [
    {
      chainId: 1,
      network: 'Ethereum',
      icon: 'eth',
    },
    {
      chainId: 56,
      network: 'Binance',
      icon: 'bnb',
    },
    {
      chainId: 137,
      network: 'Polygon',
      icon: 'matic',
    },
    {
      chainId: 250,
      network: 'Fantom',
      icon: 'ftm',
    },
    {
      chainId: 43114,
      network: 'Avalanche',
      icon: 'avax',
    },
  ]

  totalHoldings: any[] = []
  totalBalance = 0

  /** Calculates total Balance **/
  getTotalBalance(balanceData: any) {
    let balance = 0
    for (const item of balanceData) {
      balance += item.totalValue
    }

    return balance
  }

  /** Gets account data and total balances from Covalent API **/
  async getAccountBalance(chainId: number, network: string) {
    const balancesData = []
    let assetTotalBalance = 0

    try {
      const {
        data: {
          data: { items: balances },
        },
      } = await this.$axios.get(
        `https://api.covalenthq.com/v1/${chainId}/address/${this.address}/balances_v2/?key=${process.env.COVALENT_API_KEY}`
      )

      if (balances) {
        for (const balance of balances) {
          if (balance.type !== 'dust') {
            const balanceRounded =
              balance.balance / 10 ** balance.contract_decimals

            assetTotalBalance += balance.quote

            const tokenBalanceData = {
              tokenAddress: balance.contract_address,
              tokenName: balance.contract_name,
              tokenSymbol: balance.contract_ticker_symbol,
              tokenBalance: this.balanceFormatter(balanceRounded),
              tokenPrice: balance.quote_rate,
              totalValue: balance.quote,
              chainId,
              network,
            }

            balancesData.push(tokenBalanceData)
          }
        }
      }

      this.totalBalance += assetTotalBalance
    } catch (err) {
      console.log(err)
    }

    return balancesData
  }

  priceFormatter(value: number): string {
    if (value > 1) {
      return new Intl.NumberFormat('en', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2,
      }).format(value)
    } else {
      return new Intl.NumberFormat('en', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 4,
      }).format(value)
    }
  }

  balanceFormatter(value: number): string {
    return new Intl.NumberFormat('en', { maximumSignificantDigits: 6 }).format(
      value
    )
  }

  async mounted() {
    console.log(this.address, 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')

    /** For each network supported get account balance **/
    for (const network of this.networks) {
      this.totalHoldings.push(
        await this.getAccountBalance(network.chainId, network.network)
      )
    }

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

    setTimeout(() => {
      this.showSkeleton = false
    }, 1000)
  }
}
</script>

<style scoped></style>

<!--
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
            class="text-h5 primary&#45;&#45;text text-decoration-none"
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
              <template #default>
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
                    <td>Gas Prices (GWEI)</td>

                    <td>
                      <span>
                        {{ gasPrice.slow }}
                        <small class="grey&#45;&#45;text text&#45;&#45;lighten-1">Slow</small>
                      </span>

                      <span class="mx-2">
                        {{ gasPrice.average }}
                        <small class="grey&#45;&#45;text text&#45;&#45;lighten-1"
                          >Average</small
                        >
                      </span>

                      <span>
                        {{ gasPrice.fast }}
                        <small class="grey&#45;&#45;text text&#45;&#45;lighten-1">Fast</small>
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
  middleware: [walletMiddleware],
  head(): object {
    return {
      title: 'DEX Portfolio Balances and History | Defi Heatmap',
      meta: [
        {
          name: 'description',
          hid: 'description',
          content: 'Metamask Balance Summary from the Ethereum Blockchain',
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
              -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;
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
-->
