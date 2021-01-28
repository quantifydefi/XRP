<template>
  <v-data-table
    :headers="headers"
    :items="data"
    height="560"
    :sort-by="['balance_usd']"
    :sort-desc="[true]"
    :items-per-page="10"
  >
    <template v-slot:item.contract_balance="{ item }">
      {{ item.contract_balance.toFixed(4) }}
    </template>

    <template v-slot:item.balance_usd="{ item }">
      {{ item.balance_usd.toFixed(4) }}
    </template>

    <template v-slot:item.rate_usd="{ item }">
      {{ item.rate_usd.toFixed(4) }}
    </template>

    <template v-slot:item.market_cap_usd="{ item }">
      {{ item.market_cap_usd.toFixed(4) }}
    </template>

    <template v-slot:item.token_price="{ item }">
      {{ item.token_price.toFixed(4) }}
    </template>

    <template v-slot:item.eth_price_usd="{ item }">
      {{ item.eth_price_usd.toFixed(4) }}
    </template>

    <template v-slot:item.reserve_eth="{ item }">
      {{ item.reserve_eth.toFixed(4) }}
    </template>
    <template v-slot:item.percent_change_liq_1h="{ item }">
      {{ item.percent_change_liq_1h.toFixed(2) }}
    </template>

    <template v-slot:item.percent_change_liq_24h="{ item }">
      {{ item.percent_change_liq_24h.toFixed(2) }}
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
  headers = [
    {
      text: 'Symbol',
      align: 'start',
      value: 'token_symbol',
      class: 'px-2 ',
      width: 90,
    },
    {
      text: 'Name',
      align: 'start',
      value: 'token_name',
      class: 'px-2',
      width: 200,
    },
    {
      text: 'Balance ETH',
      align: 'start',
      value: 'contract_balance',
      class: 'px-2',
      width: 110,
    },
    {
      text: 'Balance USD',
      align: 'start',
      value: 'balance_usd',
      class: 'px-2',
      width: 110,
    },
    {
      text: 'Rate USD',
      align: 'start',
      value: 'rate_usd',
      class: 'px-2',
      width: 110,
    },
    {
      text: 'Marketcap USD',
      align: 'start',
      value: 'market_cap_usd',
      class: 'px-2',
      width: 120,
    },
    {
      text: 'Token Price',
      align: 'start',
      value: 'token_price',
      class: 'px-2',
      width: 120,
    },
    {
      text: 'ETH Price USD',
      align: 'start',
      value: 'eth_price_usd',
      class: 'px-2',
      width: 120,
    },
    {
      text: 'Token Pair',
      align: 'start',
      value: 'token_pair',
      class: 'px-2',
      width: 120,
    },
    {
      text: 'Liquidity',
      align: 'start',
      value: 'reserve_eth',
      class: 'px-2',
      width: 110,
    },
    {
      text: 'Ptc Change',
      align: 'start',
      value: 'percent_change_liq_1h',
      class: 'px-2',
      width: 100,
    },
    {
      text: 'Ptc Change',
      align: 'start',
      value: 'percent_change_liq_24h',
      class: 'px-2',
      width: 100,
    },
  ]
}
</script>

<style scoped></style>
