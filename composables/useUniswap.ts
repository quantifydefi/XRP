import { computed, inject, reactive, ref, Ref, watch } from '@nuxtjs/composition-api'
import type { TradeContext } from 'simple-uniswap-sdk'
import { ChainId, ETH, TradeDirection, UniswapPair, UniswapVersion } from 'simple-uniswap-sdk'
import { UniswapToken } from '~/types/apollo/main/types'
import { Web3, WEB3_PLUGIN_KEY } from '~/plugins/web3/web3'

const checkAddress = (token: UniswapToken, chain: number): string => {
  const config: { [key: string]: { chainId: number; contract: string } } = {
    ETH: { chainId: 1, contract: ETH.MAINNET().contractAddress },
    // ETH: { chainId: 1337, contract: ETH.MAINNET().contractAddress },
  }

  const hasSymbolKey = token.symbol.toUpperCase() in config
  if (hasSymbolKey) {
    const symbolData: { chainId: number; contract: string } = config[token.symbol.toUpperCase()]
    if (symbolData.chainId === chain) {
      return symbolData.contract
    }
  }
  return token.address
}

export default function (
  fromToken: Ref<UniswapToken>,
  toToken: Ref<UniswapToken>,
  amount: Ref<number>,
  tradeDirection: Ref<keyof typeof TradeDirection>
) {
  // COMPUTED
  const { chainId, account, provider, signer, importTokenToMetamask } = inject(WEB3_PLUGIN_KEY) as Web3

  // STATE
  const trade = ref<TradeContext | null>(null)
  const loading = ref(false)
  const enableDetails = ref(false)
  const slippage = ref(0.005)
  const txData = reactive<{ loading: boolean; isCompleted: boolean; receipt: any }>({
    loading: false,
    isCompleted: false,
    receipt: null,
  })

  const errorMessage = ref<string | null>(null)

  const createFactory = async () => {
    const uniswapPair = new UniswapPair({
      // providerUrl: 'http://127.0.0.1:8545',
      fromTokenContractAddress: checkAddress(fromToken.value, chainId.value ?? 1),
      toTokenContractAddress: checkAddress(toToken.value, chainId.value ?? 1),
      ethereumAddress: account.value,
      ethereumProvider: provider,
      chainId: ChainId.MAINNET,
      settings: {
        uniswapVersions:
          tradeDirection.value === 'output' && fromToken.value.symbol !== 'ETH'
            ? [UniswapVersion.v3]
            : [UniswapVersion.v3, UniswapVersion.v2],
        slippage: slippage.value,
        deadlineMinutes: 20,
        disableMultihops: false,
      },
    })
    return await uniswapPair.createFactory()
  }

  const clearTrade = () => {
    enableDetails.value = false
    errorMessage.value = null
    txData.isCompleted = false
    txData.receipt = null
    txData.loading = false

    if (trade.value) {
      trade.value.destroy()
      trade.value = null
    }
  }

  const createTrade = async () => {
    enableDetails.value = true
    loading.value = true

    const factory = await createFactory()

    try {
      const direction: TradeDirection = tradeDirection.value === 'input' ? TradeDirection.input : TradeDirection.output
      trade.value = await factory.trade(`${amount.value}`, direction)

      console.log(trade.value)

      trade.value.quoteChanged$.subscribe((value: TradeContext) => {
        console.log(value.expectedConvertQuote, value.quoteDirection, 'VVVVVVVVVVVVVVVVVVVVVVVV')
        trade.value = value
      })
    } catch (e: any) {
      e.message ? (errorMessage.value = e.message) : (errorMessage.value = 'Something Wrong')
    } finally {
      loading.value = false
    }
  }

  const sendTransaction = async (): Promise<{ isCompleted: boolean; receipt: any }> => {
    try {
      if (trade.value?.approvalTransaction) {
        const approved = await signer.value.sendTransaction(trade.value.approvalTransaction)
        approved.wait()
      }
      const tx = await signer.value.sendTransaction(trade.value?.transaction)
      const receipt = await tx.wait()
      return { isCompleted: true, receipt }
    } catch (e) {
      console.log('TX Error', e)
      return { isCompleted: true, receipt: e }
    }
  }

  const swap = async () => {
    txData.loading = true
    const { isCompleted, receipt } = await sendTransaction()
    txData.receipt = receipt
    txData.isCompleted = isCompleted
    txData.loading = false
  }

  const fromTokenBalance = computed<string>(() => trade.value?.fromBalance.balance ?? '0')
  const toTokenBalance = computed<string>(() => trade.value?.toBalance ?? '0')

  const expectedConvertQuote = computed<number>(() => (trade.value ? parseFloat(trade.value.expectedConvertQuote) : 0))
  const minAmountConvertQuote = computed<number>(() =>
    trade.value && trade.value.minAmountConvertQuote ? parseFloat(trade.value.minAmountConvertQuote) : 0
  )

  const quote = computed<string | null>(() => {
    const quote = trade.value
      ? parseFloat(trade.value.expectedConvertQuote) / parseFloat(trade.value.baseConvertRequest)
      : 0
    return quote === 0
      ? null
      : tradeDirection.value === 'input'
      ? `1 ${fromToken.value.symbol} = ${quote} ${toToken.value.symbol}`
      : `1 ${toToken.value.symbol} = ${quote} ${fromToken.value.symbol}`
  })
  const hasEnoughBalance = computed<{ status: boolean; message: string }>(() =>
    trade.value
      ? trade.value.fromBalance.hasEnough
        ? { status: true, message: 'Swap' }
        : { status: false, message: `Insufficient  ${fromToken.value.symbol} balance` }
      : { status: false, message: `Swap` }
  )
  const liquidityProviderFee = computed<number>(() => (trade.value ? parseFloat(trade.value.liquidityProviderFee) : 0))
  const routeText = computed<string>(() => (trade.value ? trade.value.routeText : ''))

  const txLoading = computed(() => txData.loading)
  const receipt = computed(() => txData.receipt)
  const isTxMined = computed(() => !!(txData.receipt && txData.receipt.transactionHash && txData.receipt.blockNumber))

  watch([fromToken, toToken, amount], async () => {
    console.log('CHANGE', fromToken.value.symbol, '>', toToken.value.symbol, tradeDirection.value)

    if (amount.value <= 0) {
      return
    }
    clearTrade()
    await createTrade()
  })

  return {
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

    clearTrade,
    importTokenToMetamask,
    swap,
  }
}
