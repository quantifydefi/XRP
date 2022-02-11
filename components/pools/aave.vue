<template>
  <v-row>
    <v-col v-if="isPoolsLoading">
      <v-row>
        <v-col v-for="i in 4" :key="i">
          <v-card height="240" tile outlined>
            <v-skeleton-loader type="table-heading, image" height="240" />
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card height="100%" tile outlined>
            <v-skeleton-loader type="table-tbody, table-tbody" />
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col v-show="!isPoolsLoading" cols="12">
      <v-row v-if="isWalletConnected">
        <v-col lg="3" md="6" cols="12">
          <v-card outlined tile height="100%" class="pa-2">
            <span class="text-subtitle-1">Aave Information</span>
            <v-simple-table>
              <template #default>
                <tbody class="text-subtitle-1 text-no-wrap">
                  <tr>
                    <td :class="[ui[theme].innerCardLighten]">Total Collateral</td>
                    <td>{{ '$ ' + totalCollateral.toLocaleString() + ' USD' }}</td>
                  </tr>

                  <tr>
                    <td :class="[ui[theme].innerCardLighten]">Total Borrowed</td>
                    <td>{{ '$ ' + totalBorrowed.toLocaleString() + ' USD' }}</td>
                  </tr>

                  <tr>
                    <td :class="[ui[theme].innerCardLighten]">Health Factor</td>
                    <td>{{ healthFactor.toFixed(2) + ' %' }}</td>
                  </tr>

                  <tr>
                    <td :class="[ui[theme].innerCardLighten]">Max LTV</td>
                    <td>{{ maxTLV.toFixed(2) + ' %' }}</td>
                  </tr>

                  <tr>
                    <td :class="[ui[theme].innerCardLighten]">Current LTV</td>
                    <td>{{ currentLTV.toFixed(2) + ' %' }}</td>
                  </tr>
                  <tr>
                    <td :class="[ui[theme].innerCardLighten]">Liquidation Threshold</td>
                    <td>{{ liquidationThreshold.toFixed(2) + ' %' }}</td>
                  </tr>
                  <tr>
                    <td :class="[ui[theme].innerCardLighten]">Borrowing Power Used</td>
                    <td>{{ borrowingPowerUsed.toFixed(2) + ' %' }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>
        <v-col v-for="(item, index) in portfolioComposition" :key="index" lg="3" md="6" cols="12">
          <v-card tile outlined height="100%" class="pa-2">
            <span class="text-subtitle-1">{{ item.name }}</span>
            <aave-composition-chart :data="item.data" />
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-card v-if="!isPoolsLoading" tile outlined height="100%">
        <v-data-table
          id="curve-pools-grid"
          :headers="config.cols"
          :items="aaveMainPoolsFiltered"
          :sort-by="['usdBalance']"
          :sort-desc="[true]"
          height="100%"
          :items-per-page="20"
          class="elevation-0"
        >
          <template #header.tokenBalance="{ header }">
            {{ header.text }}
            <v-tooltip top color="black">
              <template #activator="{ on, attrs }">
                <v-btn icon color="grey" x-small v-bind="attrs" v-on="on">
                  <v-icon size="14">mdi-information-outline</v-icon>
                </v-btn>
              </template>
              Total Token Balance
            </v-tooltip>
          </template>

          <!--      Cols-->
          <template #[`item.symbol`]="{ item }">
            <div class="my-1">
              <v-row no-gutters align="center">
                <v-col cols="3">
                  <v-avatar size="24" class="mr-2">
                    <img :alt="`${item.symbol} logo`" :src="item.logoUrl" @error="setAltImg" />
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
                                <v-btn color="red" fab tile height="10" width="10" class="pa-0 mr-1"></v-btn>Total
                                Borrowed
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

                          <v-divider class="mb-3" />

                          <v-row no-gutters justify="center" class="text-center">
                            <v-col>
                              <div>Maximum LTV</div>
                              <div class="font-weight-bold">
                                {{ item.loanToValue > 0 ? item.loanToValue + ' %' : '-' }}
                              </div>
                            </v-col>
                            <v-col>
                              <div>Liquidation threshold</div>
                              <div class="font-weight-bold">
                                {{ item.liquidationThreshold > 0 ? item.liquidationThreshold + ' %' : '-' }}
                              </div>
                            </v-col>
                            <v-col>
                              <div>Liquidation Penalty</div>
                              <div class="font-weight-bold">
                                {{ item.liquidationPenalty > 0 ? item.liquidationPenalty + ' %' : '-' }}
                              </div>
                            </v-col>
                            <v-col>
                              <div>Used as collateral</div>
                              <div
                                :class="[
                                  'font-weight-bold',
                                  item.usageAsCollateralEnabled ? 'green--text' : 'red--text',
                                ]"
                              >
                                {{ item.usageAsCollateralEnabled ? 'Yes' : 'No' }}
                              </div>
                            </v-col>
                          </v-row>
                        </div>
                      </v-tooltip>

                      <v-tooltip v-if="item.symbol !== 'ETH'" bottom color="black">
                        <template #activator="{ on, attrs }">
                          <v-btn icon color="grey" x-small v-bind="attrs" @click="importToMetamask(item.id)" v-on="on">
                            <v-icon size="14">mdi-wallet</v-icon>
                          </v-btn>
                        </template>
                        <span>Import To Metamask Wallet</span>
                      </v-tooltip>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </div>
          </template>

          <template #[`item.walletTokenBal`]="{ item }">
            <div>{{ item.portfolio.walletBal.toLocaleString() }}</div>
            <div :class="[ui[theme].innerCardLighten]">
              ${{ (item.portfolio.walletBal * item.usdPrice).toLocaleString() }}
            </div>
          </template>

          <template #[`item.deposits`]="{ item }">
            <div>{{ item.portfolio.totalDeposits.toLocaleString() }}</div>
            <div :class="[ui[theme].innerCardLighten]">
              ${{ (item.portfolio.totalDeposits * item.usdPrice).toLocaleString() }}
            </div>
          </template>

          <template #[`item.borrows`]="{ item }">
            <div>{{ item.portfolio.variableBorrow.toLocaleString() }}</div>
            <div :class="[ui[theme].innerCardLighten]">
              ${{ (item.portfolio.variableBorrow * item.usdPrice).toLocaleString() }}
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

          <template #[`item.action`]="{ item }">
            <v-btn
              v-for="action in aaveActions"
              :key="action.value"
              text
              outlined
              color="pink"
              class="pa-1 ma-1"
              height="26"
              @click="invest(item.id, action.value)"
            >
              <span class="text-caption">{{ action.text }}</span>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
    <aave-pool-actions ref="poolAction" @transaction-result="transactionResult" />
  </v-row>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { mapState } from 'vuex'
import { AavePools } from '~/models/pool'
import AaveCompositionChart from '~/components/pools/AaveCompositionChart.vue'
@Component({
  name: 'AavePool',
  computed: {
    ...mapState({
      ui: (state: any) => state.ui,
      theme: (state: any) => state.ui.theme,
      isWalletConnected: (state: any) => state.wallet.isWalletConnected,
    }),
  },
  components: {
    AavePoolActions: () => import('~/components/pools/aave-pool-actions.vue'),
    AaveCompositionChart,
  },
})
export default class AavePool extends mixins(AavePools) {}
</script>

<style>
.v-progress-circular__underlay {
  stroke: #f44336 !important;
}
</style>
