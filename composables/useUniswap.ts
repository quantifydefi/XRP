import { computed, inject, onMounted, onUnmounted, reactive, ref, Ref, watch } from '@nuxtjs/composition-api'
import { Token, Ether } from '@uniswap/sdk-core'
import { AlphaRouter, parseAmount } from '@uniswap/smart-order-router'
import { BigNumber } from 'ethers'
import { Percent, TradeType, WETH } from '@uniswap/sdk'
import { useQuery } from '@vue/apollo-composable/dist'
import { UniswapToken } from '~/types/apollo/main/types'
import { Web3, WEB3_PLUGIN_KEY } from '~/plugins/web3/web3'
import useERC20 from '~/composables/useERC20'
import { ERC20Balance } from '~/types/global'
import { useHelpers } from '~/composables/useHelpers'
import { FiatPricesGQL } from '~/apollo/main/config.query.graphql'
const UNISWAP_V3_ROUTER2_ADDRESS = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45'

interface QuoteResult {
  expectedConvertQuote: number
  minAmountConvertQuote: number
  quote: string | null
  gasAdjustedQuote: number
  gasFeeUSD: number
  routePath: string
  txCallData: {
    data: string | undefined
    to: string
    value: BigNumber | undefined
    from: string
    gasPrice: BigNumber | undefined
    gasLimit?: any
  }
}
interface FiatCurrency {
  [key: string]: { usd: number }
}

