<template>
  <div>
    <div ref="chartDiv" :style="{ width: '100%', height: `${chartHeight}px` }"></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Ref, Watch } from 'vue-property-decorator'
import { mapState } from 'vuex'
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
  name: 'BalancesChart',
  computed: {
    ...mapState({
      ui: (state: any) => state.ui,
      walletAddress: (state: any) => state.wallet.address,
    }),
  },
})
export default class BalancesChart extends Vue {
  @Prop({ default: () => [] }) readonly data!: any
  @Prop({ default: () => 280 }) readonly chartHeight!: number
  @Ref('chartDiv') readonly chartDiv!: any

  private chart: any = null
  private ui!: any
  private license: string = process.env.amChartLicense || ''

  @Watch('walletAddress', { deep: true })
  @Watch('ui', { deep: true })
  @Watch('data', { deep: true })
  onDataChange() {
    this.chart.dispose()
    this.renderChart()
  }

  mounted() {
    this.renderChart()
  }

  private renderChart() {
    if (this.ui.theme === 'dark') {
      am4core.useTheme(am4themesDark.default)
    } else {
      am4core.unuseTheme(am4themesDark.default)
      am4core.useTheme(am4themesAnimated.default)
    }
    am4core.addLicense(this.license)
    // Create chart instance
    this.chart = am4core.create(this.chartDiv, am4core.Container)
    this.chart.width = am4core.percent(100)
    this.chart.height = am4core.percent(100)
    this.chart.layout = 'horizontal'

    /**
     * Pie chart
     */

    // Create chart instance
    const pieChart = this.chart.createChild(am4charts.PieChart)
    pieChart.data = this.data
    pieChart.innerRadius = am4core.percent(65)

    // Add and configure Series
    const pieSeries = pieChart.series.push(new am4charts.PieSeries())
    pieSeries.dataFields.value = 'value'
    pieSeries.dataFields.category = 'category'
    pieSeries.slices.template.propertyFields.fill = 'color'
    pieSeries.labels.template.disabled = true

    // Set up labels
    const label1 = pieChart.seriesContainer.createChild(am4core.Label)
    label1.text = ''
    label1.horizontalCenter = 'middle'
    label1.fontSize = 35
    label1.fontWeight = 400
    label1.dy = -30

    const label2 = pieChart.seriesContainer.createChild(am4core.Label)
    label2.text = ''
    label2.horizontalCenter = 'middle'
    label2.fontSize = 12
    label2.dy = 20

    pieChart.legend = new am4charts.Legend()
    pieChart.legend.position = 'right'
    pieChart.legend.maxWidth = 300

    // Auto-select first slice on load
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    pieChart.events.on('ready', (ev: any) => {
      try {
        pieSeries.slices.getIndex(0).isActive = true
      } catch (e) {
        console.log(e)
      }
    })

    // Set up toggling events
    pieSeries.slices.template.events.on('toggled', (ev: any) => {
      if (ev.target.isActive) {
        // Untoggle other slices
        pieSeries.slices.each(function (slice) {
          if (slice !== ev.target) {
            slice.isActive = false
          }
        })

        // Update column chart
        columnSeries.appeared = false
        columnChart.data = ev.target.dataItem.dataContext.breakdown
        columnSeries.fill = ev.target.fill
        columnSeries.reinit()

        // Update labels
        label1.text = pieChart.numberFormatter.format(ev.target.dataItem.values.value.percent, "#.'%'")
        label1.fill = ev.target.fill

        label2.text = ev.target.dataItem.category
      }
    })

    /**
     * Column chart
     */

    // Create chart instance
    const columnChart = this.chart.createChild(am4charts.XYChart)

    // Create axes
    const categoryAxis = columnChart.yAxes.push(new am4charts.CategoryAxis())
    categoryAxis.dataFields.category = 'category'
    categoryAxis.renderer.grid.template.location = 0
    categoryAxis.renderer.inversed = true
    categoryAxis.renderer.minGridDistance = 20
    categoryAxis.renderer.labels.template.fontSize = 13

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const valueAxis = columnChart.xAxes.push(new am4charts.ValueAxis())

    // Create series
    const columnSeries = columnChart.series.push(new am4charts.ColumnSeries())
    columnSeries.dataFields.valueX = 'value'
    columnSeries.dataFields.categoryY = 'category'
    columnSeries.columns.template.strokeWidth = 0
    columnSeries.columns.template.tooltipText = '{categoryY}: [bold]' + '$' + '{valueX}[/]'
    // Add simple vertical scrollbar
    columnChart.scrollbarY = new am4core.Scrollbar()
  }

  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
    }
  }
}
</script>
