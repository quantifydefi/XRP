<template>
  <v-row justify="center">
    <v-col cols="12" lg="11">
      <v-row>
        <v-col cols="12" lg="4">
          <coin-profile :height="513" :coin-profile-data="qcCoinData.qcProfile" :loading="loading"> </coin-profile>
        </v-col>

        <v-col cols="12" lg="8">
          <v-row>
            <v-col cols="12">
              <coin-metrics
                :coin-metrics-data="qcCoinData.qcMetrics"
                :loading="loading"
                :high-low-data="highAndLowData"
                :height="200"
              ></coin-metrics>
            </v-col>
            <v-col cols="12" lg="6">
              <v-card height="290" tile outlined> </v-card>
            </v-col>
            <v-col cols="12" lg="6">
              <v-card height="290" tile outlined> </v-card>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" lg="4">
          <v-card tile outlined>
            <iframe
              src="https://app.uniswap.org/#/swap?outputCurrency=0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9"
              height="505px"
              width="100%"
              style="border: 0; margin: 0 auto; display: block; max-width: 100%; min-width: 300px"
            />
          </v-card>
        </v-col>

        <v-col cols="12" lg="4"> <v-card tile outlined height="505"> </v-card> </v-col>

        <v-col cols="12" lg="4">
          <token-news
            :height="505"
            :loading="loading"
            :token-symbol="$route.params.id.toUpperCase()"
            :coin-articles="articles"
          ></token-news>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
/* eslint-disable camelcase */
import { defineComponent } from '@nuxtjs/composition-api'
import CoinProfile from '~/components/coin-details/CoinProfile.vue'
import { CryptoPanicArticleInterface } from '@/types/news'

import TokenNews from '~/components/news/TokenNews.vue'
import useQCCoinDetails from '~/composables/useQCCoinDetails'

import { aavehighAndLowData, aaveNews } from '~/mock/data'

import CoinMetrics from '~/components/coin-details/CoinMetrics.vue'

export default defineComponent({
  name: 'Index',
  components: { CoinProfile, CoinMetrics, TokenNews },
  setup() {
    /** COMPOSABLES **/
    const { qcCoinData, loading } = useQCCoinDetails()

    // Todo: Fetch News from backend
    const articles: CryptoPanicArticleInterface[] = aaveNews as CryptoPanicArticleInterface[]

    // Todo: Add High and Low and Poll every 10 seconds from backend
    const highAndLowData = aavehighAndLowData

    return { loading, qcCoinData, highAndLowData, articles }
  },
})
</script>
