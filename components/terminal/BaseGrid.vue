<template>
  <client-only>
    <v-data-table
      id="base-grid"
      :style="{ backgroundColor: $vuetify.theme.themes[theme].background }"
      dense
      :headers="columnDefs"
      :items="rowData"
      class="elevation-0 row-height-50"
      hide-default-footer
      disable-pagination
      :mobile-breakpoint="0"
    >
      <template #[`item.token0_symbol`]="{ item }">
        <div class="text-no-wrap" style="width: 130px">
          <v-avatar size="17">
            <img :src="getTokenImage(item.token0_id)" :alt="`${item.token0_symbol} logo`" @error="setAltImg" />
          </v-avatar>
          <v-avatar size="17">
            <img :src="getTokenImage(item.token1_id)" :alt="`${item.token0_symbol} logo`" @error="setAltImg" />
          </v-avatar>
          <nuxt-link
            class="ml-2 coin-link"
            :class="$vuetify.theme.dark ? 'white--text' : 'black--text'"
            style="text-decoration: none"
            :to="`/token/${item.pool_id}`"
            >{{ item.token0_symbol }}-{{ item.token1_symbol }}
          </nuxt-link>
        </div>
      </template>

      <template #[`item.liquidity`]="{ item }">
        <div class="subtitle-2 font-weight-regular text-no-wrap" style="width: 95px">
          {{ calcReserveEthUsd(item.reserve_eth, item.eth_price_usd) }}
        </div>
      </template>

      <template #[`item.percent_change_liq_24h`]="{ item }">
        <div
          style="width: 30px"
          class="subtitle-2 font-weight-regular text-left text-no-wrap"
          :class="Math.sign(item.percent_change_liq_24h) === -1 ? 'red--text accent-4' : 'green--text'"
        >
          {{ Math.sign(item.percent_change_liq_24h) === 1 ? '+' : '' }}{{ item.percent_change_liq_24h }}%
        </div>
      </template>
    </v-data-table>
  </client-only>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { TerminalGrid } from '~/models/terminal'
import { Helper } from '~/models/helper'

@Component({
  name: 'BaseGrid',
  computed: {
    ...mapState({
      theme: (state: any) => state.ui.theme,
    }),
  },
})
export default class BaseGrid extends Vue {
  @Prop({ default: () => [] }) readonly rowData!: Array<Record<string, any>>
  @Prop({ default: () => [] }) readonly columnDefs!: Array<Record<string, any>>

  getTokenImage(tokenId: string): string {
    return TerminalGrid.getTokenImage(tokenId)
  }

  calcReserveEthUsd(reserveEth: number, ethPriceUsd: number): string {
    return TerminalGrid.calcReserveEthUsd(reserveEth, ethPriceUsd)
  }

  setAltImg(event: any) {
    return Helper.setAltImg(event)
  }
}
</script>

<style lang="scss">
.v-data-table.row-height-50 td {
  height: 20px !important;
}
</style>
