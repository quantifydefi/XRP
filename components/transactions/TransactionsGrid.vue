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
      <template #item.data-table-expand="{ item, isExpanded, expand }">
        <div style="width: 16px; cursor: pointer">
          <v-btn v-if="item.logEvents.length > 0 && !isExpanded" small icon @click="expandRow(expand, true)">
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
          <v-btn v-if="item.logEvents.length > 0 && isExpanded" small icon @click="expandRow(expand, false)">
            <v-icon>mdi-chevron-up</v-icon>
          </v-btn>
        </div>
      </template>

      <!-- expanded column items -->
      <template #expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <log-events :log-events="item.logEvents"></log-events>
        </td>
      </template>

      <template #[`item.blockSignedAt`]="{ item }">
        <div class="text-no-wrap" :class="[ui[theme].innerCardLighten]">
          {{ new Date(item.blockSignedAt).toLocaleString() }}
        </div>
      </template>

      <template #[`item.method`]="{ item }">
        <div class="text-truncate" style="width: 120px">
          <v-tooltip top :color="ui[theme].overlayColor">
            <template #activator="{ on, attrs }">
              <v-btn
                primary
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
                  :class="[
                    ui[ui.theme].headerTextClass,
                    'text-truncate text-capitalize',
                    'px-2',
                    'font-weight-regular',
                  ]"
                  style="max-width: 120px"
                >
                  {{ methodRenderer(item.logEvents) }}
                </div>
              </v-btn>
            </template>
            <span :class="[ui[ui.theme].headerTextClass, 'text-capitalize']">
              {{ methodRenderer(item.logEvents) }}
            </span>
          </v-tooltip>
        </div>
      </template>

      <template #[`item.isOut`]="{ item }">
        <div class="text-no-wrap" :class="[ui[theme].innerCardLighten]">
          <v-btn
            style="pointer-events: none"
            width="50"
            :color="isOutStyleRenderer(item).color"
            small
            class="rounded-sm"
            text
          >
            {{ isOutStyleRenderer(item).text }}
          </v-btn>
        </div>
      </template>

      <template #[`item.fromTo`]="{ item }">
        <div class="text-no-wrap">
          <div :class="[ui[theme].innerCardLighten]" class="text-no-wrap d-flex">
            From:
            <div
              v-if="item.fromAddressIsContract"
              style="cursor: pointer"
              :class="[ui[theme].headerTextClass, 'ml-1']"
              @click="$copyAddressToClipboard(item.fromAddress)"
            >
              <v-avatar v-if="item.fromAddressSymbol" size="16" style="margin-top: -2px">
                <img
                  :src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${item.fromAddressSymbol.toLowerCase()}.png`"
                  :alt="`${item.fromAddressSymbol} logo`"
                  @error="$setAltImageUrl"
                />
              </v-avatar>
              <v-icon v-else class="ml-1 mt-n1" small>mdi-file-sign</v-icon>
              {{ !item.fromAddressName ? $truncateAddress(item.fromAddress, 4, 10) : item.fromAddressName }}
            </div>

            <div
              v-else
              style="cursor: pointer"
              :class="[
                'ml-1',
                item.fromAddress.toLowerCase() === walletAddress.toLowerCase()
                  ? 'pink--text'
                  : ui[theme].headerTextClass,
              ]"
              @click="$copyAddressToClipboard(item.fromAddress)"
            >
              {{ $truncateAddress(item.fromAddress, 4, 10) }}
            </div>
          </div>

          <div :class="[ui[theme].innerCardLighten]" class="text-no-wrap d-flex">
            To:
            <div
              v-if="item.toAddressIsContract"
              style="cursor: pointer"
              :class="[ui[theme].headerTextClass, 'ml-1']"
              @click="$copyAddressToClipboard(item.toAddress)"
            >
              <v-avatar v-if="item.toAddressSymbol" size="16" style="margin-top: -2px">
                <img
                  :src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${item.toAddressSymbol.toLowerCase()}.png`"
                  :alt="`${item.toAddressSymbol} logo`"
                  @error="$setAltImageUrl"
                />
              </v-avatar>
              <v-icon v-else class="ml-1 mt-n1" small>mdi-file-sign</v-icon>
              {{ !item.toAddressName ? $truncateAddress(item.toAddress, 4, 10) : item.toAddressName }}
            </div>

            <div v-else-if="!item.toAddress" :class="[ui[theme].headerTextClass]">
              <v-icon class="mx-1 mt-n1" small>mdi-file-sign</v-icon>Contract Creation
            </div>

            <div
              v-else
              style="cursor: pointer"
              :class="[
                item.toAddress.toLowerCase() === walletAddress.toLowerCase() ? 'pink--text' : ui[theme].headerTextClass,
              ]"
              @click="$copyAddressToClipboard(item.toAddress)"
            >
              {{ $truncateAddress(item.toAddress, 4, 10) }}
            </div>
          </div>
        </div>
      </template>

      <template #[`item.txHash`]="{ item }">
        <v-tooltip top color="grey darken-4">
          <template #activator="{ on, attrs }">
            <div
              style="cursor: pointer"
              :class="[ui[theme].innerCardLighten]"
              v-bind="attrs"
              v-on="on"
              @click="$copyAddressToClipboard(item.txHash)"
            >
              {{ $truncateAddress(item.txHash, 10, 4) }}
            </div>
          </template>
          <span>{{ item.txHash }}</span>
        </v-tooltip>
      </template>

      <template #[`item.value`]="{ item }">
        <div class="py-2">
          <div :class="[ui[theme].innerCardLighten]" class="text-no-wrap">
            {{ $nf(item.value / 10 ** 18, 0, 6) }} ETH
          </div>
          <span>$ {{ $nf(item.valueQuote, 2, 2) }}</span>
        </div>
      </template>

      <template #[`item.txnFee`]="{ item }">
        <div class="py-2">
          <div class="text-no-wrap" :class="[ui[theme].innerCardLighten]">{{ $nf(item.txnFee, 0, 6) }} ETH</div>
          <span>$ {{ $nf(item.gasQuote, 2, 2) }}</span>
        </div>
      </template>

      <template #[`item.successful`]="{ item }">
        <v-btn
          width="90"
          outlined
          small
          depressed
          rounded
          class="text-capitalize cursor-text"
          :color="item.successful ? 'green' : 'pink'"
        >
          <span class="caption" :class="[ui[theme].headerTextClass]">
            {{ item.successful ? 'Success' : 'Failed' }}
          </span>
        </v-btn>
      </template>

      <template #[`item.action`]="{ item }">
        <v-tooltip top :color="ui[theme].overlayColor">
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
          <span :class="[ui[theme].headerTextClass]">View on Block Explorer</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, useStore } from '@nuxtjs/composition-api'
