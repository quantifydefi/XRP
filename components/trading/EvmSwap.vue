<template>
  <v-card outlined tile width="440">
    <div v-if="!receipt">
      <v-card-title class="subtitle-1 font-weight-medium py-3">
        Swap
        <v-spacer />
        <v-btn height="24" width="24" fab>
          <v-icon size="20">mdi-cog</v-icon>
        </v-btn>
      </v-card-title>
      <v-row no-gutters justify="center" class="pa-2">
        <v-col cols="12">
          <v-row no-gutters>
            <v-col class="px-3">
              <token-input-field
                form-trade-direction="input"
                :trade-direction="tradeDirection"
                :token="fromToken"
                :balance="fromTokenBalance"
                :expected-convert-quote="expectedConvertQuote"
                :loading="loading"
                @on-value-changed="onAmountChange"
                @on-uniswap-token-menu-open="onToggleTokenMenu('input')"
              />
            </v-col>
          </v-row>
        </v-col>

        <v-btn class="mt-n1 mb-3" text outlined fab small @click="onTokenChange">
          <v-icon size="28"> mdi-swap-horizontal-variant</v-icon>
        </v-btn>

        <v-col cols="12">
          <v-row no-gutters>
            <v-col class="px-3">
              <token-input-field
                form-trade-direction="output"
                :trade-direction="tradeDirection"
                :token="toToken"
                :balance="toTokenBalance"
                :expected-convert-quote="expectedConvertQuote"
                :loading="loading"
                @on-value-changed="onAmountChange"
                @on-uniswap-token-menu-open="onToggleTokenMenu('output')"
              />
            </v-col>
          </v-row>
        </v-col>

        <v-col v-if="errorMessage" cols="12">
          <v-alert text type="error" dismissible class="ma-2">{{ errorMessage }}</v-alert>
        </v-col>

        <v-col v-else cols="12">
          <v-row class="pa-3 caption font-weight-medium">
            <v-col cols="12">
              <v-card v-if="enableDetails" tile outlined class="mt-2">
                <div v-if="loading" class="d-flex pa-2" style="height: 36px">
                  <span class="grey--text">
                    <v-progress-circular size="20" indeterminate color="pink" class="mr-1" /> Fetching Latest Prices
                  </span>
                </div>

                <div v-else class="d-flex pa-2" style="height: 36px">
                  <span v-text="quote"><span class="ml-2 grey--text">($ 1.0000)</span></span>
                  <v-spacer />
                  <div v-if="!expand" class="pr-2">
                    <v-icon color="grey lighten-1" size="17">mdi-gas-station</v-icon>
                    <span class="grey--text text--lighten-1">$2.16</span>
                  </div>
                  <v-btn color="grey lighten-1" height="22" width="22" icon @click="expand = !expand">
                    <v-icon size="22">mdi-chevron-{{ expand ? 'up' : 'down' }}</v-icon>
                  </v-btn>
                </div>

                <v-simple-table v-if="expand && !loading" dense>
                  <template #default>
                    <tbody>
                      <tr v-for="(item, i) in details" :key="i">
                        <td class="caption grey--text text--lighten-1" v-text="item.text" />
                        <td class="caption text-right" v-text="item.value" />
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" class="pa-3 pt-2">
          <v-btn
            tile
            block
            color="primary"
            :disabled="!hasEnoughBalance.status || txLoading"
            :loading="txLoading"
            @click="swap"
          >
            {{ hasEnoughBalance.message }}
          </v-btn>
        </v-col>

        <token-menu-dialog
          ref="tokenMenuDialogComponent"
          :import-token-to-metamask="importTokenToMetamask"
          @on-uniswap-token-select="onTokenSelect"
        />
      </v-row>
    </div>
    <v-row v-if="receipt" class="pa-2">
      <v-col cols="12">
        <transaction-result
          :receipt="receipt"
          :is-tx-mined="isTxMined"
          success-message="Success Message"
          @on-result-closed="resetTransaction"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'
import { TradeDirection } from 'simple-uniswap-sdk'
import TokenMenuDialog from '~/components/trading/TokenMenuDialog.vue'
import TokenInputField from '~/components/trading/TokenInputField.vue'
import { UniswapToken } from '~/types/apollo/main/types'
import useUniswap from '~/composables/useUniswap'
import TransactionResult from '~/components/common/TransactionResult.vue'

const defaultToken: UniswapToken = {
  chainId: 1,
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  symbol: 'USDC',
  name: 'USD Coin',
  decimals: 0,
}
export default defineComponent({
  components: { TransactionResult, TokenMenuDialog, TokenInputField },

  setup() {
    const dialog = ref(false)
    const expand = ref(false)
    const tradeDirection = ref<keyof typeof TradeDirection>('input')
    const tokenDirection = ref<keyof typeof TradeDirection>('input')
    const tokenMenuDialogComponent = ref<any>(null)
    const fromToken = ref<UniswapToken>(defaultToken)
    const toToken = ref<UniswapToken>(defaultToken)
    const amount = ref(0)

    const {
      fromTokenBalance,
      toTokenBalance,
      expectedConvertQuote,
      loading,
      enableDetails,
      quote,
      hasEnoughBalance,
      slippage,
      minAmountConvertQuote,
      liquidityProviderFee,
      routeText,
      errorMessage,
      txLoading,
      receipt,
      isTxMined,
      swap,
      importTokenToMetamask,
      clearTrade,
    } = useUniswap(fromToken, toToken, amount, tradeDirection)

    const details = computed(() => [
      { text: 'Expected Output', value: `${expectedConvertQuote.value} ${toToken.value.symbol}` },
      {
        text: `Minimum Received (${slippage.value * 100} %)`,
        value: `${minAmountConvertQuote.value} ${toToken.value.symbol}`,
      },
      { text: 'Liquidity Provider Fee', value: `${liquidityProviderFee.value} ${fromToken.value.symbol}` },
      { text: 'Route', value: routeText.value },
    ])

    function onToggleTokenMenu(type: keyof typeof TradeDirection): void {
      tokenDirection.value = type
      tokenMenuDialogComponent.value.dialog = true
    }

    function onTokenSelect(token: UniswapToken) {
      tokenDirection.value === 'input' ? (fromToken.value = token) : (toToken.value = token)
    }

    const onAmountChange = ({ direction, value }: { direction: keyof typeof TradeDirection; value: number }) => {
      tradeDirection.value = direction
      amount.value = value
    }

    function onTokenChange() {
      const tempFromToken = toToken.value
      const tempToToken = fromToken.value
      fromToken.value = tempFromToken
      toToken.value = tempToToken
    }
    function resetTransaction() {
      amount.value = 0
      clearTrade()
    }

    return {
      dialog,
      expand,
      tokenMenuDialogComponent,
      fromToken,
      toToken,
      tradeDirection,

      // From composition
      fromTokenBalance,
      toTokenBalance,
      expectedConvertQuote,
      loading,
      enableDetails,
      quote,
      hasEnoughBalance,
      details,
      errorMessage,
      txLoading,
      receipt,
      isTxMined,

      onToggleTokenMenu,
      onTokenSelect,
      onAmountChange,
      onTokenChange,
      swap,
      importTokenToMetamask,
      resetTransaction,
    }
  },
})
</script>

<style scoped></style>
