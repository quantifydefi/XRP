<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card tile outlined height="800">
        <marketcap
          v-if="heatmapData"
          :data="formattedData"
          :tile-tooltip="toolTip"
          :tile-body="tile"
          :chart-height="800"
        />
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { heatmapDataInterface } from '~/types/heatmap'
import Marketcap from '~/components/heatmap/Marketcap.vue'
@Component({
  name: 'Index',
  components: { Marketcap },
  async asyncData({ store }): Promise<object | null> {
    const configs = {
      display: 'marketcap',
      timeFrame: 'daily',
      numOfCoins: 12,
      exchange: 'All',
      grouped: false,
    }

    try {
      const heatmapData = await store.dispatch(
        'heatmap/getHeatmapData',
        configs
      )

      return { heatmapData }
    } catch {
      return { heatmapData: [] }
    }
  },
})
export default class Index extends Vue {
  heatmapData: heatmapDataInterface | any = null
  toolTip: string = `[bold]{symbol_name}[/]
              ---------------------
              7 DAY: {price1week}%
              30 DAY: {price30day}%
              1 YEAR: {price1year}%
              1 YEAR TO DATE: {price_year_to_date}%
              QMA SCORE: {qma_score}
              RSI 2H: {rsi2h}
              MC: $ {marketcap} Million [font-size: {fontSize}px font-weight: 400;]`
  tile: string = `[font-size: {fontSize}px font-weight: 400;]{qc_key}[/]
                  [font-size: {fontSizeLev2}px; font-weight: 400;]$ {price_usd}
                  {price24h} %[/]`

  menuItems = null
  isActive = false
  private get formattedData(): Array<Record<string, any>> {
    function setTimeFrame(timeFrame: string): string {
      const frames: { [key: string]: string } = {
        weekly: 'price1week',
        daily: 'price24h',
        monthly: 'price30day',
        yearly: 'price1year',
        ytd: 'price_year_to_date',
      }
      return frames[timeFrame]
    }

    function setColor(x: number) {
      if (x * 100 > 0 && x * 100 <= 1) {
        return '#71c175'
      } else if (x * 100 > 1 && x * 100 <= 2.5) {
        return '#4eb153'
      } else if (x * 100 > 2.5 && x * 100 <= 5) {
        return '#3e8e42'
      } else if (x * 100 > 5) {
        return '#2f6a32'
      } else if (x * 100 <= 0 && x * 100 >= -1) {
        return '#ff8080'
      } else if (x * 100 < -1 && x * 100 >= -2.5) {
        return '#ff4d4d'
      } else if (x * 100 < -2.5 && x * 100 >= -5) {
        return '#ff1a1a'
      } else if (x * 100 < -5) {
        return '#e60000'
      }
    }

    function price24hAbsFormatter(params: number | null): number {
      if (params === -1) {
        return 0
      } else if (params == null) {
        return 0
      } else {
        return parseFloat(Math.abs(params * 100).toFixed(2))
      }
    }

    const data: heatmapDataInterface[] | any = JSON.parse(
      JSON.stringify(this.heatmapData)
    )

    for (let i = 0; i < data.length; i++) {
      data[i].color = setColor(data[i][setTimeFrame('daily')])
      data[i].price24h = price24hAbsFormatter(data[i].price24h)
      data[i].price24hAbs = price24hAbsFormatter(data[i].price24h)
      data[i].price_usd = parseFloat(data[i].price_usd.toFixed(4))
      data[i].price1week = price24hAbsFormatter(data[i].price1week)
      data[i].price30day = price24hAbsFormatter(data[i].price30day)
      data[i].price1year = price24hAbsFormatter(data[i].price1year)
      data[i].price_year_to_date = price24hAbsFormatter(
        data[i].price_year_to_date
      )
      data[i].marketcap = Math.round(data[i].marketcap / 10 ** 6)
    }
    return data
  }
}
</script>
