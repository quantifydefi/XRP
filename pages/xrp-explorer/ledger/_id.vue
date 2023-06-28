<template>
  <div>
    <v-row justify="center">
      <v-col lg="9" md="12">
        <v-row no-gutters>
          <v-col><h1 class="text-h4">Ledger Summary</h1></v-col>
        </v-row>
        <client-only>
          <v-row v-if="ledger" justify="center" class="my-1">
            <v-col lg="8">
              <v-card tile outlined height="100%">
                <v-simple-table class="">
                  <template #default>
                    <tbody>
                      <tr>
                        <td><span class="text-h6">Ledger Index</span></td>
                        <td class="grey--text">
                          <v-btn icon small class="mb-1" @click="navigateToLedger(ledger.blockNumber - 1)">
                            <v-icon size="16">mdi-arrow-left</v-icon>
                          </v-btn>
                          <span class="text-h6 px-2 green--text">{{ ledger.blockNumber }}</span>
                          <v-btn icon small class="mb-1" @click="navigateToLedger(ledger.blockNumber + 1)">
                            <v-icon size="16">mdi-arrow-right</v-icon>
                          </v-btn>
                        </td>
                      </tr>

                      <tr>
                        <td>Ledger hash:</td>
                        <td class="grey--text">{{ ledger.XRPLedger.ledgerHash }}</td>
                      </tr>

                      <tr>
                        <td>Parent hash:</td>
                        <td class="grey--text">{{ ledger.XRPLedger.ledger.parentHash }}</td>
                      </tr>
                      <tr>
                        <td>Txs hash:</td>
                        <td class="grey--text">{{ ledger.XRPLedger.ledger.transactionHash }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card>
            </v-col>

            <v-col lg="4">
              <v-card tile outlined height="100%">
                <v-simple-table class="">
                  <template #default>
                    <tbody>
                      <tr>
                        <td><span class="text-h6">Properties</span></td>
                        <td></td>
                      </tr>

                      <tr>
                        <td>Closed on:</td>
                        <td class="grey--text">{{ ledger.XRPLedger.ledger.closeTimeHuman }}</td>
                      </tr>

                      <tr>
                        <td>Total coins:</td>
                        <td class="grey--text">
                          {{ $f(parseFloat(ledger.XRPLedger.ledger.totalCoins) / 100, { maxDigits: 0 }) }} XRP
                        </td>
                      </tr>
                      <tr>
                        <td>Σ Fee::</td>
                        <td class="grey--text">-</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card tile outlined>
                <v-card-title> <span class="text-h6">Transaction</span></v-card-title>
                <v-divider />
                <v-data-table
                  v-if="ledger"
                  hide-default-footer
                  :headers="cols"
                  :items-per-page="200"
                  :items="ledger.XRPTransactions.items"
                  class="elevation-0 row-height-50"
                  mobile-breakpoint="0"
                >
                  <template #item.hash="{ item }">
                    <span>{{ item.hash }}</span>
                  </template>
                </v-data-table>
              </v-card>
            </v-col>
          </v-row>
        </client-only>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  // useRoute,
  useRouter,
} from '@nuxtjs/composition-api'
// import { useQuery } from '@vue/apollo-composable/dist'
// import { BlockGQL } from '~/apollo/main/token.query.graphql'
import { Block } from '~/types/apollo/main/types'
export default defineComponent({
  components: {},
  setup() {
    // const route = useRoute()
    const router = useRouter()
    // const ledgerIndex = computed(() => route.value.params?.id ?? 0)
    // const { result } = useQuery(BlockGQL, () => ({ network: 'ripple', blockNumber: ledgerIndex.value }), {
    //   fetchPolicy: 'no-cache',
    // })
    // const ledger = computed<Block | null>(() => result.value?.block ?? null)
    const ledger = computed<Block | null>(() => null)
    const navigateToLedger = (ledger: number) => router.push(`/xrp-explorer/ledger/${ledger}`)
    const cols = computed(() => {
      return [
        {
          text: 'Hash',
          align: 'left',
          value: 'hash',
          width: '100',
          class: ['px-4', 'text-truncate'],
          cellClass: ['px-4', 'text-truncate', 'grey--text'],
          sortable: false,
        },

        {
          text: 'From',
          align: 'left',
          value: 'account',
          width: '100',
          sortable: false,
          class: ['px-2', 'text-truncate', 'grey--text'],
          cellClass: ['px-2', 'text-truncate', 'grey--text'],
        },

        {
          text: 'To',
          align: 'left',
          value: 'destination',
          class: ['px-2', 'text-truncate'],
          cellClass: ['px-2', 'text-truncate', 'grey--text'],
          width: '200',
          sortable: false,
        },

        {
          text: '',
          align: 'left',
          value: 'transactionType',
          class: ['px-2', 'text-truncate'],
          cellClass: ['px-2', 'text-truncate'],
          sortable: false,
        },
      ]
    })
    return { ledger, navigateToLedger, cols }
  },
  head: {},
})
</script>

<style scoped></style>
