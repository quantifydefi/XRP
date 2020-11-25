<template>
  <div>
    <div
      ref="chartDiv"
      :style="{ width: '100%', height: `${chartHeight}px` }"
    ></div>
    <v-divider />
    <chart-time-range
      :ranges="chartConfig.timeRange"
      :default-time-range="chartConfig.defaultTimeRange"
      @change-range="(data) => (timeRange = data)"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import { ChartData, TokenChartConfig } from '~/models/token'
import ChartTimeRange from '~/components/token-details/ChartTimeRange.vue'
let am4core: any = null
let am4charts: any = null
let am4themesAnimated: any = null
if (process.browser) {
  am4core = require('@amcharts/amcharts4/core')
  am4charts = require('@amcharts/amcharts4/charts')
  am4themesAnimated = require('@amcharts/amcharts4/themes/animated')
  am4core.useTheme(am4themesAnimated.default)
}

@Component({ name: 'Chart', components: { ChartTimeRange } })
export default class Chart extends Vue {
  @Prop({ default: () => ({}) }) readonly chartConfig!: TokenChartConfig
  @Prop({ default: () => 700 }) readonly chartHeight!: TokenChartConfig
  @Ref() readonly chartDiv!: any

  private timeRange = this.chartConfig.defaultTimeRange
  private chart: any = null
  private chartData!: ChartData[]

  @Watch('timeRange')
  async onTimeRangeChange(value: string) {
    this.chartData = await this.getChartData(value)
    this.chart.data = this.chartData.reverse()
  }

  async mounted() {
    this.chartData = await this.getChartData(this.timeRange)
    this.renderChart()
  }

  private async getChartData(timeRange: string): Promise<ChartData[]> {
    try {
      return await this.$store.dispatch('token/getTokenChart', {
        tokenId: this.$route.params.id,
        timeRange,
      })
    } catch {
      return []
    }
  }

  private renderChart() {
    am4core.addLicense('CH187387301')
    this.chart = am4core.create(this.$refs.chartDiv, am4charts.XYChart)
    this.chart.padding(0, 15, 0, 15)
    this.chart.colors.step = 3
    this.chart.data = this.chartData.reverse()
    this.chart.leftAxesContainer.layout = 'vertical'

    const dateAxis = this.chart.xAxes.push(new am4charts.DateAxis())
    dateAxis.renderer.grid.template.location = 0
    dateAxis.renderer.ticks.template.length = 8
    dateAxis.baseInterval = {
      timeUnit: 'minute',
      count: 5,
    }
    dateAxis.tooltipDateFormat = 'HH:mm, d MMMM'
    dateAxis.renderer.ticks.template.strokeOpacity = 0.1
    dateAxis.renderer.grid.template.disabled = true
    dateAxis.renderer.ticks.template.disabled = false
    dateAxis.renderer.ticks.template.strokeOpacity = 0.2
    dateAxis.renderer.minLabelPosition = 0.01
    dateAxis.renderer.maxLabelPosition = 0.99
    dateAxis.keepSelection = true

    const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis())
    valueAxis.tooltip.disabled = false
    valueAxis.zIndex = 1
    valueAxis.renderer.baseGrid.disabled = false
    valueAxis.renderer.opposite = true
    // height of axis
    valueAxis.height = am4core.percent(80)

    const series1 = this.chart.series.push(new am4charts.LineSeries())
    series1.dataFields.dateX = 'date'
    series1.dataFields.valueY = 'price_usd'
    // series1.dataFields.valueYShow = 'changePercent'
    series1.tooltipText = `PTC: {valueY.changePercent.formatNumber('[#0c0]+#.00|[#c00]#.##|0')}% [/]
                            ETH: {token_price}
                            USD: {price_usd} [font-size: 12px]{}{eth_price_usd}/ETH[/]`.replace(
      '{}',
      '$'
    )
    series1.name = 'Token Price'
    series1.tooltip.getFillFromObject = false
    series1.tooltip.getStrokeFromObject = true
    series1.tooltip.background.fill = am4core.color('#fff')
    series1.tooltip.background.strokeWidth = 2
    series1.tooltip.label.fill = series1.stroke
    series1.strokeWidth = 2
    series1.stroke = am4core.color('#1E88E5')
    series1.fillOpacity = 0.3
    series1.fill = am4core.color('#BBDEFB')

    const valueAxis2 = this.chart.yAxes.push(new am4charts.ValueAxis())
    valueAxis2.tooltip.disabled = true
    // valueAxis2.labelsEnabled = false
    valueAxis2.renderer.labels.template.disabled = true
    // height of axis
    valueAxis2.height = am4core.percent(20)
    valueAxis2.zIndex = 3
    valueAxis2.renderer.baseGrid.disabled = true
    valueAxis2.renderer.grid.template.disabled = true
    // this makes gap between panels
    valueAxis2.marginTop = 450
    valueAxis2.renderer.baseGrid.disabled = true
    valueAxis2.renderer.inside = true
    valueAxis2.renderer.labels.template.verticalCenter = 'bottom'
    valueAxis2.renderer.labels.template.padding(0, 0, 0, 0)
    valueAxis.renderer.maxLabelPosition = 0.95
    valueAxis2.renderer.fontSize = '0.8em'

    const volumeSeries = this.chart.series.push(new am4charts.LineSeries())
    volumeSeries.fillOpacity = 0.5
    volumeSeries.fill = series1.stroke
    volumeSeries.stroke = series1.stroke
    volumeSeries.dataFields.dateX = 'date'
    volumeSeries.dataFields.valueY = 'reserve_eth'
    volumeSeries.yAxis = valueAxis2
    volumeSeries.tooltipText = `Liquidity:
                                -------------------
                                ETH: {reserve_eth}
                                USD: {liquidity_usd_mil}m`
    volumeSeries.name = 'Liquidity'
    volumeSeries.clustered = false
    volumeSeries.stroke = am4core.color('#536af6')
    volumeSeries.fillOpacity = 0.3
    volumeSeries.fill = am4core.color('#536af6')
    // volume should be summed
    volumeSeries.groupFields.valueY = 'sum'
    volumeSeries.tooltip.label.fill = volumeSeries.stroke
    this.chart.cursor = new am4charts.XYCursor()

    this.chart.cursor = new am4charts.XYCursor()
    const scrollbarX = new am4charts.XYChartScrollbar()
    scrollbarX.series.push(series1)
    scrollbarX.marginBottom = 20
    const sbSeries = scrollbarX.scrollbarChart.series.getIndex(0)
    sbSeries.dataFields.valueYShow = undefined
    this.chart.scrollbarX = scrollbarX
  }

  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
    }
  }
}
</script>

<style scoped></style>
