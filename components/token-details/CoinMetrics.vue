<template>
  <v-card tile outlined class="pa-4" min-height="200">
    <v-row>
      <v-col cols="12" lg="4">
        <v-row no-gutters align="center">
          <v-col cols="12">
            <h2 :class="['text-h4 font-weight-medium', 'ml-1', 'text-no-wrap', priceTextClass]">
              {{ $f(tokenPriceUsd, { pre: '$ ', minDigits: 2, maxDigits: 4 }) }}
              <span class="grey--text text-caption">USD</span>
              <span class="ml-3">
                <v-btn
                  dark
                  depressed
                  tile
                  height="22"
                  :color="tokenPrice24h > 0 ? 'green' : 'red'"
                  class="px-2 subtitle-2"
                >
                  {{ $f(tokenPrice24h * 100, { minDigits: 2, after: ' %' }) }}
                </v-btn>
              </span>
            </h2>
          </v-col>

          <v-col cols="12">
            <div class="font-weight-medium subtitle-1 ml-2 text-no-wrap">
              <span v-text="$f(tokenPriceEth, { minDigits: 2, maxDigits: 8 })" />
              <span class="font-weight-regular ml-1 grey--text text-caption">ETH</span>
            </div>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12" lg="8">
        <v-row no-gutters class="mt-2 flex-no-wrap mt-lg-6" justify="center">
          <v-col cols="auto" lg="3" class="d-flex justify-end">
            <div class="text-no-wrap">
              <span class="ml-1 font-weight-bold" v-text="`Low: ${$f(intervalData.low, { minDigits: 2 })}`" />
            </div>
          </v-col>

          <v-col cols="3" class="px-4">
            <v-progress-linear
              class="mt-2"
              :color="intervals.color"
              buffer-value="0"
              :value="intervals.score"
              stream
            ></v-progress-linear>
          </v-col>

          <v-col lg="3">
            <div class="text-no-wrap">
              <span class="font-weight-bold">
                <span class="ml-1 font-weight-bold" v-text="`High: ${$f(intervalData.high, { minDigits: 2 })}`" />
              </span>
              <v-btn
                id="intervalSelectorToggle"
                tile
                class="ml-2 caption font-weight-medium px-1 text-lowercase text-highlight"
                height="24"
                depressed
                @click="toggleIntervalSelector = !toggleIntervalSelector"
              >
                {{ intervalModel.text }}
                <v-icon small>mdi-chevron-down</v-icon>
              </v-btn>
              <v-select
                v-show="false"
                v-model="intervalModel"
                return-object
                attach="#intervalSelectorToggle"
                dense
                :items="intervalSelectorOptions"
                item-text="text"
                item-value="value"
                auto
                :menu-props="{
                  flat: true,
                  tile: true,
                  fixed: true,
                  value: toggleIntervalSelector,
                  closeOnClick: true,
                  bottom: true,
                  'nudge-top': -30,
                  'nudge-width': 130,
                  'nudge-left': 0,
                  contentClass: 'menu-length text-left',
                }"
                @input="onIntervalChange"
              />
            </div>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="12">
        <v-divider />
      </v-col>

      <v-row class="pa-4">
        <v-col v-for="(item, i) in metrics" :key="i" cols="6" md="4" lg="2" class="pa-1">
          <v-row no-gutters>
            <v-col class="grey--text subtitle-2">
              {{ item.title }}
              <common-ui-info-tooltip v-if="item.tooltip" :text="item.tooltip" />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col class="text-h6 text-truncate"> {{ item.value }} </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, toRefs, useContext, watch } from '@nuxtjs/composition-api'
import { HighAndLow, TimeInterval } from '~/types/apollo/main/types'
import { EmitEvents } from '~/types/events'
import { messages } from '~/constants/messages'

