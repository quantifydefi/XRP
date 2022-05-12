<template>
  <div ref="chartDiv" :style="{ width: '100%', height: `${height}px` }"></div>
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

type Props = {
  data: { value: number; name: string }[]
  chartHeight: number
  labelsDisabled: boolean
  ticksDisabled: boolean
  tooltipText: string
}

interface ChartData {
  value: number
  name: string
}

export default defineComponent<Props>({
  props: {
    data: { type: Array as PropType<ChartData[]>, default: () => [] },
    chartHeight: { type: Number, default: 220 },
    labelsDisabled: { type: Boolean, default: true },
    ticksDisabled: { type: Boolean, default: true },
    tooltipText: { type: String, default: '' },
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

    function renderChart() {
      if (theme.value === 'dark') {
        am4core.useTheme(am4themesDark.default)
      } else {
        am4core.unuseTheme(am4themesDark.default)
        am4core.useTheme(am4themesAnimated.default)
      }
      am4core.addLicense(env.amChartLicense)

      chart = am4core.create(chartDiv.value, am4charts.PieChart)
      chart.data = props.data

      // Set inner radius
      chart.innerRadius = am4core.percent(65)
      chart.paddingTop = 20

      // Add and configure Series
      const pieSeries = chart.series.push(new am4charts.PieSeries())
      pieSeries.dataFields.value = 'value'
      pieSeries.dataFields.category = 'name'
      pieSeries.slices.template.stroke = am4core.color(`${theme.value === 'dark' ? '#030303' : '#ffffff'}`)
      pieSeries.slices.template.strokeWidth = 2
      pieSeries.slices.template.strokeOpacity = 1
      pieSeries.labels.template.maxWidth = 130
      pieSeries.labels.template.wrap = true
      pieSeries.labels.template.fontSize = 12
      pieSeries.labels.template.disabled = props.labelsDisabled
      pieSeries.ticks.template.disabled = props.ticksDisabled
      pieSeries.slices.template.tooltipText = props.tooltipText

      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1
      pieSeries.hiddenState.properties.endAngle = -90
      pieSeries.hiddenState.properties.startAngle = -90
      pieSeries.slices.template.propertyFields.fill = 'color'

      chart.paddingTop = 0
      chart.paddingBottom = 0
    }
    watch(theme, () => {
      renderChart()
    })

    watch(
      () => props.data,
      (newData) => (chart.data = newData)
    )

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
