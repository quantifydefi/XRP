import { computed, inject, reactive, Ref } from '@nuxtjs/composition-api'
import { ethers } from 'ethers'
import type { AavePoolModel } from '~/composables/useAavePools'
import { Web3, WEB3_PLUGIN_KEY } from '~/plugins/web3/web3'
import wethGatewayAbi from '~/constracts/abi/aave/wethGatewayAbi.json'
import lendingPoolAbi from '~/constracts/abi/aave/lendingPoolAbi.json'
import { AaveLendingPoolContract } from '~/types/abi/aave-lending-pool-contract'
import { AaveWethPoolContract } from '~/types/abi/aave-weth-pool-contract'
import useERC20 from '~/composables/useERC20'
import { useHelpers } from '~/composables/useHelpers'

interface MarketConfig {
  name: string
  AAVE_LENDING_POOL_ADDRESS: string
  AAVE_WETH_GATEWAY_ADDRESS: string
  AWETH_ADDRESS: string
  WETH_VARIABLE_BORROW: string
}
const configs: { [key: number]: MarketConfig } = {
  1: {
    name: 'ETH mainnet',
    AAVE_LENDING_POOL_ADDRESS: '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9',
    AAVE_WETH_GATEWAY_ADDRESS: '0xcc9a0B7c43DC2a5F023Bb9b738E45B0Ef6B06E04',
    AWETH_ADDRESS: '0x030bA81f1c18d280636F32af80b9AAd02Cf0854e',
    WETH_VARIABLE_BORROW: '0xF63B34710400CAd3e044cFfDcAb00a0f32E33eCf',
  },

  137: {
    name: 'Polygon (Matic) ',
    AAVE_LENDING_POOL_ADDRESS: '0x8dFf5E27EA6b7AC08EbFdf9eB090F32ee9a30fcf',
    AAVE_WETH_GATEWAY_ADDRESS: '0xbEadf48d62aCC944a06EEaE0A9054A90E5A7dc97',
    AWETH_ADDRESS: '',
    WETH_VARIABLE_BORROW: '',
  },

  // 1337: {
  //   name: 'Polygon (Matic) ',
  //   AAVE_LENDING_POOL_ADDRESS: '0x8dFf5E27EA6b7AC08EbFdf9eB090F32ee9a30fcf',
  //   AAVE_WETH_GATEWAY_ADDRESS: '0xbEadf48d62aCC944a06EEaE0A9054A90E5A7dc97',
  // },

  1337: {
    name: 'ETH mainnet',
    AAVE_LENDING_POOL_ADDRESS: '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9',
    AAVE_WETH_GATEWAY_ADDRESS: '0xcc9a0B7c43DC2a5F023Bb9b738E45B0Ef6B06E04',
    AWETH_ADDRESS: '0x030bA81f1c18d280636F32af80b9AAd02Cf0854e',
    WETH_VARIABLE_BORROW: '0xF63B34710400CAd3e044cFfDcAb00a0f32E33eCf',
  },
}

interface Transaction {
  loading: boolean
  isCompleted: boolean
  receipt: any
}

