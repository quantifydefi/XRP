<template>
  <v-data-table
    class="transparent"
    :headers="headers"
    :items="data"
    :sort-by="['balance_usd']"
    :sort-desc="[true]"
    :items-per-page="10"
    item-class="px-1"
  >
    <template v-slot:item.token_pair="{ item }">
      <a
        target="_blank"
        class="primary--text text-decoration-none"
        :href="`/token/${item.pool_id}`"
      >
        {{ item.token_pair }}</a
      >
    </template>

    <template v-slot:item.contract_balance="{ item }">
      {{ $numberWithCommas(item.contract_balance) }}
    </template>

    <template v-slot:item.balance_usd="{ item }">
      {{ $numberWithCommas(item.balance_usd) }}
    </template>

    <template v-slot:item.holdings="{ item }">
      {{ calculateHoldings(item.balance_usd) }}
    </template>

    <template v-slot:item.rate_usd="{ item }">
      {{ item.rate_usd.toFixed(4) }}
    </template>

    <template v-slot:item.token_price="{ item }">
      {{ item.token_price.toFixed(4) }}
    </template>

    <template v-slot:item.reserve_eth="{ item }">
      {{ item.reserve_eth.toFixed(4) }}
    </template>

    <template v-slot:item.percent_change_liq_1h="{ item }">
      <v-icon :color="applyColor(item.percent_change_liq_1h).color">{{
        applyColor(item.percent_change_liq_1h).icon
      }}</v-icon>
      {{ applyColor(item.percent_change_liq_1h).val }}
    </template>

    <template v-slot:item.percent_change_liq_24h="{ item }">
      <v-icon :color="applyColor(item.percent_change_liq_24h).color">{{
        applyColor(item.percent_change_liq_24h).icon
      }}</v-icon>
      {{ applyColor(item.percent_change_liq_24h).val }}
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { HeatmapBalancesData } from '~/models/heatmap'

@Component({
  name: 'BalancesGrid',
})
export default class BalancesGrid extends Vue {
  @Prop({ default: () => [] }) data!: HeatmapBalancesData[]
  @Prop({ default: () => 0 }) portfolioBalance!: number

  headers = [
    {
      text: 'Asset',
      align: 'start',
      value: 'token_name',
      class: 'px-2',
      width: 180,
    },

    {
      text: 'Token Pair',
      align: 'start',
      value: 'token_pair',
      class: 'px-2',
      width: 160,
    },
    {
      text: 'Quantity',
      align: 'start',
      value: 'contract_balance',
      class: 'px-2',
      width: 110,
    },
    {
      text: 'Balance',
      align: 'start',
      value: 'balance_usd',
      class: 'px-2',
      width: 110,
    },

    {
      text: 'Holdings %',
      align: 'start',
      value: 'holdings',
      class: 'px-2',
      width: 100,
    },

    {
      text: 'Rate USD',
      align: 'start',
      value: 'rate_usd',
      class: 'px-2',
      width: 110,
    },

    {
      text: '1H %',
      align: 'center',
      value: 'percent_change_liq_1h',
      class: 'px-2',
      width: 100,
    },
    {
      text: '24H %',
      align: 'center',
      value: 'percent_change_liq_24h',
      class: 'px-2',
      width: 100,
    },

    {
      text: 'Liquidity',
      align: 'start',
      value: 'reserve_eth',
      class: 'px-2',
      width: 110,
    },
  ]

  applyColor(n: number): { val: string; icon: string; color: string } {
    return n > 0
      ? { val: Math.abs(n).toFixed(2), icon: 'mdi-chevron-up', color: 'green' }
      : { val: Math.abs(n).toFixed(2), icon: 'mdi-chevron-down', color: 'red' }
  }

  calculateHoldings(balanceUsd: number): number {
    if (this.portfolioBalance === 0) {
      return 0.0
    } else {
      return parseFloat(((balanceUsd / this.portfolioBalance) * 100).toFixed(2))
    }
  }
}
</script>
