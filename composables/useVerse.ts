/* eslint-disable @typescript-eslint/no-unused-vars */
import { computed, inject, onMounted, onUnmounted, reactive, ref, Ref, watch } from '@nuxtjs/composition-api'
import { Token, Ether } from '@uniswap/sdk-core'
import { BigNumber, ethers } from 'ethers'
import { Percent, TradeType, WETH } from '@uniswap/sdk'
import { useQuery } from '@vue/apollo-composable/dist'
import { UniswapToken } from '~/types/apollo/main/types'
import { Web3, WEB3_PLUGIN_KEY } from '~/plugins/web3/web3'
import useERC20 from '~/composables/useERC20'
import { ERC20Balance } from '~/types/global'
import { useHelpers } from '~/composables/useHelpers'
import { FiatPricesGQL } from '~/apollo/main/config.query.graphql'
import { UniswapRouterV2Contract } from '~/types/abi/uniswap-router-v2-contract'
import uniswapRouterV2Abi from '~/constracts/abi/uniswapRouterV2Abi.json'

interface FiatCurrency {
  [key: string]: { usd: number }
}

const UNISWAP_ROUTER_V2_ADDRESS = '0xB4B0ea46Fe0E9e8EAB4aFb765b527739F2718671'
const WETH_ADDRESS = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'

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

  // const fromTokenAddressOverride = computed(() =>
  //   isNativeToken(fromToken.value.chainId, fromToken.value.symbol) ? WETH[1].address : fromToken.value.address
  // )
  // const toTokenAddressOverride = computed(() =>
  //   isNativeToken(toToken.value.chainId, toToken.value.symbol) ? WETH[1].address : toToken.value.address
  // )
  //
  // const { result } = useQuery(
  //   FiatPricesGQL,
  //   () => ({
  //     addresses: [fromTokenAddressOverride.value, toTokenAddressOverride.value],
  //   }),
  //   { fetchPolicy: 'no-cache', pollInterval: 10000 }
  // )

  // STATE
  const loading = ref(false)
  const enableDetails = ref(false)
  const errorMessage = ref<string | null>(null)
  // const quoteResult = reactive<QuoteResult>(defaultQuoteData)
  const tokenBalances = ref<ERC20Balance[]>([])
  const txResult = reactive<{ loading: boolean; isCompleted: boolean; receipt: any }>({
    loading: false,
    isCompleted: false,
    receipt: null,
  })
  // const SLIPPAGE: any = new Percent('5', '100') // 5% or 10_000?
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
  // const expectedConvertQuote = computed(() => quoteResult.expectedConvertQuote)
  // const gasAdjustedQuote = computed(() => quoteResult.gasAdjustedQuote)
  // const gasFeeUSD = computed(() => quoteResult.gasFeeUSD)
  // const minAmountConvertQuote = computed(() => quoteResult.minAmountConvertQuote)
  // const quote = computed(() => quoteResult.quote)
  // const routePath = computed(() => quoteResult.routePath)

  // balances
  const fromTokenBalance = computed<number>(
    () => tokenBalances.value.find((elem) => elem.address === fromToken.value.address)?.balance ?? 0
  )
  const toTokenBalance = computed<number>(
    () => tokenBalances.value.find((elem) => elem.address === toToken.value.address)?.balance ?? 0
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

    // if (tradeDirection.value === 'EXACT_OUTPUT' && fromTokenBalance.value < expectedConvertQuote.value) {
    //   return { status: false, message: `Insufficient  ${fromToken.value.symbol} balance` }
    // }

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

  const sendTransaction = (): { isCompleted: boolean; receipt: any } => {
    try {
      // const tx = await signer.value.sendTransaction(quoteResult.txCallData)
      const receipt = {}
      return { isCompleted: true, receipt }
    } catch (e) {
      return { isCompleted: true, receipt: e }
    }
  }

  async function swapExactETHForTokens() {
    try {
      const contract = new ethers.Contract(
        UNISWAP_ROUTER_V2_ADDRESS,
        uniswapRouterV2Abi,
        signer.value
      ) as unknown as UniswapRouterV2Contract
      const nowInSeconds = Math.floor(Date.now() / 1000)
      const expiryDate = nowInSeconds + 900
      const path = [WETH_ADDRESS, toToken.value.address]
      const tx = await contract.swapExactETHForTokens(0, path, account.value, expiryDate, {
        gasPrice: await provider.value.getGasPrice(),
        gasLimit: 250000,
        value: ethers.utils.parseEther(`${amount.value}`),
      })
      const resp = await tx.wait()
      return { isCompleted: true, receipt: resp }
    } catch (error) {
      return { isCompleted: true, receipt: error }
    }
  }

  async function swapExactTokensForTokens() {
    try {
      const contract = new ethers.Contract(
        UNISWAP_ROUTER_V2_ADDRESS,
        uniswapRouterV2Abi,
        signer.value
      ) as unknown as UniswapRouterV2Contract
      const swapAmount = ethers.utils.parseUnits(`${amount.value}`, fromToken.value.decimals)
      const nowInSeconds = Math.floor(Date.now() / 1000)
      const expiryDate = nowInSeconds + 900
      const path = [fromToken.value.address, toToken.value.address]
      const tx = await contract.swapExactTokensForTokens(swapAmount, 0, path, account.value, expiryDate)
      const resp = await tx.wait()
      return { isCompleted: true, receipt: resp }
    } catch (error) {
      return { isCompleted: false, receipt: error }
    }
  }

  function resetTransaction() {
    amount.value = 0
    txResult.receipt = null
    txResult.isCompleted = false
    txResult.loading = false
  }

  const swap = async () => {
    txResult.loading = true

    const isFromTokenNative = isNativeToken(chainId.value ?? 1, fromToken.value.symbol)
    const isToTokenNative = isNativeToken(chainId.value ?? 1, toToken.value.symbol)

    if (!isFromTokenNative && !isToTokenNative) {
      const allowed = await allowedSpending(fromToken.value.address, UNISWAP_ROUTER_V2_ADDRESS)
      if (allowed < amount.value) {
        await approveMaxSpending(fromToken.value.address, UNISWAP_ROUTER_V2_ADDRESS)
      }
      const result = await swapExactTokensForTokens()
      txResult.isCompleted = result.isCompleted
      txResult.receipt = result.receipt
    }
    if (isFromTokenNative) {
      const result = await swapExactETHForTokens()
      txResult.isCompleted = result.isCompleted
      txResult.receipt = result.receipt
    }
    txResult.loading = false
  }

  watch(
    [fromToken, toToken, amount, account, chainId],
    async () => {
      tokenBalances.value = await balanceMulticall([fromToken.value, toToken.value])
    },
    { immediate: false }
  )

  onMounted(async () => (tokenBalances.value = await balanceMulticall([fromToken.value, toToken.value])))

  return {
    fromTokenBalance,
    toTokenBalance,
    // fromTokenFiatPrice,
    // toTokenFiatPrice,

    loading,
    enableDetails,
    errorMessage,
    // SLIPPAGE,
    isNetworkSupported,

    // expectedConvertQuote,
    // quote,
    // gasAdjustedQuote,
    // gasFeeUSD,
    actionButton,
    // minAmountConvertQuote,
    // routePath,

    txLoading,
    receipt,
    isTxMined,

    // clearTrade,
    importTokenToMetamask,
    swap,
    resetTransaction,
  }
}
