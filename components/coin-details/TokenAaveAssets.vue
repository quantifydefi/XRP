<template>
  <div class="mt-4">
    <v-row align="center">
      <v-col class="align-center">
        <v-avatar size="30" class="mr-2">
          <v-img :src="$imageUrlBySymbol('aave')" :lazy-src="$imageUrlBySymbol('aave')" @error="$setAltImageUrl" />
        </v-avatar>
        <nuxt-link to="/markets/aave" class="text-decoration-none"><span class="text-h6">AAVE V2</span></nuxt-link>
      </v-col>
      <v-col class="text-right">
        <network-selection />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <aave-markets :loading="false" :pools="pools" hide-action-cols expand-first-row />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, PropType, ref, watch } from '@nuxtjs/composition-api'
import { plainToClass } from 'class-transformer'
import { AavePool } from '~/types/apollo/main/types'
import { AavePoolCl } from '~/composables/useAavePools'
import usePortfolio, { PortfolioMap } from '~/composables/usePortfolio'
import AaveMarkets from '~/components/pools/AaveMarkets.vue'
import { Web3, WEB3_PLUGIN_KEY } from '~/plugins/web3/web3'
import NetworkSelection from '~/components/common/NetworkSelection.vue'

type Props = {
  rowPoolData: AavePool[]
}
export default defineComponent<Props>({
  components: { NetworkSelection, AaveMarkets },
  props: {
    rowPoolData: { type: Array as PropType<AavePool[]>, default: () => [], required: true },
  },

  setup(props) {
    // COMPOSABELS
    const { walletReady, account, chainId } = inject(WEB3_PLUGIN_KEY) as Web3

    //
    const portfolio = ref<PortfolioMap>({})

    // COMPUTED
    const aavePools = computed(() => plainToClass(AavePoolCl, props.rowPoolData as AavePool[]))
    const portfolioAddresses = computed(() =>
      aavePools.value.reduce((elem, item) => ({ ...elem, [item.id]: item.addresses }), {})
    )
    const pools = computed(() => {
      const pools: AavePoolCl[] = []
      aavePools.value.forEach((elem) => {
        elem.portfolio = portfolio.value[elem.id] || elem.portfolio
        pools.push(elem)
      })
      return pools
    })

    // HOOKS
    const { fetchPortfolio } = usePortfolio(portfolioAddresses)
    onMounted(async () => await updatePortfolio())

    // METHODS
    async function updatePortfolio() {
      portfolio.value = await fetchPortfolio()
    }

    // WATCHERS
    watch([aavePools, walletReady, account, chainId], async () => await updatePortfolio())

    return { aavePools, pools }
  },
})
</script>
