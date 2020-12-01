<template>
  <v-row>
    <metamask-button
      v-if="$vuetify.breakpoint.lgAndUp"
      ref="metaMaskComponent"
      :block-size-options="[
        {
          value: heatmapConfig.blockSize.options.liquidity.dataField,
          text: heatmapConfig.blockSize.options.liquidity.title,
        },
        {
          value: heatmapConfig.blockSize.options.balanceUsd.dataField,
          text: heatmapConfig.blockSize.options.balanceUsd.title,
        },
      ]"
      :number-of-coins-values="heatmapConfig.numberOfCoins"
      :default-time-frame="heatmapConfig.timeFrame.default"
      :time-frame-options="heatmapConfig.timeFrame.options"
      @heatmap-data="ethereumHeatmap($event)"
      @data-value-change="changeDataValue($event)"
      @number-of-coins-change="changeNumberOfCoins"
      @exit-metamask="loadDefaultHeatmap"
      @time-frame-change="onTimeFrameChange($event)"
    />
    <v-col cols="12" class="px-0 py-0">
      <v-card tile outlined :height="heatmapChartHeight">
        <marketcap
          v-if="heatmapData.length"
          :data="heatmapData"
          :tile-tooltip="toolTip"
          :data-field="dataField"
          :tile-body="tile"
          :chart-height="heatmapChartHeight"
          :color-field="colorField"
          @heatmap-ready="isHeatmapReady = true"
        />
      </v-card>
    </v-col>
    <v-overlay :opacity="1" color="grey lighten-5" :value="!isHeatmapReady">
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
import { Vue, Component, Ref } from 'vue-property-decorator'
import { plainToClass } from 'class-transformer'
import Marketcap from '../components/heatmap/Marketcap.vue'
import { HeatmapData, HeatmapConfig } from '~/models/heatmap'
import { Events } from '~/types/global'
import MetamaskButton from '~/components/heatmap/MetamaskButton.vue'
declare global {
  interface Window {
    ethereum: any
  }
}

@Component({
  name: 'Index',
  components: {
    MetamaskButton,
    Marketcap,
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
export default class Index extends Vue {
  @Ref('metaMaskComponent') readonly metaMaskComponent!: any

  private heatmapData: HeatmapData[] = []
  private heatmapConfig = plainToClass(HeatmapConfig, {
    timeFrame: {
      title: 'Time Frame',
      tooltip: 'Change Performance time Range',
      default: { title: '1 Hour', value: '1h' },
      options: [
        {
          value: '1h',
          title: '1 Hour',
          tile: `[font-size: {fontSize}px font-weight: 400;]{symbol}[/]
                  [font-size: {fontSizeLev2}px; font-weight: 400;]$ {price_usd}
                  {percent_change_1h}% [font-size: {fontSizeLev3}px] 1h`,
          colorField: 'color1h',
        },
        {
          value: '24h',
          title: '1 Day',
          tile: `[font-size: {fontSize}px font-weight: 400;]{symbol}[/]
                  [font-size: {fontSizeLev2}px; font-weight: 400;]
                  $ {price_usd}
                  {percent_change_24h}% [font-size: {fontSizeLev3}px] 24h`,
          colorField: 'color24h',
        },
      ],
    },

    blockSize: {
      title: 'Heatmap Data Value',
      tooltip: 'Change Data Value',
      options: {
        liquidity: {
          dataField: 'liquidity_index',
          title: 'Liquidity',
          tile: `[font-size: {fontSize}px font-weight: 400;]{symbol}[/]
                  [font-size: {fontSizeLev2}px; font-weight: 400;]$ {price_usd}
                  {percent_change_1h}% [font-size: {fontSizeLev3}px] 1h`,

          toolTip: `[bold]{coin_name}[/]
                    ---------------------
                    Liquidity: $ {liquidityTransformed}m`,
        },
        balanceUsd: {
          dataField: 'balance_usd',
          title: 'Balance USD',
          tile: `[font-size: {fontSize}px font-weight: 400;]{symbol}[/]
                  [font-size: {fontSizeLev2}px; font-weight: 400;]
                  $ {price_usd}
                  {percent_change_1h}% [font-size: {fontSizeLev3}px] 1h`,

          toolTip: `[bold]{coin_name}[/]
                    ---------------------
                    Balance: {contract_balance}
                    Liquidity: $ {liquidityTransformed} Million
                    Balance USD: $ {balance_usd} (@{price_usd}/{symbol})`,
        },
      },
    },
    numberOfCoins: [10, 20, 36, 50, 100, 200, 500, 750],
  } as HeatmapConfig)

  private toolTip: string | null = null
  private tile: string | null = null
  private dataField: string | null = null
  private colorField: string = 'color1h'
  private isHeatmapReady = false
  private heatmapChartHeight = 800

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
  private ethereumHeatmap(data: HeatmapData[]): void {
    this.heatmapData = data

    if (HeatmapData.hasUsdBalance(this.heatmapData)) {
      this.applyConfigs('balanceUsd')
    } else {
      this.applyConfigs('liquidity')
      this.$root.$emit(Events.GLOBAL_NOTIFICATION, {
        text:
          'Cannot build Heatmap since Contract Balances are missing or equal to zero',
      })
      this.metaMaskComponent.resetBlockSize()
    }
  }

  private changeDataValue(dataValue: string): void {
    switch (dataValue) {
      case 'liquidity_index':
        this.applyConfigs('liquidity')
        break

      case 'balance_usd':
        /** Check if contract balances in the dataset */
        if (!HeatmapData.hasUsdBalance(this.heatmapData)) {
          this.$root.$emit(Events.GLOBAL_NOTIFICATION, {
            text:
              'Cannot build Heatmap since Contract Balances are missing or equal to zero',
          })
          this.metaMaskComponent.resetBlockSize()
          return
        }
        this.applyConfigs('balanceUsd')
    }
  }

  private applyConfigs(option: 'balanceUsd' | 'liquidity') {
    this.toolTip = this.heatmapConfig.blockSize.options[option].toolTip
    this.tile = this.heatmapConfig.blockSize.options[option].tile
    this.tile = this.heatmapConfig.blockSize.options[option].tile
    this.dataField = this.heatmapConfig.blockSize.options[option].dataField
  }

  async changeNumberOfCoins(numberOfCoins: number | undefined) {
    if (numberOfCoins === undefined) return
    this.heatmapData = await this.getHeatmapData({ numOfCoins: numberOfCoins })
  }

  onTimeFrameChange(value: string) {
    const found = this.heatmapConfig.timeFrame.options.find(
      (elem) => elem.value === value
    )
    if (found) {
      this.tile = found.tile
      this.colorField = found.colorField
    }
  }
}
</script>
