<template>
  <v-card tile outlined>
    <v-data-table
      :items-per-page="itemsPerPage"
      :headers="headers"
      :items="transactions"
      item-key="txHash"
      class="elevation-0"
      show-expand
      single-expand
      hide-default-footer
    >
      <!--  expanded buttons   -->
      <template #item.data-table-expand="{ item, isExpanded, expand }">
        <div style="width: 16px">
          <v-btn v-if="item.logEvents.length > 0" small icon @click="expand(!isExpanded)">
            <v-icon>mdi-chevron-{{ isExpanded ? 'up' : 'down' }}</v-icon>
          </v-btn>
        </div>
      </template>

      <!-- expanded column items -->
      <template #expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <log-events :key="item.txHash" :wallet-address="account" :log-events="item.logEvents"></log-events>
        </td>
      </template>

      <!--   Txn Date   -->
      <template #[`item.blockSignedAt`]="{ item }">
        <span class="text-no-wrap grey--text" v-text="new Date(item.blockSignedAt).toLocaleString()"></span>
      </template>

      <!--   Method   -->
      <template #[`item.method`]="{ item }">
        <div class="text-truncate">
          <v-tooltip right color="black">
            <template #activator="{ on, attrs }">
              <v-btn
                style="max-width: 120px"
                outlined
                small
                depressed
                rounded
                class="cursor-text"
                color="primary"
                v-bind="attrs"
                v-on="on"
              >
                <div
                  :class="[ui[ui.theme].headerTextClass, 'text-truncate text-capitalize px-2 font-weight-regular']"
                  style="max-width: 120px"
                >
                  {{ methodTextRenderer(item.logEvents) }}
                </div>
              </v-btn>
            </template>
            <span :class="[ui[ui.theme].headerTextClass, 'text-capitalize caption']">
              {{ methodTextRenderer(item.logEvents) }}
            </span>
          </v-tooltip>
        </div>
      </template>

      <!--   Txn Hash   -->
      <template #[`item.txHash`]="{ item }">
        <v-tooltip top color="black">
          <template #activator="{ on, attrs }">
            <div
              :class="[ui[theme].innerCardLighten, 'cursor-copy']"
              v-bind="attrs"
              v-on="on"
              @click="$copyAddressToClipboard(item.txHash)"
            >
              {{ $truncateAddress(item.txHash, 10, 4) }}
            </div>
          </template>
          <span class="caption">{{ item.txHash }}</span>
        </v-tooltip>
      </template>

      <!--   isInbound   -->
      <template #[`item.isInbound`]="{ item }">
        <div class="text-no-wrap" :class="[ui[theme].innerCardLighten]">
          <v-btn
            style="pointer-events: none"
            width="50"
            :color="isInboundRenderer(item).color"
            small
            class="rounded-sm"
            text
          >
            {{ isInboundRenderer(item).text }}
          </v-btn>
        </div>
      </template>

      <!--   from and to   -->
      <template #[`item.fromTo`]="{ item }">
        <div class="text-no-wrap">
          <tx-address-label
            label="From:"
            :wallet-address="account"
            :is-contract="item.fromAddressIsContract"
            :address="item.fromAddress.toString()"
            :name="item.fromAddressName"
            :symbol="item.fromAddressSymbol"
          ></tx-address-label>

          <tx-address-label
            label="To:"
            :wallet-address="account"
            :is-contract="item.toAddressIsContract"
            :address="item.toAddress.toString()"
            :name="item.toAddressName"
            :symbol="item.toAddressSymbol"
          ></tx-address-label>
        </div>
      </template>

      <!--   value   -->
      <template #[`item.value`]="{ item }">
        <div class="py-2">
          <div :class="[ui[theme].innerCardLighten]" class="text-no-wrap">
            {{ $nf(item.txnValue) }} {{ chainSymbol }}
          </div>
          <span>$ {{ $nf(item.valueQuote, 2, 2) }}</span>
        </div>
      </template>

      <!--   txn fee   -->
      <template #[`item.txnFee`]="{ item }">
        <div class="py-2">
          <div class="text-no-wrap" :class="[ui[theme].innerCardLighten]">
            {{ $nf(item.txnFee) }}
            {{ chainSymbol }}
          </div>
          <span>$ {{ $nf(item.gasQuote, 2, 2) }}</span>
        </div>
      </template>

      <!--   status   -->
      <template #[`item.isSuccess`]="{ item }">
        <v-btn
          width="90"
          outlined
          small
          depressed
          rounded
          class="text-capitalize cursor-text caption"
          :color="item.isSuccess.color"
        >
          <span class="white--text" v-text="item.isSuccess.text" />
        </v-btn>
      </template>

      <template #[`item.action`]="{ item }">
        <v-tooltip top color="black">
          <template #activator="{ on, attrs }">
            <div v-bind="attrs" style="cursor: pointer; width: 25px" v-on="on">
              <v-btn
                small
                icon
                color="primary"
                class="caption text-capitalize"
                @click="navigateToExplorer(item.txHash)"
              >
                <v-icon small class="ml-1">mdi-open-in-new</v-icon>
              </v-btn>
            </div>
          </template>
          <span class="caption">View on Block Explorer</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, useStore } from '@nuxtjs/composition-api'
