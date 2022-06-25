<template>
  <v-card tile outlined height="276">
    <h2 class="pb-3 subtitle-1 font-weight-bold pt-2 pl-4 pb-3" v-text="`Wallet Balances`" />
    <v-data-table
      v-if="walletReady"
      height="205px"
      dense
      :headers="cols"
      disable-sort
      :items="data"
      disable-pagination
      fixed-header
      hide-default-footer
      mobile-breakpoint="0"
    >
      <template #[`item.symbol`]="{ item }">
        <div class="text-no-wrap overflow-x-hidden">
          <v-avatar size="20" class="mr-2">
            <img :src="$imageUrlBySymbol(item.symbol)" @error="$setAltImageUrl" />
          </v-avatar>
          <a class="text-decoration-none" target="_blank" :href="item.link" v-text="item.name" />
        </div>
      </template>
    </v-data-table>
    <div v-else class="text-center mt-6">
      <v-btn tile depressed @click="dispatch('ui/walletDialogStatus', true)">Connect to Wallet</v-btn>
    </div>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType, useContext, useStore } from '@nuxtjs/composition-api'
import { Balance } from '~/types/apollo/main/types'
import { State } from '~/types/state'
import { Web3, WEB3_PLUGIN_KEY } from '~/plugins/web3/web3'

type Props = {
  balances: Balance[]
  priceUsd: number
  contract: string
}
export default defineComponent<Props>({
  props: {
    balances: { type: Array as PropType<Balance[]>, default: () => [] },
    priceUsd: { type: Number, default: 0 },
    contract: { type: String, default: '' },
  },
  setup(props) {
    // COMPOSABLES
    const { dispatch, getters } = useStore<State>()
    const { $f } = useContext()
    const { walletReady } = inject(WEB3_PLUGIN_KEY) as Web3

    // STATE
    const cols = [
      { text: 'Symbol', value: 'symbol' },
      { text: 'Balance', value: 'balance', cellClass: ['grey--text', 'text-truncate'] },
      { text: 'Value', value: 'value', cellClass: ['text-truncate'] },
    ]

    // COMPUTED
    const data = computed(() =>
      props.balances.map(
        (balance) =>
          balance.items.map((elem) => ({
            symbol: getters['configs/chainInfo'](balance.chainId)?.symbol ?? '',
            name: getters['configs/chainInfo'](balance.chainId)?.label ?? '',
            link: getters['configs/chainInfo'](balance.chainId)?.blockExplorerUrl + `/token/${props.contract}` ?? '',
            balance: $f(elem.balance, { roundTo: 4 }),
            value: $f(props.priceUsd * elem.balance, { pre: '$ ', roundTo: 2 }),
          }))[0]
      )
    )
    return { data, cols, walletReady, dispatch }
  },
})
</script>
