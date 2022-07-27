<template>
  <v-row justify="center">
    <v-col lg="10" md="12">
      <v-row v-if="!loading">
        <v-col cols="12" lg="4">
          <v-row>
            <v-col sm="12" md="6" lg="12">
              <coin-profile
                height="364"
                :symbol="tokenData.symbolName"
                :qc-key="tokenData.qcKey"
                :aave-symbol="tokenData.aaveSymbol"
                :is-aave-token="tokenData.isAaveToken"
                :is-q-c-token="tokenData.isQCToken"
                :contract-address="contractAddress"
                :website-links="tokenData.websiteUrl"
                :bit-bucket-repos="tokenData.bitbucketRepos"
                :git-hub-repos="tokenData.githubRepos"
                :explorer-urls="tokenData.explorerUrls"
                :telegram-channel-id="tokenData.telegramChannelId"
                :twitter-url="tokenData.twitterUrl"
                :discord-channel-id="tokenData.discordChannelId"
                :subreddit-url="tokenData.subredditUrl"
                :facebook-url="tokenData.facebookUrl"
                :coin-description="tokenData.coinDescription"
              />
            </v-col>

            <v-col sm="12" md="6" lg="12">
              <token-balances
                height="100%"
                :balances="tokenData.balances"
                :price-usd="tokenData.price.priceUsd"
                :contract="contractAddress"
              />
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" lg="8">
          <v-row>
            <v-col cols="12">
              <coin-metrics
                :price-usd="tokenData.price.priceUsd"
                :price-eth="tokenData.price.priceEth"
                :price24h="tokenData.price24h"
                :market-cap="tokenData.marketcap"
                :circ-supply="tokenData.circulatingSupply"
              />
            </v-col>

            <v-col cols="12" md="6">
              <aave-actions
                ref="aaveComponent"
                :type="`card`"
                :health-factor="healthFactor"
                :total-borrowed-usd="totalBorrowedUsd"
                :total-collateral-usd="totalCollateralUsd"
                :max-ltv="maxLtv"
                :pool-data="pool"
                :pool-action="aaveActionType"
                @transaction-success="updatePortfolio"
                @toggle-reserve-details="reserveDetailDialog = !reserveDetailDialog"
              />

              <v-dialog v-model="reserveDetailDialog" max-width="800">
                <v-card tile outlined class="pa-4">
                  <v-card-title class="pa-0">
                    Reserve Details<v-spacer />
                    <v-icon @click="reserveDetailDialog = !reserveDetailDialog"> mdi-close </v-icon>
                  </v-card-title>
                  <aave-market-details :pool="pool" :show-balance-chart="false"></aave-market-details>
                </v-card>
              </v-dialog>
            </v-col>

            <v-col cols="12" md="6">
              <v-card height="468" tile outlined>
                <v-card-title class="subtitle-1 font-weight-medium py-3">
                  Swap <v-spacer />
                  <v-btn height="24" width="24" fab><v-icon size="20">mdi-cog</v-icon> </v-btn>
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col>
                      <v-form ref="form">
                        <v-text-field
                          hide-details
                          outlined
                          color="pink"
                          style="background: #121212"
                          dense
                          class="rounded-0 text-right"
                        >
                          <template #append>
                            <v-row class="ml-0 my-0 mr-1">
                              <v-divider class="mx-3" vertical></v-divider>
                              <div class="text-no-wrap">
                                <v-avatar size="22" class="mt-n1">
                                  <v-img
                                    alt="ETH"
                                    src="https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/eth.png"
                                  />
                                </v-avatar>
                                <span
                                  class="ml-2 mr-1 subtitle-1 font-weight-medium grey--text text--lighten-1"
                                  v-text="`ETH`"
                                />
                                <v-btn icon x-small class="mt-n1">
                                  <v-icon size="22" color="grey lighten-1">mdi-chevron-down</v-icon>
                                </v-btn>
                              </div>
                            </v-row>
                          </template>
                        </v-text-field>

                        <v-row class="pt-2 px-1 grey--text text--lighten-1 caption">
                          <v-col v-text="`Balance: 5.00`" />
                          <v-col class="text-right">
                            <span class="font-weight-medium" v-text="`$ 191.095 (~0.816% )`" />
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-col>
                  </v-row>

                  <v-row class="justify-center">
                    <v-col class="text-center">
                      <v-btn class="mt-n4" fab small>
                        <v-icon size="28"> mdi-swap-horizontal-variant</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col>
                      <v-form ref="form">
                        <v-text-field
                          hide-details
                          outlined
                          color="pink"
                          style="background: #121212"
                          dense
                          class="rounded-0 text-right"
                        >
                          <template #append>
                            <v-row class="ml-0 my-0 mr-1">
                              <v-divider class="mx-3" vertical></v-divider>
                              <div class="text-no-wrap">
                                <v-avatar size="22" class="mt-n1">
                                  <v-img
                                    alt="USDC"
                                    src="https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/usdc.png"
                                  />
                                </v-avatar>
                                <span
                                  class="ml-2 mr-1 subtitle-1 font-weight-medium grey--text text--lighten-1"
                                  v-text="`USDC`"
                                />
                                <v-btn icon x-small class="mt-n1">
                                  <v-icon size="22" color="grey lighten-1">mdi-chevron-down</v-icon>
                                </v-btn>
                              </div>
                            </v-row>
                          </template>
                        </v-text-field>

                        <v-row class="pt-2 px-1 grey--text text--lighten-1 caption">
                          <v-col v-text="`Balance: 1000`" />
                          <v-col class="text-right">
                            <span class="font-weight-medium" v-text="`$ 191.095 (~0.816% )`" />
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-col>
                  </v-row>
                </v-card-text>

                <v-row no-gutters>
                  <v-col class="px-4"> <v-btn tile block color="primary">SWAP</v-btn></v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>

        <v-col v-if="!tokenTransactions.loading.value && tokenData" cols="12">
          <token-transactions-grid
            :account="tokenTransactions.account.value"
            :contract-name="tokenData.symbolName"
            :transactions-data="tokenTransactions.transfersData.value"
          ></token-transactions-grid>

          <v-pagination
            v-model="tokenTransactions.currentPage.value"
            class="mt-4"
            :total-visible="tokenTransactions.pagination.visible"
            :length="tokenTransactions.pagination.total"
          ></v-pagination>
        </v-col>

        <v-col cols="12">
          <v-card tile outlined height="600">
            <token-prices-chart :coin-gecko-id="tokenData.coinGeckoID" />
          </v-card>
        </v-col>
      </v-row>

      <v-row v-if="loading">
        <v-col cols="12" lg="4">
          <v-row>
            <v-col>
              <v-card height="364" tile outlined>
                <v-skeleton-loader type="article,list-item-three-line@4" height="364" />
              </v-card>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-card height="230" tile outlined>
                <v-skeleton-loader type="table-heading,divider,table-tbody" height="230" />
              </v-card>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" lg="8">
          <v-row>
            <v-col>
              <v-card height="102" tile outlined class="px-3 pt-2">
                <v-skeleton-loader type="table-heading,text" height="102" />
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-card tile outlined height="492">
                <v-skeleton-loader type="table-heading,divider,table-tbody@2" height="492" />
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card tile outlined height="492">
                <v-skeleton-loader type="table-heading,divider,table-tbody@2" height="492" />
              </v-card>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12">
          <v-card tile outlined height="447.59">
            <v-skeleton-loader type="table-heading,divider,table-tbody" tile height="447.59" />
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref, useRoute, useStore, watch } from '@nuxtjs/composition-api'
import useToken from '~/composables/useToken'
import CoinProfile from '~/components/token-details/CoinProfile.vue'
import CoinMetrics from '~/components/token-details/CoinMetrics.vue'
import TokenBalances from '~/components/token-details/TokenBalances.vue'
import TokenPricesChart from '~/components/token-details/TokenPricesChart.vue'
import { useMetaTags } from '~/composables/useMetaTags'
import TokenTransactionsGrid from '~/components/transactions/TokenTransactionsGrid.vue'
import useTokenTransactions from '~/composables/useTokenTransactions'
import AaveActions from '~/components/pools/AaveActions.vue'
import useAavePools, { AavePoolModel, actionTypes } from '~/composables/useAavePools'
import usePortfolio, { PortfolioMap } from '~/composables/usePortfolio'
import UseAavePoolsStats from '~/composables/useAavePoolsStats'
import { Web3, WEB3_PLUGIN_KEY } from '~/plugins/web3/web3'
import { State } from '~/types/state'
import AaveMarketDetails from '~/components/pools/AaveMarketDetails.vue'

