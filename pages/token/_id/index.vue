<!--<template>-->
<!--  <v-row justify="center">-->
<!--    <v-col cols="12" lg="11">-->
<!--      <v-row>-->
<!--        <v-col cols="12" lg="4">-->
<!--          <coin-profile :height="513" :coin-profile-data="qcCoinData.qcProfile" :loading="loading"> </coin-profile>-->
<!--        </v-col>-->

<!--        <v-col cols="12" lg="8">-->
<!--          <v-row>-->
<!--            <v-col cols="12">-->
<!--              <coin-metrics-->
<!--                :coin-metrics-data="qcCoinData.qcMetrics"-->
<!--                :coin-price-data="coinPrice"-->
<!--                :loading="loading"-->
<!--                :high-low-data="highAndLow"-->
<!--                :height="200"-->
<!--                @change-interval-type-selection="onChangeIntervalSelection"-->
<!--              ></coin-metrics>-->
<!--            </v-col>-->
<!--            <v-col cols="12" lg="6">-->
<!--              <v-card height="290" tile outlined> </v-card>-->
<!--            </v-col>-->
<!--            <v-col cols="12" lg="6">-->
<!--              <v-card height="290" tile outlined> </v-card>-->
<!--            </v-col>-->
<!--          </v-row>-->
<!--        </v-col>-->

<!--        <v-col cols="12" lg="4">-->
<!--          <v-card tile outlined>-->
<!--            <iframe-->
<!--              src="https://app.uniswap.org/#/swap?outputCurrency=0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9"-->
<!--              height="505px"-->
<!--              width="100%"-->
<!--              style="border: 0; margin: 0 auto; display: block; max-width: 100%; min-width: 300px"-->
<!--            />-->
<!--          </v-card>-->
<!--        </v-col>-->

<!--        <v-col cols="12" lg="4"> <v-card tile outlined height="505"> </v-card> </v-col>-->

<!--        <v-col cols="12" lg="4">-->
<!--          <token-news-->
<!--            :height="505"-->
<!--            :loading="loadingNews"-->
<!--            :token-symbol="$route.params.id.toUpperCase()"-->
<!--            :coin-articles="news"-->
<!--          ></token-news>-->
<!--        </v-col>-->
<!--      </v-row>-->
<!--    </v-col>-->
<!--  </v-row>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--/* eslint-disable camelcase */-->
<!--import { computed, defineComponent, ref, useRoute } from '@nuxtjs/composition-api'-->
<!--import { useQuery } from '@vue/apollo-composable/dist'-->
<!--import { useResult } from '@vue/apollo-composable'-->
<!--import CoinProfile from '~/components/coin-details/CoinProfile.vue'-->

<!--import TokenNews from '~/components/news/TokenNews.vue'-->
<!--import useQCCoinDetails from '~/composables/useQCCoinDetails'-->

<!--import CoinMetrics from '~/components/coin-details/CoinMetrics.vue'-->
<!--import { TimeInterval } from '~/types/token'-->
<!--import { NewsGQL } from '~/apollo/main/news.query.graphql'-->
<!--import { News } from '~/types/apollo/main/types'-->

<!--export default defineComponent({-->
<!--  name: 'Index',-->
<!--  components: { CoinProfile, CoinMetrics, TokenNews },-->
<!--  setup() {-->
<!--    /** STATE **/-->
<!--    const loadingNews = ref(true)-->

<!--    /** COMPOSABLES **/-->
<!--    const route = useRoute()-->
<!--    const { qcCoinData, selectedInterval, coinPrice, highAndLow, loading } = useQCCoinDetails()-->

<!--    const newsQuery = useQuery(NewsGQL, () => ({ qcKey: route.value.params.id }), {-->
<!--      fetchPolicy: 'no-cache',-->
<!--      prefetch: false,-->
<!--    })-->

<!--    const newsResult = useResult(newsQuery.result, [])-->

<!--    /** COMPUTED **/-->
<!--    const news = computed(() => newsResult.value as News[])-->

<!--    /** METHODS **/-->
<!--    function onChangeIntervalSelection(intervalType: string) {-->
<!--      selectedInterval.value = intervalType as TimeInterval-->
<!--    }-->

<!--    /** EVENTS **/-->
<!--    newsQuery.onResult((queryResult) => {-->
<!--      loadingNews.value = queryResult.loading-->
<!--    })-->

<!--    return { loading, loadingNews, qcCoinData, coinPrice, highAndLow, news, onChangeIntervalSelection }-->
<!--  },-->
<!--})-->
<!--</script>-->
