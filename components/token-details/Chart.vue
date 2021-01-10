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
import { mapState } from 'vuex'
import { ChartData, TokenChartConfig, Token } from '~/models/token'
import ChartTimeRange from '~/components/token-details/ChartTimeRange.vue'
let am4core: any = null
let am4charts: any = null
let am4themesAnimated: any = null
let am4themesDark: any = null
if (process.browser) {
  am4core = require('@amcharts/amcharts4/core')
  am4charts = require('@amcharts/amcharts4/charts')
  am4themesAnimated = require('@amcharts/amcharts4/themes/animated')
  am4themesDark = require('@amcharts/amcharts4/themes/dark')
}

@Component({
  name: 'Chart',
  components: { ChartTimeRange },
  computed: {
    ...mapState({
      ui: (state: any) => state.ui,
    }),
  },
})
export default class Chart extends Vue {
  @Prop({ default: () => ({}) }) readonly tokenData!: Token
  @Prop({ default: () => ({}) }) readonly chartConfig!: TokenChartConfig
  @Prop({ default: () => 700 }) readonly chartHeight!: number
  @Prop({ default: () => '' }) readonly token0Symbol!: string
  @Prop({ default: () => '' }) readonly token1Symbol!: string

  @Ref() readonly chartDiv!: any

  private timeRange = this.chartConfig.defaultTimeRange
  private chart: any = null
  private chartData!: ChartData[]
  private ui!: any
  private allowChart: boolean = true
  @Watch('timeRange')
  async onTimeRangeChange(value: string) {
    this.chartData = await this.getChartData(value)
    this.chart.data = this.chartData.reverse()
  }

  @Watch('ui', { deep: true })
  onThemeChange() {
    this.chart.dispose()
    this.renderChart()
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
    if (this.ui.theme === 'dark') {
      am4core.useTheme(am4themesDark.default)
    } else {
      am4core.unuseTheme(am4themesDark.default)
      am4core.useTheme(am4themesAnimated.default)
    }
    am4core.options.autoSetClassName = true
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

    const valueAxisTone0 = this.chart.yAxes.push(new am4charts.ValueAxis())
    valueAxisTone0.tooltip.disabled = false
    valueAxisTone0.zIndex = 1
    valueAxisTone0.title.text = this.tokenData.token1_name
    // valueAxisTone0.renderer.baseGrid.disabled = false
    valueAxisTone0.height = am4core.percent(80)

    const valueAxisTone1 = this.chart.yAxes.push(new am4charts.ValueAxis())
    valueAxisTone1.tooltip.disabled = false
    valueAxisTone1.zIndex = 2
    valueAxisTone1.renderer.opposite = true
    valueAxisTone1.renderer.grid.template.disabled = true
    valueAxisTone1.height = am4core.percent(80)
    valueAxisTone1.title.text = this.tokenData.token0_name

    const token0Series = this.chart.series.push(new am4charts.LineSeries())
    token0Series.yAxis = valueAxisTone0
    token0Series.dataFields.dateX = 'date'
    token0Series.dataFields.valueY = 'token0_price'
    token0Series.tooltipText = `PTC: {valueY.changePercent.formatNumber('[#0c0]+#.00|[#c00]#.##|0')}% [/]
                            ETH: {token0_price}
                            USD: {token0_price_usd} [font-size: 12px]{}{eth_price_usd}/ETH[/]`.replace(
      '{}',
      '$'
    )
    token0Series.name = this.token1Symbol
    token0Series.tooltip.getFillFromObject = false
    token0Series.tooltip.background.strokeWidth = 0
    token0Series.strokeWidth = 2
    token0Series.stroke = am4core.color('#1E88E5')
    token0Series.tooltip.background.fill = am4core.color('#86b9e5')
    token0Series.fill = am4core.color('#86b9e5')
    token0Series.fillOpacity = 0.1
    // series1.hidden = Token.isQuoteToken(this.token0Symbol, this.tokenData)

    const token1Series = this.chart.series.push(new am4charts.LineSeries())
    token1Series.yAxis = valueAxisTone1
    token1Series.dataFields.dateX = 'date'
    token1Series.dataFields.valueY = 'token1_price'
    token1Series.tooltipText = `PTC: {valueY.changePercent.formatNumber('[#0c0]+#.00|[#c00]#.##|0')}% [/]
                            ETH: {token1_price}
                            USD: {token1_price_usd} [font-size: 12px]{}{eth_price_usd}/ETH[/]`.replace(
      '{}',
      '$'
    )
    token1Series.name = this.token0Symbol
    token1Series.tooltip.getFillFromObject = false
    token1Series.tooltip.background.strokeWidth = 0
    token1Series.strokeWidth = 2
    token1Series.stroke = am4core.color('#d20678')
    token1Series.tooltip.background.fill = am4core.color('#db80b1')
    token1Series.fill = am4core.color('#db80b1')
    token1Series.fillOpacity = 0.1
    token1Series.marginBottom = 200

    const valueAxis2 = this.chart.yAxes.push(new am4charts.ValueAxis())
    valueAxis2.tooltip.disabled = true
    valueAxis2.renderer.labels.template.disabled = true

    // height of axis
    valueAxis2.height = am4core.percent(20)
    valueAxis2.zIndex = 3
    valueAxis2.renderer.baseGrid.disabled = true
    valueAxis2.renderer.grid.template.disabled = true

    // this makes gap between panels
    // valueAxis2.marginTop = 450
    valueAxis2.renderer.baseGrid.disabled = true
    valueAxis2.renderer.inside = true
    valueAxis2.renderer.labels.template.verticalCenter = 'bottom'
    valueAxis2.renderer.labels.template.padding(0, 0, 0, 0)
    valueAxis2.renderer.fontSize = '0.8em'

    const liqSeries = this.chart.series.push(new am4charts.LineSeries())
    liqSeries.fillOpacity = 0.5

    liqSeries.dataFields.dateX = 'date'
    liqSeries.dataFields.valueY = 'reserve_eth'
    liqSeries.yAxis = valueAxis2
    liqSeries.tooltipText = `Liquidity:
                                -------------------
                                ETH: {reserve_eth}
                                USD: {liquidity_usd_mil}m`
    liqSeries.name = 'Liquidity'
    liqSeries.clustered = false
    liqSeries.stroke = am4core.color('#536af6')
    liqSeries.fillOpacity = 0.3
    liqSeries.fill = am4core.color('#536af6')

    // liq should be summed
    liqSeries.groupFields.valueY = 'sum'
    liqSeries.tooltip.label.fill = liqSeries.stroke
    this.chart.cursor = new am4charts.XYCursor()

    this.chart.cursor = new am4charts.XYCursor()
    const scrollbarX = new am4charts.XYChartScrollbar()
    scrollbarX.series.push(token0Series)
    // scrollbarX.series.push(series2)
    scrollbarX.marginBottom = 20
    const sbSeries = scrollbarX.scrollbarChart.series.getIndex(0)
    sbSeries.dataFields.valueYShow = undefined
    this.chart.scrollbarX = scrollbarX

    // Add legend
    this.chart.legend = new am4charts.Legend()

    this.chart.events.on('ready', () => {
      this.$emit('chart-ready')
    })
  }

  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
    }
  }
}
</script>

<style scoped>
@media screen and (-ms-high-contrast: active) {
  .amcharts-Label {
    fill: #fff !important;
  }
  .amcharts-Grid {
    stroke: #fff !important;
    stroke-opacity: 1;
  }
}
</style>