import { LogEvent, TransactionItem } from '~/types/apollo/main/types'
import { State } from '~/types/state'
import LogEvents from '~/components/transactions/LogEvents.vue'
import TxAddressLabel from '~/components/transactions/TxAddressLabel.vue'
import { EmitEvents } from '~/types/events'
import { Transactions } from '~/composables/useTransactions'

export default defineComponent({
  name: 'TransactionsGrid',
  components: { TxAddressLabel, LogEvents },
  props: {
    account: { type: String, default: '', required: true },
    chainSymbol: { type: String, default: '', required: true },
    transactions: {
      type: Array as PropType<Transactions[]>,
      default: () => [] as Transactions[],
    },
    itemsPerPage: {
      type: Number,
      default: 15,
    },
  },
  setup(props, { emit }) {
    /** COMPOSABLES **/
    const store = useStore<State>()

    /** COMPUTED **/
    const ui = computed(() => store.state.ui)
    const theme = computed(() => store.state.ui.theme)

    /** COMPUTED **/
    const headers = ref([
      {
        text: '',
        value: 'data-table-expand',
      },
      {
        text: 'Txn Date',
        align: 'start',
        value: 'blockSignedAt',
        class: 'py-2',
      },
      {
        text: 'Method',
        align: 'start',
        value: 'method',
        class: 'py-2',
      },
      {
        text: 'Txn Hash',
        align: 'start',
        value: 'txHash',
        class: 'py-2',
      },
      {
        text: '',
        align: 'start',
        value: 'isInbound',
        class: 'py-2',
      },
      {
        text: '',
        align: 'start',
        value: 'fromTo',
        class: 'py-2',
      },
      {
        text: 'Value',
        align: 'start',
        value: 'value',
        class: 'py-2',
      },
      {
        text: 'Txn Fee',
        align: 'start',
        value: 'txnFee',
        class: 'py-2',
      },
      {
        text: 'Status',
        align: 'start',
        value: 'isSuccess',
        class: 'py-2',
      },

      {
        text: '',
        align: 'start',
        value: 'action',
        class: 'py-2',
      },
    ])

    function navigateToExplorer(txHash: string) {
      emit(EmitEvents.navigateToExplorer, txHash)
    }

    /** Styling and Text Renderer Methods **/

    function methodTextRenderer(events: LogEvent[]): string {
      if (events.length === 0) {
        return 'Transfer'
      }

      if (events.length > 2) {
        return 'Multicall'
      }

      // returns array of log events function names
      // i.e. ['Transfer', 'Approval']
      let logs = events.map((event: any) => {
        return event.decoded?.name.replace(/([A-Z])/g, ' $1').trim()
      })

      // Filter out empty strings
      logs = logs.filter(Boolean)

      return logs.length === 0 ? 'Transfer' : logs.join(', ')
    }

    function isInboundRenderer(item: TransactionItem): { color: string; text: string } {
      // if transaction is solely a Transfer, and logEvent toAddress === wallet address; return as IN
      if (item.logEvents && item.logEvents.length > 0) {
        if (methodTextRenderer(item.logEvents) === 'Transfer') {
          const param = Object.values(item.logEvents[0].decoded.params).filter((el: any) => el.name === 'to')[0]
          if (param && param.value === props.account.toLowerCase()) {
            return { color: 'green', text: 'IN' }
          }
        }
      }

      if (item.toAddress.toLowerCase() === props.account.toLowerCase()) {
        return { color: 'green', text: 'IN' }
      }

      if (item.toAddress.toLowerCase() === item.fromAddress.toLowerCase()) {
        return { color: 'grey', text: 'SELF' }
      }

      return { color: 'pink', text: 'OUT' }
    }

    return {
      ui,
      theme,
      headers,
      /** Methods **/
      navigateToExplorer,
      isInboundRenderer,
      methodTextRenderer,
    }
  },
})
</script>
