import { useQuery } from '@vue/apollo-composable/dist'
import { useResult } from '@vue/apollo-composable'
import { computed, inject, Ref, ref, useStore, watch } from '@nuxtjs/composition-api'
import { BalancesGQL } from '~/apollo/main/portfolio.query.graphql'
import { BalanceItem, Balances } from '~/types/apollo/main/types'
import { State } from '~/types/state'
import { Web3, WEB3_PLUGIN_KEY } from '~/plugins/web3/web3'
export default function () {
  // STATE
  const loading = ref(true)

  // COMPOSABLES
  const { state } = useStore<State>()
  const { account } = inject(WEB3_PLUGIN_KEY) as Web3
  // '0xF705b9ba1908cA505537F309B08E6949C1b8f31F'
  const { result, error, onResult } = useQuery(
    BalancesGQL,
    () => ({ chainIds: state.configs.balancesChains, address: account.value }),
    { fetchPolicy: 'no-cache', pollInterval: 30000 }
  )
  const balanceData = useResult(result, []) as Ref<Balances[]>

  // COMPUtED
  const totalBalance = computed(() =>
    balanceData.value
      .map((elem: Balances) => elem.items.reduce((n: number, el: BalanceItem) => n + el.quote, 0))
      .reduce((n: number, curr) => n + curr, 0)
  )

  // EVENTS
  onResult((queryResult) => {
    loading.value = queryResult.loading
  })

  // WATCHERS
  watch(account, () => (loading.value = true))

  return {
    balanceData,
    totalBalance,
    error,
    loading,
  }
}
