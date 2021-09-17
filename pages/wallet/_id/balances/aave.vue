<template>
  <v-row no-gutters justify="center">
    <v-col cols="12">
      <v-row no-gutters>
        <h1 class="text-h4">Aave Balances</h1>
      </v-row>
      <v-row>
        <v-col v-if="aaveBalance" cols="12" class="py-0 align-center">
          <v-card outlined tile>
            <v-data-table
              id="aave-balances"
              :headers="aaveBalance.cols"
              :items="aaveBalance.data"
              :items-per-page="20"
              :hide-default-footer="true"
              mobile-breakpoint="0"
            >
              <template
                #[`item.balance.atoken_contract_ticker_symbol`]="{ item }"
              >
                <div class="text-no-wrap">
                  <v-avatar size="32">
                    <img
                      :alt="`${item.balance.atoken_contract_ticker_symbol} logo`"
                      :src="item.balance.logo_url"
                      @error="aaveBalance.setAltImg"
                    />
                  </v-avatar>
                  <div class="pt-2 caption">
                    {{ item.balance.atoken_contract_ticker_symbol }}
                  </div>
                </div>
              </template>

              <template #[`item.balance.atoken_balance`]="{ item }">
                <span class="text-no-wrap">
                  {{
                    formatBalance(
                      parseInt(item.balance.atoken_balance),
                      item.balance.atoken_contract_decimals,
                      4
                    )
                  }}
                </span>
              </template>

              <template #[`item.balance.borrow_balance`]="{ item }">
                <span class="text-no-wrap">
                  {{
                    formatBalance(
                      parseInt(item.balance.borrow_balance),
                      item.balance.atoken_contract_decimals,
                      4
                    )
                  }}
                </span>
              </template>

              <template #[`item.balance.borrow_rate`]="{ item }">
                <span class="text-no-wrap">
                  {{ (item.balance.borrow_rate * 100).toFixed(6) }}%
                </span>
              </template>

              <template #[`item.supply_position.supplied`]="{ item }">
                <span class="text-no-wrap">
                  <div class="caption">
                    <div>Supplied: {{ item.supply_position.supplied }}</div>
                    <div>
                      Balance:
                      {{
                        formatBalance(
                          parseInt(item.supply_position.balance),
                          item.balance.atoken_contract_decimals,
                          4
                        )
                      }}
                    </div>
                    <div>
                      Balance Quote: {{ item.supply_position.balance_quote }}
                    </div>
                    <div>
                      APY: {{ (item.supply_position.apy * 100).toFixed(2) }}%
                    </div>
                  </div>
                </span>
              </template>
              <template #[`item.borrow_position.supplied`]="{ item }">
                <span class="text-no-wrap">
                  <div class="caption">
                    <div>Supplied: {{ item.borrow_position.borrowed }}</div>
                    <div>
                      Balance:
                      {{
                        formatBalance(
                          parseInt(item.borrow_position.balance),
                          item.balance.atoken_contract_decimals,
                          4
                        )
                      }}
                    </div>
                    <div>
                      Balance Quote: {{ item.borrow_position.balance_quote }}
                    </div>
                    <div>
                      APY: {{ (item.borrow_position.apr * 100).toFixed(2) }}%
                    </div>
                  </div>
                </span>
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

@Component({
  name: 'AaveBalances',
  computed: {
    ...mapState({
      address: (state: any) => state.wallet.address,
    }),
  },
})
export default class AaveBalances extends Vue {
  aaveBalance: AaveBalance | null = null

  async mounted() {
    this.aaveBalance = new AaveBalance(this.$store)
    await this.aaveBalance.getData()
  }

  formatBalance(value: number, decimal: number, precision: number): number {
    return parseFloat((value / 10 ** decimal).toFixed(precision))
  }

  /** If image does not exists or encounters an error, set generic image **/
  setAltImg(event: any) {
    event.target.src = require(`~/assets/images/generic/aave-generic.png`)
  }
}
</script>
