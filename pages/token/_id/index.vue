<template>
  <v-row align="center" justify="center">
    <v-col v-if="isDataReady" class="py-0">
      <token-header :token-data="tokenData" />

      <v-row>
        <left-bar :token-data="tokenData" />

        <v-col lg="7" md="12" cols="12">
          <v-card
            tile
            outlined
            height="100%"
            :color="theme === 'dark' ? 'transparent' : ''"
            :style="theme === 'dark' ? 'border: 1px solid #424242 !important' : ''"
          >
            <chart
              :token-data="tokenData"
              :chart-config="chartConfig"
              :token0-symbol="tokenData.token0_symbol"
              :token1-symbol="tokenData.token1_symbol"
              @chart-ready="isChartReady = true"
            />
          </v-card>
        </v-col>

        <v-col lg="3" sm="12" md="12">
          <uniswap-iframe :quote-token="tokenData[`${tokenData.quote_asset}_id`]" />
        </v-col>
      </v-row>
    </v-col>

    <v-overlay :opacity="1" absolute :value="!isChartReady" :color="$vuetify.theme.themes[theme].overlay">
      <img :src="'/img/logo/logo.svg'" height="100" width="100" alt="logo" />
      <v-progress-linear color="primary" indeterminate rounded height="6"></v-progress-linear>
    </v-overlay>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { plainToClass } from 'class-transformer'
import { mapState } from 'vuex'
import ApiMenuHeader from '../../../components/common/ApiMenuHeader.vue'
import Notification from '../../../components/common/Notification.vue'
import { Token, TokenChartConfig } from '~/models/token'
import { Events } from '~/types/global'
import TokenHeader from '~/components/token-details/TokenHeader.vue'
import Chart from '~/components/token-details/Chart.vue'
import LeftBar from '~/components/token-details/LeftBar.vue'
import UniswapIframe from '~/components/token-details/UniswapIframe.vue'
@Component({
  name: 'Default',
  components: {
    UniswapIframe,
    LeftBar,
    Chart,
    TokenHeader,
    ApiMenuHeader,
    Notification,
  },
  head(this: any) {
    return {
      title: `Trade ${this.tokenData.token0_name}-${this.tokenData.token1_name} (${this.tokenData.token0_symbol}-${this.tokenData.token1_symbol}) on Uniswap | DeFi Heatmap`,

      meta: [
        {
          name: 'description',
          hid: 'description',
          content: 'Live prices | Interactive Chart | Simple and Easy to use Uniswap Interface',
        },
      ],
    }
  },
  computed: {
    ...mapState({
      // TODO: Add models for UI types
      ui: (state: any) => state.ui,
      theme: (state: any) => state.ui.theme,
    }),
  },
})
export default class Index extends Vue {
  private tokenData: Token | {} = {}
  private isChartReady: boolean = false
  private chartConfig = plainToClass(TokenChartConfig, {
    timeInterval: [],
    defaultTimeRange: '1D',
    timeRange: ['1D', '7D', '1M', '3M', '6M', '1Y'],
  } as TokenChartConfig)

  get isDataReady() {
    return Object.keys(this.tokenData).length
  }

  async mounted() {
    this.tokenData = await this.getTokenData()
  }

  async getTokenData(): Promise<Token | {}> {
    try {
      return await this.$store.dispatch('token/getTokenData', {
        tokeId: this.$route.params.id,
      })
    } catch {
      this.$root.$emit(Events.GLOBAL_NOTIFICATION, {
        text: 'Token does not exist',
      })
      return {}
    }
  }
}
</script>

<style scoped></style>
