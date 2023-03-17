<template>
  <v-card outlined tile :height="height" :width="width">
    <div
      v-if="!receipt"
      :class="height === '100%' ? '' : 'overflow-y-auto'"
      :style="height === '100%' ? '' : { height: `${height}px` }"
    >
      <v-card-title class="subtitle-1 font-weight-medium py-3">
        <v-avatar size="26" class="mr-2"><v-img :src="$imageUrlBySymbol(`verse`)"></v-img></v-avatar>Verse <v-spacer />
      </v-card-title>
      <v-divider class="mb-4" />
      <v-row no-gutters justify="center" class="pa-2">
        <v-col cols="12">
          <v-row no-gutters>
            <v-col class="px-3">
              <token-input-field
                form-trade-direction="EXACT_INPUT"
                :trade-direction="tradeDirection"
                :fiat-price="fromTokenFiatPrice"
                :token="fromToken"
                :balance="fromTokenBalance"
                :expected-convert-quote="expectedConvertQuote"
                :loading="false"
                @on-value-changed="onAmountChange"
                @on-uniswap-token-menu-open="onToggleTokenMenu('EXACT_INPUT')"
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
                form-trade-direction="EXACT_OUTPUT"
                :trade-direction="tradeDirection"
                :token="toToken"
                :balance="toTokenBalance"
                :fiat-price="toTokenFiatPrice"
                :expected-convert-quote="expectedConvertQuote"
                :loading="false"
                @on-value-changed="onAmountChange"
                @on-uniswap-token-menu-open="onToggleTokenMenu('EXACT_OUTPUT')"
              />
            </v-col>
          </v-row>
        </v-col>

        <v-col v-if="errorMessage" cols="12">
          <v-alert text type="error" dismissible class="ma-2">{{ errorMessage }}</v-alert>
        </v-col>

        <v-col v-else cols="12">
          <v-row v-if="quoteByTokensDesc" class="pa-3 caption font-weight-medium">
            <v-col cols="12">
              <v-card tile outlined class="mt-2">
                <div v-if="loading" class="d-flex pa-2" style="height: 36px">
                  <span class="grey--text">
                    <v-progress-circular size="20" indeterminate color="pink" class="mr-1" /> Fetching Latest Prices
                  </span>
                </div>

                <div v-else class="d-flex pa-2" style="height: 36px">
                  <span v-text="quoteByTokensDesc"><span class="ml-2 grey--text">($ 1.0000)</span></span>
                  <v-spacer />
                  <div v-if="!expand" class="pr-2"></div>
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
            :disabled="!actionButton.status || txLoading"
            :loading="txLoading"
            @click="swap"
          >
            {{ actionButton.message }}
          </v-btn>
        </v-col>

        <token-menu-dialog
          ref="tokenMenuDialogComponent"
          token-list-type="verse"
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
          :scroll-height="logScrollHeight"
          @on-result-closed="resetTransaction"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType, ref } from '@nuxtjs/composition-api'
import { TradeType } from '@uniswap/sdk'
import TokenMenuDialog from '~/components/trading/TokenMenuDialog.vue'
import TokenInputField from '~/components/trading/TokenInputField.vue'
import { UniswapToken } from '~/types/apollo/main/types'
import { Web3, WEB3_PLUGIN_KEY } from '~/plugins/web3/web3'
import useVerse from '~/composables/useVerse'
import TransactionResult from '~/components/common/TransactionResult.vue'

const defaultToken: UniswapToken = {
  chainId: 1,
  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  symbol: 'USDC',
  name: 'USD Coin',
  decimals: 6,
}

type Props = {
  height: string
  width: string
  inToken: UniswapToken
  outToken: UniswapToken
}
export default defineComponent<Props>({
  components: {
    TransactionResult,
    TokenMenuDialog,
    TokenInputField,
  },

  props: {
    height: { type: String, default: '100%' },
    width: { type: String, default: '450' },
    logScrollHeight: { type: String, default: '140' },
    inToken: { type: Object as PropType<UniswapToken>, default: () => defaultToken },
    outToken: { type: Object as PropType<UniswapToken>, default: () => defaultToken },
  },

  setup(props) {
    const { importTokenToMetamask } = inject(WEB3_PLUGIN_KEY) as Web3
    const dialog = ref(false)
    const expand = ref(false)
    const tradeDirection = ref<keyof typeof TradeType>('EXACT_INPUT')
    const tokenDirection = ref<keyof typeof TradeType>('EXACT_INPUT')
    const tokenMenuDialogComponent = ref<any>(null)
    const fromToken = ref(props.inToken)
    const toToken = ref(props.outToken)
    const amount = ref(0)

    const {
      fromTokenBalance,
      toTokenBalance,
      fromTokenFiatPrice,
      toTokenFiatPrice,
      expectedConvertQuote,
      loading,
      enableDetails,
      quoteByTokensDesc,
      actionButton,
      minAmountConvertQuote,
      errorMessage,
      txLoading,
      receipt,
      isTxMined,
      swap,
      resetTransaction,
    } = useVerse(fromToken, toToken, amount, tradeDirection)

    const details = computed(() => [
      { text: 'Expected Output', value: `${expectedConvertQuote.value} ${toToken.value.symbol}` },
      { text: `Minimum Received (5.00 %)`, value: `${minAmountConvertQuote.value}` },
    ])

    const onToggleTokenMenu = (type: keyof typeof TradeType): void => {
      tokenDirection.value = type
      tokenMenuDialogComponent.value.dialog = true
    }

    const onTokenSelect = (token: UniswapToken) => {
      tokenDirection.value === 'EXACT_INPUT' ? (fromToken.value = token) : (toToken.value = token)
    }

    const onAmountChange = ({ direction, value }: { direction: keyof typeof TradeType; value: number }) => {
      tradeDirection.value = direction
      amount.value = value
    }

    const onTokenChange = () => {
      const tempFromToken = toToken.value
      const tempToToken = fromToken.value
      fromToken.value = tempFromToken
      toToken.value = tempToToken
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
      fromTokenFiatPrice,
      toTokenFiatPrice,
      expectedConvertQuote,
      loading,
      enableDetails,
      quoteByTokensDesc,
      actionButton,
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
