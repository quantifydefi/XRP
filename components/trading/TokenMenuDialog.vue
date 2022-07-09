<template>
  <v-dialog v-model="dialog" persistent hide-overlay max-width="375">
    <v-card tile outlined>
      <v-card-title class="subtitle-1 pa-3">
        Select Token
        <v-spacer />
        <v-btn icon @click="$emit('close-dialog')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-row justify="center" no-gutters>
        <v-col cols="11">
          <v-text-field
            v-model="tokenAddressSearch"
            dense
            class="rounded-0"
            outlined
            solo
            clearable
            label="Search or paste token address"
          >
            <!--                      <template #append>-->
            <!--                        <v-fade-transition leave-absolute>-->
            <!--                          <v-progress-circular v-if="loading" size="24" indeterminate></v-progress-circular>-->
            <!--                          <v-icon v-else-if="!loading && isValidAddress" color="success">mdi-check-circle-outline </v-icon>-->
            <!--                          <v-icon v-else-if="!loading && isValidAddress === false" color="red accent"-->
            <!--                            >mdi-close-circle-outline-->
            <!--                          </v-icon>-->
            <!--                        </v-fade-transition>-->
            <!--                      </template>-->
          </v-text-field>
        </v-col>
      </v-row>

      <v-divider />
      <v-list class="text-left overflow-y-auto" max-height="340">
        <v-list-item v-for="item in tokenList" :key="item.contract_symbol" @click="$emit('close-dialog')">
          <v-row no-gutters class="py-1">
            <v-col cols="2">
              <v-list-item-title class="subtitle-2 font-weight-regular">
                <v-avatar size="28" class="mt-2">
                  <img
                    :src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${item.contract_symbol}.png`"
                  />
                </v-avatar>
              </v-list-item-title>
            </v-col>
            <v-col cols="7" class="ml-n3">
              <div class="subtitle-1 font-weight-medium">
                {{ item.contract_name }}
              </div>
              <div class="mt-n1 subtitle-2 font-weight-regular">
                {{ item.contract_symbol.toUpperCase() }}
              </div>
            </v-col>
            <v-col class="text-right"> <div class="mt-2 number-font">0</div></v-col>
          </v-row>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, toRef } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'TokenMenuDialog',
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const loading = ref(false)
    const tokenAddressSearch = ref('')
    const dialog = toRef(props, 'isVisible')

    const tokenList = [
      {
        contract_name: 'Ethereum',
        contract_symbol: 'eth',
        contract_address: '1',
      },
      {
        contract_name: 'Aave',
        contract_symbol: 'aave',
        contract_address: '2',
      },
      {
        contract_name: 'Balancer',
        contract_symbol: 'bal',
        contract_address: '3',
      },
      {
        contract_name: 'Basic Attention Token',
        contract_symbol: 'bat',
        contract_address: '4',
      },
      {
        contract_name: 'USD Coin',
        contract_symbol: 'usdc',
        contract_address: '5',
      },
      {
        contract_name: 'Tether USD',
        contract_symbol: 'usdt',
        contract_address: '6',
      },
      {
        contract_name: 'Uniswap',
        contract_symbol: 'uni',
        contract_address: '7',
      },
    ]

    return { loading, dialog, tokenList, tokenAddressSearch }
  },
})
</script>
