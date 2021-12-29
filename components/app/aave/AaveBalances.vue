<template>
  <v-row no-gutters>
    <v-col class="pa-2" cols="12">
      <v-row v-if="aaveBalance">
        <v-overlay absolute :value="aaveBalance.loading" :opacity="1" :color="$vuetify.theme.themes[theme].overlay">
          <img :src="'/img/logo/logo.svg'" height="100" width="100" alt="logo" />
          <v-progress-linear color="primary" indeterminate rounded height="6"></v-progress-linear>
        </v-overlay>

        <v-col cols="12" class="pa-1 mt-1">
          <v-card elevation="0">
            <v-data-table
              id="aave-balances"
              :headers="aaveBalance.cols"
              :items="aaveBalance.balanceData"
              hide-default-footer
              mobile-breakpoint="0"
              :style="{
                backgroundColor: $vuetify.theme.themes[theme].background,
              }"
            >
              <template #[`item.underlying.contract_symbol`]="{ item }">
                <v-row class="text-no-wrap text-left py-3" style="min-width: 180px">
                  <v-col
                    cols="2"
                    style="display: flex; justify-content: center; align-items: center; padding-left: 30px"
                  >
                    <v-avatar size="36">
                      <img
                        :alt="`${item.underlying.logo_url} logo`"
                        :src="item.underlying.logo_url"
                        @error="aaveBalance.setAltImg"
                      />
                    </v-avatar>
                  </v-col>
                  <v-col cols="9" class="pl-5">
                    <div class="subtitle-2">
                      {{ item.underlying.contract_symbol }}
                    </div>
                    <div class="subtitle-2 font-weight-regular mt-n1">
                      {{ item.underlying.quote_rate }} <small>USD</small>
                    </div>
                  </v-col>
                </v-row>
              </template>

              <template #[`item.underlying.available_balance`]="{ item }">
                <div style="min-width: 100px">
                  <div class="subtitle-2">
                    {{
                      item.underlying.available_balance > 0
                        ? item.underlying.available_balance.toFixed(4)
                        : item.underlying.available_balance
                    }}
                  </div>
                  <div>
                    {{ (item.underlying.available_balance * item.underlying.quote_rate).toFixed(2) }}
                    <span class="caption">USD</span>
                  </div>
                </div>
              </template>

              <template #[`item.supply_position.supplied`]="{ item }">
                <div class="py-3">
                  <div class="subtitle-2 font-weight-regular text-capitalize text-no-wrap">
                    {{ item.supply_position.balance_quote.toFixed(2) }}
                    <small>USD</small>
                  </div>
                  <div class="caption text-capitalize text-no-wrap">
                    {{ item.supply_position.supplied }}
                  </div>
                  <div class="text-capitalize text-no-wrap">
                    <v-chip
                      small
                      label
                      color="grey darken-2"
                      outlined
                      class="mt-1 caption font-weight-medium rounded-0"
                    >
                      <span
                        :style="{
                          color: $vuetify.theme.themes[theme].baseText,
                        }"
                      >
                        {{ (item.supply_position.apy * 100).toFixed(2) }}% APY
                      </span></v-chip
                    >
                  </div>
                </div>
              </template>

              <template #[`item.borrow_position.borrowed`]="{ item }">
                <div class="py-3">
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
                      color="grey darken-2"
                      outlined
                      class="mt-1 caption font-weight-medium rounded-0"
                    >
                      <span
                        :style="{
                          color: $vuetify.theme.themes[theme].baseText,
                        }"
                      >
                        {{ (item.borrow_position.apr * 100).toFixed(2) }}% APR
                      </span></v-chip
                    >
                  </div>
                </div>
              </template>

              <template #[`item.actions`]="{ item }">
                <v-row no-gutters class="text-no-wrap" style="min-width: 480px">
                  <v-col cols="3">
                    <v-btn
                      small
                      width="110"
                      class="mt-2 mx-3 rounded-xl"
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
                      class="mt-2 mx-3 rounded-xl"
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
                      class="mt-2 mx-3 rounded-xl"
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
                      class="mt-2 mx-3 rounded-xl"
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
import { AaveBalance } from '~/models/aave'
import { DefiEvents } from '~/types/events'

@Component({
  name: 'AaveBalances',
  computed: {
    ...mapState({
      theme: (state: any) => state.ui.theme,
      address: (state: any) => state.wallet.address,
    }),
  },
})
export default class AaveBalances extends Vue {
  address!: any
  aaveBalance: AaveBalance | null = null

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
    /** If chain id is Ethereum or Polygon, get Aave balances within the network **/
    if (this.$route.params.id === '1' || this.$route.params.id === '137') {
      this.aaveBalance = new AaveBalance(
        this.$store,
        parseInt(this.$route.params.id),
        // '0xF705b9ba1908cA505537F309B08E6949C1b8f31F'
        this.address
      )
      await this.aaveBalance.getData()
    } else {
      await this.$router.push('/')
    }
  }
}
</script>
