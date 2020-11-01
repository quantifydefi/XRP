<template>
  <div
    ref="chartdiv"
    :style="{ width: '100%', height: `${chartHeight}px` }"
  ></div>
</template>

<script lang="ts">
/* eslint-disable camelcase */

import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

let am4core: any = null
let am4charts: any = null
let am4themesAnimated: any = null
if (process.browser) {
  am4core = require('@amcharts/amcharts4/core')
  am4charts = require('@amcharts/amcharts4/charts')
  am4themesAnimated = require('@amcharts/amcharts4/themes/animated')
  am4core.useTheme(am4themesAnimated.default)
}

@Component({ name: 'Marketcap' })
export default class Marketcap extends Vue {
  @Prop({ default: '' }) readonly tileBody!: string
  @Prop({ default: '' }) readonly tileTooltip!: string
  @Prop({ default: 'liquidity_index' }) readonly dataField!: string
  @Prop({ default: 0 }) readonly chartHeight!: number
  @Prop({ default: () => [] }) readonly data!: any

  $refs!: {
    chartdiv: any
  }

  $options: any
  chart: any = null
  level1_column: any
  level1_bullet: any
  level1: any
  loading: boolean = true
  $am4core: any

  @Watch('dataField')
  onDataFieldChanged() {
    if (this.chart) {
      this.chart.dispose()
      this.renderChart()
    }
  }

  @Watch('data')
  onDataChanged() {
    this.chart.data = this.data
  }

  mounted() {
    this.renderChart()
  }

  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
    }
  }

  renderChart() {
    am4core.addLicense('CH187387301')
    this.chart = am4core.create(this.$refs.chartdiv, am4charts.TreeMap)
    this.chart.preloader.disabled = true
    this.chart.padding(0, 0, 0, 0)
    this.chart.hiddenState.properties.opacity = 0

    this.chart.data = this.data

    this.chart.colors.step = 2

    /* Define data fields */
    this.chart.dataFields.value = this.dataField
    this.chart.dataFields.name = 'symbol'
    this.chart.dataFields.color = 'color'
    this.chart.dataFields.children = 'children'

    /* Configure top-level series */
    this.level1 = this.chart.seriesTemplates.create('0')
    this.level1_column = this.level1.columns.template
    this.level1_column.fillOpacity = 1
    this.level1_column.stroke = am4core.color('#252525')
    this.level1_column.strokeWidth = 1
    this.level1_column.strokeOpacity = 1
    this.level1_column.tooltipText = this.tileTooltip
    this.level1_bullet = this.level1.bullets.push(new am4charts.LabelBullet())
    this.level1_bullet.locationY = 0.5
    this.level1_bullet.locationX = 0.5
    this.level1_bullet.label.fontWeight = 400
    const tileBody = this.tileBody

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.level1_bullet.label.adapter.add('text', (text: any, target: any) => {
      /*
      const key = target.dataItem.dataContext.dataContext.symbol
      target.url = `/coins/${key}` */

      let fontSize: any =
        (target.availableWidth /
          (target.dataItem.dataContext.dataContext.symbol.length * 0.83)) *
        0.75
      let fontSizeLev2: any =
        (target.availableWidth /
          (target.dataItem.dataContext.dataContext.price_usd.toString().length *
            0.83)) *
        0.5

      if (target.availableHeight < fontSize * 2) {
        fontSize = target.availableHeight / 2.5
        fontSizeLev2 = fontSize / 2.5
      }

      if (fontSizeLev2 > 20) {
        fontSizeLev2 = 20
      }
      return tileBody
        .replace('{fontSize}', fontSize)
        .replace('{fontSizeLev2}', fontSizeLev2)
    })

    this.level1_bullet.label.fill = am4core.color('#fff')
    this.chart.events.on('ready', () => {
      this.loading = false
    })
  }
}
</script>
