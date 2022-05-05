<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-row no-gutters>
        <!--    Coin Profile    -->
        <v-col cols="12" lg="4" class="pa-2">
          <coin-profile :height="460" :coin-profile-data="coinProfileData"> </coin-profile>
        </v-col>

        <v-col cols="12" lg="8">
          <v-row no-gutters>
            <v-col cols="12" class="pa-2">
              <coin-metrics
                :coin-metrics-data="coinMetricsData"
                :high-low-data="highAndLowData"
                :height="197"
              ></coin-metrics>
            </v-col>

            <v-col class="pa-2" cols="12" lg="6">
              <v-card height="245" outlined tile> </v-card>
            </v-col>
            <v-col class="pa-2" cols="12" lg="6">
              <v-card height="245" outlined tile> </v-card>
            </v-col>
          </v-row>
        </v-col>

        <v-col class="pa-2" cols="12" lg="4">
          <v-card height="300" outlined tile> </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'
import { CoinProfileDataInterface, MetricsDataInterface } from '~/types/token'
import CoinProfile from '~/components/coin-details/CoinProfile.vue'
import CoinMetrics from '~/components/coin-details/CoinMetrics.vue'

import { aaveTokenProfile, aavehighAndLowData } from '~/mock/data'

export default defineComponent({
  name: 'Index',
  components: { CoinProfile, CoinMetrics },
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

    const highAndLowData = aavehighAndLowData

    return { coinProfileData, coinMetricsData, highAndLowData }
  },
})
</script>
