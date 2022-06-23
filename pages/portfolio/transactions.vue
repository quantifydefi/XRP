<template>
  <div>
    <v-row v-if="!walletReady" align="center" justify="center">
      <v-col cols="11">
        <connect-wallet-memo></connect-wallet-memo>
      </v-col>
    </v-row>

    <v-row v-else justify="center">
      <v-col lg="10" md="12">
        <v-row v-if="loading">
          <v-col cols="12">
            <v-card tile outlined>
              <v-skeleton-loader height="933" type="table-heading,divider,table-tbody@3"></v-skeleton-loader>
            </v-card>
          </v-col>
        </v-row>

        <v-row v-else>
          <v-col>
            <v-row class="pt-3">
              <v-col class="text-right"><network-selection-menu /></v-col>
            </v-row>
            <v-row>
              <v-col class="py-0">
                <transactions-grid
                  :is-inbound-renderer="isInboundRenderer"
                  :transactions="transactionsData"
                  :account="account"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useTransactions from '~/composables/useTransactions'
import { useMetaTags } from '~/composables/useMetaTags'

import ConnectWalletMemo from '~/components/common/ConnectWalletMemo.vue'
import TransactionsGrid from '~/components/transactions/TransactionsGrid.vue'
import NetworkSelectionMenu from '~/components/common/NetworkMenuSelection.vue'

export default defineComponent({
  components: { TransactionsGrid, ConnectWalletMemo, NetworkSelectionMenu },
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
    useMetaTags({ title: 'Transactions History | EVM Finance', subDirectory: 'portfolio/transactions' })

    return {
      account,
      walletReady,
      loading,
      currentChain,
      transactionsData,
      currentPage,
      pagination,

      /** Methods **/
      isInboundRenderer,
    }
  },
  head: {},
})
</script>
