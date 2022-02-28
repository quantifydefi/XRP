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
            <v-divider class="my-2" />
            <v-row no-gutters class="mb-2">
              <v-col> </v-col>
            </v-row>
          </v-col>
          <v-col cols="8">
            <v-form ref="depositForm" v-model="depositFormValid">
              <div v-for="(item, i) in pool.coins" :key="i">
                <v-row>
                  <v-col class="mb-1 caption">Your Wallet Balance:</v-col>
                  <v-col class="text-right caption">
                    <span class="font-weight-medium"> {{ item.walletBalance }}</span>
                  </v-col>
                </v-row>
                <v-text-field
                  v-model="item.amount"
                  :rules="[item.inputVal.rules.mustBeNumber]"
                  outlined
                  color="pink"
                  clearable
                  dense
                  class="rounded-0 text-right"
                  placeholder="Number of Tokens"
                >
                  <template #prepend-inner>
                    <v-row no-gutters>
                      <div class="text-no-wrap text-left" style="width: 70px">
                        <v-avatar size="18">
                          <v-img :alt="`${item.symbol} logo`" :src="item.image" @error="setAltImg" />
                        </v-avatar>
                        <span class="mx-2 mt-1 subtitle-2" :class="ui[theme].headerTextClass">{{ item.symbol }}</span>
                      </div>
                      <v-divider class="mx-3" vertical></v-divider>
                    </v-row>
                  </template>
                </v-text-field>
              </div>
              <v-checkbox
                v-if="pool.isMetaPool"
                v-model="pool.depositWrapped"
                disabled
                dense
                class="py-0 my-0"
                label="Deposit Wrapped"
              ></v-checkbox>
              <div class="grey--text">
                You'll receive minimum
                <strong> {{ (calculatedLPBalanceCoin + calculatedLPBalanceMetaCoins).toFixed(2) }}</strong> Curve 3pool
                LP tokens {{ maxSlippage * 100 }}% max slippage
              </div>
              <v-btn
                v-if="actionType === 'deposit'"
                tile
                :disabled="!depositFormValid"
                :loading="loading"
                class="text-capitalize mb-4"
                block
                color="primary"
                @click="addLiquidity"
              >
                Deposit
              </v-btn>
            </v-form>
          </v-col>
        </v-row>
        <v-row v-if="actionType === 'withdraw'" class="mb-1 mt-4" no-gutters justify="center">
          <v-col cols="12">
            <v-divider class="my-2" />
            <v-row no-gutters class="mb-2">
              <v-col> </v-col>
            </v-row>
          </v-col>
          <v-col cols="8">
            <v-form ref="depositForm" v-model="depositFormValid">
              <v-row>
                <v-col class="mb-1 caption">Your LP Balance:</v-col>
                <v-col class="text-right caption">
                  <span class="font-weight-medium"> {{ pool.lpBalance }}</span>
                </v-col>
              </v-row>
              <v-text-field
                v-model="pool.lpBalanceToWithdraw"
                outlined
                color="pink"
                clearable
                dense
                class="rounded-0 text-right"
                placeholder="Number of Tokens"
              >
                <template #prepend-inner>
                  <v-row no-gutters>
                    <div class="text-no-wrap text-left" style="width: 120px">
                      <v-avatar v-for="(coin, i) in pool.coins" :key="i" size="24" class="mr-2">
                        <img :alt="`${pool.coingeckoInfo.symbol} logo`" :src="coin.image" @error="setAltImg" />
                      </v-avatar>
                    </div>
                    <v-divider class="mx-3" vertical></v-divider>
                  </v-row>
                </template>
              </v-text-field>

              <v-btn tile :loading="loading" class="text-capitalize mb-4" block color="primary" @click="withdraw">
                Withdraw
              </v-btn>
            </v-form>
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
import { CurvePoolAction } from '~/models/web3'

@Component({
  name: 'CurvePoolActions',
  computed: {
    ...mapState({
      ui: (state: any) => state.ui,
      theme: (state: any) => state.ui.theme,
    }),
  },
})
export default class CurvePoolActions extends mixins(CurvePoolAction) {}
</script>
