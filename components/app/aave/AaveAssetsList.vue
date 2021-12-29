<template>
  <v-row no-gutters justify="center">
    <v-col cols="12" class="pa-2">
      <v-row v-if="aaveAssets">
        <v-overlay absolute :value="aaveAssets.loading" :opacity="1" :color="$vuetify.theme.themes[theme].overlay">
          <img :src="'/img/logo/logo.svg'" height="100" width="100" alt="logo" />
          <v-progress-linear color="primary" indeterminate rounded height="6"></v-progress-linear>
        </v-overlay>

        <v-col cols="12" class="pa-1">
          <v-card elevation="0">
            <v-data-table
              id="aave-assets"
              :headers="aaveAssets.cols"
              :items="$route.params.id == 1 ? aaveAssets.ethereumAssets : aaveAssets.polygonAssets"
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
                  <div>Borrow APR</div>
                </div>
              </template>

              <template #[`item.underlying.contract_symbol`]="{ item }">
                <v-row no-gutters class="text-no-wrap text-left py-3 overflow-hidden" style="min-width: 240px">
                  <v-col cols="2" style="display: flex; justify-content: center; align-items: center">
                    <v-avatar size="36">
                      <img
                        :alt="`${item.underlying.contract_symbol} logo`"
                        :src="item.underlying.logo_url"
                        @error="aaveAssets.setAltImg"
                      />
                    </v-avatar>
                  </v-col>
                  <v-col cols="9" class="pl-3">
                    <div class="subtitle-2">
                      {{ item.underlying.contract_name }}
                      <span class="subtitle-2 font-weight-regular"> {{ item.underlying.contract_symbol }}</span>
                    </div>

                    <div class="subtitle-2 font-weight-regular text-no-wrap">
                      {{ item.underlying.quote_rate.toFixed(4) }}
                      <span class="caption">USD</span>
                    </div>
                  </v-col>
                </v-row>
              </template>

              <template #[`item.underlying.available_balance`]="{ item }">
                <div style="min-width: 70px">
                  <div class="subtitle-2">
                    {{ item.underlying.available_balance.toFixed(2) }}
                  </div>
                  <div class="text-no-wrap">
                    {{ (item.underlying.quote_rate * item.underlying.available_balance).toFixed(2) }}
                    <span class="caption">USD</span>
                  </div>
                </div>
              </template>

              <template #[`item.atoken.logo_url`]="{ item }">
                <div class="text-no-wrap">
                  <v-avatar size="32">
                    <img
                      :alt="`${item.atoken.contract_symbol} logo`"
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
                <div class="text-no-wrap">
                  <div v-if="item.supply_position.supplied" class="py-3">
                    <div class="subtitle-2 font-weight-regular text-capitalize text-no-wrap">
                      {{ item.supply_position.balance_quote.toFixed(2) }}
                      <small>USD</small>
                    </div>
                    <div class="caption text-no-wrap">
                      {{ item.supply_position.supplied }}
                    </div>
                    <div class="text-capitalize text-no-wrap">
                      <v-chip
                        small
                        label
                        color="grey darken-2"
                        outlined
                        class="mt-2 caption font-weight-medium rounded-0"
                      >
                        <span
                          :style="{
                            width: '70px',
                            color: $vuetify.theme.themes[theme].baseText,
                          }"
                        >
                          {{ (item.supply_position.apy * 100).toFixed(2) }}% APY
                        </span>
                      </v-chip>
                    </div>
                  </div>

                  <v-chip
                    v-else
                    small
                    label
                    outlined
                    color="grey darken-2"
                    class="mt-2 caption font-weight-medium rounded-0"
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
                <v-chip small label outlined color="grey darken-2" class="mt-2 caption font-weight-medium rounded-0">
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
                <div class="text-no-wrap">
                  <div v-if="item.borrow_position.apr" class="py-3">
                    <div class="subtitle-2 font-weight-regular text-capitalize text-no-wrap">
                      {{ item.borrow_position.balance_quote.toFixed(2) }}
                      <small>USD</small>
                    </div>
                    <div class="caption text-capitalize text-no-wrap">
                      {{ item.borrow_position.borrowed }}
                    </div>
                    <div class="text-capitalize text-no-wrap">
                      <v-chip
                        small
                        label
                        outlined
                        color="grey darken-2"
                        class="mt-2 caption font-weight-medium rounded-0"
                      >
                        <span
                          :style="{
                            width: '70px',
                            color: $vuetify.theme.themes[theme].baseText,
                          }"
                        >
                          {{ (item.borrow_position.apr * 100).toFixed(2) }}% APR
                        </span>
                      </v-chip>
                    </div>
                  </div>
                  <v-chip
                    v-else
                    small
                    label
                    outlined
                    color="grey darken-2"
                    class="mt-2 caption font-weight-medium rounded-0"
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
                </div>
              </template>

              <template #[`item.actions`]="{ item }">
                <v-row no-gutters class="text-no-wrap" style="min-width: 480px">
                  <v-col cols="3">
                    <v-btn
                      small
                      width="110"
                      class="mt-3 mx-3 rounded-xl"
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
                  </v-col>

                  <v-col cols="3">
                    <v-btn
                      small
                      width="110"
                      class="mt-3 mx-3 rounded-xl"
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
                  </v-col>

                  <v-col cols="3">
                    <v-btn
                      small
                      width="110"
                      class="mt-3 mx-3 rounded-xl"
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
                  </v-col>

                  <v-col cols="3">
                    <v-btn
                      small
                      width="110"
                      outlined
                      class="mt-3 mx-3 rounded-xl"
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
                  </v-col>
                </v-row>
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
    await this.$store.dispatch('rate/getEthUsdRate', { apollo: this.$apollo })

    /** If chain id is Ethereum or Polygon, get Aave market assets within the network **/
    if (this.$route.params.id === '1' || this.$route.params.id === '137') {
      this.aaveAssets = new AaveAssets(this.$store, this.$apollo)

      if (this.$route.params.id === '1') {
        await this.aaveAssets.getEthereumAssets()
      }

      if (this.$route.params.id === '137') {
        await this.aaveAssets.getPolygonAssets()
      }
    } else {
      await this.$router.push('/')
    }
  }
}
</script>
