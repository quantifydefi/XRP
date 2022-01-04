<template>
  <v-card tile outlined height="100%">
    <v-skeleton-loader v-if="isPoolsLoading" type="table-tbody,table-tbody" />
    <v-data-table
      v-if="aaveMainNetPools.length"
      id="curve-pools-grid"
      :headers="config.cols"
      :items="aaveMainPoolsFiltered"
      :sort-by="['usdBalance']"
      :sort-desc="[true]"
      height="100%"
      :items-per-page="10"
      class="elevation-0"
    >
      <template #[`item.symbol`]="{ item }">
        <div class="my-1">
          <v-row no-gutters align="center">
            <v-col cols="3">
              <v-avatar size="24" class="mr-2">
                <img
                  :alt="`${item.symbol} logo`"
                  :src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${item.symbol.toLowerCase()}.png`"
                  @error="setAltImg"
                />
              </v-avatar>
            </v-col>
            <v-col>
              <v-row no-gutters>
                <v-col>
                  <span class="text-capitalize font-weight-bold pink--text">{{ item.name }}</span>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col>
                  <span :class="[ui[theme].innerCardLighten, 'text-caption']"> {{ item.symbol }} </span>

                  <v-tooltip right color="black">
                    <template #activator="{ on, attrs }">
                      <v-btn icon color="grey" x-small v-bind="attrs" v-on="on">
                        <v-icon size="14">mdi-information-outline</v-icon>
                      </v-btn>
                    </template>

                    <div class="py-4" style="width: 700px">
                      <v-row align="center">
                        <v-col>
                          <div :class="[ui[theme].innerCardLighten, 'text-right', 'text-caption']">
                            <v-btn color="red" fab tile height="10" width="10" class="pa-0 mr-1"></v-btn>Total Borrowed
                          </div>
                          <div class="text-right text-h5">{{ item.totalBorrowBalance.toLocaleString() }}</div>
                          <div :class="[ui[theme].innerCardLighten, 'text-right']">
                            ${{ item.totalBorrowBalanceUsd.toLocaleString() }}
                          </div>
                        </v-col>

                        <v-col class="mt-2">
                          <v-row justify="center">
                            <v-progress-circular
                              :value="100 - item.utilizationRatePtc"
                              width="10"
                              color="green"
                              size="120"
                            ></v-progress-circular>
                          </v-row>
                        </v-col>
                        <v-col>
                          <div :class="[ui[theme].innerCardLighten, 'text-caption']">
                            Available Liquidity
                            <v-btn color="green" fab tile height="10" width="10" class="pa-0 mr-1"></v-btn>
                          </div>
                          <div class="text-h5">{{ item.availableLiquidityBalance.toLocaleString() }}</div>
                          <div :class="[ui[theme].innerCardLighten]">
                            ${{ item.availableLiquidityUsd.toLocaleString() }}
                          </div>
                        </v-col>
                      </v-row>

                      <v-row no-gutters class="mt-6">
                        <v-col class="mx-3">
                          <div class="text-right">
                            <span :class="[ui[theme].innerCardLighten]">Reserve size:</span>
                            <span>${{ item.reserveSizeUsd.toLocaleString() }}</span>
                          </div>
                        </v-col>

                        <v-col class="mx-3">
                          <div>
                            <span :class="[ui[theme].innerCardLighten]">Utilisation rate:</span>
                            <span>{{ item.utilizationRatePtc.toFixed(2) }}%</span>
                          </div>
                        </v-col>
                      </v-row>

                      <v-row>
                        <v-col>
                          <v-simple-table>
                            <template #default>
                              <thead>
                                <tr>
                                  <th class="text-left">Deposits</th>
                                  <th class="text-left"></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td :class="[ui[theme].innerCardLighten]">Deposit APY</td>
                                  <td>{{ (item.depositAPY * 100).toFixed(2) }} %</td>
                                </tr>
                                <tr>
                                  <td :class="[ui[theme].innerCardLighten]">Deposit APR</td>
                                  <td>{{ (item.depositAPR * 100).toFixed(2) }} %</td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </v-col>

                        <v-col>
                          <v-simple-table>
                            <template #default>
                              <thead>
                                <tr>
                                  <th class="text-left">Stable Borrowing</th>
                                  <th class="text-left"></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td :class="[ui[theme].innerCardLighten]">Borrow APY</td>
                                  <td>{{ (item.stableBorrowAPY * 100).toFixed(2) }} %</td>
                                </tr>
                                <tr>
                                  <td :class="[ui[theme].innerCardLighten]">Borrow APR</td>
                                  <td>{{ (item.stableBorrowAPR * 100).toFixed(2) }} %</td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </v-col>

                        <v-col>
                          <v-simple-table>
                            <template #default>
                              <thead>
                                <tr>
                                  <th class="text-left">Variable Borrowing</th>
                                  <th class="text-left"></th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td :class="[ui[theme].innerCardLighten]">Deposit APY</td>
                                  <td>{{ (item.variableBorrowAPY * 100).toFixed(2) }} %</td>
                                </tr>
                                <tr>
                                  <td :class="[ui[theme].innerCardLighten]">Deposit APR</td>
                                  <td>{{ (item.variableBorrowAPR * 100).toFixed(2) }} %</td>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </v-col>
                      </v-row>
                    </div>
                  </v-tooltip>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </template>

      <template #[`item.tokenBalance`]="{ item }">
        <span :class="[ui[theme].innerCardLighten]">{{ valueFormatter(item.tokenBalance / 10 ** 6, 4, 2) }} M</span>
      </template>

      <template #[`item.usdBalance`]="{ item }">
        <span>${{ (item.usdBalance / 10 ** 6).toFixed(2) }} M</span>
      </template>

      <template #[`item.availableBalance`]>
        <div>
          <div class="subtitle-2">0</div>
          <div class="text-no-wrap">
            0.00
            <span class="caption">USD</span>
          </div>
        </div>
      </template>

      <template #[`item.depositAPY`]="{ item }">
        <span :class="[ui[theme].innerCardLighten]">{{ (item.depositAPY * 100).toFixed(2) }} %</span>
      </template>

      <template #[`item.variableBorrowAPY`]="{ item }">
        <span :class="[ui[theme].innerCardLighten]">{{ (item.variableBorrowAPY * 100).toFixed(2) }} %</span>
      </template>

      <template #[`item.stableBorrowAPY`]="{ item }">
        <span :class="[ui[theme].innerCardLighten]">{{ (item.stableBorrowAPY * 100).toFixed(2) }} %</span>
      </template>

      <template #[`item.totalBorrowBalance`]="{ item }">
        <span :class="[ui[theme].innerCardLighten]">
          {{ valueFormatter(item.totalBorrowBalance / 10 ** 6, 3, 3) }} M
        </span>
      </template>

      <template #[`item.totalBorrowBalanceUsd`]="{ item }">
        <span>${{ (item.totalBorrowBalanceUsd / 10 ** 6).toFixed(2) }} M</span>
      </template>

      <template #[`item.link`]="{ item }">
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              color="primary"
              v-bind="attrs"
              x-small
              class="mb-1 ml-1"
              icon
              v-on="on"
              @click="copyAddressToClipboard(item.price.id)"
            >
              <v-icon size="18">mdi-content-copy</v-icon>
            </v-btn>
          </template>
          Copy Pool Address
        </v-tooltip>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              color="primary"
              v-bind="attrs"
              x-small
              class="mb-1 ml-1"
              icon
              v-on="on"
              @click="navigateToExplorer(item.price.id)"
            >
              <v-icon size="18">mdi-open-in-new</v-icon>
            </v-btn>
          </template>
          Open Pool in Etherscan
        </v-tooltip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { mapState } from 'vuex'
import { AavePools } from '~/models/pool'

@Component({
  name: 'AavePool',
  computed: {
    ...mapState({
      ui: (state: any) => state.ui,
      theme: (state: any) => state.ui.theme,
    }),
  },
})
export default class AavePool extends mixins(AavePools) {}
</script>

<style>
.v-progress-circular__underlay {
  stroke: #f44336 !important;
}
</style>
