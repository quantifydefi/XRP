<template>
  <div ref="chartDiv" :style="{ width: '100%', height: `${chartHeight}px` }"></div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, ref, useContext } from '@nuxtjs/composition-api'
import { useQuery } from '@vue/apollo-composable/dist'
import { RecentPricesGQL } from '~/apollo/main/config.query.graphql'

let am4core: any = null
let forceDirected: any = null
if (process.browser) {
  am4core = require('@amcharts/amcharts4/core')
  forceDirected = require('@amcharts/amcharts4/plugins/forceDirected')
}
export default defineComponent({
  setup() {
    // STATE
    const chartHeight = ref(650)
    const chartDiv = ref(null)
    const chart: any = ref(null)

    // COMPOSABLES
    const { result } = useQuery(RecentPricesGQL)
    const recentPrices = computed(() => result.value?.recentPrices ?? {})
    const { env } = useContext()

    // COMPUTED
    const dataFormatted = computed(() => {
      const protocols: { aave: string[]; uniswap: string[] } = {
        aave: [
          'ETH',
          'WBTC',
          'DAI',
          'USDT',
          'BUSD',
          'FEI',
          'FRAX',
          'LINK',
          'AVAX',
          'MATIC',
          'FTM',
          'BAL',
          'CRV',
          'AMPL',
          'ENJ',
          'MANA',
          'REN',
          'SNX',
          // 'YFI',
          // 'ZRX',
        ],
        uniswap: [
          'ENS',
          'RAI',
          'WETH',
          'SHIB',
          'ACH',
          'AGLD',
          'ALICE',
          'AMP',
          'ANKR',
          'APE',
          'API3',
          'AUDIO',
          'AXS',
          'BADGER',
          'GNO',
          'BAT',
          'BOND',
          'MKR',
          // 'CEL',
          // 'USDC',
        ],
      }

      const childNode: { aave: Record<string, any>[]; uniswap: Record<string, any>[] } = {
        aave: [],
        uniswap: [],
      }

      for (const [key, value] of Object.entries(recentPrices.value)) {
        if (protocols.aave.includes(key)) {
          childNode.aave.push({
            name: key,
            price: value,
            value: 1,
            width: 38,
            height: 38,
            image: `https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${key.toLowerCase()}.png`,
          })
        }

        if (protocols.uniswap.includes(key)) {
          childNode.uniswap.push({
            name: key,
            price: value,
            value: 1,
            width: 38,
            height: 38,
            image: `https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${key.toLowerCase()}.png`,
          })
        }
      }

      return [
        {
          name: 'EVM Finance',
          image: `/img/logo/evmfinance-logo.svg`,
          width: 55,
          height: 55,
          children: [
            {
              name: 'Aave',
              value: 1,
              price: recentPrices.value.AAVE,
              image: `https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/aave.png`,
              width: 50,
              height: 50,
              children: childNode.aave.sort(() => 0.5 - Math.random()),
            },
            {
              name: 'Uniswap',
              value: 1,
              price: recentPrices.value.UNI,
              width: 50,
              height: 50,
              image: `https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/uni.png`,
              children: childNode.uniswap.sort(() => 0.5 - Math.random()),
            },
          ],
        },
      ]
    })

    function renderChart() {
      am4core.addLicense(env.amChartLicense)
      chart.value = am4core.create(chartDiv.value, forceDirected.ForceDirectedTree)

      // Create series
      const series = chart.value.series.push(new forceDirected.ForceDirectedSeries())

      // Set data
      series.data = dataFormatted.value

      // Set up data fields
      series.dataFields.value = 'value'
      series.dataFields.name = 'name'
      series.dataFields.id = 'id'
      series.dataFields.children = 'children'
      series.dataFields.linkWith = 'link'

      // Add labels
      series.nodes.template.label.valign = 'bottom'
      series.nodes.template.label.fill = am4core.color('#e91e63ff')
      series.nodes.template.label.dy = 5
      series.nodes.template.tooltipText = '{name}: [bold]' + '$' + '{price}[/]'

      // Overrides regular tooltipText with just the name of the NFT Collection since it has no value and is not a token.
      series.nodes.template.adapter.add('tooltipText', (text: any, target: any) => {
        if (target.dataItem) {
          if (target.dataItem.value === 1) {
            return text
          } else {
            return '{name}'
          }
        }
      })

      series.fontSize = 12
      series.minRadius = 30
      series.maxRadius = 30

      // Configure circles
      series.nodes.template.circle.disabled = true

      // Configure icons
      const icon = series.nodes.template.createChild(am4core.Image)
      icon.propertyFields.href = 'image'
      icon.propertyFields.width = 'width'
      icon.propertyFields.height = 'height'
      icon.horizontalCenter = 'middle'
      icon.verticalCenter = 'middle'
      series.centerStrength = 0.35
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

    onMounted(() => {
      setTimeout(() => {
        renderChart()
      }, 500)
    })

    onBeforeUnmount(() => {
      chart.value.dispose()
    })

    return { chartHeight, chartDiv }
  },
})
</script>
