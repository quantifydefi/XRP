<!--<template>-->
<!--  <v-row no-gutters justify="center">-->
<!--    <v-col cols="12">-->
<!--      <v-row no-gutters>-->
<!--        <v-col cols="12">-->
<!--          <h1 class="text-h4">Portfolio</h1>-->
<!--        </v-col>-->

<!--        <v-row v-if="showSkeleton" class="px-1 pt-3" data-nosnippet>-->
<!--          <v-col v-for="i in 6" :key="i" cols="12" md="4" class="pa-1">-->
<!--            <v-card tile outlined>-->
<!--              <v-skeleton-loader-->
<!--                type="table-heading, table-tbody, table-tbody"-->
<!--                height="536"-->
<!--                tile-->
<!--              ></v-skeleton-loader>-->
<!--            </v-card>-->
<!--          </v-col>-->
<!--        </v-row>-->

<!--        <client-only>-->
<!--          <v-row v-if="!showSkeleton" class="px-1 pt-3" data-nosnippet>-->
<!--            <v-col cols="12" md="6" lg="4" class="pa-1">-->
<!--              <v-card tile outlined height="535">-->
<!--                <v-card-title class="pa-0 ma-0">-->
<!--                  <v-col cols="6" class="d-flex">-->
<!--                    <h1 class="title">My Assets</h1>-->
<!--                  </v-col>-->

<!--                  <v-col cols="6" class="text-right"-->
<!--                    ><h1 class="title">-->
<!--                      {{ priceFormatter(totalBalance) }}-->
<!--                    </h1></v-col-->
<!--                  >-->
<!--                </v-card-title>-->
<!--                <v-divider />-->

<!--                <v-card-title-->
<!--                  v-for="(network, i) in networks"-->
<!--                  :key="i"-->
<!--                  class="pa-0 ma-0"-->
<!--                >-->
<!--                  <v-col cols="6" class="d-flex">-->
<!--                    <v-avatar size="26px">-->
<!--                      <v-img-->
<!--                        :src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${network.icon}.png`"-->
<!--                        :lazy-src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${network.icon}.png`"-->
<!--                      ></v-img>-->
<!--                    </v-avatar>-->
<!--                    <h1 class="subtitle-1 font-weight-medium pl-3">-->
<!--                      {{ network.network }}-->
<!--                    </h1>-->
<!--                  </v-col>-->

<!--                  &lt;!&ndash;                  <v-col cols="6" class="text-right"-->
<!--                    ><h1 class="subtitle-1">-->
<!--                      {{ priceFormatter(getTotalBalance(totalHoldings[i])) }}-->
<!--                    </h1></v-col-->
<!--                  >&ndash;&gt;-->
<!--                </v-card-title>-->
<!--              </v-card>-->
<!--            </v-col>-->
<!--            <v-col-->
<!--              v-for="(network, i) in networks"-->
<!--              :key="network.chainId"-->
<!--              cols="12"-->
<!--              md="6"-->
<!--              lg="4"-->
<!--              class="pa-1"-->
<!--            >-->
<!--              <v-card tile outlined height="535">-->
<!--                <client-only>-->
<!--                  <balances-grid-->
<!--                    :chain-id="network.chainId"-->
<!--                    :address="address"-->
<!--                    :network="network.network"-->
<!--                    :icon="network.icon"-->
<!--                    :grid-data="totalHoldings[i]"-->
<!--                  ></balances-grid>-->
<!--                </client-only>-->
<!--              </v-card>-->
<!--            </v-col>-->
<!--          </v-row>-->
<!--        </client-only>-->
<!--      </v-row>-->
<!--    </v-col>-->
<!--  </v-row>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--import { Component, Vue } from 'vue-property-decorator'-->
<!--import detectEthereumProvider from '@metamask/detect-provider'-->
<!--import walletMiddleware from '~/middleware/wallet'-->

<!--const BalancesGrid: any = () => ({-->
<!--  component: new Promise((resolve) => {-->
<!--    setTimeout(() => {-->
<!--      resolve(import('@/components/portfolio/grids/BalancesGrid.vue'))-->
<!--    }, 1)-->
<!--  }),-->
<!--})-->

