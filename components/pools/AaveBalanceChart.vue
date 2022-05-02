<template>
  <div><div ref="chartDiv" :style="{ width: '100%', height: `${height}px` }"></div></div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  PropType,
  ref,
  useContext,
  useStore,
  watch,
} from '@nuxtjs/composition-api'
import { State } from '~/types/state'
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

interface ChartData {
  name: string
  balance: number
  balanceUsd: number
}
type Props = {
  data: ChartData[]
  chartHeight: number
}

export default defineComponent<Props>({
  props: {
    data: { type: Array as PropType<ChartData[]>, default: () => [] },
    chartHeight: { type: Number, default: 400 },
  },

  setup(props) {
    // COMPOSABLE
    const { state } = useStore<State>()

    // STATE
    const chartDiv = ref(null)
    let chart: any = null

    // COMPUTED
    const theme = computed(() => state.ui.theme)
    const { env } = useContext()

    // METHODS
    function renderChart() {
      if (theme.value === 'dark') {
        am4core.useTheme(am4themesDark.default)
      } else {
        am4core.unuseTheme(am4themesDark.default)
        am4core.useTheme(am4themesAnimated.default)
      }
      am4core.addLicense(env.amChartLicense)

      chart = am4core.create(chartDiv.value, am4charts.XYChart)
      chart.data = props.data

      // Create axes
      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis())
      categoryAxis.dataFields.category = 'name'
      categoryAxis.renderer.grid.template.location = 0
      categoryAxis.renderer.minGridDistance = 30

      chart.yAxes.push(new am4charts.ValueAxis())

      // Create series
      const series = chart.series.push(new am4charts.ColumnSeries())
      series.dataFields.valueY = 'balance'
      series.dataFields.categoryX = 'name'
      // eslint-disable-next-line no-template-curly-in-string
      series.columns.template.tooltipText = 'Token Balance: [bold]{balance}[/]\nUSD  Balance: [bold]${balanceUsd}'
      series.columns.template.maxWidth = 50
    }

    // WATCHERS
    watch(theme, () => {
      renderChart()
    })

    watch(
      () => props.data,
      (newData) => (chart.data = newData)
    )

    // HOOKS
    onMounted(() => {
      renderChart()
    })
    onBeforeUnmount(() => {
      chart.dispose()
    })

    return {
      height: props.chartHeight,
      chartDiv,
    }
  },
})
</script>
