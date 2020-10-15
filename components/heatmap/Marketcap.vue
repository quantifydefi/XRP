<template>
  <div
    ref="chartdiv"
    :style="{ width: '100%', height: `${chartHeight}px` }"
  ></div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { heatmapDataInterface } from '~/types/heatmap'

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
  @Prop({ default: '' }) tileBody!: string
  @Prop({ default: '' }) tileTooltip!: string
  @Prop({ default: 0 }) chartHeight!: number
  @Prop({ default: () => [] }) data!: heatmapDataInterface

  $refs!: {
    chartdiv: any
  }

  $options: any
  chart: any = null
  // eslint-disable-next-line camelcase
  level1_column: any
  // eslint-disable-next-line camelcase
  level1_bullet: any
  level1: any
  loading: boolean = true
  indicator: any = null
  $am4core: any

  @Watch('data')
  onPropertyChanged(value: Array<Record<any, any>>) {
    this.chart.data = value
  }

  @Watch('tileBody')
  onbodyChanged() {
    this.chart.dispose()
    this.renderChart()
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
    this.chart.dataFields.value = 'marketcap_index'
    this.chart.dataFields.name = 'symbol_name'
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
    const tileBody = this.tileBody

    this.level1_bullet.label.adapter.add('text', (text: any, target: any) => {
      // TODO: Debug issues related to dataContext (used try catch block need better solution)
      try {
        const key = target.dataItem.dataContext.dataContext.qc_key
        target.url = `/coins/${key}`

        let fontSize: any =
          (target.availableWidth /
            (target.dataItem.dataContext.dataContext.qc_key.length * 0.83)) *
          0.75
        let fontSizeLev2: any =
          (target.availableWidth /
            (target.dataItem.dataContext.dataContext.price_usd.toString()
              .length *
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
      } catch {}
    })
    this.level1_bullet.label.fill = am4core.color('#fff')
    this.chart.events.on('ready', () => {
      this.loading = false
    })
  }
}
</script>
