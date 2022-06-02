<template>
  <v-card tile outlined :min-height="height" elevation="0" class="pa-4">
    <template v-if="loading">
      <v-row no-gutters align="center">
        <v-col cols="12">
          <v-skeleton-loader type="table-heading,text"></v-skeleton-loader>
        </v-col>

        <v-col cols="12" class="mt-4">
          <v-skeleton-loader type="divider"></v-skeleton-loader>
        </v-col>

        <v-col cols="12" class="mt-5">
          <v-row class="mt-1">
            <v-col v-for="i in 6" :key="i" cols="6" md="3" lg="2">
              <v-skeleton-loader type="text@2"></v-skeleton-loader>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </template>

    <template v-else>
      <v-row>
        <v-col cols="12" lg="2">
          <v-row no-gutters align="center">
            <v-col cols="12">
              <h2 class="text-h4 font-weight-medium ml-1 text-no-wrap" :style="{ color: priceUsdStyle.color }">
                {{ currencyFormatter(coinPrice.priceUsd, 'USD', 'en') }}
                <span>
                  <v-btn dark depressed tile height="22" class="px-2 subtitle-2" :color="ptcChangeStyle"
                    >{{ ptcFormatter(coinMetrics.price24h) }}
                  </v-btn>
                </span>
              </h2>
            </v-col>

            <v-col cols="12">
              <div class="font-weight-medium subtitle-1 ml-2 text-no-wrap">
                <span :style="coinPrice.qcKey !== 'BTC' ? { color: priceUsdStyle.color } : {}">
                  {{ btcPriceFormatter(coinPrice.priceBtc, 'USD', 'en') }}
                </span>
                <span class="font-weight-regular ml-1">BTC</span>
              </div>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" lg="10">
          <v-row v-if="highLow" no-gutters class="mt-2 flex-no-wrap mt-lg-6" justify="center">
            <v-col cols="auto" lg="3" class="d-flex justify-end">
              <div class="text-no-wrap">
                Low:
                <span class="ml-1 font-weight-bold"> {{ currencyFormatter(highLow.low, 'USD', 'en') }}</span>
              </div>
            </v-col>

            <v-col cols="3" class="px-4">
              <v-progress-linear
                class="mt-2"
                :color="highLowPtcColorStyle"
                buffer-value="0"
                :value="highLowPtcScore"
                stream
              ></v-progress-linear>
            </v-col>

            <v-col cols="auto" lg="3" class="d-flex">
              <div class="text-no-wrap">
                High:
                <span class="font-weight-bold">
                  {{ currencyFormatter(highLow.high, 'USD', 'en') }}
                </span>
                <v-btn
                  id="orderTypeToggle"
                  tile
                  class="ml-2 caption font-weight-medium px-1 text-lowercase text-highlight"
                  height="24"
                  depressed
                  :color="ui[theme].jsonLogs"
                  @click="toggleOrderType = !toggleOrderType"
                >
                  {{ intervalType }}
                  <v-icon small>mdi-chevron-down</v-icon>
                </v-btn>
                <v-select
                  v-show="false"
                  v-model="intervalType"
                  return-object
                  attach="#orderTypeToggle"
                  dense
                  :items="intervalTypeOptions"
                  item-text="text"
                  item-value="value"
                  auto
                  style="max-height: 500px"
                  :menu-props="{
                    flat: true,
                    tile: true,
                    fixed: true,
                    value: toggleOrderType,
                    closeOnClick: true,
                    bottom: true,
                    'nudge-top': -30,
                    'nudge-width': 130,
                    'nudge-left': 0,
                    contentClass: 'menu-length text-left',
                  }"
                  @input="onIntervalTypeSelectChange(intervalType)"
                />
              </div>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12">
          <v-divider />
        </v-col>

        <v-col cols="12" class="py-0">
          <v-row class="pa-4">
            <v-col cols="6" md="4" lg="2" class="pa-1">
              <v-row no-gutters>
                <v-col :class="[ui[theme].subTextColor, 'text-subtitle-2']">Market Cap</v-col>
              </v-row>
              <v-row no-gutters>
                <v-col class="text-h6 text-truncate">
                  {{ currencyFormatter(coinMetrics.marketcap / 1000000, 'USD', 'en') + ' M' }}
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6" md="4" lg="2" class="pa-1">
              <v-row no-gutters>
                <v-col :class="[ui[theme].subTextColor, 'text-subtitle-2']">Volume</v-col>
              </v-row>
              <v-row no-gutters>
                <v-col class="text-h6 text-truncate">
                  {{ currencyFormatter(coinMetrics.volume24h / 1000000, 'USD', 'en') + ' M' }}
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6" md="4" lg="2" class="pa-1">
              <v-row no-gutters>
                <v-col :class="[ui[theme].subTextColor, 'text-subtitle-2']">Circ. Supply</v-col>
              </v-row>
              <v-row no-gutters>
                <v-col class="text-h6 text-truncate">
                  {{ currencyFormatter(coinMetrics.circulatingSupply / 1000000, 'USD', 'en') + ' M' }}
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6" md="4" lg="2" class="pa-1">
              <v-row no-gutters>
                <v-col :class="[ui[theme].subTextColor, 'text-subtitle-2']"> Support </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col class="text-h6 text-truncate">
                  {{ currencyFormatter(coinMetrics.support1h, 'USD', 'en') }}
                </v-col>
              </v-row>
            </v-col>

            <v-col cols="6" md="4" lg="2" class="pa-1">
              <v-row no-gutters>
                <v-col :class="[ui[theme].subTextColor, 'text-subtitle-2']"> Resistance </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col class="text-h6 text-truncate">{{
                  currencyFormatter(coinMetrics.resistance1h, 'USD', 'en')
                }}</v-col>
              </v-row>
            </v-col>

            <v-col cols="6" md="4" lg="2" class="pa-1">
              <v-row no-gutters>
                <v-col :class="[ui[theme].subTextColor, 'text-subtitle-2']">Safety Score</v-col>
              </v-row>
              <v-row no-gutters>
                <v-col class="text-h6">{{ coinMetrics.safeScore || '-' }}</v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </template>
  </v-card>