export default function useAaveTransactions(pool: Ref<AavePoolModel>, amountInTokens: Ref<number>) {
  // COMPUTED
  const { signer, account, chainId } = inject(WEB3_PLUGIN_KEY) as Web3
  const { allowedSpending, approveMaxSpending } = useERC20()
  const { isNativeToken } = useHelpers()

  // STATE
  const txData = reactive<Transaction>({
    loading: false,
    isCompleted: false,
    receipt: null,
  })

  // COMPUTED
  const AAVE_LENDING_POOL_ADDRESS = computed(() =>
    chainId.value && chainId.value in configs ? configs[chainId.value].AAVE_LENDING_POOL_ADDRESS : ''
  )

  const AAVE_WETH_GATEWAY_ADDRESS = computed(() =>
    chainId.value && chainId.value in configs ? configs[chainId.value].AAVE_WETH_GATEWAY_ADDRESS : ''
  )

  const AWETH_ADDRESS = computed(() =>
    chainId.value && chainId.value in configs ? configs[chainId.value].AWETH_ADDRESS : ''
  )
  // const WETH_VARIABLE_BORROW = computed(() =>
  //   chainId.value && chainId.value in configs ? configs[chainId.value].WETH_VARIABLE_BORROW : ''
  // )

  const txLoading = computed(() => txData.loading)
  const receipt = computed(() => txData.receipt)
  const isTxMined = computed(() => !!(txData.receipt && txData.receipt.transactionHash && txData.receipt.blockNumber))

  // METHODS
  function resetToDefault() {
    txData.loading = false
    txData.isCompleted = false
    txData.receipt = null
  }

  async function depositETHWeb3Call(): Promise<{ isCompleted: boolean; receipt: any }> {
    try {
      const contract = new ethers.Contract(
        AAVE_WETH_GATEWAY_ADDRESS.value,
        wethGatewayAbi,
        signer.value
      ) as unknown as AaveWethPoolContract
      const amount = ethers.utils.parseUnits(`${amountInTokens.value}`, pool.value.decimals)
      const depositCall = await contract.depositETH(AAVE_LENDING_POOL_ADDRESS.value, account.value, 0, {
        value: amount,
      })
      const resp = await depositCall.wait()
      return { isCompleted: true, receipt: resp }
    } catch (error) {
      return { isCompleted: false, receipt: error }
    }
  }
  async function withdrawETHWeb3Call(): Promise<{ isCompleted: boolean; receipt: any }> {
    try {
      const contract = new ethers.Contract(
        AAVE_WETH_GATEWAY_ADDRESS.value,
        wethGatewayAbi,
        signer.value
      ) as unknown as AaveWethPoolContract
      const amount = ethers.utils.parseUnits(`${amountInTokens.value}`, pool.value.decimals)
      const call = await contract.withdrawETH(AAVE_LENDING_POOL_ADDRESS.value, amount, account.value)
      const resp = await call.wait()
      return { isCompleted: true, receipt: resp }
    } catch (error) {
      return { isCompleted: false, receipt: error }
    }
  }

  async function repayETHWeb3Call(): Promise<{ isCompleted: boolean; receipt: any }> {
    try {
      const contract = new ethers.Contract(
        AAVE_WETH_GATEWAY_ADDRESS.value,
        wethGatewayAbi,
        signer.value
      ) as unknown as AaveWethPoolContract
      const amount = ethers.utils.parseUnits(`${amountInTokens.value}`, pool.value.decimals)
      const call = await contract.repayETH(AAVE_LENDING_POOL_ADDRESS.value, amount, 2, account.value)
      const resp = await call.wait()
      return { isCompleted: true, receipt: resp }
    } catch (error) {
      return { isCompleted: false, receipt: error }
    }
  }

  async function depositERC20Web3Call(): Promise<{ isCompleted: boolean; receipt: any }> {
    try {
      const contract = new ethers.Contract(
        AAVE_LENDING_POOL_ADDRESS.value,
        lendingPoolAbi,
        signer.value
      ) as unknown as AaveLendingPoolContract
      const amount = ethers.utils.parseUnits(`${amountInTokens.value}`, pool.value.decimals)
      const depositCall = await contract.deposit(pool.value.underlyingAsset, amount, account.value, 0)
      const resp = await depositCall.wait()
      return { isCompleted: true, receipt: resp }
    } catch (error) {
      return { isCompleted: false, receipt: error }
    }
  }

  async function borrowERC20Web3Call(): Promise<{ isCompleted: boolean; receipt: any }> {
    try {
      const contract = new ethers.Contract(
        AAVE_LENDING_POOL_ADDRESS.value,
        lendingPoolAbi,
        signer.value
      ) as unknown as AaveLendingPoolContract
      const amount = ethers.utils.parseUnits(`${amountInTokens.value}`, pool.value.decimals)
      const borrowCall = await contract.borrow(pool.value.underlyingAsset, amount, 2, 0, account.value)
      const resp = await borrowCall.wait()
      return { isCompleted: true, receipt: resp }
    } catch (err) {
      return { isCompleted: false, receipt: err }
    }
  }

  async function withdrawERC20Web3Call(): Promise<{ isCompleted: boolean; receipt: any }> {
    try {
      const contract = new ethers.Contract(
        AAVE_LENDING_POOL_ADDRESS.value,
        lendingPoolAbi,
        signer.value
      ) as unknown as AaveLendingPoolContract
      const amount = ethers.utils.parseUnits(`${amountInTokens.value}`, pool.value.decimals)
      const withdrawCall = await contract.withdraw(pool.value.underlyingAsset, amount, account.value)
      const resp = await withdrawCall.wait()
      return { isCompleted: true, receipt: resp }
    } catch (err) {
      return { isCompleted: false, receipt: err }
    }
  }

  async function repayERC20Web3Call(): Promise<{ isCompleted: boolean; receipt: any }> {
    try {
      const contract = new ethers.Contract(
        AAVE_LENDING_POOL_ADDRESS.value,
        lendingPoolAbi,
        signer.value
      ) as unknown as AaveLendingPoolContract
      const amount = ethers.utils.parseUnits(`${amountInTokens.value}`, pool.value.decimals)
      const repayCall = await contract.repay(pool.value.underlyingAsset, amount, 2, account.value)
      const resp = await repayCall.wait()
      return { isCompleted: true, receipt: resp }
    } catch (err) {
      return { isCompleted: false, receipt: err }
    }
  }

  async function deposit() {
    txData.loading = true
    const isNative = isNativeToken(chainId.value ?? 1, pool.value.symbol)
    if (!isNative) {
      const allowed = await allowedSpending(pool.value.underlyingAsset, AAVE_LENDING_POOL_ADDRESS.value)
      if (allowed < amountInTokens.value) {
        await approveMaxSpending(pool.value.underlyingAsset, AAVE_LENDING_POOL_ADDRESS.value)
      }
    }
    let result: { isCompleted: boolean; receipt: any }
    isNative ? (result = await depositETHWeb3Call()) : (result = await depositERC20Web3Call())
    txData.isCompleted = result.isCompleted
    txData.receipt = result.receipt
    txData.loading = false
  }

  async function borrow() {
    txData.loading = true
    const { isCompleted, receipt } = await borrowERC20Web3Call()
    txData.isCompleted = isCompleted
    txData.receipt = receipt
    txData.loading = false
  }

  async function repay() {
    txData.loading = true
    const isNative = isNativeToken(chainId.value ?? 1, pool.value.symbol)
    if (!isNative) {
      const allowed = await allowedSpending(pool.value.underlyingAsset, AAVE_LENDING_POOL_ADDRESS.value)
      if (allowed < amountInTokens.value) {
        await approveMaxSpending(pool.value.underlyingAsset, AAVE_LENDING_POOL_ADDRESS.value)
      }
    } else {
      const allowed = await allowedSpending(AWETH_ADDRESS.value, AAVE_WETH_GATEWAY_ADDRESS.value)
      if (allowed < amountInTokens.value) {
        await approveMaxSpending(AWETH_ADDRESS.value, AAVE_WETH_GATEWAY_ADDRESS.value)
      }
    }
    let result: { isCompleted: boolean; receipt: any }
    isNative ? (result = await repayETHWeb3Call()) : (result = await repayERC20Web3Call())
    txData.isCompleted = result.isCompleted
    txData.receipt = result.receipt
    txData.loading = false
  }

  async function withdraw() {
    txData.loading = true
    const isNative = isNativeToken(chainId.value ?? 1, pool.value.symbol)
    if (!isNative) {
      const allowed = await allowedSpending(pool.value.underlyingAsset, AAVE_LENDING_POOL_ADDRESS.value)
      if (allowed < amountInTokens.value) {
        await approveMaxSpending(pool.value.underlyingAsset, AAVE_LENDING_POOL_ADDRESS.value)
      }
    } else {
      const allowed = await allowedSpending(AWETH_ADDRESS.value, AAVE_WETH_GATEWAY_ADDRESS.value)
      if (allowed < amountInTokens.value) {
        await approveMaxSpending(AWETH_ADDRESS.value, AAVE_WETH_GATEWAY_ADDRESS.value)
      }
    }
    let result: { isCompleted: boolean; receipt: any }
    isNative ? (result = await withdrawETHWeb3Call()) : (result = await withdrawERC20Web3Call())
    txData.isCompleted = result.isCompleted
    txData.receipt = result.receipt
    txData.loading = false
  }
  return { txLoading, receipt, isTxMined, deposit, borrow, repay, withdraw, resetToDefault }
}
