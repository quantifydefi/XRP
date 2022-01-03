<template>
  <v-card tile outlined height="100%">
    <v-skeleton-loader v-if="isPoolsLoading" type="table-heading,table-tbody,table-tbody" />
    <v-data-table
      v-if="aaveMainNetPools.length"
      id="curve-pools-grid"
      :headers="config.cols"
      :items="aaveMainPoolsFiltered"
      :sort-by="['usdBalance']"
      :sort-desc="[true]"
      height="100%"
      :items-per-page="10"
      class="elevation-0"
    >
      <template #[`item.symbol`]="{ item }">
        <div class="my-1">
          <v-row no-gutters align="center">
            <v-col cols="3">
              <v-avatar size="24" class="mr-2">
                <img
                  :alt="`${item.symbol} logo`"
                  :src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${item.symbol.toLowerCase()}.png`"
                  @error="setAltImg"
                />
              </v-avatar>
            </v-col>
            <v-col>
              <v-row no-gutters>
                <v-col>
                  <span class="text-capitalize font-weight-bold pink--text">{{ item.name }}</span>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col>
                  <span :class="[ui[theme].innerCardLighten, 'text-caption']"> {{ item.symbol }} </span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </template>

      <template #[`item.tokenBalance`]="{ item }">
        <span :class="[ui[theme].innerCardLighten]">{{ valueFormatter(item.tokenBalance / 10 ** 6, 4, 2) }} M</span>
      </template>

      <template #[`item.usdBalance`]="{ item }">
        <span>${{ (item.usdBalance / 10 ** 6).toFixed(2) }} M</span>
      </template>

      <template #[`item.availableBalance`]>
        <div>
          <div class="subtitle-2">0</div>
          <div class="text-no-wrap">
            0.00
            <span class="caption">USD</span>
          </div>
        </div>
      </template>

      <template #[`item.depositAPY`]="{ item }">
        <span :class="[ui[theme].innerCardLighten]">{{ (item.depositAPY * 100).toFixed(2) }} %</span>
      </template>

      <template #[`item.variableBorrowAPY`]="{ item }">
        <span :class="[ui[theme].innerCardLighten]">{{ (item.variableBorrowAPY * 100).toFixed(2) }} %</span>
      </template>

      <template #[`item.stableBorrowAPY`]="{ item }">
        <span :class="[ui[theme].innerCardLighten]">{{ (item.stableBorrowAPY * 100).toFixed(2) }} %</span>
      </template>

      <template #[`item.totalBorrowBalance`]="{ item }">
        <span :class="[ui[theme].innerCardLighten]">
          {{ valueFormatter(item.totalBorrowBalance / 10 ** 6, 3, 3) }} M
        </span>
      </template>

      <template #[`item.totalBorrowBalanceUsd`]="{ item }">
        <span>${{ (item.totalBorrowBalanceUsd / 10 ** 6).toFixed(2) }} M</span>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { mapState } from 'vuex'
import { AavePools } from '~/models/pool'

@Component({
  name: 'AavePool',
  computed: {
    ...mapState({
      ui: (state: any) => state.ui,
      theme: (state: any) => state.ui.theme,
    }),
  },
})
export default class AavePool extends mixins(AavePools) {}
</script>

<style scoped></style>
