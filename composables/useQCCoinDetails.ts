import { useQuery, useResult } from '@vue/apollo-composable/dist'
import { computed, ref, useRoute } from '@nuxtjs/composition-api'
import { plainToClass } from 'class-transformer'

import { QCCoinGQL } from '~/apollo/main/token.query.graphql'
import { QCCoinCl } from '~/models/token'
import { QcCoin } from '~/types/apollo/main/types'

export default function () {
  /** STATE **/
  const loading = ref(true)

  /** COMPOSABLES **/
  const route = useRoute()

  const { result, onResult } = useQuery(QCCoinGQL, () => ({ qcKey: route.value.params.id }), {
    fetchPolicy: 'no-cache',
    prefetch: false,
    pollInterval: 10000,
  })

  const query = useResult(result, {})

  /** COMPUTED **/
  const qcCoinData = computed(() => plainToClass(QCCoinCl, query.value as QcCoin))

  /** EVENTS **/
  onResult((queryResult) => {
    loading.value = queryResult.loading
  })

  return {
    loading,
    qcCoinData,
  }
}
