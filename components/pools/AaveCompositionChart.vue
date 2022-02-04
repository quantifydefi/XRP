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
  name: 'AaveCompositionChart',
  computed: {
    ...mapState({
      ui: (state: any) => state.ui,
    }),
  },
})
export default class AaveCompositionChart extends Vue {
  @Prop({ default: () => [] }) readonly data!: { value: number; name: string }[]
  @Prop({ default: () => 220 }) readonly chartHeight!: number
  @Ref('chartDiv') readonly chartDiv!: any

  private chart: any = null
  private ui!: any
  private license: string = process.env.amChartLicense || ''

  @Watch('ui', { deep: true })
  onThemeChange() {
    this.chart.dispose()
    this.renderChart()
  }

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
    this.chart = am4core.create(this.$refs.chartDiv, am4charts.PieChart)
    this.chart.data = this.data

    // Set inner radius
    this.chart.innerRadius = am4core.percent(65)
    this.chart.paddingTop = 20

    // Add and configure Series
    const pieSeries = this.chart.series.push(new am4charts.PieSeries())
    pieSeries.dataFields.value = 'value'
    pieSeries.dataFields.category = 'name'
    pieSeries.slices.template.stroke = am4core.color(`${this.ui.theme === 'dark' ? '#030303' : '#ffffff'}`)
    pieSeries.slices.template.strokeWidth = 2
    pieSeries.slices.template.strokeOpacity = 1
    pieSeries.labels.template.maxWidth = 130
    pieSeries.labels.template.wrap = true
    pieSeries.labels.template.fontSize = 12
    pieSeries.slices.template.tooltipText = '{name}: $ {value}'

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1
    pieSeries.hiddenState.properties.endAngle = -90
    pieSeries.hiddenState.properties.startAngle = -90
  }

  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
    }
  }
}
</script>
