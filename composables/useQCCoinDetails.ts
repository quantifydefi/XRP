// import { useQuery, useResult } from '@vue/apollo-composable/dist'
// import { computed, ref, useRoute } from '@nuxtjs/composition-api'
// import { plainToClass } from 'class-transformer'
//
// import { QCCoinGQL, PriceGQL, HighAndLowGQL } from '~/apollo/main/token.query.graphql'
// import { QCCoinCl } from '~/models/token'
// import { HighAndLow, QcCoin, QcPrice } from '~/types/apollo/main/types'
// import { TimeInterval } from '~/types/token'
//
// export default function () {
//   /** STATE **/
//   const loading = ref(true)
//   const selectedInterval = ref<TimeInterval>('24h')
//
//   /** COMPOSABLES **/
//   const route = useRoute()
//
//   const coinDataQuery = useQuery(QCCoinGQL, () => ({ qcKey: route.value.params.id }), {
//     fetchPolicy: 'no-cache',
//     prefetch: false,
//   })
//
//   const priceQuery = useQuery(PriceGQL, () => ({ qcKey: route.value.params.id }), {
//     fetchPolicy: 'no-cache',
//     prefetch: false,
//     pollInterval: 10000,
//   })
//
//   const highAndLowQuery = useQuery(
//     HighAndLowGQL,
//     () => ({ qcKey: route.value.params.id, intervalType: selectedInterval }),
//     {
//       fetchPolicy: 'no-cache',
//       prefetch: false,
//     }
//   )
//
//   const coinDataQueryResult = useResult(coinDataQuery.result, {})
//   const priceQueryResult = useResult(priceQuery.result, {})
//   const highAndLowQueryResult = useResult(highAndLowQuery.result, {})
//
//   /** COMPUTED **/
//   const qcCoinData = computed(() => plainToClass(QCCoinCl, coinDataQueryResult.value as QcCoin))
//   const coinPrice = computed(() => priceQueryResult.value.price as QcPrice)
//   const highAndLow = computed(() => highAndLowQueryResult.value as HighAndLow)
//
//   /** EVENTS **/
//   coinDataQuery.onResult((queryResult) => {
//     loading.value = queryResult.loading
//   })
//
//   return {
//     loading,
//     selectedInterval,
//     qcCoinData,
//     coinPrice,
//     highAndLow,
//   }
// }
