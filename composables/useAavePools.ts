import { useQuery } from '@vue/apollo-composable/dist'
import { useResult } from '@vue/apollo-composable'
import { computed, ref, useStore, watch } from '@nuxtjs/composition-api'
import { plainToClass } from 'class-transformer'
import { AavePoolGQL } from '~/apollo/main/pools.query.graphql'
import { AavePool } from '~/types/apollo/main/types'
import { AavePoolCl } from '~/models/pool'
import { State } from '~/types/state'

export default function () {
  // STATE
  const loading = ref(true)

  // COMPOSABLES
  const { state } = useStore<State>()
  const { result, onResult } = useQuery(
    AavePoolGQL,
    () => ({
      chainId: state.configs.currentAaveMarket.chainId,
    }),
    { fetchPolicy: 'no-cache', pollInterval: 10000 }
  )
  const query = useResult(result, [])

  // COMPUTED
  const aavePoolsData = computed(() => plainToClass(AavePoolCl, query.value as AavePool[]))
  const marketId = computed(() => state.configs.currentAaveMarket.chainId)

  // EVENTS
  onResult((queryResult) => {
    loading.value = queryResult.loading
  })
  watch(marketId, () => (loading.value = true))

  return {
    loading,
    aavePoolsData,
  }
}
