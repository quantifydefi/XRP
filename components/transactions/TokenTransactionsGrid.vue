<template>
  <v-card tile outlined>
    <h2 class="subtitle-1 font-weight-bold px-3 py-2">{{ contractName }} Transaction History</h2>
    <v-divider />
    <v-data-table mobile-breakpoint="0" hide-default-footer :headers="cols" :items="transactionsData">
      <template #[`item.blockSignedAt`]="{ item }">
        <span class="text-no-wrap grey--text" v-text="item.txDate"></span>
      </template>

      <template #[`item.method`]>
        <div class="text-truncate">
          <v-btn outlined small width="120" depressed rounded class="cursor-text" color="primary">
            <span
              class="text-capitalize px-2 font-weight-regular white--text text-truncate"
              style="max-width: 120px"
              v-text="`Transfer`"
            />
          </v-btn>
        </div>
      </template>

      <template #[`item.txHash`]="{ item }">
        <a
          class="text-decoration-none grey--text"
          @click="$navigateToExplorer(item.txHash, 'tx', currentChain.blockExplorerUrl)"
          v-text="$truncateAddress(item.txHash, 10, 4)"
        />
      </template>

      <template #[`item.transferType`]="{ item }">
        <div class="text-no-wrap">
          <v-btn style="pointer-events: none" width="50" :color="item.transferType.color" small class="rounded-sm" text>
            {{ item.transferType.text }}
          </v-btn>
        </div>
      </template>

      <template #[`item.fromTo`]="{ item }">
        <div class="text-no-wrap">
          <tx-address-label
            label="From:"
            :is-contract="item.from.isContract"
            :wallet-address="account.toLowerCase()"
            :name="item.from.label"
            :symbol="item.transfers[0].fromAddressSymbol"
            :address="item.transfers[0].fromAddress.toString()"
            :navigate-to-explorer="$navigateToExplorer"
            :block-explorer-url="currentChain.blockExplorerUrl"
          />

          <tx-address-label
            label="To:"
            :is-contract="item.to.isContract"
            :wallet-address="account.toLowerCase()"
            :name="item.to.label"
            :symbol="item.transfers[0].toAddressSymbol"
            :address="item.transfers[0].toAddress.toString()"
            :navigate-to-explorer="$navigateToExplorer"
            :block-explorer-url="currentChain.blockExplorerUrl"
          />
        </div>
      </template>

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

      <template #[`item.txnFee`]="{ item }">
        <div class="text-no-wrap grey--text" v-text="`${$f(item.txnFee, { minDigits: 2 })} ${chainSymbol}`" />
        <div class="text-no-wrap" v-text="$f(item.gasQuote, { minDigits: 2, pre: '$ ' })" />
      </template>

      <template #[`item.txnValue`]="{ item }">
        <div
          class="text-no-wrap grey--text"
          v-text="`${$f(item.txnValue, { maxDigits: 6 })} ${item.transfers[0].contractTickerSymbol}`"
        />

        <div class="text-no-wrap" v-text="$f(item.transfers[0].deltaQuote, { minDigits: 2, pre: '$ ' })" />
      </template>

      <template #[`item.action`]="{ item }">
        <v-tooltip bottom color="black">
          <template #activator="{ on, attrs }">
            <v-btn
              color="primary"
              v-bind="attrs"
              x-small
              class="mb-1 ml-1"
              icon
              v-on="on"
              @click="$copyAddressToClipboard(item.txHash)"
            >
              <v-icon size="18">mdi-content-copy</v-icon>
            </v-btn>
          </template>
          Copy Transaction Hash
        </v-tooltip>
        <v-tooltip bottom color="black">
          <template #activator="{ on, attrs }">
            <v-btn
              color="primary"
              v-bind="attrs"
              x-small
              class="mb-1 ml-1"
              icon
              v-on="on"
              @click="$navigateToExplorer(item.txHash, 'tx', currentChain.blockExplorerUrl)"
            >
              <v-icon size="18">mdi-open-in-new</v-icon>
            </v-btn>
          </template>
          Open in Block Explorer
        </v-tooltip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType, ref, useStore } from '@nuxtjs/composition-api'
import { TransactionTransfer } from '~/composables/useTokenTransactions'
import { State } from '~/types/state'
import TxAddressLabel from '~/components/transactions/TxAddressLabel.vue'
import { Web3, WEB3_PLUGIN_KEY } from '~/plugins/web3/web3'

export default defineComponent({
  components: { TxAddressLabel },
  props: {
    account: { type: String, default: '' },
    contractName: { type: String, default: '' },
    transactionsData: { type: Array as PropType<TransactionTransfer[]>, default: () => [] },
  },
  setup() {
    // STATE
    const cols = ref([
      {
        text: 'Txn Date',
        align: 'start',
        value: 'blockSignedAt',
        class: 'py-2',
        cellClass: 'py-4',
      },
      {
        text: 'Method',
        align: 'start',
        value: 'method',
        class: 'py-2',
        sortable: false,
      },
      {
        text: 'Txn Hash',
        align: 'start',
        value: 'txHash',
        class: 'py-2',
        sortable: false,
      },
      {
        text: '',
        align: 'start',
        value: 'transferType',
        class: 'py-2',
        sortable: false,
      },
      {
        text: '',
        align: 'start',
        value: 'fromTo',
        class: 'py-2',
        sortable: false,
      },
      {
        text: 'Value',
        align: 'start',
        value: 'txnValue',
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
        sortable: false,
        align: 'start',
        value: 'action',
        class: 'py-2',
        width: '100px',
      },
    ])
    const { getters } = useStore<State>()
    const { chainId } = inject(WEB3_PLUGIN_KEY) as Web3

    // COMPUTED
    const currentChain = computed(() => getters['configs/chainInfo'](chainId.value ?? 1))
    const chainSymbol = computed(() => currentChain.value.symbol)

    return { cols, chainSymbol, currentChain }
  },
})
</script>
