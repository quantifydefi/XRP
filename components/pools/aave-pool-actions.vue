<template>
  <v-dialog v-model="dialog" persistent width="700" max-width="700">
    <v-card tile outlined max-width="700">
      <div class="text-right">
        <v-icon class="mt-2 mr-2" @click="dialog = false">mdi-close</v-icon>
      </div>

      <v-row no-gutters>
        <v-col cols="12" class="pt-2">
          <div class="text-center">
            <v-btn-toggle v-model="actionType" color="primary" mandatory group>
              <v-btn v-for="action in actions" :key="action.value" height="32" :value="action.value" depressed outlined>
                {{ action.text }}
              </v-btn>
            </v-btn-toggle>
          </div>
        </v-col>
      </v-row>

      <div class="px-4">
        <v-alert v-model="alert" class="mx-0" :type="alertMessage.status" dismissible text max-width="700">
          {{ alertMessage.message }}
        </v-alert>
        <div v-if="alert" class="text--primary" @click="showTransactionLogs = !showTransactionLogs">
          <a href="#" class="text-decoration-none ba">Show Logs</a>
        </div>
        <div v-if="showTransactionLogs && alert" :class="[ui[theme].jsonLogs, 'pa-2']">
          <span :class="ui[theme].innerCardLighten">{{ alertMessage.logs }}</span>
        </div>
      </div>

      <div v-if="pool" class="px-4">
        <v-row v-if="actionType === 'deposit'" class="mb-1 mt-4" no-gutters justify="center">
          <v-col cols="12">
            <v-row no-gutters>
              <v-col>
                <v-simple-table>
                  <template #default>
                    <tbody>
                      <tr v-for="(item, index) in uiTables.deposit.basicStats" :key="index">
                        <td :class="[ui[theme].innerCardLighten]">{{ item.name }}</td>
                        <td :class="item.class">{{ item.value }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
              <v-col>
                <v-simple-table>
                  <template #default>
                    <tbody>
                      <tr v-for="(item, index) in uiTables.deposit.reserves" :key="index">
                        <td :class="[ui[theme].innerCardLighten]">
                          {{ item.name }}
                          <span v-if="item.isTooltip">
                            <v-tooltip right color="black" max-width="400">
                              <template #activator="{ on, attrs }">
                                <v-btn icon color="grey" x-small v-bind="attrs" v-on="on">
                                  <v-icon size="14">mdi-information-outline</v-icon>
                                </v-btn>
                              </template>
                              <div class="pa-2">
                                <p class="text-center font-weight-bold text-subtitle-1">
                                  {{ item.tooltip.title }}
                                </p>
                                <p>{{ item.tooltip.text }}</p>
                              </div>
                            </v-tooltip>
                          </span>
                        </td>
                        <td :class="item.class">
                          {{ item.value }}
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row>
            <v-divider class="my-2" />
            <v-row no-gutters class="mb-2">
              <v-col>
                <v-simple-table>
                  <template #default>
                    <tbody>
                      <tr v-for="(item, index) in uiTables.deposit.wallet" :key="index">
                        <td style="width: 332px" :class="[ui[theme].innerCardLighten]">{{ item.name }}</td>
                        <td>
                          <span>{{ item.value }}</span>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="8">
            <v-row>
              <v-col class="mb-1 caption"> Allowed To Deposit:</v-col>
              <v-col class="text-right caption">
                <span class="font-weight-medium"> {{ pool.portfolio.walletBal }}</span>
                {{ pool.symbol }}
              </v-col>
            </v-row>
            <v-form ref="depositForm" v-model="depositFormValid">
              <v-text-field
                v-model="amount"
                :rules="[
                  values.inputNum.rules.required,
                  values.inputNum.rules.mustBeNumber,
                  values.inputNum.rules.musBeMoreThen0,
                ]"
                :disabled="values.inputNum.disabled"
                outlined
                color="pink"
                clearable
                dense
                class="rounded-0 text-right"
                placeholder="Number of Tokens"
              >
                <template #prepend-inner>
                  <v-row class="ml-0 my-0 mr-1">
                    <div class="text-no-wrap">
                      <v-avatar size="19">
                        <v-img
                          :alt="`${pool.symbol} logo`"
                          :src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${pool.symbol.toLowerCase()}.png`"
                          @error="setAltImg"
                        />
                      </v-avatar>

                      <span class="mx-2 subtitle-2" :class="ui[theme].headerTextClass">{{ pool.symbol }}</span>
                    </div>
                    <v-divider class="mx-3" vertical></v-divider>
                  </v-row>
                </template>
              </v-text-field>

              <v-btn
                v-if="actionType === 'deposit'"
                tile
                :disabled="!depositFormValid"
                :loading="loading"
                class="text-capitalize mb-4"
                block
                color="primary"
                @click="deposit"
              >
                Deposit
              </v-btn>
            </v-form>

            <v-btn
              v-if="actionType === 'borrow'"
              tile
              :disabled="!depositFormValid"
              :loading="loading"
              class="text-capitalize"
              block
              color="primary"
              @click="borrow"
            >
              Borrow
            </v-btn>

            <v-btn
              v-if="actionType === 'repay'"
              tile
              :disabled="!depositFormValid"
              :loading="loading"
              class="text-capitalize"
              block
              color="primary"
              @click="repay"
            >
              Repay
            </v-btn>

            <v-btn
              v-if="actionType === 'withdraw'"
              tile
              :disabled="!depositFormValid"
              :loading="loading"
              class="text-capitalize"
              block
              color="primary"
              @click="withdraw"
            >
              Withdraw
            </v-btn>
          </v-col>
          <div v-if="stepLogs.length" class="mt-3">
            <span v-for="item in stepLogs" :key="item.value">
              <v-progress-circular v-if="item.isLoading" size="20" class="mr-4" indeterminate color="orange" />
              <v-icon v-else :color="item.iconColor" class="mr-2" size="20">{{ item.icon }}</v-icon>
              Checking Wallet balance
            </span>
          </div>
        </v-row>
        <v-row v-if="actionType === 'borrow'" class="mb-1 mt-4" no-gutters justify="center">
          <v-col cols="12">
            <v-row no-gutters>
              <v-col>
                <v-simple-table>
                  <template #default>
                    <tbody>
                      <tr v-for="(item, index) in uiTables.borrow.basicStats" :key="index">
                        <td :class="[ui[theme].innerCardLighten]">{{ item.name }}</td>
                        <td :class="item.class">{{ item.value }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
              <v-col>
                <v-simple-table>
                  <template #default>
                    <tbody>
                      <tr v-for="(item, index) in uiTables.borrow.reserves" :key="index">
                        <td :class="[ui[theme].innerCardLighten]">{{ item.name }}</td>
                        <td :class="item.class">{{ item.value }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row>
            <v-divider class="my-2" />
            <v-row no-gutters class="mb-2">
              <v-col>
                <v-simple-table>
                  <template #default>
                    <tbody>
                      <tr v-for="(item, index) in uiTables.borrow.wallet" :key="index">
                        <td style="width: 332px" :class="[ui[theme].innerCardLighten]">{{ item.name }}</td>
                        <td>
                          <span>{{ item.value }}</span>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="8">
            <v-row>
              <v-col class="mb-1 caption"> Allowed To Borrow:</v-col>
              <v-col class="text-right caption">
                <span class="font-weight-medium"> {{ allowedToBorrow }}</span>
                {{ pool.symbol }}
              </v-col>
            </v-row>
            <v-form ref="depositForm" v-model="depositFormValid">
              <v-text-field
                v-model="amount"
                :rules="[
                  values.inputNum.rules.required,
                  values.inputNum.rules.mustBeNumber,
                  values.inputNum.rules.musBeMoreThen0,
                ]"
                :disabled="values.inputNum.disabled"
                outlined
                color="pink"
                clearable
                dense
                class="rounded-0 text-right"
                placeholder="Number of Tokens"
              >
                <template #prepend-inner>
                  <v-row class="ml-0 my-0 mr-1">
                    <div class="text-no-wrap">
                      <v-avatar size="19">
                        <v-img
                          :alt="`${pool.symbol} logo`"
                          :src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${pool.symbol.toLowerCase()}.png`"
                          @error="setAltImg"
                        />
                      </v-avatar>

                      <span class="mx-2 subtitle-2" :class="ui[theme].headerTextClass">{{ pool.symbol }}</span>
                    </div>
                    <v-divider class="mx-3" vertical></v-divider>
                  </v-row>
                </template>
              </v-text-field>

              <v-btn
                v-if="actionType === 'deposit'"
                tile
                :disabled="!depositFormValid"
                :loading="loading"
                class="text-capitalize mb-4"
                block
                color="primary"
                @click="deposit"
              >
                Deposit
              </v-btn>
            </v-form>

            <v-btn
              v-if="actionType === 'borrow'"
              tile
              :disabled="!depositFormValid"
              :loading="loading"
              class="text-capitalize mb-4"
              block
              color="primary"
              @click="borrow"
            >
              Borrow
            </v-btn>

            <v-btn
              v-if="actionType === 'repay'"
              tile
              :disabled="!depositFormValid"
              :loading="loading"
              class="text-capitalize mb-4"
              block
              color="primary"
              @click="repay"
            >
              Repay
            </v-btn>

            <v-btn
              v-if="actionType === 'withdraw'"
              tile
              :disabled="!depositFormValid"
              :loading="loading"
              class="text-capitalize"
              block
              color="primary"
              @click="withdraw"
            >
              Withdraw
            </v-btn>
          </v-col>
          <div v-if="stepLogs.length" class="mt-3">
            <span v-for="item in stepLogs" :key="item.value">
              <v-progress-circular v-if="item.isLoading" size="20" class="mr-4" indeterminate color="orange" />
              <v-icon v-else :color="item.iconColor" class="mr-2" size="20">{{ item.icon }}</v-icon>
              Checking Wallet balance
            </span>
          </div>
        </v-row>
        <v-row v-if="actionType === 'repay'" class="mb-1 mt-4" no-gutters justify="center">
          <v-col cols="12">
            <v-row no-gutters>
              <v-col>
                <v-simple-table>
                  <template #default>
                    <tbody>
                      <tr v-for="(item, index) in uiTables.repay.basicStats" :key="index">
                        <td :class="[ui[theme].innerCardLighten]">{{ item.name }}</td>
                        <td :class="item.class">
                          <div>{{ item.value.toFixed(6) + ' ' + pool.symbol }}</div>
                          <div :class="[ui[theme].innerCardLighten]">
                            {{ '$ ' + (item.value * pool.usdPrice).toLocaleString() + ' USD' }}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
              <v-col>
                <v-simple-table>
                  <template #default>
                    <tbody>
                      <tr v-for="(item, index) in uiTables.repay.stats" :key="index">
                        <td :class="[ui[theme].innerCardLighten]">
                          {{ item.name }}
                          <span v-if="item.isTooltip">
                            <v-tooltip right color="black" max-width="400">
                              <template #activator="{ on, attrs }">
                                <v-btn icon color="grey" x-small v-bind="attrs" v-on="on">
                                  <v-icon size="14">mdi-information-outline</v-icon>
                                </v-btn>
                              </template>
                              <div class="pa-2">
                                <p class="text-center font-weight-bold text-subtitle-1">
                                  {{ item.tooltip.title }}
                                </p>
                                <p>{{ item.tooltip.text }}</p>
                              </div>
                            </v-tooltip>
                          </span>
                        </td>
                        <td :class="item.class">
                          <div style="padding-bottom: 11px; padding-top: 11px">{{ item.value }}</div>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row>
            <v-divider class="my-2" />
          </v-col>

          <v-col cols="8">
            <v-row>
              <v-col class="mb-1 caption"> Allowed To Repay:</v-col>
              <v-col class="text-right caption">
                <span class="font-weight-medium"> {{ pool.portfolio.walletBal }}</span>
                {{ pool.symbol }}
              </v-col>
            </v-row>
            <v-form ref="depositForm" v-model="depositFormValid">
              <v-text-field
                v-model="amount"
                :rules="[
                  values.inputNum.rules.required,
                  values.inputNum.rules.mustBeNumber,
                  values.inputNum.rules.musBeMoreThen0,
                ]"
                :disabled="values.inputNum.disabled"
                outlined
                color="pink"
                clearable
                dense
                class="rounded-0 text-right"
                placeholder="Number of Tokens"
              >
                <template #prepend-inner>
                  <v-row class="ml-0 my-0 mr-1">
                    <div class="text-no-wrap">
                      <v-avatar size="19">
                        <v-img
                          :alt="`${pool.symbol} logo`"
                          :src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${pool.symbol.toLowerCase()}.png`"
                          @error="setAltImg"
                        />
                      </v-avatar>

                      <span class="mx-2 subtitle-2" :class="ui[theme].headerTextClass">{{ pool.symbol }}</span>
                    </div>
                    <v-divider class="mx-3" vertical></v-divider>
                  </v-row>
                </template>
              </v-text-field>
            </v-form>

            <v-btn
              v-if="actionType === 'repay'"
              tile
              :disabled="!depositFormValid"
              :loading="loading"
              class="text-capitalize mb-4"
              block
              color="primary"
              @click="repay"
            >
              Repay
            </v-btn>
          </v-col>
          <div v-if="stepLogs.length" class="mt-3">
            <span v-for="item in stepLogs" :key="item.value">
              <v-progress-circular v-if="item.isLoading" size="20" class="mr-4" indeterminate color="orange" />
              <v-icon v-else :color="item.iconColor" class="mr-2" size="20">{{ item.icon }}</v-icon>
              Checking Wallet balance
            </span>
          </div>
        </v-row>
        <v-row v-if="actionType === 'withdraw'" class="mb-1 mt-4" no-gutters justify="center">
          <v-col cols="12">
            <v-row no-gutters>
              <v-col>
                <v-simple-table>
                  <template #default>
                    <tbody>
                      <tr v-for="(item, index) in uiTables.withdraw.stats" :key="index">
                        <td :class="[ui[theme].innerCardLighten]">
                          {{ item.name }}
                          <span v-if="item.isTooltip">
                            <v-tooltip right color="black" max-width="400">
                              <template #activator="{ on, attrs }">
                                <v-btn icon color="grey" x-small v-bind="attrs" v-on="on">
                                  <v-icon size="14">mdi-information-outline</v-icon>
                                </v-btn>
                              </template>
                              <div class="pa-2">
                                <p class="text-center font-weight-bold text-subtitle-1">
                                  {{ item.tooltip.title }}
                                </p>
                                <p>{{ item.tooltip.text }}</p>
                              </div>
                            </v-tooltip>
                          </span>
                        </td>
                        <td :class="item.class">
                          <div>{{ item.value }}</div>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row>
            <v-divider class="mb-4" />
          </v-col>

          <v-col cols="8">
            <v-row>
              <v-col class="mb-1 caption">Allowed To Withdraw:</v-col>
              <v-col class="text-right caption">
                <span class="font-weight-medium"> {{ allowedToWithdraw }}</span>
                {{ pool.symbol }}
              </v-col>
            </v-row>
            <v-form ref="depositForm" v-model="depositFormValid">
              <v-text-field
                v-model="amount"
                :rules="[
                  values.inputNum.rules.required,
                  values.inputNum.rules.mustBeNumber,
                  values.inputNum.rules.musBeMoreThen0,
                ]"
                :disabled="values.inputNum.disabled"
                outlined
                color="pink"
                clearable
                dense
                class="rounded-0 text-right"
                placeholder="Number of Tokens"
              >
                <template #prepend-inner>
                  <v-row class="ml-0 my-0 mr-1">
                    <div class="text-no-wrap">
                      <v-avatar size="19">
                        <v-img
                          :alt="`${pool.symbol} logo`"
                          :src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${pool.symbol.toLowerCase()}.png`"
                          @error="setAltImg"
                        />
                      </v-avatar>

                      <span class="mx-2 subtitle-2" :class="ui[theme].headerTextClass">{{ pool.symbol }}</span>
                    </div>
                    <v-divider class="mx-3" vertical></v-divider>
                  </v-row>
                </template>
              </v-text-field>
            </v-form>

            <v-btn
              tile
              :disabled="!depositFormValid"
              :loading="loading"
              class="text-capitalize mb-4"
              block
              color="primary"
              @click="withdraw"
            >
              Withdraw
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { mapState } from 'vuex'
import { AavePoolAction } from '~/models/web3'

@Component({
  name: 'AavePoolActions',
  computed: {
    ...mapState({
      ui: (state: any) => state.ui,
      theme: (state: any) => state.ui.theme,
    }),
  },
})
export default class AavePoolActions extends mixins(AavePoolAction) {}
</script>
