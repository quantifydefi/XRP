<template>
  <div>
    <v-row justify="center" class="mb-1">
      <v-col cols="12">
        <h1 class="text-h4">
          Web3 Transaction History
          <info-tooltip :text="messages.tooltips.txHeaderDesc" />
        </h1>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col>
        <v-btn-toggle v-model="selectedChainId" dark mandatory tile color="primary">
          <v-btn
            v-for="(item, index) in allNetworks"
            :key="index"
            :value="item.id"
            tile
            depressed
            height="36"
            color="transparent"
          >
            <v-avatar size="24" class="mr-2">
              <img :src="$imageUrlBySymbol(item.symbol)" alt="" @error="$setAltImageUrl" />
            </v-avatar>
            <span class="text-body-2 text-capitalize">{{ item.name }}</span>
          </v-btn>
        </v-btn-toggle>
      </v-col>

      <v-col cols="3" class="pt-2">
        <div class="text-right">
          <custom-wallet-indicator selected-chain-id="ethereum" />
        </div>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" class="my-0 py-0">
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

    <!--    <v-row v-if="!walletReady" justify="center" class="pt-3">-->
    <!--      <v-col cols="12" sm="10" lg="6">-->
    <!--        <connect-wallet-memo />-->
    <!--      </v-col>-->
    <!--    </v-row>-->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref, useRoute } from '@nuxtjs/composition-api'
import useTransactions from '~/composables/useTransactions'
import { useMetaTags } from '~/composables/useMetaTags'
import TransactionsGrid from '~/components/transactions/TransactionsGrid.vue'
import InfoTooltip from '~/components/common/ui/InfoTooltip.vue'
import { messages } from '~/constants/messages'
import CustomWalletIndicator from '~/components/common/CustomWalletIndicator.vue'
import { Web3, WEB3_PLUGIN_KEY } from '~/plugins/web3/web3'

export default defineComponent({
  components: { CustomWalletIndicator, InfoTooltip, TransactionsGrid },
  setup() {
    const { allNetworks } = inject(WEB3_PLUGIN_KEY) as Web3
    const selectedChainId = ref('ethereum')
    const chainId = computed<number>(
      () => allNetworks.value.find((elem) => elem.id === selectedChainId.value)?.chainIdentifier ?? 1
    )
    // COMPOSABLES
    const { account, walletReady, loading, transactionsData, currentPage, pagination, isInboundRenderer } =
      useTransactions(chainId)

    // META TAGS
    useMetaTags('transactions', useRoute().value.path)

    return {
      account,
      walletReady,
      loading,
      transactionsData,
      currentPage,
      pagination,
      messages,
      allNetworks,
      selectedChainId,

      // METHODS
      isInboundRenderer,
    }
  },
  head: {},
})
</script>
