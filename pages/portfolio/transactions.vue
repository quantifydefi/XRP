<template>
  <v-row justify="center">
    <v-col v-if="!isWalletConnected" cols="10" class="d-flex align-center justify-center" style="height: 80vh">
      <div class="text-center">
        <div class="title">Connect Your Wallet</div>
        <div>Please connect your Metamask Wallet to view Transactions History</div>
      </div>
    </v-col>

    <v-col v-else cols="12">
      <v-row no-gutters justify="center">
        <v-col v-if="isTransactionsLoading" cols="11">
          <v-card height="100%" tile outlined>
            <v-skeleton-loader type="table-heading, table-tbody, table-tbody, table-tbody" />
          </v-card>
        </v-col>

        <v-col v-else cols="11">
          <v-card outlined tile>
            <v-data-table
              :headers="cols"
              :items="transactions"
              :items-per-page="100"
              :footer-props="{
                'items-per-page-options': [25, 50, 75, 100],
              }"
              class="elevation-0"
              item-key="hash"
              show-expand
              single-expand
              @dblclick:row="onDoubleClickRow"
            >
              <!-- expand column -->
              <template #item.data-table-expand="{ item, isExpanded, expand }">
                <div style="width: 20px; cursor: pointer">
                  <v-btn
                    v-if="item.isError === '0' && item.input.length > 3 && !isExpanded"
                    small
                    icon
                    @click="onExpandButtonClick(expand, !isExpanded, item.hash)"
                  >
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
                  <v-btn
                    v-if="item.isError === '0' && item.input.length > 3 && isExpanded"
                    small
                    icon
                    @click="expand(false)"
                  >
                    <v-icon>mdi-chevron-up</v-icon>
                  </v-btn>
                </div>
              </template>

              <!-- expand item/row -->
              <template #expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                  <v-row v-if="isLogEventLoading" no-gutters justify="center" class="py-3">
                    <v-progress-circular :size="38" color="primary" indeterminate></v-progress-circular>
                  </v-row>

                  <v-row v-if="!isLogEventLoading" no-gutters class="pa-5" justify="center">
                    <v-col cols="12" :class="['subtitle-2']">
                      {{ transactionLogEventsDetails.length > 0 ? '' : 'No available details' }}
                    </v-col>

                    <v-snackbar v-model="snackbar" centered timeout="1000"> Copied! </v-snackbar>

                    <v-col>
                      <v-row
                        v-for="(_, i) in transactionLogEventsDetails"
                        :key="`${transactionHash}_decoded_${i}`"
                        no-gutters
                      >
                        <v-col cols="12" class="mt-2 mb-n2 pink--text font-weight-regular">
                          {{ transactionLogEventsDetails[i].decoded.name.replace(/([A-Z])/g, ' $1').trim() }}
                        </v-col>

                        <div
                          v-for="(log, j) in transactionLogEventsDetails[i].decoded.params"
                          :key="`${transactionHash}_detail_${j}`"
                          class="py-2 pr-6"
                          no-gutters
                          cols="12"
                        >
                          <div style="width: 350px">
                            <div :class="[ui[theme].headerTextClass, 'text-capitalize', 'caption']">
                              {{ log.name }}
                            </div>

                            <div v-if="log.type === 'address'">
                              <v-tooltip top :color="ui[theme].overlayColor">
                                <template #activator="{ on, attrs }">
                                  <span
                                    style="cursor: pointer"
                                    v-bind="attrs"
                                    :class="[ui[theme].innerCardLighten]"
                                    v-on="on"
                                    @click="copyAddressToClipboard(log.value)"
                                    >{{ log.value }}
                                  </span>
                                </template>
                                <span :class="ui[ui.theme].headerTextClass">{{
                                  isCopied ? 'Copied!' : 'click to copy address'
                                }}</span>
                              </v-tooltip>
                            </div>

                            <div
                              v-else-if="
                                log.value ===
                                '115792089237316195423570985008687907853269984665640564039457584007913129639935'
                              "
                            >
                              MAX UINT256
                            </div>
                            <div v-else :class="[ui[theme].innerCardLighten]">
                              {{
                                log.value === ''
                                  ? 'none'
                                  : log.type === 'uint256' && methodList.includes(item.method)
                                  ? `${
                                      parseInt(log.value) /
                                      10 ** transactionLogEventsDetails[i].senderContractDecimals.toFixed(4)
                                    }`
                                  : log.value
                              }}

                              <span v-if="log.type === 'uint256' && methodList.includes(item.method)">
                                <v-avatar size="16" class="mt-n1 mx-1">
                                  <img
                                    :src="transactionLogEventsDetails[i].senderLogoUrl"
                                    alt="token logo"
                                    @error="setAltImg"
                                  />
                                </v-avatar>
                                {{ transactionLogEventsDetails[i].senderContractTickerSymbol }}
                              </span>
                            </div>
                          </div>
                        </div>
                      </v-row>
                    </v-col>
                  </v-row>
                </td>
              </template>

              <!--    Templates for Table Data      -->
              <template #[`item.timeStamp`]="{ item }">
                <div class="text-no-wrap" :class="[ui[theme].innerCardLighten]">
                  {{ new Date(item.timeStamp * 1000).toLocaleString() }}
                </div>
              </template>

              <template #[`item.method`]="{ item }">
                <div v-if="item.method" class="text-truncate" style="width: 120px">
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
                        <span
                          :class="[
                            ui[ui.theme].headerTextClass,
                            'text-truncate',
                            'text-capitalize',
                            'px-2',
                            'font-weight-regular',
                          ]"
                          style="max-width: 120px"
                        >
                          {{ item.method }}
                        </span>
                      </v-btn>
                    </template>
                    <span :class="[ui[ui.theme].headerTextClass, 'text-capitalize']">
                      {{ item.method }}
                    </span>
                  </v-tooltip>
                </div>
                <div v-else-if="item.input === '0x'">
                  <v-tooltip top :color="ui[theme].overlayColor">
                    <template #activator="{ on, attrs }">
                      <v-btn
                        rounded
                        outlined
                        depressed
                        color="primary"
                        small
                        v-bind="attrs"
                        class="cursor-text"
                        v-on="on"
                      >
                        <span
                          :class="[
                            ui[ui.theme].headerTextClass,
                            'text-truncate',
                            'text-capitalize',
                            'active',
                            'px-2',
                            'font-weight-regular',
                          ]"
                          style="max-width: 120px"
                        >
                          Transfer
                        </span>
                      </v-btn>
                    </template>
                    <span :class="ui[ui.theme].headerTextClass">Transfer</span>
                  </v-tooltip>
                </div>
                <div v-else-if="item.methodId">
                  <v-tooltip top :color="ui[theme].overlayColor">
                    <template #activator="{ on, attrs }">
                      <v-btn
                        rounded
                        outlined
                        depressed
                        color="primary"
                        class="cursor-text"
                        small
                        v-bind="attrs"
                        v-on="on"
                      >
                        <span
                          :class="[
                            ui[ui.theme].headerTextClass,
                            'text-truncate',
                            'text-capitalize',
                            'px-2',
                            'font-weight-regular',
                          ]"
                          style="max-width: 120px"
                        >
                          0x{{ item.methodId }}
                        </span>
                      </v-btn>
                    </template>
                    <span :class="ui[ui.theme].headerTextClass">0x{{ item.methodId }}</span>
                  </v-tooltip>
                </div>
                <div v-else-if="item.input">
                  <v-tooltip top :color="ui[theme].overlayColor">
                    <template #activator="{ on, attrs }">
                      <v-btn
                        rounded
                        outlined
                        depressed
                        color="primary"
                        class="cursor-text"
                        small
                        v-bind="attrs"
                        v-on="on"
                      >
                        <span
                          :class="[
                            ui[ui.theme].headerTextClass,
                            'text-truncate',
                            'text-capitalize',
                            'px-2',
                            'font-weight-regular',
                          ]"
                          style="max-width: 120px"
                        >
                          {{ item.input.substring(0, 10) }}
                        </span>
                      </v-btn>
                    </template>
                    <span :class="ui[ui.theme].headerTextClass">{{ item.methodId }}</span>
                  </v-tooltip>
                </div>
              </template>

              <template #[`item.hash`]="{ item }">
                <v-tooltip top :color="ui[theme].overlayColor">
                  <template #activator="{ on, attrs }">
                    <span
                      style="cursor: pointer"
                      v-bind="attrs"
                      :class="[ui[theme].innerCardLighten]"
                      v-on="on"
                      @click="copyAddressToClipboard(item.hash)"
                      >{{ stringTruncate(item.hash, 10, 4) }}
                    </span>
                  </template>
                  <span :class="ui[ui.theme].headerTextClass">{{
                    isCopied ? 'Copied!' : 'click to copy transaction hash'
                  }}</span>
                </v-tooltip>
              </template>

              <template #[`item.from`]="{ item }">
                <v-tooltip top :color="ui[theme].overlayColor">
                  <template #activator="{ on, attrs }">
                    <span
                      style="cursor: pointer"
                      v-bind="attrs"
                      :class="item.from !== walletAddress.toLowerCase() ? 'pink--text' : [ui[theme].innerCardLighten]"
                      @click="copyAddressToClipboard(item.from)"
                      v-on="on"
                      >{{ stringTruncate(item.from, 10, 4) }}
                    </span>
                  </template>
                  <span :class="ui[ui.theme].headerTextClass">{{
                    isCopied ? 'Copied!' : 'click to copy address'
                  }}</span>
                </v-tooltip>
              </template>

              <template #[`item.fromTo`]="{ item }">
                <div class="text-no-wrap">
                  <span :class="ui[theme].innerCardLighten">From:</span>
                  <v-tooltip top :color="ui[theme].overlayColor">
                    <template #activator="{ on, attrs }">
                      <span
                        style="cursor: pointer"
                        v-bind="attrs"
                        :class="item.from !== walletAddress.toLowerCase() ? 'pink--text' : ''"
                        @click="copyAddressToClipboard(item.from)"
                        v-on="on"
                        >{{ stringTruncate(item.from, 10, 4) }}
                      </span>
                    </template>
                    <span :class="ui[ui.theme].headerTextClass">{{
                      isCopied ? 'Copied!' : 'click to copy address'
                    }}</span>
                  </v-tooltip>
                  <div
                    v-if="item.tokenTo.address.length === 0 || item.contractAddress.length > 0"
                    :class="[ui[theme].innerCardLighten]"
                  >
                    <span :class="ui[theme].innerCardLighten">To:</span>
                    <v-tooltip top :color="ui[theme].overlayColor">
                      <template #activator="{ on, attrs }">
                        <span
                          v-bind="attrs"
                          style="cursor: pointer"
                          :class="ui[theme].headerTextClass"
                          v-on="on"
                          @click="copyAddressToClipboard(item.to || item.contractAddress)"
                        >
                          {{ stringTruncate(item.to, 10, 4) || stringTruncate(item.contractAddress, 10, 4) }}
                          <v-icon v-if="item.contractAddress" class="ml-1" small>mdi-file-sign</v-icon>
                        </span>
                      </template>
                      <span :class="ui[theme].headerTextClass">
                        {{ isCopied ? 'Copied' : `click to copy`
                        }}<v-span v-if="item.contractAddress">contract</v-span> address</span
                      >
                    </v-tooltip>
                  </div>
                  <div v-else class="text-no-wrap d-flex text-truncate" style="max-width: 200px">
                    <span :class="[ui[theme].innerCardLighten]">To:</span>
                    <v-tooltip top :color="ui[theme].overlayColor">
                      <template #activator="{ on, attrs }">
                        <div
                          :color="ui[theme].overlayColor"
                          v-bind="attrs"
                          style="cursor: pointer"
                          class="text-truncate ml-1"
                          v-on="on"
                        >
                          <v-avatar size="16px" class="mt-n1">
                            <img
                              alt="Avatar"
                              :src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${item.tokenTo.symbol.toLowerCase()}.png`"
                              @error="setAltImg"
                            />
                          </v-avatar>
                          <span
                            :class="[ui[theme].headerTextClass, 'text-no-wrap']"
                            @click="copyAddressToClipboard(item.to)"
                            >{{ item.tokenTo.name }}</span
                          >
                        </div>
                      </template>
                      <span :class="ui[theme].headerTextClass">{{
                        isCopied ? 'Copied' : 'click to copy address'
                      }}</span>
                    </v-tooltip>
                  </div>
                </div>
              </template>

              <template #[`item.isOut`]="{ item }">
                <div class="text-no-wrap" :class="[ui[theme].innerCardLighten]">
                  <v-btn
                    v-if="item.from === walletAddress.toLowerCase()"
                    text
                    width="50"
                    style="pointer-events: none"
                    color="pink"
                    small
                    class="rounded-sm"
                    label
                    text-color="white"
                  >
                    OUT
                  </v-btn>
                  <v-btn
                    v-else-if="item.to.toLowerCase() === item.from.toLowerCase()"
                    style="pointer-events: none"
                    width="50"
                    color="grey"
                    small
                    class="rounded-sm"
                    text
                  >
                    SELF
                  </v-btn>
                  <v-btn v-else style="pointer-events: none" width="50" color="green" small class="rounded-sm" text>
                    IN
                  </v-btn>
                </div>
              </template>

              <template #[`item.to`]="{ item }">
                <div
                  v-if="item.tokenTo.address.length === 0 || item.contractAddress.length > 0"
                  :class="[ui[theme].innerCardLighten]"
                >
                  <v-tooltip top :color="ui[theme].overlayColor">
                    <template #activator="{ on, attrs }">
                      <span
                        v-bind="attrs"
                        style="cursor: pointer"
                        v-on="on"
                        @click="copyAddressToClipboard(item.to || item.contractAddress)"
                      >
                        <v-icon v-if="item.contractAddress" class="mr-1" small>mdi-file-sign</v-icon>
                        {{ stringTruncate(item.to, 6, 4) || stringTruncate(item.contractAddress, 6, 4) }}
                      </span>
                    </template>
                    <span :class="ui[theme].headerTextClass"
                      >{{ isCopied ? 'Copied' : 'click to copy' }}
                      <v-span v-if="item.contractAddress">contract</v-span> address</span
                    >
                  </v-tooltip>
                </div>
                <div v-else>
                  <v-tooltip top :color="ui[theme].overlayColor">
                    <template #activator="{ on, attrs }">
                      <div
                        v-bind="attrs"
                        style="cursor: pointer; max-width: 140px"
                        class="text-no-wrap text-truncate"
                        v-on="on"
                      >
                        <v-avatar size="18px">
                          <img
                            alt="Avatar"
                            :src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${item.tokenTo.symbol.toLowerCase()}.png`"
                            @error="setAltImg"
                          />
                        </v-avatar>
                        <span class="ml-1 caption" @click="copyAddressToClipboard(item.to)">{{
                          item.tokenTo.name
                        }}</span>
                      </div>
                    </template>
                    <span :class="ui[theme].headerTextClass">{{ isCopied ? 'Copied' : 'click to copy address' }}</span>
                  </v-tooltip>
                </div>
              </template>

              <template #[`item.value`]="{ item }">
                <div class="py-2">
                  <div :class="[ui[theme].innerCardLighten]" class="text-no-wrap">
                    {{
                      parseInt(item.value) / 10 ** 18 > 0 ? (parseInt(item.value) / 10 ** 18).toFixed(4) : item.value
                    }}
                    ETH
                  </div>
                  <div>${{ calculateEthUsdPrice(item.value / 10 ** 18).toFixed(2) }}</div>
                </div>
              </template>

              <!--    Txn Fee      -->
              <template #[`item.txnFee`]="{ item }">
                <div class="text-no-wrap" :class="[ui[theme].innerCardLighten]">{{ item.txnFee.toFixed(6) }} ETH</div>
                <span>${{ calculateEthUsdPrice(item.txnFee).toFixed(2) }}</span>
              </template>

              <template #[`item.isError`]="{ item }">
                <v-btn
                  width="90"
                  outlined
                  small
                  depressed
                  rounded
                  class="text-capitalize disable-events"
                  :color="item.isError === '0' ? 'green' : 'pink'"
                >
                  <span class="caption" :class="[ui[theme].headerTextClass]">{{
                    item.isError === '0' ? 'Success' : 'Failed'
                  }}</span>
                </v-btn>
              </template>

              <template #[`item.action`]="{ item }">
                <v-tooltip top :color="ui[theme].overlayColor">
                  <template #activator="{ on, attrs }">
                    <div v-bind="attrs" style="cursor: pointer" v-on="on">
                      <v-btn
                        small
                        icon
                        color="primary"
                        class="caption text-capitalize"
                        @click="navigateToExplorer(item.hash)"
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
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import Transactions from '@/models/transactions'

