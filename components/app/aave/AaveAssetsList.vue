<template>
  <v-row no-gutters justify="center">
    <v-col cols="12" class="pa-2">
      <v-row v-if="aaveAssets">
        <v-col cols="12" class="pa-1">
          <v-card elevation="0">
            <v-data-table
              id="aave-assets"
              :headers="aaveAssets.cols"
              :items="
                $route.params.id == 1
                  ? aaveAssets.ethereumAssets
                  : aaveAssets.polygonAssets
              "
              mobile-breakpoint="0"
              :style="{
                backgroundColor: $vuetify.theme.themes[theme].background,
              }"
              disable-pagination
              hide-default-footer
            >
              <template #[`header.variable_borrow_apr`]>
                <div>
                  <small class="grey--text">Variable</small>
                  <div>Borrow APY</div>
                </div>
              </template>

              <template #[`header.stable_borrow_apr`]>
                <div>
                  <small class="grey--text">Stable</small>
                  <div>Borrow APY</div>
                </div>
              </template>

              <template #[`item.underlying.contract_ticker_symbol`]="{ item }">
                <v-row class="text-no-wrap text-left py-3 overflow-hidden">
                  <v-col
                    cols="2"
                    style="
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      padding-left: 30px;
                    "
                  >
                    <v-avatar size="36">
                      <img
                        :alt="`${item.underlying.contract_ticker_symbol} logo`"
                        :src="item.underlying.logo_url"
                        @error="aaveAssets.setAltImg"
                      />
                    </v-avatar>
                  </v-col>
                  <v-col cols="9" class="pl-5">
                    <div class="subtitle-2">
                      {{ item.underlying.contract_name }}
                    </div>
                    <div class="subtitle-2 font-weight-regular mt-n1">
                      {{ item.underlying.contract_ticker_symbol }}
                    </div>
                  </v-col>
                </v-row>
              </template>

              <template #[`item.underlying.quote_rate`]="{ item }">
                <div class="subtitle-2 text-no-wrap">
                  {{ item.underlying.quote_rate.toFixed(2) }} <small>USD</small>
                </div>
              </template>

              <template #[`item.atoken.logo_url`]="{ item }">
                <div class="text-no-wrap">
                  <v-avatar size="32">
                    <img
                      :alt="`${item.atoken.contract_ticker_symbol} logo`"
                      :src="item.atoken.logo_url"
                      @error="aaveAssets.setAltImg"
                    />
                  </v-avatar>
                  <div class="pt-2 caption">
                    {{ item.atoken.contract_ticker_symbol }}
                  </div>
                </div>
              </template>

              <template #[`item.supply_apy`]="{ item }">
                <div class="text-capitalize text-no-wrap">
                  <v-chip
                    small
                    label
                    tile
                    color="grey darken-2"
                    outlined
                    class="mt-1 caption font-weight-medium"
                  >
                    <span
                      :style="{
                        width: '70px',
                        color: $vuetify.theme.themes[theme].baseText,
                      }"
                    >
                      {{ (item.supply_apy * 100).toFixed(2) }}% APY
                    </span>
                  </v-chip>
                </div>
              </template>

              <template #[`item.variable_borrow_apr`]="{ item }">
                <v-chip
                  small
                  label
                  outlined
                  tile
                  color="grey darken-2"
                  class="mt-1 caption font-weight-medium"
                >
                  <span
                    :style="{
                      width: '70px',
                      color: $vuetify.theme.themes[theme].baseText,
                    }"
                  >
                    {{ (item.variable_borrow_apr * 100).toFixed(2) }}% APY
                  </span>
                </v-chip>
              </template>

              <template #[`item.stable_borrow_apr`]="{ item }">
                <v-chip
                  small
                  label
                  outlined
                  tile
                  color="grey darken-2"
                  class="mt-1 caption font-weight-medium"
                >
                  <span
                    :style="{
                      width: '70px',
                      color: $vuetify.theme.themes[theme].baseText,
                    }"
                  >
                    {{ (item.stable_borrow_apr * 100).toFixed(2) }}% APR
                  </span>
                </v-chip>
              </template>

              <template #[`item.actions`]="{ item }">
                <div class="text-no-wrap">
                  <v-btn
                    tile
                    small
                    width="120"
                    class="my-1 mx-3 rounded-xl"
                    outlined
                    color="grey darken-2"
                    @click="deposit(item)"
                  >
                    <span
                      :style="{
                        color: $vuetify.theme.themes[theme].baseText,
                      }"
                    >
                      Deposit
                    </span>
                  </v-btn>
                  <v-btn
                    tile
                    small
                    width="120"
                    class="my-1 mx-3 rounded-xl"
                    outlined
                    color="grey darken-2"
                    @click="borrow(item)"
                  >
                    <span
                      :style="{
                        color: $vuetify.theme.themes[theme].baseText,
                      }"
                    >
                      Borrow
                    </span>
                  </v-btn>
                  <v-btn
                    tile
                    small
                    width="120"
                    class="my-1 mx-3 rounded-xl"
                    outlined
                    color="grey darken-2"
                    @click="lend(item)"
                  >
                    <span
                      :style="{
                        color: $vuetify.theme.themes[theme].baseText,
                      }"
                    >
                      Lend
                    </span>
                  </v-btn>
                  <v-btn
                    tile
                    small
                    width="120"
                    outlined
                    class="my-1 mx-3 rounded-xl"
                    color="grey darken-2"
                    @click="withdraw(item)"
                  >
                    <span
                      :style="{
                        color: $vuetify.theme.themes[theme].baseText,
                      }"
                    >
                      Withdraw
                    </span>
                  </v-btn>
                </div>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { AaveAssets } from '~/models/aave'
import { DefiEvents } from '~/types/events'

@Component({
  name: 'AaveAssetsList',
  computed: {
    ...mapState({
      theme: (state: any) => state.ui.theme,
    }),
  },
})
export default class Aave extends Vue {
  aaveAssets: AaveAssets | null = null

  deposit(item: any) {
    console.log('deposit button triggered', item)
    this.$root.$emit(DefiEvents.toggleDepositModal, item)
  }

  borrow(item: any) {
    console.log('borrow button triggered', item)
    this.$root.$emit(DefiEvents.toggleBorrowModal, item)
  }

  lend(item: any) {
    console.log('lend button triggered', item)
    this.$root.$emit(DefiEvents.toggleLendModal, item)
  }

  withdraw(item: any) {
    console.log('withdraw button triggered', item)
    this.$root.$emit(DefiEvents.toggleWithdrawModal, item)
  }

  async mounted() {
    /** If chain id is Ethereum or Polygon, get Aave market assets within the network **/
    if (this.$route.params.id === '1' || this.$route.params.id === '137') {
      this.aaveAssets = new AaveAssets(this.$store)

      await this.aaveAssets.getData()
    } else {
      await this.$router.push('/')
    }
  }
}
</script>