import { LogEvent, TransactionItem } from '~/types/apollo/main/types'
import { State } from '~/types/state'
import useTransactions from '~/composables/useTransactions'
import LogEvents from '~/components/transactions/LogEvents.vue'

type Props = {
  transactions: TransactionItem[]
}

export default defineComponent<Props>({
  name: 'TransactionsGrid',
  components: { LogEvents },
  props: {
    transactions: {
      type: Array as PropType<TransactionItem[]>,
      default: () => [],
    },
    itemsPerPage: {
      type: Number,
      default: 15,
    },
  },
  setup() {
    /** COMPOSABLES **/
    const store = useStore<State>()

    const {
      account,
      currentChain,
      transactionsData,

      onNetworkSelectChange,
      navigateToExplorer,
    } = useTransactions()

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
        value: 'isOut',
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
        value: 'successful',
        class: 'py-2',
      },

      {
        text: '',
        align: 'start',
        value: 'action',
        class: 'py-2',
      },
    ])

    /** Styling Methods **/
    function isOutStyleRenderer(item: TransactionItem): { color: string; text: string } {
      if (item.toAddress.toLowerCase() === item.fromAddress.toLowerCase()) {
        return { color: 'grey', text: 'SELF' }
      }

      if (item.toAddress.toLowerCase() === account.value.toLowerCase()) {
        return { color: 'green', text: 'IN' }
      }

      return { color: 'pink', text: 'OUT' }
    }

    // list method names separated by comma
    function methodRenderer(events: LogEvent[]): string {
      let logs = events.map((event: any) => {
        return event.decoded?.name.replace(/([A-Z])/g, ' $1').trim()
      })

      logs = logs.filter(Boolean)

      if (logs.length === 0) {
        return 'Transfer'
      }

      if (logs.length > 2) {
        return 'Multicall'
      }

      return logs.join(', ')
    }

    // On expandRow, reset loadedEventsLength to default = 5
    function expandRow(expand: any, isExpand: boolean): void {
      expand(isExpand)
    }

    return {
      ui: computed(() => store.state.ui),
      theme: computed(() => store.state.ui.theme),
      walletAddress: computed(() => account.value ?? ''),
      headers,
      currentChain,
      transactionsData,
      /** Methods **/
      onNetworkSelectChange,
      navigateToExplorer,
      expandRow,
      isOutStyleRenderer,
      methodRenderer,
    }
  },
})
</script>