<!--@Component({-->
<!--  name: 'Portfolio',-->
<!--  components: {-->
<!--    BalancesGrid,-->
<!--  },-->
<!--  middleware: [walletMiddleware],-->
<!--})-->
<!--export default class Portfolio extends Vue {-->
<!--  showSkeleton = true-->

<!--  address = '0xF705b9ba1908cA505537F309B08E6949C1b8f31F'-->

<!--  // gasPrice: any = null-->

<!--  networks = [-->
<!--    {-->
<!--      chainId: 1,-->
<!--      network: 'Ethereum',-->
<!--      icon: 'eth',-->
<!--    },-->
<!--    {-->
<!--      chainId: 56,-->
<!--      network: 'Binance',-->
<!--      icon: 'bnb',-->
<!--    },-->
<!--    {-->
<!--      chainId: 137,-->
<!--      network: 'Polygon',-->
<!--      icon: 'matic',-->
<!--    },-->
<!--    {-->
<!--      chainId: 250,-->
<!--      network: 'Fantom',-->
<!--      icon: 'ftm',-->
<!--    },-->
<!--    {-->
<!--      chainId: 43114,-->
<!--      network: 'Avalanche',-->
<!--      icon: 'avax',-->
<!--    },-->
<!--  ]-->

<!--  totalHoldings: any[] = []-->

<!--  totalBalance = 0-->
<!--  /*-->
<!--  /!** Calculates total Balance **!/-->
<!--  getTotalBalance(balanceData: any) {-->
<!--    let balance = 0-->
<!--    for (const item of balanceData) {-->
<!--      balance += item.totalValue-->
<!--    }-->

<!--    return balance-->
<!--  } */-->

<!--  /** Gets account data and total balances from Covalent API **/-->
<!--  async getAccountBalance(chainId: number, network: string) {-->
<!--    const balancesData = []-->
<!--    let assetTotalBalance = 0-->

<!--    try {-->
<!--      const {-->
<!--        data: {-->
<!--          data: { items: balances },-->
<!--        },-->
<!--      } = await this.$axios.get(-->
<!--        `https://api.covalenthq.com/v1/${chainId}/address/${this.address}/balances_v2/?key=${process.env.COVALENT_API_KEY}`-->
<!--      )-->

<!--      if (balances) {-->
<!--        for (const balance of balances) {-->
<!--          if (balance.type !== 'dust') {-->
<!--            const balanceRounded =-->
<!--              balance.balance / 10 ** balance.contract_decimals-->

<!--            assetTotalBalance += balance.quote-->

<!--            const tokenBalanceData = {-->
<!--              tokenAddress: balance.contract_address,-->
<!--              tokenName: balance.contract_name,-->
<!--              tokenSymbol: balance.contract_ticker_symbol,-->
<!--              tokenBalance: this.balanceFormatter(balanceRounded),-->
<!--              tokenPrice: balance.quote_rate,-->
<!--              totalValue: balance.quote,-->
<!--              chainId,-->
<!--              network,-->
<!--            }-->

<!--            balancesData.push(tokenBalanceData)-->
<!--          }-->
<!--        }-->
<!--      }-->

<!--      this.totalBalance += assetTotalBalance-->
<!--    } catch (err) {-->
<!--      console.log(err)-->
<!--    }-->

<!--    return balancesData-->
<!--  }-->

<!--  priceFormatter(value: number): string {-->
<!--    if (value > 1) {-->
<!--      return new Intl.NumberFormat('en', {-->
<!--        style: 'currency',-->
<!--        currency: 'USD',-->
<!--        maximumFractionDigits: 2,-->
<!--      }).format(value)-->
<!--    } else {-->
<!--      return new Intl.NumberFormat('en', {-->
<!--        style: 'currency',-->
<!--        currency: 'USD',-->
<!--        maximumFractionDigits: 4,-->
<!--      }).format(value)-->
<!--    }-->
<!--  }-->

<!--  balanceFormatter(value: number): string {-->
<!--    return new Intl.NumberFormat('en', { maximumSignificantDigits: 6 }).format(-->
<!--      value-->
<!--    )-->
<!--  }-->

<!--  async mounted() {-->
<!--    // await this.$store.dispatch('wallet/gasPrices')-->
<!--    // this.gasPrice = this.$store.state.wallet.gasPrice-->

<!--    /** For each network supported get account balance **/-->
<!--    for (const network of this.networks) {-->
<!--      this.totalHoldings.push(-->
<!--        await this.getAccountBalance(network.chainId, network.network)-->
<!--      )-->
<!--    }-->

<!--    /**-->
<!--     Listener for account change-->
<!--     */-->
<!--    const provider: any = await detectEthereumProvider()-->

<!--    console.log(provider)-->

<!--    if (provider) {-->
<!--      await provider.request({ method: 'eth_accounts' })-->
<!--      provider.on('accountsChanged', (accounts: string[]) => {-->
<!--        if (!accounts.length) {-->
<!--          this.$store.dispatch('wallet/metamaskLogout')-->
<!--          this.$router.push('/')-->
<!--        }-->
<!--      })-->
<!--    }-->

<!--    setTimeout(() => {-->
<!--      this.showSkeleton = false-->
<!--    }, 1000)-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped></style>-->
