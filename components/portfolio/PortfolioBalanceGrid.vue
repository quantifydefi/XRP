<template>
  <v-card tile outlined>
    <v-card-title v-if="chainData" class="pa-0 ma-0">
      <v-col class="d-flex">
        <v-avatar size="24px">
          <v-img :src="chainData.logoUrl" :lazy-src="chainData.logoUrl"></v-img>
        </v-avatar>
        <h1 class="text-subtitle-1 pl-3 text-truncate" v-text="chainData.label" />
      </v-col>
      <v-col cols="4" class="text-right">
        <h4
          class="text-subtitle-1 text-truncate pink--text font-weight-medium"
          v-text="$f(totalBalance, { pre: '$ ', roundTo: 2 })"
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
            <img :src="item.logoUrl" :lazy-src="item.logoUrl" @error="$setAltImageUrl" />
          </v-avatar>
          {{ item.contractTickerSymbol }}
        </div>
      </template>

      <template #[`item.balance`]="{ item }">
        <span :class="textClass" v-text="$f(item.balance / Math.pow(10, item.contractDecimals), { roundTo: 4 })" />
      </template>

      <template #[`item.quoteRate`]="{ item }">
        <span :class="textClass" v-text="$f(item.quoteRate, { pre: '$ ', roundTo: 4 })" />
      </template>

      <template #[`item.quote`]="{ item }">
        <span :class="textClass" v-text="$f(item.quote, { pre: '$ ', roundTo: 3 })" />
      </template>
    </v-data-table>
    <v-divider />
  </v-card>
</template>
<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType, Ref, useStore } from '@nuxtjs/composition-api'
import { BalanceItem, Balances, Chain } from '~/types/apollo/main/types'
import { State } from '~/types/state'

type Props = {
  data: Balances
}

export default defineComponent<Props>({
  props: {
    data: {
      type: Object as PropType<Balances>,
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

<!--<script lang="ts">-->
<!--/* eslint-disable */-->
<!--import { Vue, Component, Prop, Watch } from "vue-property-decorator";-->
<!--import {Helper} from '~/models/helper'-->
<!--import type {PortfolioBalance} from "~/models/portfolio";-->
<!--import { mapState , mapGetters} from "vuex";-->

<!--@Component({ name: 'BalancesGrid',-->
<!--  computed: { ...mapState({-->
<!--      chains: (state: any) => state.configs.chains,-->
<!--      ui: (state: any) => state.ui,-->
<!--      theme: (state: any) => state.ui.theme,-->
<!--    }),-->
<!--    ...mapGetters({chainInfo:'configs/chainInfo'})-->
<!--  }-->
<!--})-->
<!--export default class BalancesGrid extends Vue {-->
<!--  @Prop({default: 435}) readonly gridHeight!: number-->
<!--  @Prop({default: 1}) readonly chainId!: number-->
<!--  @Prop({default: []}) readonly cols!: any-->
<!--  @Prop({default: []}) readonly balance!: PortfolioBalance-->

<!--  private gridHeightLocal = this.gridHeight-->

<!--  @Watch('gridHeight')-->
<!--  onGridHeightChange(newVal:number){-->
<!--    this.gridHeightLocal = newVal-->
<!--  }-->

<!--  priceFormatter(value: number) {-->
<!--    return Helper.priceFormatter(value)-->
<!--  }-->

<!--  balanceFormatter(value: number): string {-->
<!--    return new Intl.NumberFormat('en', {-->
<!--      maximumSignificantDigits: 8,-->
<!--      minimumSignificantDigits: 8-->
<!--    }).format(value)-->
<!--  }-->

<!--  setAltImg(event: any) {-->
<!--    return Helper.setAltImg(event)-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style lang="scss"></style>-->
