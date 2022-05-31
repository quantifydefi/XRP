<template>
  <v-row justify="center">
    <v-col cols="11">
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
            <v-card tile outlined elevation="0">
              <template v-if="loading">
                <v-skeleton-loader
                  height="1200"
                  type="table-heading,divider,table-tbody,table-tbody@3"
                ></v-skeleton-loader>
              </template>

              <template v-else>
                <v-data-table
                  :items="transactionsData"
                  :items-per-page="20"
                  :footer-props="{
                    'items-per-page-options': [20, 40, 60, 80, 100],
                  }"
                  item-key="txHash"
                  class="elevation-0"
                  :headers="cols"
                  show-expand
                  single-expand
                >
                  <!-- expand column -->
                  <template #item.data-table-expand="{ item, isExpanded, expand }">
                    <div style="width: 16px; cursor: pointer">
                      <v-btn
                        v-if="item.logEvents.length > 0 && !isExpanded"
                        small
                        icon
                        @click="expandRow(expand, true, item.logEvents)"
                      >
                        <v-icon>mdi-chevron-down</v-icon>
                      </v-btn>
                      <v-btn
                        v-if="item.logEvents.length > 0 && isExpanded"
                        small
                        icon
                        @click="expandRow(expand, false, item.logEvents)"
                      >
                        <v-icon>mdi-chevron-up</v-icon>
                      </v-btn>
                    </div>
                  </template>

                  <!-- expanded column items -->
                  <template #expanded-item="{ headers, item }">
                    <td :colspan="headers.length">
                      <v-row justify="center" class="overflow-auto my-0 mx-n4" style="max-height: 625px">
                        <v-col cols="11">
                          <div
                            v-for="event in logEventsLoaded"
                            :key="event.txHash + '_' + event.logOffset"
                            class="pb-3"
                          >
                            <div class="subtitle-2 pink--text">
                              {{ event.decoded.name.replace(/([A-Z])/g, ' $1').trim() }}
                            </div>

                            <v-row no-gutters :class="[ui[theme].innerCardLighten]">
                              <div v-for="(param, i) in event.decoded.params" :key="i">
                                <div v-if="param.decoded && param.value.length > 0" class="pr-10">
                                  <div :class="[ui[ui.theme].headerTextClass, 'text-capitalize text-caption']">
                                    {{ param.name.replace('_', '') }}:
                                  </div>

                                  <div v-if="param.type === 'address'" class="pr-16">
                                    <v-tooltip top color="grey darken-4">
                                      <template #activator="{ on, attrs }">
                                        <div
                                          style="cursor: pointer"
                                          :class="[ui[theme].innerCardLighten]"
                                          v-bind="attrs"
                                          v-on="on"
                                          @click="$copyAddressToClipboard(param.value)"
                                        >
                                          {{ $truncateAddress(param.value, 8, 10) }}
                                        </div>
                                      </template>
                                      <span>{{ param.value }}</span>
                                    </v-tooltip>
                                  </div>

                                  <div v-else-if="param.name === 'functionSignature'" class="pr-16">
                                    <v-tooltip top color="grey darken-4">
                                      <template #activator="{ on, attrs }">
                                        <div
                                          style="cursor: pointer"
                                          :class="[ui[theme].innerCardLighten]"
                                          v-bind="attrs"
                                          v-on="on"
                                          @click="$copyAddressToClipboard(param.value)"
                                        >
                                          {{ $truncateAddress(param.value, 8, 10) }}
                                        </div>
                                      </template>
                                      <span>{{ param.value }}</span>
                                    </v-tooltip>
                                  </div>

                                  <div v-else-if="param.name === 'Approval'" class="pr-10">
                                    {{
                                      +param.value >=
                                      115792089237316195423570985008687907853269984665640564039457584007913129639935
                                        ? 'max approval'
                                        : param.value
                                    }}
                                  </div>

                                  <div v-else class="pr-10">
                                    {{
                                      param.type.startsWith('uint') && param.name === 'value'
                                        ? $nf(+param.value / 10 ** event.senderContractDecimals, 0, 6)
                                        : param.value.substring(0, 300)
                                    }}
                                  </div>
                                </div>
                              </div>
                              <v-row
                                v-if="event.senderName && event.decoded.params.length > 0"
                                no-gutters
                                class="ml-n12 mt-5"
                              >
                                <v-avatar size="16" style="margin-top: 2px">
                                  <img
                                    :src="event.senderLogoUrl"
                                    :alt="`${event.senderName} logo`"
                                    @error="$setAltImageUrl"
                                  />
                                </v-avatar>
                                <div class="pl-2">
                                  {{ event.senderName }}
                                  <span class="caption">({{ event.senderContractTickerSymbol }})</span>
                                </div>
                              </v-row>
                            </v-row>
                          </div>
                          <v-row no-gutters>
                            <v-btn
                              v-if="loadedEventsLength < item.logEvents.length"
                              height="24"
                              block
                              small
                              class="text-capitalize"
                              outlined
                              color="primary"
                              tile
                              @click="loadMore"
                            >
                              <span :class="ui[theme].headerTextClass">Load more...</span>
                            </v-btn>
                          </v-row>
                        </v-col>
                      </v-row>
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
                            item.toAddress.toLowerCase() === walletAddress.toLowerCase()
                              ? 'pink--text'
                              : ui[theme].headerTextClass,
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
                      <div class="text-no-wrap" :class="[ui[theme].innerCardLighten]">
                        {{ $nf(item.txnFee, 0, 6) }} ETH
                      </div>
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
              </template>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, useStore, computed } from '@nuxtjs/composition-api'
import { State } from '@/types/state'
import NetworkSelectionMenu from '~/components/common/NetworkMenuSelection.vue'

import useTransactions from '~/composables/useTransactions'
import ConnectWalletMemo from '~/components/common/ConnectWalletMemo.vue'

export default defineComponent({
  name: 'Transactions',
  components: { ConnectWalletMemo, NetworkSelectionMenu },
  setup() {
    /** COMPOSABLES **/
    const store = useStore<State>()
    const {
      walletReady,
      loading,
      cols,
      account,
      chains,
      currentChain,
      transactionsData,
      loadedEventsLength,
      logEventsLoaded,
      loadMore,
      onNetworkSelectChange,
      navigateToExplorer,
      expandRow,
      isOutStyleRenderer,
      methodRenderer,
    } = useTransactions()

    return {
      ui: computed(() => store.state.ui),
      theme: computed(() => store.state.ui.theme),
      walletAddress: computed(() => account.value ?? ''),
      walletReady,
      loading,
      cols,
      chains,
      currentChain,
      transactionsData,
      loadedEventsLength,
      logEventsLoaded,
      /** Methods **/
      loadMore,
      onNetworkSelectChange,
      navigateToExplorer,
      expandRow,
      isOutStyleRenderer,
      methodRenderer,
    }
  },
})
</script>
