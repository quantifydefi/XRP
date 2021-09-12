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
          ><h1 class="title">{{ priceFormatter(totalBalance) }}</h1></v-col
        >
      </v-card-title>
      <v-divider></v-divider>

      <v-data-table
        dense
        :height="gridHeight - 32 + 'px'"
        :headers="headers"
        :items="gridData"
        :sort-desc="[true]"
        :items-per-page="10"
        class="elevation-1"
      >
        <template #[`item.totalValue`]="{ item }">
          <span>{{ priceFormatter(item.totalValue) }}</span>
        </template>
      </v-data-table>
      <v-divider></v-divider>
    </div>
  </client-only>
</template>

<script lang="ts">
/* eslint-disable */
import { Vue, Component, Prop } from 'vue-property-decorator'

import { ChainOptions, BalanceDataInterface } from '~/types/balance'


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
  @Prop({default: []}) readonly gridData!: BalanceDataInterface[]


  get totalBalance(): number{
    let balance  = 0
    for (let item of this.gridData){
      balance += item.totalValue
    }

    return balance
  }

  headers = [
    //  {
    //   text: 'Token',
    //   align: 'start',
    //   value: 'tokenName',
    //   class: 'px-2',
    //   width: 180,
    // },
          {
      text: 'Token',
      align: 'start',
      value: 'tokenSymbol',
      class: 'px-2',
      width: 60,
    },
          {
      text: 'Balance',
      align: 'start',
      value: 'tokenBalance',
      class: 'px-2',
      width: 80,
    },
          {
      text: 'Price',
      align: 'start',
      value: 'tokenPrice',
      class: 'px-2',
      width: 80,
    },
          {
      text: 'Value',
      align: 'start',
      value: 'totalValue',
      class: 'px-2',
      width: 90,
    },
  ]


  priceFormatter(value:number): string{
    if(value > 1){
      return new Intl.NumberFormat('en', { style: 'currency', currency: 'USD', maximumFractionDigits:2 }).format(value)
    } else {
      return new Intl.NumberFormat('en', { style: 'currency', currency: 'USD', maximumFractionDigits:4 }).format(value)
    }
  }

}
</script>

<style scoped></style>