</template>

<script lang="ts">
/* eslint-disable camelcase */
import { defineComponent, useStore, PropType, watch, reactive, computed, toRef, ref } from '@nuxtjs/composition-api'
import { State, ThemeOptions, UiState } from '~/types/state'

import { useHelpers } from '~/composables/useHelpers'
import { HighAndLow, QcMetrics, QcPrice } from '~/types/apollo/main/types'
import { TimeInterval } from '~/types/token'

export default defineComponent({
  name: 'CoinMetrics',
  props: {
    height: {
      type: Number,
      default: 197,
    },
    loading: { type: Boolean, default: true },
    highLowData: {
      type: Object as PropType<HighAndLow>,
      required: true,
      default: () => ({}),
    },
    coinPriceData: {
      type: Object as PropType<QcPrice>,
      required: true,
      default: () => ({}),
    },
    coinMetricsData: {
      type: Object as PropType<QcMetrics>,
      required: true,
      default: () => ({}),
    },
  },
  setup(props, context) {
    /** COMPOSABLES **/
    const store = useStore<State>()
    const { currencyFormatter, btcPriceFormatter, ptcFormatter } = useHelpers()

    /** STATE **/
    const priceUsdStyle = reactive({ arrow: '', color: '' })
    const highLow = toRef(props, 'highLowData')
    const intervalTypeOptions: TimeInterval[] = ['5min', '15min', '30min', '1h', '2h', '4h', '24h', '1week']
    const toggleOrderType = ref(false)
    const intervalType = ref('24h')

    /** COMPUTED **/
    const ui = computed<UiState>(() => store.state.ui)
    const theme = computed<ThemeOptions>(() => store.state.ui.theme as ThemeOptions)
    const ptcChangeStyle = computed(() => {
      return Math.sign(coinMetrics.value.price24h) === 1 ? 'green' : 'red'
    })
    const highLowPtcScore = computed(() => {
      return ((coinPrice.value.priceUsd - highLow.value.low) / (highLow.value.high - highLow.value.low)) * 100
    })

    const coinPrice = computed<QcPrice>(() => props.coinPriceData)
    const coinMetrics = computed<QcMetrics>(() => props.coinMetricsData)

    // color style for percentage progress bar based on high and low percentage score
    const highLowPtcColorStyle = computed<string>(() => {
      if (highLowPtcScore.value >= 80) {
        return '#40aa00' // Very Bullish
      } else if (highLowPtcScore.value >= 60) {
        return '#40aa00' // Bullish
      } else if (highLowPtcScore.value >= 40) {
        return '#FFCA28' // Neutral
      } else if (highLowPtcScore.value >= 20) {
        return '#f08c00' // Bearish
      } else if (highLowPtcScore.value < 20) {
        return '#f10000' // Very Bearish
      } else {
        return ''
      }
    })

    /** WATCH **/
    watch(
      () => coinPrice.value.priceUsd,
      (newPrice, prevPrice) => {
        if (newPrice > prevPrice) {
          priceUsdStyle.color = '#4caf50'
        } else if (newPrice < prevPrice) {
          priceUsdStyle.color = '#ff5252'
        } else {
          priceUsdStyle.color = ''
        }
      }
    )

    /** METHODS **/
    function onIntervalTypeSelectChange(intervalType: string): void {
      context.emit('change-interval-type-selection', intervalType)
    }

    return {
      ui,
      theme,
      coinPrice,
      coinMetrics,
      highLow,
      priceUsdStyle,
      highLowPtcScore,
      highLowPtcColorStyle,
      ptcChangeStyle,
      intervalTypeOptions,
      intervalType,
      toggleOrderType,

      /** METHODS **/
      onIntervalTypeSelectChange,
      currencyFormatter,
      btcPriceFormatter,
      ptcFormatter,
    }
  },
})
</script>
