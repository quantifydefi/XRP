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
  @Prop({ default: () => [] }) readonly data
  @Prop({ default: () => 200 }) readonly chartHeight!: number

  @Ref('chartDiv') readonly chartDiv!: any
  private chart: any = null
  private ui!: any
  // private data = [
  //   {
  //     country: 'Lithuania',
  //     litres: 501.9,
  //   },
  //   {
  //     country: 'Czechia',
  //     litres: 301.9,
  //   },
  //   {
  //     country: 'Ireland',
  //     litres: 201.1,
  //   },
  //   {
  //     country: 'Germany',
  //     litres: 165.8,
  //   },
  //   {
  //     country: 'Australia',
  //     litres: 139.9,
  //   },
  //   {
  //     country: 'Austria',
  //     litres: 128.3,
  //   },
  //   {
  //     country: 'UK',
  //     litres: 99,
  //   },
  //   {
  //     country: 'Belgium',
  //     litres: 60,
  //   },
  //   {
  //     country: 'The Netherlands',
  //     litres: 50,
  //   },
  // ]

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
    // am4core.options.autoSetClassName = true
    am4core.addLicense('CH187387301')
    this.chart = am4core.create(this.$refs.chartDiv, am4charts.PieChart)
    // this.chart.padding(0, 15, 0, 15)
    this.chart.data = this.data

    // Set inner radius
    this.chart.innerRadius = am4core.percent(65)

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

    // This creates initial animation
    pieSeries.hiddenState.properties.opacity = 1
    pieSeries.hiddenState.properties.endAngle = -90
    pieSeries.hiddenState.properties.startAngle = -90
  }

  private renderHeatmapChart() {
    if (this.ui.theme === 'dark') {
      am4core.useTheme(am4themesDark.default)
    } else {
      am4core.unuseTheme(am4themesDark.default)
      am4core.useTheme(am4themesAnimated.default)
    }
    // am4core.options.autoSetClassName = true
    am4core.addLicense('CH187387301')
    this.chart = am4core.create(this.$refs.chartDiv, am4charts.TreeMap)
    this.chart.padding(0, 0, 0, 0)
    this.chart.data = this.data
    this.chart.maxLevels = 1

    /* Set color step */
    this.chart.colors.step = 2

    /* Define data fields */
    this.chart.dataFields.value = 'value'
    this.chart.dataFields.name = 'name'
    this.chart.dataFields.children = 'children'

    const level1 = this.chart.seriesTemplates.create('0')
    const level1Bullet = level1.bullets.push(new am4charts.LabelBullet())
    level1Bullet.locationY = 0.5
    level1Bullet.locationX = 0.5
    level1Bullet.label.text = '{name}'
    level1Bullet.label.fill = am4core.color('#fff')

    const level2 = this.chart.seriesTemplates.create('1')
    const level2Bullet = level2.bullets.push(new am4charts.LabelBullet())
    level2Bullet.locationY = 0.5
    level2Bullet.locationX = 0.5
    level2Bullet.label.text = '{name}'
    level2Bullet.label.fill = am4core.color('#fff')

    const level3 = this.chart.seriesTemplates.create('2')
    const level3Bullet = level3.bullets.push(new am4charts.LabelBullet())
    level3Bullet.locationY = 0.5
    level3Bullet.locationX = 0.5
    level3Bullet.label.text = '{name}'
    level3Bullet.label.fill = am4core.color('#fff')

    /* Navigation bar */
    this.chart.homeText = ''
    this.chart.navigationBar = new am4charts.NavigationBar()
  }

  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
    }
  }
}
</script>
