/* eslint-disable @typescript-eslint/no-unused-vars */
import { computed, inject, onMounted, reactive, ref, Ref, watch } from '@nuxtjs/composition-api'
import { Token } from '@uniswap/sdk-core'
import { TradeType } from '@uniswap/sdk'
import { useQuery } from '@vue/apollo-composable/dist'
import { BigNumber as ethersBigNumber } from 'ethers'
import { UniswapToken } from '~/types/apollo/main/types'
import { Web3, WEB3_PLUGIN_KEY } from '~/plugins/web3/web3'
import useERC20 from '~/composables/useERC20'
import { ERC20Balance } from '~/types/global'
import { useHelpers } from '~/composables/useHelpers'
import { FiatPricesGQL } from '~/apollo/main/config.query.graphql'
import {
  TradeContext,
  TradePath,
  Transaction,
  UniswapV2,
  SUPPORTED_CHAINS,
  WETH,
  ROUTER,
} from '~/lib/uniswap-v2/uniswapV2'

interface FiatCurrency {
  [key: string]: { usd: number }
}

export default function (
  fromToken: Ref<UniswapToken>,
  toToken: Ref<UniswapToken>,
  amount: Ref<number>,
  tradeDirection: Ref<keyof typeof TradeType>
) {
  // COMPUTED
  const { account, provider, signer, chainId, walletReady, importTokenToMetamask } = inject(WEB3_PLUGIN_KEY) as Web3
  const { balanceMulticall, allowedSpending, approveMaxSpending } = useERC20()
  const { isNativeToken, debounceAsync } = useHelpers()

  const NETWORK_ID = computed(() => (chainId.value === 1337 ? 10000 : chainId.value) || 1) as Ref<SUPPORTED_CHAINS>

  const fromTokenAddressOverride = computed(() =>
    isNativeToken(fromToken.value.chainId, fromToken.value.symbol)
      ? WETH(NETWORK_ID.value).address
      : fromToken.value.address
  )
  const toTokenAddressOverride = computed(() =>
    isNativeToken(toToken.value.chainId, toToken.value.symbol) ? WETH(NETWORK_ID.value).address : toToken.value.address
  )

  const { result } = useQuery(
    FiatPricesGQL,
    () => ({ addresses: [fromTokenAddressOverride.value, toTokenAddressOverride.value] }),
    { fetchPolicy: 'no-cache', pollInterval: 10000 }
  )

  // STATE
  const loading = ref(false)
  const enableDetails = ref(true)
  const errorMessage = ref<string | null>(null)
  const tradeContext = ref<TradeContext | null>(null)
  const tokenBalances = ref<ERC20Balance[]>([])
  const txResult = reactive<{ loading: boolean; isCompleted: boolean; receipt: any }>({
    loading: false,
    isCompleted: false,
    receipt: null,
  })

  const SUPPORTED_NETWORKS = [1, 10000, 1337]
  const isNetworkSupported = computed<boolean>(() =>
    walletReady.value ? SUPPORTED_NETWORKS.includes(chainId.value ?? 1) : false
  )

  // trade type
  const tradeType = computed(() =>
    tradeDirection.value === 'EXACT_INPUT' ? TradeType.EXACT_INPUT : TradeType.EXACT_OUTPUT
  )
  const tradePath = computed(() => {
    const isFromTokenNative = isNativeToken(NETWORK_ID.value, fromToken.value.symbol)
    const isToTokenNative = isNativeToken(NETWORK_ID.value, toToken.value.symbol)
    if (isFromTokenNative) {
      return TradePath.ethToErc20
    }
    if (isToTokenNative) {
      return TradePath.erc20ToEth
    }
    return TradePath.erc20ToErc20
  })

  // COMPUTED
  // Quote Result
  const expectedConvertQuote = computed(() => parseFloat(tradeContext.value?.expectedConvertQuote ?? '0') ?? 0)
  const quoteByTokensDesc = computed(() =>
    tradeContext.value
      ? `1 ${fromToken.value.symbol} = ${expectedConvertQuote.value / amount.value} ${toToken.value.symbol}`
      : null
  )
  const minAmountConvertQuote = computed(() =>
    tradeContext.value?.minAmountConvertQuote
      ? `${parseFloat(tradeContext.value.minAmountConvertQuote).toFixed(6)} ${toToken.value.symbol}`
      : '-'
  )

  // balances
  const fromTokenBalance = computed<number>(
    () => tokenBalances.value.find((elem) => elem.address === fromToken.value.address)?.balance ?? 0
  )
  const toTokenBalance = computed<number>(
    () => tokenBalances.value.find((elem) => elem.address === toToken.value.address)?.balance ?? 0
  )

  const fiatPrices = computed<FiatCurrency | null>(() => result.value?.fiatPrices ?? null)
  const fromTokenFiatPrice = computed<number | null>(() =>
    fiatPrices.value &&
    Object.hasOwnProperty.call(fiatPrices.value, fromTokenAddressOverride.value.toLowerCase()) &&
    expectedConvertQuote.value > 0
      ? tradeType.value === TradeType.EXACT_INPUT
        ? fiatPrices.value[fromTokenAddressOverride.value.toLowerCase()].usd * amount.value
        : fiatPrices.value[fromTokenAddressOverride.value.toLowerCase()].usd * expectedConvertQuote.value
      : null
  )
  const toTokenFiatPrice = computed<number | null>(() =>
    fiatPrices.value &&
    Object.hasOwnProperty.call(fiatPrices.value, toTokenAddressOverride.value.toLowerCase()) &&
    expectedConvertQuote.value > 0
      ? tradeType.value === TradeType.EXACT_OUTPUT
        ? fiatPrices.value[toTokenAddressOverride.value.toLowerCase()].usd * amount.value
        : fiatPrices.value[toTokenAddressOverride.value.toLowerCase()].usd * expectedConvertQuote.value
      : null
  )

  // tx result
  const txLoading = computed(() => txResult.loading)
  const receipt = computed(() => txResult.receipt)
  const isTxMined = computed(
    () => !!(txResult.receipt && txResult.receipt.transactionHash && txResult.receipt.blockNumber)
  )

  const isSameTokenSelected = computed(
    () => fromToken.value.address.toLowerCase() === toToken.value.address.toLowerCase()
  )

  // Action Button Control
  const actionButton = computed<{ status: boolean; message: string }>(() => {
    if (amount.value <= 0) {
      return { status: false, message: `Input amount must be more then 0` }
    }
    if (tradeDirection.value === 'EXACT_INPUT' && fromTokenBalance.value < amount.value) {
      return { status: false, message: `Insufficient  ${fromToken.value.symbol} balance` }
    }

    if (tradeDirection.value === 'EXACT_OUTPUT' && fromTokenBalance.value < expectedConvertQuote.value) {
      return { status: false, message: `Insufficient  ${fromToken.value.symbol} balance` }
    }

    if (isSameTokenSelected.value) {
      return { status: false, message: `Cant Swap Same Tokens` }
    }

    if (errorMessage.value) {
      return { status: false, message: errorMessage.value }
    }

    return { status: true, message: 'Swap' }
  })

  const getQuoteToken = (tokenIn: Token, tokenOut: Token, tradeType: TradeType): Token => {
    return tradeType === TradeType.EXACT_INPUT ? tokenOut : tokenIn
  }

  function resetTransaction() {
    amount.value = 0
    txResult.receipt = null
    txResult.isCompleted = false
    txResult.loading = false
  }

  const onChange = debounceAsync(async () => {
    console.log('ON CHANGE', amount.value, tradeDirection.value, tradePath.value, NETWORK_ID.value)

    errorMessage.value = null

    if (amount.value === 0) {
      return
    }
    try {
      loading.value = true
      const uniswap = new UniswapV2(
        fromToken.value,
        toToken.value,
        tradePath.value,
        account.value,
        provider.value,
        NETWORK_ID.value
      )
      tradeContext.value = await uniswap.trade(`${amount.value}`, tradeDirection.value)
    } catch (e) {
      console.log('ERROR', e)
      tradeContext.value = null
      errorMessage.value = 'Something went wrong'
    } finally {
      loading.value = false
    }
  }, 500)

  const sendTransaction = async (txCallData: Transaction): Promise<{ isCompleted: boolean; receipt: any }> => {
    try {
      const tx = await signer.value.sendTransaction(txCallData)
      const receipt = await tx.wait()
      return { isCompleted: true, receipt }
    } catch (e) {
      return { isCompleted: true, receipt: e }
    }
  }

  const swap = async () => {
    if (!tradeContext.value) {
      return
    }
    txResult.loading = true

    let estimatedGasLimit: ethersBigNumber
    try {
      estimatedGasLimit = await provider.value.estimateGas(tradeContext.value.transaction)
    } catch (error) {
      estimatedGasLimit = ethersBigNumber.from('150000')
    }

    tradeContext.value.transaction.gasLimit = estimatedGasLimit.mul(`125`).div('100').toNumber()

    if (tradePath.value === TradePath.ethToErc20) {
      const { isCompleted, receipt } = await sendTransaction(tradeContext.value.transaction)
      txResult.isCompleted = isCompleted
      txResult.receipt = receipt
    } else {
      const allowed = await allowedSpending(fromToken.value.address, ROUTER(NETWORK_ID.value))
      if (allowed < amount.value) {
        await approveMaxSpending(fromToken.value.address, ROUTER(NETWORK_ID.value))
      }

      const { isCompleted, receipt } = await sendTransaction(tradeContext.value.transaction)
      txResult.isCompleted = isCompleted
      txResult.receipt = receipt
    }
  }
  watch(
    [fromToken, toToken, amount, account, chainId],
    async () => {
      tradeContext.value = null
      tokenBalances.value = await balanceMulticall([fromToken.value, toToken.value], NETWORK_ID.value)
      await onChange()
    },
    { immediate: false }
  )

  onMounted(
    async () => (tokenBalances.value = await balanceMulticall([fromToken.value, toToken.value], NETWORK_ID.value))
  )

  return {
    fromTokenBalance,
    toTokenBalance,
    fromTokenFiatPrice,
    toTokenFiatPrice,

    loading,
    enableDetails,
    errorMessage,

    // SLIPPAGE,
    isNetworkSupported,
    expectedConvertQuote,
    quoteByTokensDesc,
    actionButton,
    minAmountConvertQuote,
    txLoading,
    receipt,
    isTxMined,

    // clearTrade,
    importTokenToMetamask,
    swap,
    resetTransaction,
  }
}