@Component({
  name: 'Transaction',
  head(): object {
    return {
      title: 'DeFi Transaction History | EVM Ethereum Virtual Machine',
      meta: [
        {
          name: 'description',
          hid: 'description',
          content: 'DeFi transactions for Ethereum Mainnet, Matic, Binance Smart Chain, Fantom Opera and more',
        },

        // Open Graph
        {
          name: 'og:title',
          content: 'DeFi Transaction History | EVM Ethereum Virtual Machine',
        },
        {
          name: 'og:description',
          content: 'DeFi transactions for Ethereum Mainnet, Matic, Binance Smart Chain, Fantom Opera and more',
        },
        { name: 'og:type', content: 'website' },
        { name: 'og:url', content: process.env.baseURL },
        {
          name: 'og:image',
          content: 'https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/website-img/EVMXTransactionsPage.jpg',
        },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@Quantify_Crypto' },
        {
          name: 'twitter:title',
          content: 'DeFi Transaction History | EVM Ethereum Virtual Machine',
        },
        {
          name: 'twitter:description',
          content: 'DeFi transactions for Ethereum Mainnet, Matic, Binance Smart Chain, Fantom Opera and more',
        },
        {
          name: 'twitter:image',
          content: 'https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/website-img/EVMXTransactionsPage.jpg',
        },
        {
          name: 'twitter:image:alt',
          content: 'https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/website-img/EVMXTransactionsPage.jpg',
        },
      ],
    }
  },
})
export default class Transaction extends mixins(Transactions) {}
</script>
