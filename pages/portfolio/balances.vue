<template>
  <v-row no-gutters justify="center">
    <v-col cols="12" md="10">
      <h1 class="text-h4">
        DeFi Balances
        <info-tooltip :text="messages.tooltips.balanceHeaderDesc" />
      </h1>

      <v-row v-if="!walletReady" justify="center" no-gutters class="pt-3">
        <v-col cols="12" sm="10" lg="6">
          <connect-wallet-memo />
        </v-col>
      </v-row>

      <v-row v-else justify="center" class="pt-3">
        <v-col>
          <v-row>
            <v-col lg="4" cols="12">
              <v-card class="py-2 px-4" height="240" tile outlined>
                <v-skeleton-loader v-if="loading" type="heading,table-tbody,table-tbody" height="230" />
                <div v-else>
                  <h4 :class="['text-subtitle-1 text-truncate pink--text font-weight-medium']">Wallet Balance</h4>
                  <div
                    class="d-inline-block text-truncate text-h3"
                    v-text="$f(totalBalance, { pre: '$ ', minDigits: 2 })"
                  />
                  <v-simple-table class="mt-3">
                    <template #default>
                      <tbody class="text-subtitle-1 text-no-wrap">
                        <tr v-for="(elem, i) in stats" :key="i">
                          <td>
                            <div class="text-no-wrap overflow-x-hidden">
                              <v-avatar size="20" class="mr-2">
                                <v-img
                                  :src="$imageUrlBySymbol(elem.symbol)"
                                  :lazy-src="$imageUrlBySymbol(elem.symbol)"
                                />
                              </v-avatar>
                              {{ elem.name }}
                            </div>
                          </td>
                          <td :class="textClass" v-text="$f(elem.total, { pre: '$ ', minDigits: 2 })" />
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </div>
              </v-card>
            </v-col>
            <v-col class="hidden-sm-and-down">
              <v-card tile outlined height="100%">
                <v-skeleton-loader v-if="loading" type="image, image" height="240" />
                <client-only>
                  <balances-chart v-if="!loading" :balances="balanceData" />
                </client-only>
              </v-card>
            </v-col>
          </v-row>
          <v-row v-if="loading">
            <v-col v-for="i in 4" :key="i" cols="6">
              <v-card height="450" tile outlined class="pa-2">
                <v-skeleton-loader :loading="loading" type="heading,table-tbody,table-tbody" height="420" />
              </v-card>
            </v-col>
          </v-row>

          <v-row v-show="!loading">
            <v-col v-for="balance in balanceData" :key="balance.chainId" lg="6" md="12">
              <portfolio-balance-grid :data="balance" />
            </v-col>
          </v-row>

          <balance-protocols v-show="!loading" :balances="balanceData" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { computed, defineComponent, inject, useRoute, useStore } from '@nuxtjs/composition-api'
import usePortfolioBalances from '~/composables/usePortfolioBalances'
import PortfolioBalanceGrid from '~/components/portfolio/PortfolioBalanceGrid.vue'
import { State } from '~/types/state'
import BalancesChart from '~/components/portfolio/BalancesChart.vue'
import { Web3, WEB3_PLUGIN_KEY } from '~/plugins/web3/web3'
import BalanceProtocols from '~/components/portfolio/BalanceProtocols.vue'
import ConnectWalletMemo from '~/components/common/ConnectWalletMemo.vue'
import { useMetaTags } from '~/composables/useMetaTags'
import InfoTooltip from '~/components/common/ui/InfoTooltip.vue'
import { messages } from '~/constants/messages'

export default defineComponent({
  components: { InfoTooltip, ConnectWalletMemo, BalanceProtocols, BalancesChart, PortfolioBalanceGrid },
  setup() {
    // COMPOSABLES
    const { walletReady } = inject(WEB3_PLUGIN_KEY) as Web3
    const { getters, state, dispatch } = useStore<State>()
    const { loading, balanceData, error, totalBalance } = usePortfolioBalances()

    // COMPUtED
    const textClass = computed(() => state.ui[state.ui.theme].innerCardLighten)
    const stats = computed(() =>
      balanceData.value.map((item) => ({
        name: getters['configs/chainInfo'](item.chainId)?.label ?? '',
        symbol: getters['configs/chainInfo'](item.chainId)?.symbol ?? '',
        total: item.items.reduce((n, { quote }) => n + quote, 0),
      }))
    )

    // META TAGS
    useMetaTags('balances', useRoute().value.path)

    return { loading, balanceData, error, stats, textClass, totalBalance, walletReady, dispatch, messages }
  },
  head: {},
})
</script>