type Props = {
  priceUsd: number
  priceEth: number
  price24h: number
  intervalData: HighAndLow
  marketCap: number
  volume: number
  circSupply: number
  support: number
  resistance: number
  safetyScore: number
}
export default defineComponent<Props>({
  name: 'CoinMetrics',

  props: {
    priceUsd: { type: Number, required: true },
    priceEth: { type: Number, required: true },
    price24h: { type: Number, required: true },
    intervalData: { type: Object as PropType<HighAndLow>, required: true },
    marketCap: { type: Number, default: 0 },
    volume: { type: Number, default: 0 },
    circSupply: { type: Number, default: 0 },
    support: { type: Number, default: 0 },
    resistance: { type: Number, default: 0 },
    safetyScore: { type: Number, default: 0 },
  },

  setup(props, { emit }) {
    // COMPOSABELES
    const { $f } = useContext()

    // STATE
    const tokenPriceUsd = toRefs(props).priceUsd
    const tokenPriceEth = toRefs(props).priceEth
    const tokenPrice24h = toRefs(props).price24h
    const tokenInterval = toRefs(props).intervalData
    const priceTextClass = ref('')
    const intervalModel = ref<{ text: string; value: `${TimeInterval}` }>({ text: '1h', value: 'INTERVAL_1H' })
    const intervalSelectorOptions: { text: string; value: `${TimeInterval}` }[] = [
      { text: '5min', value: 'INTERVAL_5MIN' },
      { text: '15min', value: 'INTERVAL_15MIN' },
      { text: '30min', value: 'INTERVAL_30MIN' },
      { text: '1h', value: 'INTERVAL_1H' },
      { text: '2h', value: 'INTERVAL_2H' },
      { text: '4h', value: 'INTERVAL_4H' },
      { text: '24h', value: 'INTERVAL_24H' },
      { text: '1week', value: 'INTERVAL_1WEEK' },
    ]
    const toggleIntervalSelector = ref(false)

    const intervalPtcScore = computed(
      () =>
        ((tokenPriceUsd.value - tokenInterval.value.low) * 100) / (tokenInterval.value.high - tokenInterval.value.low)
    )
    const intervals = computed(() => {
      const score: number =
        ((tokenPriceUsd.value - tokenInterval.value.low) * 100) / (tokenInterval.value.high - tokenInterval.value.low)
      let color = ''
      if (score >= 80) {
        color = '#40aa00'
      } else if (score >= 60) {
        color = '#40aa00'
      } else if (score >= 40) {
        color = '#FFCA28'
      } else if (score >= 20) {
        color = '#f08c00'
      } else if (score < 20) {
        color = '#f10000'
      }
      return { score, color }
    })

    const metrics = computed(() => [
      { title: 'Market Cap', value: $f(props.marketCap, { useSymbol: true, pre: '$' }) },
      { title: 'Volume', value: $f(props.volume, { useSymbol: true, pre: '$' }) },
      { title: 'Circ. Supply', value: $f(props.circSupply, { useSymbol: true, pre: '$' }) },
      { title: 'Support', value: $f(props.support, { minDigits: 2, pre: '$' }), tooltip: messages.tooltips.support },
      {
        title: 'Resistance ',
        value: $f(props.resistance, { minDigits: 2, pre: '$' }),
        tooltip: messages.tooltips.resistance,
      },
      { title: 'Safety Score ', value: props.safetyScore },
    ])

    // METHODS
    function onIntervalChange({ value }: { value: `${TimeInterval}` }) {
      emit(EmitEvents.onIntervalChange, value)
    }

    // WATCHERS
    watch(tokenPriceUsd, (newPrice, prevPrice) =>
      newPrice > prevPrice ? (priceTextClass.value = 'green--text') : (priceTextClass.value = 'red--text')
    )

    return {
      tokenPriceUsd,
      tokenPriceEth,
      tokenPrice24h,
      priceTextClass,
      intervalModel,
      intervalSelectorOptions,
      toggleIntervalSelector,
      tokenInterval,
      intervalPtcScore,
      intervals,
      metrics,

      // METHODS
      onIntervalChange,
    }
  },
})
</script>
