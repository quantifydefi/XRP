<template>
  <v-dialog v-model="dialog" width="436">
    <v-card tile outlined min-height="220">
      <v-row no-gutters>
        <v-col cols="12">
          <div class="text-center">
            <v-btn-toggle v-model="actionType" tile color="primary" mandatory group>
              <v-btn v-for="action in actions" :key="action.value" rounded small :value="action.value">
                {{ action.text }}
              </v-btn>
            </v-btn-toggle>
          </div>
        </v-col>
      </v-row>

      <div v-if="pool" class="px-4">
        <v-row class="mb-1 mt-4" no-gutters>
          <v-alert v-model="alert" width="100%" text :type="message.status" dismissible>{{ message.message }}</v-alert>
          <v-col class="mb-1 caption"> Balance:</v-col>
          <v-col v-if="!loadingWalletTokenBalance" class="text-right caption">
            <span class="font-weight-medium"> {{ allowedToDeposit }}</span>
            {{ pool.symbol }}
          </v-col>
          <v-col v-else class="text-right">
            Loading<v-progress-circular size="20" class="ml-1" indeterminate color="primary" />
          </v-col>

          <v-col cols="12">
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
                class="text-capitalize"
                block
                color="primary"
                @click="deposit"
              >
                Deposit
              </v-btn>
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
            </v-form>
          </v-col>

          <div v-if="stepLogs.length" class="mt-3">
            <span v-for="item in stepLogs" :key="item.value">
              <v-progress-circular v-if="item.isLoading" size="20" class="mr-4" indeterminate color="orange" />
              <v-icon v-else :color="item.iconColor" class="mr-2" size="20">{{ item.icon }}</v-icon>
              Checking Wallet balance
            </span>
          </div>
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
