<template>
  <client-only>
    <div>
      <v-card-title
        class="pa-0 ma-0"
        :style="{ backgroundColor: $vuetify.theme.themes[theme].appBg }"
      >
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
        id="balances-grid"
        :style="{ backgroundColor: $vuetify.theme.themes[theme].appBg }"
        dense
        :height="gridHeight - 32 + 'px'"
        :headers="cols"
        :items="gridData"
        :sort-desc="[true]"
        :items-per-page="16"
        class="elevation-0"
        :mobile-breakpoint="0"
      >
        <template #[`item.contract_ticker_symbol`]="{ item }">
          <div style="width: 78px" class="text-no-wrap overflow-x-hidden">
            <v-avatar size="18" class="mr-2">
              <img
                :alt="`${item.contract_ticker_symbol} logo`"
                :src="item.logo_url"
                @error="setAltImg"
              />
            </v-avatar>
            {{ item.contract_ticker_symbol }}
          </div>
        </template>

        <template #[`item.balance`]="{ item }">
          <span>{{ balanceFormatter(item.balance) }}</span>
        </template>

        <template #[`item.quote`]="{ item }">
          <span>{{ priceFormatter(item.quote) }}</span>
        </template>
      </v-data-table>
      <v-divider></v-divider>
    </div>
  </client-only>
</template>

<script lang="ts">
/* eslint-disable */
import {Vue, Component, Prop} from 'vue-property-decorator'
import {BalanceDataInterface} from '~/types/balance'
import {Helper} from '~/models/helper'
import {mapState} from "vuex";

@Component({
  name: 'BalancesGrid',
  computed: {
    ...mapState({
      theme: (state: any) => state.ui.theme,
    }),
  },
})
export default class BalancesGrid extends Vue {
  @Prop({default: 435}) readonly gridHeight!: number
  @Prop({default: 'Ethereum'}) readonly network!: string
  @Prop({default: 'eth'}) readonly icon!: string
  @Prop({default: []}) readonly cols!: any
  @Prop({default: []}) readonly gridData!: BalanceDataInterface[]


  get totalBalance(): string {
    let balance: number = 0
    for (let item of this.gridData) {
      balance += item.quote
    }

    return Helper.priceFormatter(balance)
  }

  priceFormatter(value: number) {
    return Helper.priceFormatter(value)
  }

  balanceFormatter(value: number): string {
    return new Intl.NumberFormat('en', {
      maximumSignificantDigits: 8,
      minimumSignificantDigits: 8
    }).format(value)
  }

  setAltImg(event: any) {
    return Helper.setAltImg(event)
  }
}
</script>

<style scoped></style>
