<template>
  <v-row>
    <metamask-button
      v-if="$vuetify.breakpoint.lgAndUp"
      ref="metaMaskComponent"
      :block-size-options="heatmapConfig.blockSize.options[heatmapConfig.mode]"
      :default-block-size="heatmapConfig.blockSize.default"
      :number-of-coins-values="heatmapConfig.numberOfCoins"
      :default-time-frame="heatmapConfig.timeFrame.default"
      :time-frame-options="heatmapConfig.timeFrame.options[heatmapConfig.mode]"
      @balance-heatmap="balanceHeatmap($event)"
      @data-value-change="applyConfigs($event)"
      @number-of-coins-change="changeNumberOfCoins"
      @exit-metamask="exitAccount"
      @time-frame-change="onTimeFrameChange($event)"
      @heatmap-loading="(status) => (isHeatmapReady = !status)"
      @filter-heatmap="(value) => (heatmapDataFilterString = value)"
    />
    <v-col cols="12" class="px-0 py-1">
      <v-card tile outlined :height="heatmapChartHeight">
        <marketcap
          v-if="heatmapData.length"
          :data="filteredHeatmapData"
          :tile-tooltip="toolTip"
          :data-field="dataField"
          :tile-body="tile"
          :chart-height="heatmapChartHeight"
          :color-field="colorField"
          @heatmap-ready="isHeatmapReady = true"
        />
      </v-card>
    </v-col>
    <v-overlay
      :opacity="1"
      :value="!isHeatmapReady"
      :color="ui[ui.theme].overlayColor"
    >
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
import { mapState } from 'vuex'
import Marketcap from '../components/heatmap/Marketcap.vue'
import {
  HeatmapData,
  HeatmapConfig,
  DataValueOption,
  HeatmapBalancesData,
} from '~/models/heatmap'
import { Events } from '~/types/global'
import MetamaskButton from '~/components/heatmap/MetamaskButton.vue'
import { UiState } from '~/store/ui'

@Component({
  name: 'Heatmap',
  components: {
    MetamaskButton,
    Marketcap,
  },
  computed: {
    ...mapState({
      // TODO: Add models for UI types
      ui: (state: any) => state.ui,
    }),
  },
  head(): object {
    return {
      title: 'Uniswap DEX NexGen Display  | Defi Heatmap',
      meta: [
        {
          name: 'description',
          hid: 'description',
          content:
            'Portfolio Analysis and Tracker | Connect your Ethereum wallet for in-depth analysis ',
        },
      ],
    }
  },
})
export default class Heatmap extends Vue {
  $refs!: {
    metaMaskComponent: HTMLFormElement
  }

  private heatmapData: (HeatmapData | HeatmapBalancesData)[] = []
  private heatmapConfig = plainToClass(HeatmapConfig, {
    mode: 'default',
    timeFrame: {
      title: 'Time Frame Liq',
      tooltip: 'Change Performance time Range',
      default: { title: '1 Day', value: '24h' },
      options: {
        default: [
          {
            value: '1h',
            title: '1 Hour',
            tile: `LIQ {percent_change_liq_1h}% [font-size: {fontSizeLev3}px] 1h`,
            colorField: 'color1h',
          },
          {
            value: '24h',
            title: '1 Day',
            tile: `LIQ {percent_change_liq_24h}% [font-size: {fontSizeLev3}px] 24h`,
            colorField: 'color24h',
          },
        ],
        userAddress: [
          {
            value: '1h',
            title: '1 Hour',
            tile: `LIQ {percent_change_liq_1h}% [font-size: {fontSizeLev3}px] 1h`,
            colorField: 'color1h',
          },
          {
            value: '24h',
            title: '1 Day',
            tile: `LIQ {percent_change_liq_24h}% [font-size: {fontSizeLev3}px] 24h`,
            colorField: 'color24h',
          },
        ],
      },
    },

    blockSize: {
      title: 'Heatmap Data Value',
      tooltip: 'Change Data Value',
      default: { title: 'Liquidity', value: 'liquidity' },
      options: {
        default: [
          {
            dataField: 'reserve_index',
            title: 'Liquidity',
            value: 'liquidity',
            tile: `[font-size: {fontSize}px font-weight: 400;]{poolSymbol}[/]
                  [font-size: {fontSizeLev2}px; font-weight: 400;]$ {token0_price.formatNumber('#.0000')} - $ {token1_price.formatNumber('#.0000')}
                  {time-data}`,

            toolTip: `[bold]{token0_name}-{token1_name}[/]
                    ------------------------------------------
                    Price: $ {token0_price_usd} [font-size: 12px]{token0_price}/{token0_symbol} | {eth_price_usd}/ETH[/]
                    1H: {token0_percent_change_1h}%
                    24H: {token0_percent_change_24h}%

                    [bold]{token1_name}[/]
                    ------------------------------------------
                    Price: $ {token1_price_usd} [font-size: 12px]{token1_price}/{token1_symbol} | {eth_price_usd}/ETH[/]
                    1H: {token1_percent_change_1h}%
                    24H: {token1_percent_change_24h}%`,
          },
        ],

        userAddress: [
          {
            dataField: 'market_cap_usd',
            value: 'marketCap',
            title: 'MarketCap',
            tile: `[font-size: {fontSize}px font-weight: 400;]{token_symbol}[/]
                  [font-size: {fontSizeLev2}px; font-weight: 400;]
                  $ {marketCapFormatted}
                  {time-data}`,

            toolTip: `[bold]{token_name}[/]
                    ---------------------
                    MarketCap: $ {marketCapFormatted}
                    Price USD: $ {rate_usd}
                    Liquidity: $ {liquidityTransformed}m
                    Uniswap Pool: {token_pair}`,
          },
          {
            dataField: 'balance_usd',
            value: 'balanceUsd',
            title: 'Balance USD',
            tile: `[font-size: {fontSize}px font-weight: 400;]{token_symbol}[/]
                  [font-size: {fontSizeLev2}px; font-weight: 400;]
                  $ {balance_usd}
                  {time-data}`,

            toolTip: `[bold]{token_name}[/]
                    ---------------------
                    Balance USD: $ {balance_usd} [font-size: 12px] | {eth_price_usd}/ETH[/]
                    Contract Balance: {contract_balance}
                    Price USD: $ {rate_usd}
                    Liquidity: $ {liquidityTransformed}m
                    Uniswap Pool: {token_pair}`,
          },
        ],
      },
    },
    numberOfCoins: [10, 20, 36, 50, 100, 200, 500, 750],
  } as HeatmapConfig)

