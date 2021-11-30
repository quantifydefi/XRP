<template>
  <v-row no-gutters justify="center">
    <v-col v-if="transactionsHistory" cols="12">
      <v-card outlined tile>
        <v-card-title class="py-1 px-2 subtitle-1"
          >Most Recent Transactions
        </v-card-title>
        <v-divider></v-divider>
        <client-only>
          <v-data-table
            id="recent-transactions"
            dense
            :headers="transactionsHistory.cols"
            :items="transactionsHistory.data"
            hide-default-footer
            :mobile-breakpoint="0"
            disable-pagination
            :loading="transactionsHistory.loading"
          >
            <template #[`item.block_signed_at`]="{ item }">
              <div class="text-no-wrap">
                {{ new Date(item.block_signed_at).toLocaleString('en-US') }}
              </div>
            </template>

            <template #[`item.tx_hash`]="{ item }">
              <div class="text-no-wrap">
                {{ item.tx_hash.slice(0, 12) }}...{{
                  item.tx_hash.slice(54, item.tx_hash.length)
                }}
              </div>
            </template>

            <template #[`item.successful`]="{ item }">
              <div class="text-no-wrap">
                <v-icon
                  small
                  :color="item.successful ? 'primary' : 'red darken-4'"
                >
                  {{ item.successful ? 'mdi-check' : 'mdi-close' }}
                </v-icon>
              </div>
            </template>

            <template #[`item.from_address`]="{ item }">
              <div class="text-no-wrap">
                {{ item.from_address.slice(0, 10) }}...{{
                  item.from_address.slice(31, item.from_address.length)
                }}
              </div>
            </template>

            <template #[`item.to_address`]="{ item }">
              <div class="text-no-wrap">
                {{ item.to_address.slice(0, 10) }}...{{
                  item.to_address.slice(31, item.to_address.length)
                }}
              </div>
            </template>

            <template #[`item.value`]="{ item }">
              <div class="text-no-wrap">
                {{ (item.value / 10 ** 18).toFixed(6) || '' }} ETH
              </div>
            </template>

            <template #[`item.value_quote`]="{ item }">
              <div class="text-no-wrap">
                ${{ item.value_quote.toFixed(4) || '' }}
              </div>
            </template>

            <template #[`item.gas_quote`]="{ item }">
              <div class="text-no-wrap">
                ${{ item.gas_quote.toFixed(4) || '' }}
              </div>
            </template>
          </v-data-table>
        </client-only>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { TransactionsHistory } from '~/models/transaction'

@Component({
  name: 'Transactions',
  computed: {
    ...mapState({
      theme: (state: any) => state.ui.theme,
      address: (state: any) => state.wallet.address,
    }),
  },
})
export default class Transactions extends Vue {
  address!: any
  transactionsHistory: TransactionsHistory | null = null

  async mounted() {
    const chainId = parseInt(this.$route.params.id)

    this.transactionsHistory = new TransactionsHistory(
      this.$store,
      chainId,
      this.address
    )
    await this.transactionsHistory.getData()
  }
}
</script>

<style lang="scss">
#recent-transactions {
  tr {
    height: 30px;
  }
}
</style>
