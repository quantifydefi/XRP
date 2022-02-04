<template>
  <v-row justify="center">
    <v-col v-if="isTransactionsLoading" cols="11">
      <v-card height="100%" tile outlined>
        <v-skeleton-loader type="table-heading, table-tbody, table-tbody, table-tbody" />
      </v-card>
    </v-col>

    <v-col v-else cols="11">
      <v-card outlined tile>
        <v-data-table :headers="cols" :items="transactions" :items-per-page="100" class="elevation-0">
          <!--          <template #[`item.additionalInfo`]="{ item }">-->
          <!--            &lt;!&ndash;    Additional Info Menu    &ndash;&gt;-->
          <!--            <v-menu open-on-hover right min-width="280" :close-on-content-click="false">-->
          <!--              <template #activator="{ on, attrs }">-->
          <!--                <v-btn icon x-small color="pink" v-bind="attrs" v-on="on">-->
          <!--                  <v-icon small>mdi-dots-vertical</v-icon>-->
          <!--                </v-btn>-->
          <!--              </template>-->

          <!--              <v-card outlined tile width="400" elevation="0" max-height="600" class="overflow-y-auto">-->
          <!--                <v-row no-gutters class="px-3 py-1">-->
          <!--                  <v-col cols="12" class="py-2">-->
          <!--                    <div class="text-subtitle-2">Additional Info</div>-->
          <!--                  </v-col>-->

          <!--                  <v-col cols="4">-->
          <!--                    <div class="caption font-weight-medium" :class="ui[theme].innerCardLighten">-->
          <!--                      Transaction Status:-->
          <!--                    </div>-->
          <!--                  </v-col>-->

          <!--                  <v-col cols="8">-->
          <!--                    <div class="caption">-->
          <!--                      <v-btn-->
          <!--                        x-small-->
          <!--                        tile-->
          <!--                        text-->
          <!--                        class="text-capitalize"-->
          <!--                        style="pointer-events: none"-->
          <!--                        :color="item.successful ? 'green' : 'pink'"-->
          <!--                      >-->
          <!--                        <v-icon size="12"> {{ item.successful ? 'mdi-check-outline' : 'mdi-close-outline' }}</v-icon>-->
          <!--                        <span class="pl-2 caption">{{ item.successful ? 'Success' : 'Failed' }}</span>-->
          <!--                      </v-btn>-->
          <!--                      <small>({{ lastBlock - item.blockHeight }} Block Confirmations)</small>-->
          <!--                    </div>-->
          <!--                  </v-col>-->

          <!--                  <v-col cols="12" class="py-1">-->
          <!--                    <v-divider />-->
          <!--                  </v-col>-->

          <!--                  <v-col cols="4">-->
          <!--                    <div class="caption font-weight-medium" :class="ui[theme].innerCardLighten">Included in Block:</div>-->
          <!--                  </v-col>-->
          <!--                  <v-col cols="8">-->
          <!--                    <div class="caption">-->
          <!--                      {{ item.blockHeight }}-->
          <!--                    </div>-->
          <!--                  </v-col>-->

          <!--                  <v-col cols="12" class="py-1">-->
          <!--                    <v-divider />-->
          <!--                  </v-col>-->

          <!--                  <v-col cols="4">-->
          <!--                    <div class="caption font-weight-medium" :class="ui[theme].innerCardLighten">Timestamp:</div>-->
          <!--                  </v-col>-->

          <!--                  <v-col cols="8">-->
          <!--                    <div class="caption">-->
          <!--                      {{ new Date(item.blockSignedAt).toLocaleString() }}-->
          <!--                    </div>-->
          <!--                  </v-col>-->

          <!--                  <v-col cols="12" class="py-1">-->
          <!--                    <v-divider />-->
          <!--                  </v-col>-->

          <!--                  <v-col cols="4">-->
          <!--                    <div class="caption font-weight-medium" :class="ui[theme].innerCardLighten">Transaction Hash:</div>-->
          <!--                  </v-col>-->
          <!--                  <v-col cols="8">-->
          <!--                    <div class="caption">-->
          <!--                      {{ item.txHash }}-->
          <!--                      <v-btn color="primary" x-small icon @click="copyAddressToClipboard(item.txHash)">-->
          <!--                        <v-icon size="13">mdi-content-copy</v-icon></v-btn-->
          <!--                      >-->
          <!--                    </div>-->
          <!--                  </v-col>-->

          <!--                  <v-col cols="12" class="py-1">-->
          <!--                    <v-divider />-->
          <!--                  </v-col>-->

          <!--                  <v-col cols="4">-->
          <!--                    <div class="caption font-weight-medium" :class="ui[theme].innerCardLighten">From:</div>-->
          <!--                  </v-col>-->
          <!--                  <v-col cols="8">-->
          <!--                    <div class="caption">-->
          <!--                      {{ item.fromAddress }}-->
          <!--                      <v-btn color="primary" x-small icon @click="copyAddressToClipboard(item.fromAddress)">-->
          <!--                        <v-icon size="13">mdi-content-copy</v-icon></v-btn-->
          <!--                      >-->
          <!--                    </div>-->
          <!--                  </v-col>-->

          <!--                  <v-col cols="12" class="py-1">-->
          <!--                    <v-divider />-->
          <!--                  </v-col>-->

          <!--                  <v-col cols="4">-->
          <!--                    <div class="caption font-weight-medium" :class="ui[theme].innerCardLighten">To:</div>-->
          <!--                  </v-col>-->
          <!--                  <v-col cols="8">-->
          <!--                    <div class="caption">-->
          <!--                      {{ item.toAddress }}-->
          <!--                      <v-btn color="primary" x-small icon @click="copyAddressToClipboard(item.toAddress)">-->
          <!--                        <v-icon size="13">mdi-content-copy</v-icon></v-btn-->
          <!--                      >-->
          <!--                    </div>-->
          <!--                  </v-col>-->

          <!--                  <v-col cols="12" class="py-1">-->
          <!--                    <v-divider />-->
          <!--                  </v-col>-->

          <!--                  <v-col v-if="item.logEvents.length > 0" cols="12">-->
          <!--                    <v-row no-gutters>-->
          <!--                      <v-col cols="12" class="mb-2">-->
          <!--                        <v-row no-gutters>-->
          <!--                          <v-col cols="4">-->
          <!--                            <div class="caption font-weight-medium" :class="ui[theme].innerCardLighten">Action:</div>-->
          <!--                          </v-col>-->
          <!--                          <v-col cols="8">-->
          <!--                            <div class="caption pink&#45;&#45;text">-->
          <!--                              {{ item.logEvents[0].decoded.name }}-->
          <!--                            </div>-->
          <!--                          </v-col>-->
          <!--                        </v-row>-->
          <!--                      </v-col>-->
          <!--                      <v-col cols="12" class="mb-1">-->
          <!--                        <div v-for="(e, i) in item.logEvents" :key="i" class="caption">-->
          <!--                          <div v-if="e.decoded.name === 'Transfer' && item.fromAddress === e.decoded.params[0].value">-->
          <!--                            <v-row no-gutters>-->
          <!--                              <v-col cols="4">-->
          <!--                                <div-->
          <!--                                  class="caption font-weight-medium text-capitalize"-->
          <!--                                  :class="ui[theme].innerCardLighten"-->
          <!--                                >-->
          <!--                                  From-->
          <!--                                </div>-->
          <!--                              </v-col>-->
          <!--                              <v-col cols="8">-->
          <!--                                <v-row no-gutters>-->
          <!--                                  <v-avatar size="13" class="mt-1 mr-1"-->
          <!--                                    ><v-img :src="e.senderLogoUrl"></v-img-->
          <!--                                  ></v-avatar>-->
          <!--                                  <div class="caption">-->
          <!--                                    {{ e.senderName }} ({{ stringTruncate(e.senderAddress, 6, 4) }})-->
          <!--                                    <v-btn-->
          <!--                                      color="primary"-->
          <!--                                      class="mt-n1"-->
          <!--                                      x-small-->
          <!--                                      icon-->
          <!--                                      @click="copyAddressToClipboard(e.senderAddress)"-->
          <!--                                    >-->
          <!--                                      <v-icon size="13">mdi-content-copy</v-icon></v-btn-->
          <!--                                    >-->
          <!--                                  </div>-->
          <!--                                </v-row>-->
          <!--                              </v-col>-->
          <!--                            </v-row>-->
          <!--                            <v-row v-for="(param, i) in e.decoded.params" :key="param.value + i" no-gutters>-->
          <!--                              <v-col cols="4">-->
          <!--                                <div-->
          <!--                                  class="caption font-weight-medium text-capitalize"-->
          <!--                                  :class="ui[theme].innerCardLighten"-->
          <!--                                >-->
          <!--                                  {{ param.name }}:-->
          <!--                                </div>-->
          <!--                              </v-col>-->
          <!--                              <v-col cols="8">-->
          <!--                                <div v-if="param.name === 'value'" class="caption">-->
          <!--                                  ${{ param.value / 10 ** e.senderContractDecimals }}-->
          <!--                                </div>-->
          <!--                                <div v-else class="caption">{{ param.value }}</div>-->
          <!--                              </v-col>-->
          <!--                            </v-row>-->
          <!--                          </div>-->
          <!--                          <div v-else-if="e.decoded.name !== 'Transfer'">-->
          <!--                            <span> {{ e.decoded.name }} Something Else</span>-->
          <!--                            <div v-for="(param, i) in e.decoded.params" :key="param.value + i">-->
          <!--                              <span class="text-capitalize">{{ param.name }}</span-->
          <!--                              >: {{ param.value }}-->
          <!--                            </div>-->
          <!--                          </div>-->
          <!--                        </div>-->
          <!--                      </v-col>-->

          <!--                      <v-col cols="12" class="py-1">-->
          <!--                        <v-divider />-->
          <!--                      </v-col>-->
          <!--                    </v-row>-->
          <!--                  </v-col>-->

          <!--                  <v-col cols="4">-->
          <!--                    <div class="caption font-weight-medium" :class="ui[theme].innerCardLighten">Transaction Fee:</div>-->
          <!--                  </v-col>-->
          <!--                  <v-col cols="8">-->
          <!--                    <div class="caption">-->
          <!--                      {{ ((item.gasPrice / 10 ** 18) * item.gasSpent).toFixed(10) }} ETH-->
          <!--                      <small-->
          <!--                        >(${{ calculateEthUsdPrice((item.gasPrice / 10 ** 18) * item.gasSpent).toFixed(2) }})-->
          <!--                      </small>-->
          <!--                    </div>-->
          <!--                  </v-col>-->

          <!--                  <v-col cols="12" class="py-1">-->
          <!--                    <v-divider />-->
          <!--                  </v-col>-->

          <!--                  <v-col cols="4">-->
          <!--                    <div class="caption font-weight-medium" :class="ui[theme].innerCardLighten">Gas Information:</div>-->
          <!--                  </v-col>-->
          <!--                  <v-col cols="8">-->
          <!--                    <div class="caption">-->
          <!--                      {{ item.gasOffered }} Gas spent from {{ item.gasSpent }} Gas Limit at-->
          <!--                      {{ (item.gasPrice / 10 ** 18).toFixed(10) }} ETH-->
          <!--                      <small>(${{ calculateEthUsdPrice(item.gasPrice / 10 ** 18).toFixed(6) }})</small>-->
          <!--                    </div>-->
          <!--                  </v-col>-->

          <!--                  <v-col cols="12" class="py-1">-->
          <!--                    <v-divider />-->
          <!--                  </v-col>-->

          <!--                  <v-col cols="12" class="py-1 text-center">-->
          <!--                    <v-btn-->
          <!--                      x-small-->
          <!--                      text-->
          <!--                      color="primary"-->
          <!--                      class="caption text-capitalize"-->
          <!--                      @click="navigateToExplorer(item.txHash)"-->
          <!--                      >View more details <v-icon size="13" class="ml-1">mdi-open-in-new</v-icon></v-btn-->
          <!--                    >-->
          <!--                  </v-col>-->
          <!--                </v-row>-->
          <!--              </v-card>-->
          <!--            </v-menu>-->
          <!--          </template>-->

          <!--    Templates for Table Data      -->
          <template #[`item.timeStamp`]="{ item }">
            <div class="text-no-wrap" :class="[ui[theme].innerCardLighten]">
              {{ new Date(item.timeStamp * 1000).toLocaleString() }}
            </div>
          </template>

          <template #[`item.function`]="{ item }">
            <div v-if="item.function" class="text-truncate" style="width: 100px">
              <v-tooltip top :color="ui[theme].overlayColor">
                <template #activator="{ on, attrs }">
                  <span
                    style="cursor: pointer"
                    v-bind="attrs"
                    :class="[ui[theme].innerCardLighten, 'text-capitalize']"
                    v-on="on"
                  >
                    {{
                      item.function
                        .replace(/ *\([^)]*\) */g, '')
                        .replace(/([A-Z](?=[a-z]+)|[A-Z]+(?![a-z]))/g, ' $1')
                        .trim()
                    }}
                  </span>
                </template>
                <span :class="[ui[ui.theme].headerTextClass, 'text-capitalize']">
                  {{
                    item.function
                      .replace(/ *\([^)]*\) */g, '')
                      .replace(/([A-Z](?=[a-z]+)|[A-Z]+(?![a-z]))/g, ' $1')
                      .trim()
                  }}</span
                >
              </v-tooltip>
            </div>
            <div v-else-if="item.input === '0x'">
              <v-tooltip top :color="ui[theme].overlayColor">
                <template #activator="{ on, attrs }">
                  <span style="cursor: pointer" v-bind="attrs" :class="[ui[theme].innerCardLighten]" v-on="on"
                    >Transfer
                  </span>
                </template>
                <span :class="ui[ui.theme].headerTextClass">Transfer</span>
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
                  >{{ stringTruncate(item.hash, 6, 4) }}
                </span>
              </template>
              <span :class="ui[ui.theme].headerTextClass">click to copy transaction hash</span>
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
                  >{{ stringTruncate(item.from, 6, 4) }}
                </span>
              </template>
              <span :class="ui[ui.theme].headerTextClass">click to copy address</span>
            </v-tooltip>
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
                  >click to copy <v-span v-if="item.contractAddress">contract</v-span> address</span
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
                      <v-img
                        alt="Avatar"
                        :src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${item.tokenTo.symbol.toLowerCase()}.png`"
                      />
                    </v-avatar>
                    <span class="ml-1 caption" @click="copyAddressToClipboard(item.to)">{{ item.tokenTo.name }}</span>
                  </div>
                </template>
                <span :class="ui[theme].headerTextClass">click to copy address</span>
              </v-tooltip>
            </div>
          </template>

          <!--          <template #[`item.valueQuote`]="{ item }">-->
          <!--            <div class="text-no-wrap">-->
          <!--              <span> ${{ item.valueQuote.toFixed(4) || '' }} </span>-->
          <!--              <span class="caption pl-3 grey&#45;&#45;text">({{ (item.value / 10 ** 18).toFixed(6) || '' }} ETH)</span>-->
          <!--            </div>-->
          <!--          </template>-->

          <!--          <template #[`item.gasQuote`]="{ item }">-->
          <!--            <div :class="[ui[theme].innerCardLighten]">{{ item.gasQuote * item.gasSpent }}</div>-->
          <!--          </template>-->

          <template #[`item.value`]="{ item }">
            <span :class="[[ui[theme].innerCardLighten], 'text-no-wrap']"
              >{{
                parseInt(item.value) / 10 ** 18 > 0 ? (parseInt(item.value) / 10 ** 18).toFixed(4) : item.value
              }}
              ETH</span
            >
          </template>

          <template #[`item.cumulativeGasUsed`]="{ item }">
            <div class="text-no-wrap" :class="[ui[theme].innerCardLighten]">
              {{ ((item.gasPrice / 10 ** 18) * item.gasUsed).toFixed(6) }} ETH
            </div>
          </template>

          <template #[`item.isError`]="{ item }">
            <v-btn
              x-small
              tile
              text
              class="text-capitalize"
              style="pointer-events: none"
              :color="item.isError === '0' ? 'green' : 'pink'"
            >
              <v-icon size="12"> {{ item.isError === '0' ? 'mdi-check-outline' : 'mdi-close-outline' }}</v-icon>
              <span class="pl-2 caption">{{ item.isError === '0' ? 'Success' : 'Failed' }}</span>
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