  private toolTip: string | null = null
  private tile: string | null = null
  private dataField: string | null = null
  private colorField: string = 'color24h'
  private isHeatmapReady = false
  private heatmapChartHeight = 800
  private ui!: UiState
  private heatmapDataFilterString = ''

  get filteredHeatmapData() {
    if (
      this.heatmapData.length > 0 &&
      this.heatmapDataFilterString &&
      this.heatmapDataFilterString.length > 1
    ) {
      if (this.heatmapData[0] instanceof HeatmapData) {
        return this.heatmapData.filter((elem: any) =>
          elem.poolSymbol
            .toLowerCase()
            .includes(this.heatmapDataFilterString.toLowerCase())
        )
      } else if (this.heatmapData[0] instanceof HeatmapBalancesData) {
        return this.heatmapData.filter((elem: any) =>
          elem.token_symbol
            .toLowerCase()
            .includes(this.heatmapDataFilterString.toLowerCase())
        )
      }
    } else return this.heatmapData
  }

  private async mounted() {
    this.heatmapChartHeight = window.innerHeight - 95
    this.applyConfigs('liquidity')
    await this.loadDefaultHeatmap()
  }

  private async loadDefaultHeatmap(): Promise<void> {
    this.heatmapData = await this.getHeatmapData({})
  }

  /** Get Initial Heatmap Data */
  private async getHeatmapData({
    numOfCoins,
  }: { numOfCoins: number } | any): Promise<HeatmapData[] | []> {
    try {
      return await this.$store.dispatch('heatmap/getHeatmapData', {
        numOfCoins,
      })
    } catch {
      return []
    }
  }

  /** Handler id Ethereum Heatmap Data ready. Apply tole and tooltip templates for Ethereum heatmap */
  private async balanceHeatmap({
    address,
  }: {
    address: string
  }): Promise<void> {
    this.isHeatmapReady = false
    try {
      this.heatmapData = await this.$store.dispatch('heatmap/balanceHeatmap', {
        address,
      })

      this.heatmapConfig.blockSize.default = {
        value: 'balanceUsd',
        title: 'Balance USD',
      }
      this.heatmapConfig.mode = 'userAddress'
      this.colorField = 'color24h'
      this.applyConfigs('balanceUsd')
      this.isHeatmapReady = true
    } catch {
      this.applyConfigs('liquidity')
      this.$root.$emit(Events.GLOBAL_NOTIFICATION, {
        text:
          'Cannot build Heatmap since Contract Balances are missing or equal to zero',
      })
      this.$refs.metaMaskComponent.resetBlockSize()
      this.isHeatmapReady = true
    }
  }

  private applyConfigs(value: string) {
    const found:
      | DataValueOption
      | undefined = this.heatmapConfig.blockSize.options[
      this.heatmapConfig.mode
    ].find((elem) => elem.value === value)
    if (found) {
      const timeData = this.heatmapConfig.timeFrame.options[
        this.heatmapConfig.mode
      ].find((elem) => elem.colorField === this.colorField)
      if (timeData) {
        this.toolTip = found.toolTip
        this.tile = found.tile.replace('{time-data}', timeData.tile)
        this.dataField = found.dataField
      }
    }
  }

  async changeNumberOfCoins(numberOfCoins: number | undefined) {
    if (numberOfCoins === undefined) return
    this.heatmapData = await this.getHeatmapData({ numOfCoins: numberOfCoins })
  }

  onTimeFrameChange(value: string) {
    const found = this.heatmapConfig.timeFrame.options[
      this.heatmapConfig.mode
    ].find((elem) => elem.value === value)

    if (found) {
      const blockData = this.heatmapConfig.blockSize.options[
        this.heatmapConfig.mode
      ].find((elem) => elem.dataField === this.dataField)

      if (blockData) {
        this.tile = blockData.tile.replace('{time-data}', found.tile)
        this.colorField = found.colorField
      }
    }
  }

  exitAccount() {
    this.heatmapConfig.mode = 'default'
    this.colorField = 'color24h'
    this.loadDefaultHeatmap()
    this.applyConfigs('liquidity')
  }
}
</script>
