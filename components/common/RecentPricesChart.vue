<template>
  <div ref="chartDiv" :style="{ width: '100%', height: `${chartHeight}px` }"></div>
</template>

<script lang="ts">
import { Vue, Component, Ref, Watch, Prop } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { RecentPricesGQL } from '~/apollo/main/config.query.graphql'

let am4core: any = null
// let am4themesDark: any = null
let forceDirected: any = null
if (process.browser) {
  am4core = require('@amcharts/amcharts4/core')
  // am4themesDark = require('@amcharts/amcharts4/themes/dark')
  forceDirected = require('@amcharts/amcharts4/plugins/forceDirected')
}

@Component({
  name: 'RecentPricesChart',
  computed: {
    ...mapState({
      ui: (state: any) => state.ui,
    }),
  },
  apollo: {
    recentPrices: {
      prefetch: false,
      query: RecentPricesGQL,
      deep: false,
    },
  },
})
export default class RecentPricesChart extends Vue {
  @Prop({ default: () => 600 }) readonly chartHeight!: number
  @Ref('chartDiv') readonly chartDiv!: any
  private chart: any = null
  private ui!: any
  private license: string = process.env.amChartLicense || ''
  private recentPrices = {}

  @Watch('ui', { deep: true })
  onThemeChange() {
    this.chart.dispose()
    this.renderChart()
  }

  @Watch('dataFormatted', { deep: true })
  onDataChange() {
    this.chart.dispose()
    this.renderChart()
  }

  mounted() {
    this.renderChart()
  }

  get dataFormatted() {
    const supportedTokens: string[] = [
      'BTC',
      'ETH',
      'CRV',
      'DAI',
      'USDC',
      'WBTC',
      'LINK',
      'AAVE',
      'TUSD',
      'MKR',
      'FEI',
      'CRV',
      'XSUSHI',
      'FRAX',
      'SUSD',
      'YFI',
      'MANA',
      'UNI',
      'DPI',
      'RAI',
      'BUSD',
      'PAX',
      'REN',
      'ENJ',
      'GUSD',
      'ZRX',
      'AMPL',
      'BAL',
    ]
    const tokens: Record<string, any>[] = []
    for (const [key, value] of Object.entries(this.recentPrices)) {
      if (supportedTokens.includes(key)) {
        tokens.push({
          name: key,
          price: value,
          value: 1,
          image: `https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${key.toLowerCase()}.png`,
        })
      }
    }
    return [{ name: 'QC', value: 1, image: '/img/logo/logo.svg', children: tokens }]
  }

  private renderChart() {
    am4core.addLicense(this.license)
    this.chart = am4core.create(this.$refs.chartDiv, forceDirected.ForceDirectedTree)
    // Create series
    const series = this.chart.series.push(new forceDirected.ForceDirectedSeries())
    // Set data
    series.data = this.dataFormatted
    // Set up data fields
    series.dataFields.value = 'value'
    series.dataFields.name = 'name'
    series.dataFields.id = 'id'
    series.dataFields.children = 'children'
    series.dataFields.linkWith = 'link'

    // Add labels
    // series.nodes.template.label.text = '{name}'
    series.nodes.template.label.valign = 'bottom'
    series.nodes.template.label.fill = am4core.color('#e91e63ff')
    series.nodes.template.label.dy = 5
    series.nodes.template.tooltipText = '{name}: [bold]' + '$' + '{price}[/]'
    series.fontSize = 12
    series.minRadius = 30
    series.maxRadius = 30

    // Configure circles
    series.nodes.template.circle.disabled = true

    // Configure icons
    const icon = series.nodes.template.createChild(am4core.Image)
    icon.propertyFields.href = 'image'
    icon.horizontalCenter = 'middle'
    icon.verticalCenter = 'middle'
    icon.width = 38
    icon.height = 38
    series.centerStrength = 0.2
    series.links.template.distance = 4
    series.nodes.template.outerCircle.disabled = true

    series.nodes.template.adapter.add('tooltipText', (text: any, target: any) => {
      if (target.dataItem) {
        switch (target.dataItem.level) {
          case 0:
            return ''
        }
      }
      return text
    })
  }

  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
    }
  }
}
</script>
