<template>
  <v-row justify="center">
    <v-col lg="10" md="12">
      <v-row v-if="loading">
        <v-col cols="12" lg="4">
          <v-card height="500" tile outlined>
            <v-skeleton-loader type="article,list-item-three-line@4" height="470" />
          </v-card>
        </v-col>

        <v-col lg="8" md="12">
          <v-row>
            <v-col>
              <v-card height="200" tile outlined>
                <v-row>
                  <v-col cols="12">
                    <v-skeleton-loader type="table-heading,text" />
                  </v-col>

                  <v-col cols="12">
                    <v-skeleton-loader type="divider" />
                  </v-col>

                  <v-col cols="12" class="mt-5">
                    <v-row class="mt-1">
                      <v-col v-for="i in 6" :key="i" cols="6" md="3" lg="2">
                        <v-skeleton-loader type="text@2" />
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-card tile outlined height="276">
                <v-skeleton-loader type="table-heading,divider,table-tbody" height="276" />
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card tile outlined height="276">
                <v-skeleton-loader type="table-heading,divider,table-tbody" height="276" />
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12">
          <v-card tile outlined height="500">
            <v-skeleton-loader type="table" tile height="500" />
          </v-card>
        </v-col>
      </v-row>

      <v-row v-else-if="tokenData">
        <v-col cols="12" lg="4">
          <coin-profile
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
        <v-col lg="8" md="12">
          <v-row>
            <v-col cols="12">
              <coin-metrics
                :price-usd="tokenData.price.priceUsd"
                :price-eth="tokenData.price.priceEth"
                :price24h="tokenData.price24h"
                :interval-data="tokenData.tokenInterval"
                :market-cap="tokenData.marketcap"
                :volume="tokenData.volume24h"
                :circ-supply="tokenData.circulatingSupply"
                :support="tokenData.support1h"
                :resistance="tokenData.resistance1h"
                :safety-score="tokenData.safeScore"
                @on-interval-change="setInterval"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col lg="6" sm="12">
              <token-news :token-symbol="tokenData.qcKey" :news="tokenData.news" :symbol="tokenData.qcKey" />
            </v-col>
            <v-col lg="6" sm="12">
              <token-balances
                :balances="tokenData.balances"
                :price-usd="tokenData.price.priceUsd"
                :contract="contractAddress"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <token-aave-assets v-if="tokenData" :token-key="tokenData.qcKey" />
      <v-row v-if="tokenData">
        <v-col>
          <v-card tile outlined height="600">
            <token-prices-chart :coin-gecko-id="tokenData.coinGeckoID" />
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import useToken from '~/composables/useToken'
import CoinProfile from '~/components/token-details/CoinProfile.vue'
import CoinMetrics from '~/components/token-details/CoinMetrics.vue'
import TokenNews from '~/components/news/TokenNews.vue'
import TokenAaveAssets from '~/components/token-details/TokenAaveAssets.vue'
import TokenBalances from '~/components/token-details/TokenBalances.vue'
import TokenPricesChart from '~/components/token-details/TokenPricesChart.vue'
import { useMetaTags } from '~/composables/useMetaTags'
export default defineComponent({
  components: {
    TokenPricesChart,
    TokenBalances,
    TokenAaveAssets,
    TokenNews,
    CoinMetrics,
    CoinProfile,
  },
  setup() {
    const { params, query } = useRoute().value

    const { tokenData, loading, contractAddress, setInterval } = useToken()

    useMetaTags('tokenPage', `/token/${params.id}`, query.name as string, params.id)

    return { tokenData, loading, contractAddress, setInterval }
  },
  head: {},
})
</script>