const defaultQuoteData: QuoteResult = {
  expectedConvertQuote: 0,
  gasAdjustedQuote: 0,
  gasFeeUSD: 0,
  minAmountConvertQuote: 0,
  quote: '',
  routePath: '',
  txCallData: { data: undefined, from: '', gasLimit: undefined, gasPrice: undefined, to: '', value: undefined },
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
  const { isNativeToken } = useHelpers()

  const fromTokenAddressOverride = computed(() =>
    isNativeToken(fromToken.value.chainId, fromToken.value.symbol) ? WETH[1].address : fromToken.value.address
  )
  const toTokenAddressOverride = computed(() =>
    isNativeToken(toToken.value.chainId, toToken.value.symbol) ? WETH[1].address : toToken.value.address
  )

  const { result } = useQuery(
    FiatPricesGQL,
    () => ({
      addresses: [fromTokenAddressOverride.value, toTokenAddressOverride.value],
    }),
    { fetchPolicy: 'no-cache', pollInterval: 10000 }
  )

  // STATE
  const loading = ref(false)
  const enableDetails = ref(false)
  const errorMessage = ref<string | null>(null)
  const quoteResult = reactive<QuoteResult>(defaultQuoteData)
  const tokenBalances = ref<ERC20Balance[]>([])
  const txResult = reactive<{ loading: boolean; isCompleted: boolean; receipt: any }>({
    loading: false,
    isCompleted: false,
    receipt: null,
  })
  const SLIPPAGE: any = new Percent('5', '100') // 5% or 10_000?
  const SUPPORTED_NETWORKS = [1, 1337]
  const isNetworkSupported = computed<boolean>(() =>
    walletReady.value ? SUPPORTED_NETWORKS.includes(chainId.value ?? 1) : false
  )
  // Support main net only
  const NETWORK_ID = computed(() => (chainId.value === 1337 ? 1 : 1))

  // trade type
  const tradeType = computed(() =>
    tradeDirection.value === 'EXACT_INPUT' ? TradeType.EXACT_INPUT : TradeType.EXACT_OUTPUT
  )

  // COMPUTED
  // Quote Result
  const expectedConvertQuote = computed(() => quoteResult.expectedConvertQuote)
  const gasAdjustedQuote = computed(() => quoteResult.gasAdjustedQuote)
  const gasFeeUSD = computed(() => quoteResult.gasFeeUSD)
  const minAmountConvertQuote = computed(() => quoteResult.minAmountConvertQuote)
  const quote = computed(() => quoteResult.quote)
  const routePath = computed(() => quoteResult.routePath)

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

  // FUNCTIONS
  const clearTrade = () => {
    enableDetails.value = false
    errorMessage.value = null
    amount.value = 0
    quoteResult.expectedConvertQuote = 0
    quoteResult.gasAdjustedQuote = 0
    quoteResult.gasFeeUSD = 0
    quoteResult.minAmountConvertQuote = 0
    quoteResult.quote = ''
    quoteResult.routePath = ''
    quoteResult.txCallData = {
      data: undefined,
      from: '',
      gasLimit: undefined,
      gasPrice: undefined,
      to: '',
      value: undefined,
    }
    txResult.receipt = null
    txResult.isCompleted = false
    txResult.loading = false
  }

  const runBlockListener = () => {
    provider.value.on('block', (block: number) => {
      console.log('New Block Update', block)
      let debounceTimeout: any = null
      clearTimeout(debounceTimeout)
      debounceTimeout = setTimeout(async () => {
        console.log('UPDATE QUOTE', block)
        await getUniswapTrade()
        debounceTimeout = null
      }, 5000)
    })
  }

  const getQuoteToken = (tokenIn: Token, tokenOut: Token, tradeType: TradeType): Token => {
    return tradeType === TradeType.EXACT_INPUT ? tokenOut : tokenIn
  }

  const onInputChanged = async () => {
    if (walletReady.value) {
      try {
        loading.value = true
        enableDetails.value = true
        errorMessage.value = null
        stopAllListeners()
        await getUniswapTrade()
        runBlockListener()
      } catch (e: any) {
        console.log(e)
        errorMessage.value = 'Something Went Wrong'
      } finally {
        loading.value = false
      }
    }
  }

  const sendTransaction = async (): Promise<{ isCompleted: boolean; receipt: any }> => {
    try {
      const tx = await signer.value.sendTransaction(quoteResult.txCallData)
      const receipt = await tx.wait()
      return { isCompleted: true, receipt }
    } catch (e) {
      return { isCompleted: true, receipt: e }
    }
  }

  const swap = async () => {
    txResult.loading = true
    stopAllListeners()
    const isTokenInNative = isNativeToken(fromToken.value.chainId, fromToken.value.symbol)
    if (!isTokenInNative) {
      const allowed = await allowedSpending(fromToken.value.address, UNISWAP_V3_ROUTER2_ADDRESS)
      if (allowed < amount.value) {
        await approveMaxSpending(fromToken.value.address, UNISWAP_V3_ROUTER2_ADDRESS)
      }
    }
    const { isCompleted, receipt } = await sendTransaction()
    txResult.receipt = receipt
    txResult.isCompleted = isCompleted
    txResult.loading = false
  }

  const getUniswapTrade = async (): Promise<void> => {
    const isTokenInNative = isNativeToken(fromToken.value.chainId, fromToken.value.symbol)
    const isTokenOutNative = isNativeToken(toToken.value.chainId, toToken.value.symbol)

    const tokenIn = isTokenInNative
      ? (Ether.onChain(NETWORK_ID.value) as unknown as Token)
      : new Token(
          NETWORK_ID.value,
          fromToken.value.address,
          fromToken.value.decimals,
          fromToken.value.symbol,
          fromToken.value.name
        )

    const tokenOut = isTokenOutNative
      ? (Ether.onChain(NETWORK_ID.value) as unknown as Token)
      : new Token(
          NETWORK_ID.value,
          toToken.value.address,
          toToken.value.decimals,
          toToken.value.symbol,
          toToken.value.name
        )

    const amountValue =
      tradeType.value === TradeType.EXACT_INPUT
        ? parseAmount(`${amount.value}`, tokenIn)
        : parseAmount(`${amount.value}`, tokenOut)

    const router = new AlphaRouter({ chainId: NETWORK_ID.value, provider: provider.value })
    const route = await router.route(amountValue, getQuoteToken(tokenIn, tokenOut, tradeType.value), tradeType.value, {
      inputTokenPermit: undefined,
      slippageTolerance: SLIPPAGE,
      recipient: account.value,
      deadline: Math.floor(Date.now() / 1000 + 1800),
    })

    console.log(`Quote Exact In: ${Number(route?.quote.toFixed(6))}`)
    console.log(`Gas Adjusted Quote In: ${route?.quoteGasAdjusted.toFixed(2)}`)
    console.log(`Gas Used USD: ${route?.estimatedGasUsedUSD.toFixed(6)}`)

    quoteResult.expectedConvertQuote = Number(route?.quote.toFixed(6))
    quoteResult.minAmountConvertQuote = quoteResult.expectedConvertQuote - quoteResult.expectedConvertQuote * 0.05
    quoteResult.quote = computed(() => {
      const quote = quoteResult.expectedConvertQuote / amount.value ?? 0
      return quote === 0
        ? null
        : tradeDirection.value === 'EXACT_INPUT'
        ? `1 ${fromToken.value.symbol} = ${quote} ${toToken.value.symbol}`
        : `1 ${toToken.value.symbol} = ${quote} ${fromToken.value.symbol}`
    }).value

    quoteResult.gasAdjustedQuote = Number(route?.quoteGasAdjusted.toFixed(6))
    quoteResult.gasFeeUSD = Number(route?.estimatedGasUsedUSD.toFixed(6))
    quoteResult.routePath = <string>route?.trade.routes.map((elem) => elem.path.map((p) => p.symbol).join(' > '))[0]

    const gasLimit = route ? BigNumber.from(`${route.estimatedGasUsed.toNumber() * 1.75}`) : 300000
    quoteResult.txCallData = {
      data: route?.methodParameters?.calldata,
      to: UNISWAP_V3_ROUTER2_ADDRESS,
      value: BigNumber.from(route?.methodParameters?.value),
      from: account.value,
      gasPrice: BigNumber.from(route?.gasPriceWei),
      gasLimit,
    }
  }

  function stopAllListeners() {
    if (walletReady.value) {
      provider.value.removeAllListeners()
    }
  }

  watch(
    [fromToken, toToken, amount, account, chainId],
    async () => {
      console.log('CHANGE', fromToken.value.symbol, '>', toToken.value.symbol, tradeDirection.value)
      tokenBalances.value = await balanceMulticall([fromToken.value, toToken.value])
      if (amount.value <= 0 || isSameTokenSelected.value) {
        stopAllListeners()
        quoteResult.expectedConvertQuote = amount.value
        return
      }
      await onInputChanged()
    },
    { immediate: false }
  )

  watch([walletReady], () => {
    if (!walletReady.value) {
      clearTrade()
    }
  })

  onMounted(async () => (tokenBalances.value = await balanceMulticall([fromToken.value, toToken.value])))
  onUnmounted(() => stopAllListeners())

  return {
    fromTokenBalance,
    toTokenBalance,
    fromTokenFiatPrice,
    toTokenFiatPrice,

    loading,
    enableDetails,
    errorMessage,
    SLIPPAGE,
    isNetworkSupported,

    expectedConvertQuote,
    quote,
    gasAdjustedQuote,
    gasFeeUSD,
    actionButton,
    minAmountConvertQuote,
    routePath,

    txLoading,
    receipt,
    isTxMined,

    clearTrade,
    importTokenToMetamask,
    swap,
  }
}
