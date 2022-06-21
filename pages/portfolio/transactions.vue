<template>
  <v-row no-gutters justify="center">
    <v-col cols="12" lg="10">
      <template v-if="!walletReady">
        <connect-wallet-memo></connect-wallet-memo>
      </template>

      <template v-if="walletReady">
        <v-row justify="end" class="pt-3">
          <network-selection-menu
            :chains="chains"
            :selected-chain="currentChain"
            @on-network-select-change="onNetworkSelectChange"
          ></network-selection-menu>
        </v-row>

        <v-row justify="center">
          <v-col cols="12">
            <v-card v-if="loading" tile outlined>
              <v-skeleton-loader height="933" type="table-heading,divider,table-tbody@3"></v-skeleton-loader>
            </v-card>

            <div v-else>
              <transactions-grid
                :transactions="transactionsData"
                :account="account"
                :chain-symbol="currentChain.symbol"
                @navigate-to-explorer="navigateToExplorer"
              ></transactions-grid>
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
import { defineComponent } from '@nuxtjs/composition-api'
import useTransactions from '~/composables/useTransactions'
import { useMetaTags } from '~/composables/useMetaTags'

import ConnectWalletMemo from '~/components/common/ConnectWalletMemo.vue'
import TransactionsGrid from '~/components/transactions/TransactionsGrid.vue'
import NetworkSelectionMenu from '~/components/common/NetworkMenuSelection.vue'

export default defineComponent({
  name: 'Transactions',
  components: { TransactionsGrid, ConnectWalletMemo, NetworkSelectionMenu },
  setup() {
    // COMPOSABLES
    const {
      account,
      walletReady,
      loading,
      chains,
      currentChain,
      transactionsData,
      currentPage,
      pagination,

      onNetworkSelectChange,
      navigateToExplorer,
    } = useTransactions()

    // META TAGS
    useMetaTags({ title: 'Transactions History | EVM Finance', subDirectory: 'portfolio/transactions' })

    return {
      account,
      walletReady,
      loading,
      chains,
      currentChain,
      transactionsData,
      currentPage,
      pagination,
      /** Methods **/
      onNetworkSelectChange,
      navigateToExplorer,
    }
  },
  head: {},
})
</script>
