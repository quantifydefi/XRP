<template>
  <v-row v-if="isDataReady" align="center" justify="center">
    <v-col class="py-0">
      <v-row>
        <token-header :token-data="tokenData" />
      </v-row>

      <v-row>
        <v-col cols="2">
          <v-card class="mb-6" tile outlined>
            <v-card-text>
              <div>Liquidity {{ tokenData.symbol }} - ETH</div>
              <p class="display-1 text--primary mb-0">
                ${{ tokenData.liquidity_usd_mil }}m
              </p>
            </v-card-text>
          </v-card>

          <v-card class="mb-6" tile outlined>
            <v-card-text>
              <div>All time Volume in USD</div>
              <p class="display-1 text--primary mb-0">
                ${{ tokenData.volumeUsdFormatted }}m
              </p>
            </v-card-text>
          </v-card>

          <v-card class="mb-6" tile outlined>
            <v-card-text>
              <div>Transaction Count</div>
              <p class="display-1 text--primary mb-0">
                {{ tokenData.tx_count }}
              </p>
            </v-card-text>
          </v-card>
          <v-card class="mb-6" tile outlined>
            <v-card-text>
              <div>Liquidity Provider Count</div>
              <p class="display-1 text--primary mb-0">
                {{ tokenData.liquidity_provider_count }}
              </p>
            </v-card-text>
          </v-card>

          <v-card class="mb-2" tile outlined>
            <v-card-text>
              <div>Created At</div>
              <p class="text-subtitle-1 text--primary mb-0">
                {{ tokenData.date }}
              </p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col>
          <v-card tile outlined height="100%">
            <chart
              :chart-config="chartConfig"
              @chart-ready="isChartReady = true"
            />
          </v-card>
        </v-col>

        <v-col cols="3">
          <v-card class="mb-2" height="100%" tile outlined>
            <iframe
              id="myId"
              :src="`https://app.uniswap.org/#/swap?outputCurrency=${this.$route.params.id}`"
              height="730px"
              width="100%"
              style="
                border: 0;
                margin: 0 auto;
                display: block;
                border-radius: 10px;
                max-width: 600px;
              "
            />
          </v-card>
        </v-col>
      </v-row>
    </v-col>

    <v-overlay :opacity="1" color="grey lighten-5" :value="!isChartReady">
      <img :src="'/img/logo/logo.svg'" height="100" width="100" alt="logo" />
      <v-progress-linear
        color="primary"
        indeterminate
        rounded
        height="6"
      ></v-progress-linear>
    </v-overlay>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { plainToClass } from 'class-transformer'
import ApiMenuHeader from '../../../components/common/ApiMenuHeader.vue'
import Notification from '../../../components/common/Notification.vue'
import { Token, TokenChartConfig } from '~/models/token'
import { Events } from '~/types/global'
import TokenHeader from '~/components/token-details/TokenHeader.vue'
import Chart from '~/components/token-details/Chart.vue'
@Component({
  name: 'Default',
  components: {
    Chart,
    TokenHeader,
    ApiMenuHeader,
    Notification,
  },
  head(this: any) {
    return {
      title: `Trade ${this.tokenData.name} (${this.tokenData.symbol}) on Uniswap | DeFi Heatmap`,

      meta: [
        {
          name: 'description',
          hid: 'description',
          content:
            'Live prices | Interactive Chart | Simple and Easy to use Uniswap Interface',
        },
      ],
    }
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
