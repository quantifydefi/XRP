<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-row no-gutters>
        <!--    Coin Profile    -->
        <v-col cols="12" lg="4" class="pa-2">
          <coin-profile :height="513" :coin-profile-data="coinProfileData"> </coin-profile>
        </v-col>

        <v-col cols="12" lg="8" class="pa-0">
          <v-row no-gutters>
            <v-col cols="12" class="pa-2">
              <coin-metrics
                :coin-metrics-data="coinMetricsData"
                :high-low-data="highAndLowData"
                :height="197"
              ></coin-metrics>
            </v-col>

            <v-col cols="12" lg="6" class="pa-2">
              <v-card height="300" tile outlined>
                <uniswap-v-3-action-dialog></uniswap-v-3-action-dialog>
                <uniswap-v-3-action></uniswap-v-3-action>
              </v-card>
            </v-col>

            <v-col cols="12" lg="6" class="pa-2">
              <v-card height="300" tile outlined></v-card>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" lg="4" class="pa-2">
          <v-card tile outlined>
            <iframe
              src="https://app.uniswap.org/#/swap?outputCurrency=0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9"
              height="505px"
              width="100%"
              style="border: 0; margin: 0 auto; display: block; max-width: 100%; min-width: 300px"
            />
          </v-card>
        </v-col>

        <v-col cols="12" lg="4" class="pa-2">
          <v-card tile outlined height="505"> </v-card>
        </v-col>

        <v-col cols="12" lg="4" class="pa-2">
          <token-news :height="505" :coin-name="coinProfileData.symbol_name" :coin-articles="articles"></token-news>
        </v-col>
        <!-- <v-col cols="12" lg="4" class="pa-2">
          <v-card height="300" tile outlined></v-card>
        </v-col> -->
      </v-row>
    </v-col>

    <!-- <v-col cols="12" lg="8" class="pa-2">
      <v-card tile outlined>
        <v-row>
          <v-col cols="12">
            <iframe
              src="https://app.uniswap.org/#/add/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/3000?chain=mainnet&minPrice=17.004542&maxPrice=31.641926"
              height="870px"
              width="100%"
              style="border: 0; margin: 0 auto; display: block; max-width: 100%; min-width: 300px"
            />
          </v-col>
        </v-row>
      </v-card>
    </v-col> -->
  </v-row>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { CoinProfileDataInterface, MetricsDataInterface } from '~/types/token'
import { CryptoPanicArticleInterface } from '@/types/news'
import CoinProfile from '~/components/coin-details/CoinProfile.vue'
import CoinMetrics from '~/components/coin-details/CoinMetrics.vue'
import TokenNews from '~/components/news/TokenNews.vue'

import { aaveTokenProfile, aavehighAndLowData, aaveNews } from '~/mock/data'
import UniswapV3ActionDialog from '~/components/pools/UniswapV3ActionDialog.vue'
import UniswapV3Action from '~/components/pools/UniswapV3Action.vue'

export default defineComponent({
  name: 'Index',
  components: { CoinProfile, CoinMetrics, TokenNews, UniswapV3Action, UniswapV3ActionDialog },
  setup() {
    const coinProfileData: CoinProfileDataInterface = aaveTokenProfile

    const coinMetricsData = computed<MetricsDataInterface>(() => {
      return {
        qc_key: aaveTokenProfile.qc_key,
        symbol_name: aaveTokenProfile.symbol_name,
        price_usd: aaveTokenProfile.price_usd,
        price_btc: aaveTokenProfile.price_btc,
        marketcap: aaveTokenProfile.marketcap,
        volume24h: aaveTokenProfile.volume24h,
        circulating_supply: aaveTokenProfile.circulating_supply,
        safe_score: aaveTokenProfile.safe_score,
        price24h: aaveTokenProfile.price24h,
        support1h: aaveTokenProfile.support1h,
        resistance1h: aaveTokenProfile.resistance1h,
      }
    })

    const articles: CryptoPanicArticleInterface[] = aaveNews as CryptoPanicArticleInterface[]

    const highAndLowData = aavehighAndLowData

    return { coinProfileData, coinMetricsData, highAndLowData, articles }
  },
})
</script>
