<template>
  <client-only>
    <v-card tile outlined>
      <v-card-title class="pa-0 ma-0">
        <v-col class="d-flex">
          <v-avatar size="24px">
            <v-img :src="balance.chainInfo(chains).logoUrl" :lazy-src="balance.chainInfo(chains).logoUrl"></v-img>
          </v-avatar>
          <h1 class="text-subtitle-1 pl-3 text-truncate">
            {{ balance.chainInfo(chains).label }}
          </h1>
        </v-col>

        <v-col cols="4" class="text-right"
          ><h4 class="text-subtitle-1 text-truncate pink--text font-weight-medium">
            {{ priceFormatter(balance.chainTotalBalance) }}
          </h4></v-col
        >
      </v-card-title>
      <v-divider />
      <v-data-table
        id="balances-grid"
        :headers="cols"
        :items="balance.items"
        :sort-desc="[true]"
        :height="gridHeightLocal"
        :items-per-page="10 * 10 ** 12"
        class="elevation-0"
        :mobile-breakpoint="0"
        hide-default-footer
      >
        <template #[`item.contractTickerSymbol`]="{ item }">
          <div style="width: 78px" class="text-no-wrap overflow-x-hidden">
            <v-avatar size="18" class="mr-2">
              <img :alt="`${item.contractTickerSymbol} logo`" :src="item.logoUrl" @error="setAltImg" />
            </v-avatar>
            {{ item.contractTickerSymbol }}
          </div>
        </template>

        <template #[`item.balance`]="{ item }">
          <span :class="ui[theme].innerCardLighten">{{
            balanceFormatter(item.balance / Math.pow(10, item.contractDecimals))
          }}</span>
        </template>

        <template #[`item.quoteRate`]="{ item }">
          <span :class="ui[theme].innerCardLighten">{{ balanceFormatter(item.quoteRate) }}</span>
        </template>

        <template #[`item.quote`]="{ item }">
          <span :class="ui[theme].innerCardLighten">{{ priceFormatter(item.quote) }}</span>
        </template>
      </v-data-table>
      <v-divider />
    </v-card>
  </client-only>
</template>

<script lang="ts">
/* eslint-disable */
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import {Helper} from '~/models/helper'
import type {PortfolioBalance} from "~/models/portfolio";
import { mapState } from "vuex";

@Component({ name: 'BalancesGrid',
  computed: { ...mapState({
      chains: (state: any) => state.configs.chains,
      ui: (state: any) => state.ui,
      theme: (state: any) => state.ui.theme,
    }),
  }
})
export default class BalancesGrid extends Vue {
  @Prop({default: 435}) readonly gridHeight!: number
  @Prop({default: []}) readonly cols!: any
  @Prop({default: []}) readonly balance!: PortfolioBalance

  private gridHeightLocal = this.gridHeight

  @Watch('gridHeight')
  onGridHeightChange(newVal:number){
    this.gridHeightLocal = newVal
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

<style lang="scss">
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  height: 32px;
}

.theme--dark.v-data-table {
  background-color: transparent;
  color: #ffffff;
}

.v-data-table tr:hover:not(.v-table__expanded__content) {
}

</style>
