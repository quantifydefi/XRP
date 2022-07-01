<template>
  <v-row no-gutters justify="center">
    <v-col cols="12" md="10">
      <h1 class="text-h4">
        Web3 Transaction History
        <info-tooltip :text="messages.tooltips.txHeaderDesc" />
      </h1>

      <template v-if="!walletReady">
        <v-row justify="center" class="pt-3">
          <v-col cols="12" sm="10" lg="6">
            <connect-wallet-memo />
          </v-col>
        </v-row>
      </template>

      <template v-if="walletReady">
        <v-row justify="end" class="pt-4">
          <network-selection-menu></network-selection-menu>
        </v-row>

        <v-row justify="center">
          <v-col cols="12">
            <v-card v-if="loading" tile outlined>
              <v-skeleton-loader height="933" type="table-heading,divider,table-tbody@3"></v-skeleton-loader>
            </v-card>

            <div v-else>
              <transactions-grid
                :is-inbound-renderer="isInboundRenderer"
                :transactions="transactionsData"
                :account="account"
              />
            </div>

            <v-pagination
              v-model="currentPage"
              class="mt-4"
              :total-visible="pagination.visible"
              :length="pagination.total"
            ></v-pagination>
          </v-col>
        </v-row>
      </template>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import useTransactions from '~/composables/useTransactions'
import { useMetaTags } from '~/composables/useMetaTags'

import ConnectWalletMemo from '~/components/common/ConnectWalletMemo.vue'
import TransactionsGrid from '~/components/transactions/TransactionsGrid.vue'
import NetworkSelectionMenu from '~/components/common/NetworkMenuSelection.vue'
import InfoTooltip from '~/components/common/ui/InfoTooltip.vue'
import { messages } from '~/constants/messages'

export default defineComponent({
  components: { InfoTooltip, TransactionsGrid, ConnectWalletMemo, NetworkSelectionMenu },
  setup() {
    // COMPOSABLES
    const {
      account,
      walletReady,
      loading,
      currentChain,
      transactionsData,
      currentPage,
      pagination,
      isInboundRenderer,
    } = useTransactions()

    // META TAGS
    useMetaTags('transactions', useRoute().value.path)

    return {
      account,
      walletReady,
      loading,
      currentChain,
      transactionsData,
      currentPage,
      pagination,
      messages,

      // METHODS
      isInboundRenderer,
    }
  },
  head: {},
})
</script>
