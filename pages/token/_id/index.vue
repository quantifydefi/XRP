<template>
  <v-row justify="center">
    <v-col cols="10">
      <v-row v-if="loading">
        <v-col cols="12" lg="4">
          <v-card height="480" tile outlined>
            <v-skeleton-loader type="article,list-item-three-line@4" height="450" />
          </v-card>
        </v-col>

        <v-col cols="8">
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
              <v-card tile outlined height="256">
                <v-skeleton-loader type="table-heading,divider,table-tbody" height="256" />
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card tile outlined height="100%"></v-card>
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
            :rank="tokenData.rank"
            :symbol="tokenData.symbolName"
            :qc-key="tokenData.qcKey"
            :website-links="tokenData.websiteUrl"
            :bit-bucket-repos="tokenData.bitbucketRepos"
            :git-hub-repos="tokenData.githubRepos"
            :explorer-urls="tokenData.explorerUrls"
            :telegram-channel-id="tokenData.telegramChannelId"
            :twitter-url="tokenData.twitterUrl"
            :subreddit-url="tokenData.subredditUrl"
            :facebook-url="tokenData.facebookUrl"
            :coin-description="tokenData.coinDescription"
          />
        </v-col>
        <v-col cols="8">
          <v-row>
            <v-col cols="12">
              <coin-metrics
                :price-usd="tokenData.price.priceUsd"
                :price-btc="tokenData.price.priceBtc"
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
            <v-col cols="6">
              <v-card tile outlined height="256">
                <token-news :token-symbol="tokenData.qcKey" :news="tokenData.news" :symbol="tokenData.qcKey" />
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-card tile outlined height="100%"></v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <token-aave-assets v-if="tokenData" :row-pool-data="tokenData.aavePools" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useToken from '~/composables/useToken'
import CoinProfile from '~/components/coin-details/CoinProfile.vue'
import CoinMetrics from '~/components/coin-details/CoinMetrics.vue'
import TokenNews from '~/components/news/TokenNews.vue'
import TokenAaveAssets from '~/components/coin-details/TokenAaveAssets.vue'
export default defineComponent({
  components: {
    TokenAaveAssets,
    TokenNews,
    CoinMetrics,
    CoinProfile,
  },
  setup() {
    const { tokenData, loading, setInterval } = useToken()
    return { tokenData, loading, setInterval }
  },
})
</script>
