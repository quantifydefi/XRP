import { useQuery } from '@vue/apollo-composable/dist'
import { useResult } from '@vue/apollo-composable'
import { computed, ref, useStore } from '@nuxtjs/composition-api'
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
      chainId: state.configs.currentChain.chainId,
    }),
    { fetchPolicy: 'no-cache', pollInterval: 10000 }
  )
  const query = useResult(result, [])

  // COMPUTED
  const aavePoolsData = computed(() => plainToClass(AavePoolCl, query.value as AavePool[]))

  // EVENTS
  onResult((queryResult) => {
    loading.value = queryResult.loading
  })

  return {
    loading,
    aavePoolsData,
  }
}
