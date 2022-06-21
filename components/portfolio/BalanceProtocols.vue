<template>
  <v-row>
    <v-col v-for="(item, i) in pools" :key="i">
      <v-card tile outlined height="100%">
        <v-card-title class="pa-0 ma-0">
          <v-col class="d-flex">
            <v-avatar size="24px">
              <v-img :src="item.chain.logoUrl" :lazy-src="item.chain.logoUrl"></v-img>
            </v-avatar>
            <h4 class="text-subtitle-1 pl-3 text-truncate">{{ item.chain.name }}</h4>
          </v-col>
          <v-col cols="4" class="text-right">
            <h4
              class="text-subtitle-1 text-truncate pink--text font-weight-medium"
              v-text="$f(item.total, { pre: '$ ', roundTo: 2 })"
            />
          </v-col>
        </v-card-title>
        <v-divider />
        <v-data-table
          id="balances-grid"
          :headers="columns"
          :items="item.pool"
          :sort-desc="[true]"
          height="100%"
          :items-per-page="10 * 10 ** 12"
          class="elevation-0"
          :mobile-breakpoint="0"
          hide-default-footer
        >
          <template #[`item.symbol`]="{ item }">
            <div class="text-no-wrap overflow-x-hidden">
              <v-avatar size="20" class="mr-2">
                <v-img
                  :src="$imageUrlBySymbol(item.symbol)"
                  :lazy-src="$imageUrlBySymbol(item.symbol)"
                  @error="$setAltImageUrl"
                />
              </v-avatar>
              <nuxt-link
                class="text-capitalize text-decoration-none white--text"
                :to="{
                  path: `/token/${item.symbol}`,
                  query: { contract: item.addresses.address, decimals: item.addresses.decimals },
                }"
                v-text="item.symbol"
              />
            </div>
          </template>

          <template #item.portfolio.walletBal="{ item }">
            <div v-text="$f(item.portfolio.walletBal, { roundTo: 6 })" />
            <div
              class="grey--text"
              v-text="$f(item.portfolio.walletBal * item.price.priceUsd, { roundTo: 2, pre: '$ ' })"
            />
          </template>

          <template #item.portfolio.totalDeposits="{ item }">
            <div v-text="$f(item.portfolio.totalDeposits, { roundTo: 6 })" />
            <div
              class="grey--text"
              v-text="$f(item.portfolio.totalDeposits * item.price.priceUsd, { roundTo: 2, pre: '$ ' })"
            />
          </template>

          <template #item.portfolio.variableBorrow="{ item }">
            <div v-text="$f(item.portfolio.variableBorrow, { roundTo: 6 })" />
            <div
              class="grey--text"
              v-text="$f(item.portfolio.variableBorrow * item.price.priceUsd, { roundTo: 2, pre: '$ ' })"
            />
          </template>

          <template #item.depositAPY="{ item }">
            <div class="grey--text">
              <span v-if="item.depositAPY === -1">--</span>
              <span v-else v-text="$f(item.depositAPY * 100, { roundTo: 2, after: ' %' })" />
            </div>
          </template>

          <template #item.variableBorrowAPY="{ item }">
            <div class="grey--text">
              <span v-if="item.variableBorrowAPY === -1">--</span>
              <span v-else v-text="$f(item.variableBorrowAPY * 100, { roundTo: 2, after: ' %' })" />
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { computed, ComputedRef, defineComponent, PropType, useStore } from '@nuxtjs/composition-api'
import { plainToClass } from 'class-transformer'
import { AavePool, Balance, Chain } from '~/types/apollo/main/types'
import { State } from '~/types/state'
import { AavePoolCl } from '~/composables/useAavePools'

type Props = {
  balances: Balance[]
}

export default defineComponent<Props>({
  props: {
    balances: {
      type: Array as PropType<Balance[]>,
      default: () => [],
    },
  },

  setup(props) {
    const { getters, state } = useStore<State>()
    const columns = [
      {
        text: 'Token',
        align: 'start',
        value: 'symbol',
        class: 'px-2',
        width: 60,
      },

      {
        text: 'Balance',
        align: 'left',
        value: 'portfolio.walletBal',
        class: ['px-2', 'text-truncate'],
        cellClass: ['px-2', 'py-1', 'text-truncate'],
      },

      {
        text: 'Deposits',
        align: 'left',
        value: 'portfolio.totalDeposits',
        class: ['px-2', 'text-truncate'],
        cellClass: ['px-2', 'py-1', 'text-truncate'],
      },

      {
        text: ' Borrows',
        align: 'left',
        value: 'portfolio.variableBorrow',
        class: ['px-2', 'text-truncate'],
        cellClass: ['px-2', 'py-1', 'text-truncate'],
      },
      {
        text: 'Deposit APY',
        align: 'center',
        value: 'depositAPY',
        class: ['px-2', 'text-truncate'],
        cellClass: ['px-2', 'py-1', 'text-truncate'],
      },
      {
        text: 'Borrow APY',
        align: 'center',
        value: 'variableBorrowAPY',
        class: ['px-2', 'text-truncate'],
        cellClass: ['px-2', 'py-1', 'text-truncate'],
      },
    ]

    const pools: ComputedRef<{ chain: Chain; pool: AavePoolCl[]; total: number }[]> = computed(() =>
      props.balances
        .map((elem) => ({
          chain: getters['configs/chainInfo'](elem.chainId) ?? state.configs.currentAaveMarket,
          pool: plainToClass(AavePoolCl, elem.aavePools as AavePool[]),
          total: elem.aavePools.reduce((a, b) => a + b.price.priceUsd * b.portfolioVal.walletBal, 0),
        }))
        .filter((elem) => elem.pool.length > 0)
    )

    return { columns, pools }
  },
})
</script>
