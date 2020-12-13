<template>
  <div
    ref="mainTreemap"
    :style="{ width: '100%', height: `${chartHeight}px` }"
  ></div>
</template>

<script lang="ts">
/* eslint-disable camelcase */

import { Vue, Component, Prop, Watch, Ref } from 'vue-property-decorator'

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
  @Prop({ default: '' }) readonly colorField!: string
  @Prop({ default: 0 }) readonly chartHeight!: number
  @Prop({ default: () => [] }) readonly data!: any
  @Ref() readonly mainTreemap!: any

  private chart: any = null
  private level1_column: any
  private level1_bullet: any
  private level1: any

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

  @Watch('colorField')
  onColorFieldChanged() {
    if (this.chart) {
      this.chart.dispose()
      this.renderChart()
    }
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
    this.chart = am4core.create(this.$refs.mainTreemap, am4charts.TreeMap)
    this.chart.preloader.disabled = true
    this.chart.padding(0, 0, 0, 0)
    this.chart.hiddenState.properties.opacity = 0

    this.chart.data = this.data

    this.chart.colors.step = 2

    /* Define data fields */
    this.chart.dataFields.value = this.dataField
    this.chart.dataFields.name = 'symbol'
    this.chart.dataFields.color = this.colorField
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

    this.level1_bullet.label.url = '/token/{pool_id}'
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.level1_bullet.label.adapter.add('text', (text: any, target: any) => {
      let fontSize: any = null
      let fontSizeLev2: any = null
      /** Try catch block for default and userAddress heatmap types */
      try {
        fontSize =
          target.availableWidth /
          (target.dataItem.dataContext.dataContext.poolSymbol.length * 0.7)
        fontSizeLev2 =
          (target.availableWidth /
            (target.dataItem.dataContext.dataContext.token0_price_usd.toString()
              .length *
              0.83)) *
          0.5
      } catch {
        fontSize =
          target.availableWidth /
          (target.dataItem.dataContext.dataContext.symbol.length * 0.7 * 1.5)
        fontSizeLev2 =
          (target.availableWidth /
            target.dataItem.dataContext.dataContext.balance_usd.toString()
              .length) *
          0.85
      }

      if (target.availableHeight < fontSize * 2) {
        fontSize = target.availableHeight / 2.5
        fontSizeLev2 = fontSize / 2.5
      }

      if (fontSizeLev2 > 20) {
        fontSizeLev2 = 20
      }
      const fontSizeLev3: any = fontSizeLev2 / 1.5
      return tileBody
        .replace('{fontSize}', fontSize)
        .replace('{fontSizeLev2}', fontSizeLev2)
        .replace('{fontSizeLev3}', fontSizeLev3)
    })
    this.level1_bullet.label.fill = am4core.color('#fff')
    this.chart.events.on('ready', () => {
      this.$emit('heatmap-ready')
    })
  }
}
</script>
