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
          <template #[`item.additionalInfo`]="{ item }">
            <!--    Additional Info Menu    -->
            <v-menu open-on-hover right min-width="280" :close-on-content-click="false">
              <template #activator="{ on, attrs }">
                <v-btn icon x-small color="pink" v-bind="attrs" v-on="on">
                  <v-icon small>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-card outlined tile width="400" elevation="0" max-height="600" class="overflow-y-auto">
                <v-row no-gutters class="px-3 py-1">
                  <v-col cols="12" class="py-2">
                    <div class="text-subtitle-2">Additional Info</div>
                  </v-col>

                  <v-col cols="4">
                    <div class="caption font-weight-medium" :class="ui[theme].innerCardLighten">
                      Transaction Status:
                    </div>
                  </v-col>

                  <v-col cols="8">
                    <div class="caption">
                      <v-btn
                        x-small
                        tile
                        text
                        class="text-capitalize"
                        style="pointer-events: none"
                        :color="item.successful ? 'green' : 'pink'"
                      >
                        <v-icon size="12"> {{ item.successful ? 'mdi-check-outline' : 'mdi-close-outline' }}</v-icon>
                        <span class="pl-2 caption">{{ item.successful ? 'Success' : 'Failed' }}</span>
                      </v-btn>
                      <small>({{ lastBlock - item.blockHeight }} Block Confirmations)</small>
                    </div>
                  </v-col>

                  <v-col cols="12" class="py-1">
                    <v-divider />
                  </v-col>

                  <v-col cols="4">
                    <div class="caption font-weight-medium" :class="ui[theme].innerCardLighten">Included in Block:</div>
                  </v-col>
                  <v-col cols="8">
                    <div class="caption">
                      {{ item.blockHeight }}
                    </div>
                  </v-col>

                  <v-col cols="12" class="py-1">
                    <v-divider />
                  </v-col>

                  <v-col cols="4">
                    <div class="caption font-weight-medium" :class="ui[theme].innerCardLighten">Timestamp:</div>
                  </v-col>

                  <v-col cols="8">
                    <div class="caption">
                      {{ new Date(item.blockSignedAt).toLocaleString() }}
                    </div>
                  </v-col>

                  <v-col cols="12" class="py-1">
                    <v-divider />
                  </v-col>

                  <v-col cols="4">
                    <div class="caption font-weight-medium" :class="ui[theme].innerCardLighten">Transaction Hash:</div>
                  </v-col>
                  <v-col cols="8">
                    <div class="caption">
                      {{ item.txHash }}
                      <v-btn color="primary" x-small icon @click="copyAddressToClipboard(item.txHash)">
                        <v-icon size="13">mdi-content-copy</v-icon></v-btn
                      >
                    </div>
                  </v-col>

                  <v-col cols="12" class="py-1">
                    <v-divider />
                  </v-col>

                  <v-col cols="4">
                    <div class="caption font-weight-medium" :class="ui[theme].innerCardLighten">From:</div>
                  </v-col>
                  <v-col cols="8">
                    <div class="caption">
                      {{ item.fromAddress }}
                      <v-btn color="primary" x-small icon @click="copyAddressToClipboard(item.fromAddress)">
                        <v-icon size="13">mdi-content-copy</v-icon></v-btn
                      >
                    </div>
                  </v-col>

                  <v-col cols="12" class="py-1">
                    <v-divider />
                  </v-col>

                  <v-col cols="4">
                    <div class="caption font-weight-medium" :class="ui[theme].innerCardLighten">To:</div>
                  </v-col>
                  <v-col cols="8">
                    <div class="caption">
                      {{ item.toAddress }}
                      <v-btn color="primary" x-small icon @click="copyAddressToClipboard(item.toAddress)">
                        <v-icon size="13">mdi-content-copy</v-icon></v-btn
                      >
                    </div>
                  </v-col>

                  <v-col cols="12" class="py-1">
                    <v-divider />
                  </v-col>

                  <v-col v-if="item.logEvents.length > 0" cols="12">
                    <v-row no-gutters>
                      <v-col cols="12" class="mb-2">
                        <v-row no-gutters>
                          <v-col cols="4">
                            <div class="caption font-weight-medium" :class="ui[theme].innerCardLighten">Action:</div>
                          </v-col>
                          <v-col cols="8">
                            <div class="caption pink--text">
                              {{ item.logEvents[0].decoded.name }}
                            </div>
                          </v-col>
                        </v-row>
                      </v-col>
                      <v-col cols="12" class="mb-1">
                        <div v-for="(e, i) in item.logEvents" :key="i" class="caption">
                          <div v-if="e.decoded.name === 'Transfer' && item.fromAddress === e.decoded.params[0].value">
                            <v-row no-gutters>
                              <v-col cols="4">
                                <div
                                  class="caption font-weight-medium text-capitalize"
                                  :class="ui[theme].innerCardLighten"
                                >
                                  From
                                </div>
                              </v-col>
                              <v-col cols="8">
                                <v-row no-gutters>
                                  <v-avatar size="13" class="mt-1 mr-1"
                                    ><v-img :src="e.senderLogoUrl"></v-img
                                  ></v-avatar>
                                  <div class="caption">
                                    {{ e.senderName }} ({{ stringTruncate(e.senderAddress, 6, 4) }})
                                    <v-btn
                                      color="primary"
                                      class="mt-n1"
                                      x-small
                                      icon
                                      @click="copyAddressToClipboard(e.senderAddress)"
                                    >
                                      <v-icon size="13">mdi-content-copy</v-icon></v-btn
                                    >
                                  </div>
                                </v-row>
                              </v-col>
                            </v-row>
                            <v-row v-for="(param, i) in e.decoded.params" :key="param.value + i" no-gutters>
                              <v-col cols="4">
                                <div
                                  class="caption font-weight-medium text-capitalize"
                                  :class="ui[theme].innerCardLighten"
                                >
                                  {{ param.name }}:
                                </div>
                              </v-col>
                              <v-col cols="8">
                                <div v-if="param.name === 'value'" class="caption">
                                  ${{ param.value / 10 ** e.senderContractDecimals }}
                                </div>
                                <div v-else class="caption">{{ param.value }}</div>
                              </v-col>
                            </v-row>
                          </div>
                          <div v-else-if="e.decoded.name !== 'Transfer'">
                            <span> {{ e.decoded.name }} Something Else</span>
                            <div v-for="(param, i) in e.decoded.params" :key="param.value + i">
                              <span class="text-capitalize">{{ param.name }}</span
                              >: {{ param.value }}
                            </div>
                          </div>
                        </div>
                      </v-col>

                      <v-col cols="12" class="py-1">
                        <v-divider />
                      </v-col>
                    </v-row>
                  </v-col>

                  <v-col cols="4">
                    <div class="caption font-weight-medium" :class="ui[theme].innerCardLighten">Transaction Fee:</div>
                  </v-col>
                  <v-col cols="8">
                    <div class="caption">
                      {{ ((item.gasPrice / 10 ** 18) * item.gasSpent).toFixed(10) }} ETH
                      <small
                        >(${{ calculateEthUsdPrice((item.gasPrice / 10 ** 18) * item.gasSpent).toFixed(2) }})
                      </small>
                    </div>
                  </v-col>

                  <v-col cols="12" class="py-1">
                    <v-divider />
                  </v-col>

                  <v-col cols="4">
                    <div class="caption font-weight-medium" :class="ui[theme].innerCardLighten">Gas Information:</div>
                  </v-col>
                  <v-col cols="8">
                    <div class="caption">
                      {{ item.gasOffered }} Gas spent from {{ item.gasSpent }} Gas Limit at
                      {{ (item.gasPrice / 10 ** 18).toFixed(10) }} ETH
                      <small>(${{ calculateEthUsdPrice(item.gasPrice / 10 ** 18).toFixed(6) }})</small>
                    </div>
                  </v-col>

                  <v-col cols="12" class="py-1">
                    <v-divider />
                  </v-col>

                  <v-col cols="12" class="py-1 text-center">
                    <v-btn
                      x-small
                      text
                      color="primary"
                      class="caption text-capitalize"
                      @click="navigateToExplorer(item.txHash)"
                      >View more details <v-icon size="13" class="ml-1">mdi-open-in-new</v-icon></v-btn
                    >
                  </v-col>
                </v-row>
              </v-card>
            </v-menu>
          </template>

          <!--    Templates for Table Data      -->
          <template #[`item.blockSignedAt`]="{ item }">
            <div class="text-no-wrap">
              {{ new Date(item.blockSignedAt).toLocaleString('en-US') }}
            </div>
          </template>

          <template #[`item.txnAge`]="{ item }">
            <div class="text-no-wrap" :class="[ui[theme].innerCardLighten]">
              {{ timeFromNow(item.blockSignedAt) }}
            </div>
          </template>

          <template #[`item.method`]="{ item }">
            <div v-if="item.logEvents.length > 0" class="text-capitalize caption" style="width: 66px">
              {{ item.logEvents[0].decoded.name.split(/(?=[A-Z])/).join(' ') }}
            </div>

            <!--            <v-chip v-else color="pink" text-color="white" label class="rounded-0" x-small> Transfer </v-chip>-->
          </template>

          <template #[`item.txHash`]="{ item }">
            <v-tooltip bottom :color="ui[theme].overlayColor">
              <template #activator="{ on, attrs }">
                <span v-bind="attrs" :class="[ui[theme].innerCardLighten]" v-on="on">{{
                  stringTruncate(item.txHash, 6, 4)
                }}</span>
              </template>
              <span :class="ui[ui.theme].headerTextClass">{{ item.txHash }}</span>
            </v-tooltip>
          </template>

          <template #[`item.fromAddress`]="{ item }">
            <v-tooltip bottom :color="ui[theme].overlayColor">
              <template #activator="{ on, attrs }">
                <span v-bind="attrs" :class="[ui[theme].innerCardLighten]" v-on="on">{{
                  stringTruncate(item.fromAddress, 6, 4)
                }}</span>
              </template>
              <span :class="ui[ui.theme].headerTextClass">{{ item.fromAddress }}</span>
            </v-tooltip>
          </template>

          <template #[`item.toAddress`]="{ item }">
            <v-tooltip bottom :color="ui[theme].overlayColor">
              <template #activator="{ on, attrs }">
                <span v-bind="attrs" :class="[ui[theme].innerCardLighten]" v-on="on">{{
                  stringTruncate(item.toAddress, 6, 4)
                }}</span>
              </template>
              <span :class="ui[theme].headerTextClass">{{ item.toAddress }}</span>
            </v-tooltip>
          </template>

          <template #[`item.valueQuote`]="{ item }">
            <div class="text-no-wrap">
              <span> ${{ item.valueQuote.toFixed(4) || '' }} </span>
              <span class="caption pl-3 grey--text">({{ (item.value / 10 ** 18).toFixed(6) || '' }} ETH)</span>
            </div>
          </template>

          <template #[`item.gasQuote`]="{ item }">
            <div :class="[ui[theme].innerCardLighten]">{{ item.gasQuote * item.gasSpent }}</div>
          </template>

          <template #[`item.value`]="{ item }">
            <span :class="[ui[theme].innerCardLighten]"
              >{{
                parseInt(item.value) / 10 ** 18 > 0 ? (parseInt(item.value) / 10 ** 18).toFixed(8) : item.value
              }}
              ETH</span
            >
          </template>

          <template #[`item.txnFee`]="{ item }">
            <div class="text-no-wrap" :class="[ui[theme].innerCardLighten]">
              {{ ((item.gasPrice / 10 ** 18) * item.gasSpent).toFixed(4) }} ETH
            </div>
          </template>

          <template #[`item.successful`]="{ item }">
            <v-btn
              x-small
              tile
              text
              class="text-capitalize"
              style="pointer-events: none"
              :color="item.successful ? 'green' : 'pink'"
            >
              <v-icon size="12"> {{ item.successful ? 'mdi-check-outline' : 'mdi-close-outline' }}</v-icon>
              <span class="pl-2 caption">{{ item.successful ? 'Success' : 'Failed' }}</span>
            </v-btn>
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
})
export default class Transaction extends mixins(Transactions) {}
</script>
