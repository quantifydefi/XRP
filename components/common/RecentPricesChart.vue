<template>
  <div ref="chartDiv" :style="{ width: '100%', height: `${chartHeight}px` }"></div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted, ref, useContext } from '@nuxtjs/composition-api'
import { useQuery, useResult } from '@vue/apollo-composable/dist'
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
    const chartHeight = ref(600)
    const chartDiv = ref(null)
    const chart: any = ref(null)

    // COMPOSABLES
    const { result } = useQuery(RecentPricesGQL)
    const recentPrices = useResult(result, {}, (data) => data.recentPrices)
    const { env } = useContext()

    // COMPUTED
    const dataFormatted = computed(() => {
      const supportedTokens: string[] = [
        'BTC',
        'ETH',
        'CRV',
        'DAI',
        'USDC',
        'WBTC',
        'LINK',
        'AAVE',
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
        'BUSD',
        'PAX',
        'ENJ',
        'GUSD',
        'BAL',
      ]
      const nftCollection = [
        {
          name: 'OpenSea',
          image: 'https://quantifycrypto.s3.us-west-2.amazonaws.com/pictures/nft-logo/opensea.png',
        },
        {
          name: 'The Sandbox',
          image: 'https://quantifycrypto.s3.us-west-2.amazonaws.com/pictures/nft-logo/sand.png',
        },
        {
          name: 'Bored Ape Yacht Club',
          image: 'https://quantifycrypto.s3.us-west-2.amazonaws.com/pictures/nft-logo/bayc.png',
        },
        {
          name: 'CryptoPunks',
          image: 'https://quantifycrypto.s3.us-west-2.amazonaws.com/pictures/nft-logo/cryptopunk.png',
        },
        {
          name: 'WorldOfWomen',
          image: 'https://quantifycrypto.s3.us-west-2.amazonaws.com/pictures/nft-logo/worldofwomen.png',
        },
      ]
      const tokens: Record<string, any>[] = [...nftCollection]
      for (const [key, value] of Object.entries(recentPrices.value)) {
        if (supportedTokens.includes(key)) {
          tokens.push({
            name: key,
            price: value,
            value: 1,
            image: `https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${key.toLowerCase()}.png`,
          })
        }
      }
      return [
        {
          name: 'QC',
          value: 1,
          image: `/img/logo/evmx-dark.svg`,
          children: tokens.sort(() => 0.5 - Math.random()),
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
