<template>
  <div ref="chartDiv" :style="{ width: '100%', height: `${chartHeight}px` }"></div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  Ref,
  ref,
  useContext,
  watch,
} from '@nuxtjs/composition-api'
import { useQuery } from '@vue/apollo-composable/dist'
import { DailyChartGQL } from '~/apollo/main/token.query.graphql'
import { DailyChart } from '~/types/apollo/main/types'

let am4core: any = null
let am4charts: any = null
let am4themesDark: any = null
if (process.browser) {
  am4core = require('@amcharts/amcharts4/core')
  am4charts = require('@amcharts/amcharts4/charts')
  am4themesDark = require('@amcharts/amcharts4/themes/dark')
}

type Props = {
  coinGeckoId: string
}
export default defineComponent<Props>({
  props: {
    coinGeckoId: { type: String, required: true },
  },
  setup(props) {
    // STATE
    const chartHeight = ref(600)
    const chartDiv = ref(null)
    let chart: any = null

    // COMPOSABLES
    const { env } = useContext()
    const { result } = useQuery(DailyChartGQL, () => ({ coinGeckoID: props.coinGeckoId }), {
      fetchPolicy: 'no-cache',
      prefetch: false,
    })

    const chartData = computed(
      () =>
        result.value?.dailyChart.map((v: DailyChart) => ({
          ...v,
          dateFormatted: new Date(v.date * 1000).toISOString().slice(0, 10),
        })) ?? []
    ) as Ref<DailyChart[]>

    function renderChart() {
      am4core.useTheme(am4themesDark.default)
      am4core.addLicense(env.amChartLicense)
      chart = am4core.create(chartDiv.value, am4charts.XYChart)

      chart.data = chartData.value

      // Set input format for the dates
      chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd'

      // Create axes
      const dateAxis = chart.xAxes.push(new am4charts.DateAxis())
      dateAxis.renderer.minGridDistance = 50
      chart.yAxes.push(new am4charts.ValueAxis())

      // Create series
      const series = chart.series.push(new am4charts.LineSeries())
      series.dataFields.valueY = 'priceUsd'
      series.dataFields.dateX = 'dateFormatted'
      series.strokeWidth = 2
      series.minBulletDistance = 10
      series.tooltipText = '{valueY}'
      series.tooltip.pointerOrientation = 'vertical'
      series.tooltip.background.fillOpacity = 0.75
      series.stroke = am4core.color('#e91e63')
      series.tooltip.getFillFromObject = false
      series.tooltip.background.fill = am4core.color('#ce749e')

      // Add scrollbar
      chart.scrollbarX = new am4charts.XYChartScrollbar()
      chart.scrollbarX.series.push(series)

      // Add cursor
      chart.cursor = new am4charts.XYCursor()
      chart.cursor.xAxis = dateAxis
      chart.cursor.snapToSeries = series
    }

    onMounted(() => renderChart())

    onBeforeUnmount(() => {
      chart.dispose()
    })

    watch(chartData, (newData) => (chart.data = newData))
    return { chartHeight, chartDiv }
  },
})
</script>
