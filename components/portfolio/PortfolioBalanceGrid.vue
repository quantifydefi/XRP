<template>
  <v-card tile outlined>
    <v-card-title v-if="chainData" class="pa-0 ma-0">
      <v-col class="d-flex">
        <v-avatar size="24px">
          <v-img :src="chainData.logoUrl" :lazy-src="chainData.logoUrl"></v-img>
        </v-avatar>
        <h4 class="text-subtitle-1 pl-3 text-truncate" v-text="chainData.label" />
      </v-col>
      <v-col cols="4" class="text-right">
        <h4
          class="text-subtitle-1 text-truncate pink--text font-weight-medium"
          v-text="$f(totalBalance, { pre: '$ ', minDigits: 2 })"
        />
      </v-col>
    </v-card-title>
    <v-divider />
    <v-data-table
      id="balances-grid"
      :headers="columns"
      :items="balanceItems"
      :sort-desc="[true]"
      :height="height"
      :items-per-page="10 * 10 ** 12"
      class="elevation-0"
      :mobile-breakpoint="0"
      hide-default-footer
    >
      <template #[`item.contractTickerSymbol`]="{ item }">
        <div class="text-no-wrap overflow-x-hidden">
          <v-avatar size="20" class="mr-2">
            <img :src="$imageUrlBySymbol(item.contractTickerSymbol)" @error="$setAltImageUrl" />
          </v-avatar>
          <nuxt-link
            class="text-capitalize text-decoration-none white--text"
            :to="{
              path: `/token/${item.contractTickerSymbol}`,
              query: { contract: item.contractAddress, decimals: item.contractDecimals },
            }"
            v-text="item.contractTickerSymbol"
          />
        </div>
      </template>

      <template #[`item.balance`]="{ item }">
        <span
          :class="textClass"
          v-text="$f(item.balance / Math.pow(10, item.contractDecimals), { minDigits: 2, maxDigits: 6 })"
        />
      </template>

      <template #[`item.quoteRate`]="{ item }">
        <span :class="textClass" v-text="$f(item.quoteRate, { pre: '$ ', minDigits: 2 })" />
      </template>

      <template #[`item.quote`]="{ item }">
        <span :class="textClass" v-text="$f(item.quote, { pre: '$ ', minDigits: 2 })" />
      </template>
    </v-data-table>
    <v-divider />
  </v-card>
</template>
<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType, Ref, useStore } from '@nuxtjs/composition-api'
import { BalanceItem, Balance, Chain } from '~/types/apollo/main/types'
import { State } from '~/types/state'

type Props = {
  data: Balance
}

export default defineComponent<Props>({
  props: {
    data: {
      type: Object as PropType<Balance>,
      default: () => {},
    },
  },

  setup(props) {
    // COMPOSABLES
    const { state, getters } = useStore<State>()

    // DATA
    const columns = [
      {
        text: 'Token',
        align: 'start',
        value: 'contractTickerSymbol',
        class: 'px-2',
        width: 60,
      },
      {
        text: 'Balance',
        align: 'start',
        value: 'balance',
        class: 'px-2',
        width: 60,
      },
      {
        text: 'Price',
        align: 'start',
        value: 'quoteRate',
        width: 80,
        class: ['px-2', 'text-truncate'],
        cellClass: ['px-2', 'text-truncate'],
      },
      {
        text: 'Value',
        align: 'start',
        value: 'quote',
        class: ['px-2', 'text-truncate'],
        cellClass: ['px-2', 'text-truncate'],
        width: 90,
      },
    ]
    const height = 450

    // COMPUTED
    const totalBalance = computed(() => props.data.items.reduce((n, { quote }) => n + quote, 0))
    const balanceItems: ComputedRef<BalanceItem[]> = computed(() => props.data.items.filter((elem) => elem.quote > 0))
    const textClass = computed(() => state.ui[state.ui.theme].innerCardLighten)
    const chainData: Ref<Chain> = computed(() => getters['configs/chainInfo'](props.data.chainId))

    return { columns, textClass, balanceItems, height, chainData, totalBalance }
  },
})
</script>