export default defineComponent({
  components: {
    AaveMarketDetails,
    AaveActions,
    CoinMetrics,
    TokenTransactionsGrid,
    TokenPricesChart,
    TokenBalances,

    CoinProfile,
  },
  setup() {
    const { walletReady, account, chainId } = inject(WEB3_PLUGIN_KEY) as Web3
    const { state } = useStore<State>()
    const { params, query } = useRoute().value

    // Token Data
    const { tokenData, loading, contractAddress } = useToken()

    // Token Transactions
    const tokenTransactions = useTokenTransactions()

    // Aave Component
    const aaveActionType = ref<actionTypes>('deposit')
    const reserveDetailDialog = ref(false)
    const aaveComponent = ref<any>(null)
    const portfolio = ref<PortfolioMap>({})
    const aavePools = useAavePools()
    const marketId = computed(() => state.configs.currentAaveMarket.chainId)
    const addresses = computed(() =>
      aavePools.aavePoolsData.value.reduce((elem, item) => ({ ...elem, [item.id]: item.addresses }), {})
    )
    const { fetchPortfolio } = usePortfolio(addresses)
    async function updatePortfolio() {
      portfolio.value = await fetchPortfolio()
    }
    const pools = computed(() => {
      const pools: AavePoolModel[] = []
      aavePools.aavePoolsData.value.forEach((elem) => {
        elem.portfolio = portfolio.value[elem.id] || elem.portfolio
        pools.push(elem)
      })
      return pools
    })
    const { totalCollateralUsd, totalBorrowedUsd, healthFactor, maxLtv } = UseAavePoolsStats(pools)
    const pool = computed(() => {
      const pool = pools.value.find((elem) => elem.symbol === tokenData.value.qcKey)
      return pool as AavePoolModel
    })

    // WATCHERS
    watch([aavePools.loading, walletReady, account, chainId, marketId], async () => {
      if (!aavePools.loading.value) await updatePortfolio()
    })

    useMetaTags('tokenPage', `/token/${params.id}`, query.name as string, params.id)

    return {
      tokenData,
      loading,
      contractAddress,
      tokenTransactions,

      aaveActionType,
      reserveDetailDialog,
      aaveComponent,
      pool,
      pools,
      totalCollateralUsd,
      totalBorrowedUsd,
      healthFactor,
      maxLtv,
      updatePortfolio,
    }
  },
  head: {},
})
</script>
