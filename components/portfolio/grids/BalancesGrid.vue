<template>
  <client-only>
    <div>
      <v-card-title class="pa-0 ma-0">
        <v-col cols="6" class="d-flex">
          <v-avatar size="32px">
            <v-img
              :src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${icon.toLowerCase()}.png`"
              :lazy-src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${icon.toLowerCase()}.png`"
            ></v-img>
          </v-avatar>
          <h1 class="title pl-3">{{ network }}</h1>
        </v-col>

        <v-col cols="6" class="text-right"
          ><h1 class="title">{{ totalBalance }}</h1></v-col
        >
      </v-card-title>
      <v-divider></v-divider>

      <v-data-table
        dense
        :height="gridHeight - 32 + 'px'"
        :headers="cols"
        :items="gridData"
        :sort-desc="[true]"
        :items-per-page="12"
        class="elevation-1"
        :mobile-breakpoint="0"
      >
        <template #[`item.totalValue`]="{ item }">
          <span>{{ priceFormatter(item.totalValue) }}</span>
        </template>
        <template #[`item.tokenBalance`]="{ item }">
          <span>{{ balanceFormatter(item.tokenBalance) }}</span>
        </template>
      </v-data-table>
      <v-divider></v-divider>
    </div>
  </client-only>
</template>

<script lang="ts">
/* eslint-disable */
import { Vue, Component, Prop } from 'vue-property-decorator'

import { ChainOptions, BalanceGridDataInterface } from '~/types/balance'

import { Helper } from '~/models/helper'


@Component({
  name: 'BalancesGrid',
  components: {
    GridCore: () => import('../../common/grid/GridCore.vue'),
  },
})
export default class BalancesGrid extends Vue {
  @Prop({ default: 450 }) readonly gridHeight!: number
  @Prop({ default: 1 }) readonly chainId!: ChainOptions
  @Prop({ default: 'Ethereum' }) readonly network!: string
  @Prop({ default: 'eth' }) readonly icon!: string
  @Prop({default: ''}) readonly address!: string
  @Prop({default: []}) readonly cols!: any
  @Prop({default: []}) readonly gridData!: BalanceGridDataInterface[]


  get totalBalance(): string{
    let balance: number  = 0
    for (let item of this.gridData){
      balance += item.totalValue
    }

    return Helper.priceFormatter(balance)
  }

  priceFormatter(value: number){
    return Helper.priceFormatter(value)
  }

  balanceFormatter(value: number): string{
    return new Intl.NumberFormat('en', { maximumSignificantDigits: 8 }).format(value)
  }
}
</script>

<style scoped></style>
