<template>
  <v-row>
    <metamask-button
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
      @heatmap-data="ethereumHeatmap($event)"
      @data-value-change="changeDataValue($event)"
      @number-of-coins-change="changeNumberOfCoins"
      @exit-metamask="loadDefaultHeatmap"
      @heatmap-loading="isHeatmapReady = false"
    />
    <v-col cols="12" class="px-0 py-0">
      <v-card tile outlined height="800">
        <v-overlay :value="!isHeatmapReady" absolute>
          <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <marketcap
          v-if="heatmapData.length"
          :data="heatmapData"
          :tile-tooltip="toolTip"
          :data-field="dataField"
          :tile-body="tile"
          :chart-height="800"
          @heatmap-ready="isHeatmapReady = true"
        />
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import { plainToClass } from 'class-transformer'
import Marketcap from '~/components/heatmap/Marketcap.vue'
import { HeatmapData, HeatmapConfig } from '~/models/heatmap'
import { Events } from '~/types/global'

declare global {
  interface Window {
    ethereum: any
  }
}

@Component({
  name: 'Index',
  components: {
    MetamaskButton: () => import('~/components/heatmap/MetamaskButton.vue'),
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
  private isHeatmapReady: boolean = false
  private heatmapConfig = plainToClass(HeatmapConfig, {
    blockSize: {
      title: 'Heatmap Data Value',
      tooltip: 'Change Data Value',
      options: {
        liquidity: {
          dataField: 'liquidity_index',
          title: 'Liquidity',
          tile: `[font-size: {fontSize}px font-weight: 400;]{symbol}[/]
                  [font-size: {fontSizeLev2}px; font-weight: 400;]$ {price_usd}
                  {price1h} %[/]`,

          toolTip: `[bold]{coin_name}[/]
                    ---------------------
                    1 Hour Change: {price1h}%
                    Liquidity: $ {liquidityTransformed} Million [font-size: {fontSize}px font-weight: 400;]`,
        },

        balanceUsd: {
          dataField: 'balance_usd',
          title: 'Balance USD',
          tile: `[font-size: {fontSize}px font-weight: 400;]{symbol}[/]
                  [font-size: {fontSizeLev2}px; font-weight: 400;]
                  $ {price_usd}
                  {price1h} %[/]`,

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

  private async mounted() {
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
}
</script>
