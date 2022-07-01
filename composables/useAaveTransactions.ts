import { computed, inject, reactive, Ref } from '@nuxtjs/composition-api'
import { ethers } from 'ethers'
import type { AavePoolModel } from '~/composables/useAavePools'
import { Web3, WEB3_PLUGIN_KEY } from '~/plugins/web3/web3'
import wethGatewayAbi from '~/constracts/abi/aave/wethGatewayAbi.json'
import erc20Abi from '~/constracts/abi/erc20Abi.json'
import lendingPoolAbi from '~/constracts/abi/aave/lendingPoolAbi.json'

interface MarketConfig {
  name: string
  AAVE_LENDING_POOL_ADDRESS: string
  AAVE_WETH_GATEWAY_ADDRESS: string
}
const configs: { [key: number]: MarketConfig } = {
  1: {
    name: 'ETH mainnet',
    AAVE_LENDING_POOL_ADDRESS: '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9',
    AAVE_WETH_GATEWAY_ADDRESS: '0xcc9a0B7c43DC2a5F023Bb9b738E45B0Ef6B06E04',
  },

  137: {
    name: 'Polygon (Matic) ',
    AAVE_LENDING_POOL_ADDRESS: '0x8dFf5E27EA6b7AC08EbFdf9eB090F32ee9a30fcf',
    AAVE_WETH_GATEWAY_ADDRESS: '0xbEadf48d62aCC944a06EEaE0A9054A90E5A7dc97',
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
  },
}

const MAX_UINT256 = '115792089237316195423570985008687907853269984665640564039457584007913129639935'
const ETH_GAS_LIMIT_WEI = 400000
const ETH_GAS_PRICE_GWEI = 16

interface Transaction {
  loading: boolean
  isCompleted: boolean
  receipt: any
}

export default function useAaveTransactions(pool: Ref<AavePoolModel>, amountInTokens: Ref<number>) {
  // COMPUTED
  const { signer, provider, account, chainId } = inject(WEB3_PLUGIN_KEY) as Web3

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

  const txLoading = computed(() => txData.loading)
  const receipt = computed(() => txData.receipt)
  const isTxMined = computed(() => !!(txData.receipt && txData.receipt.transactionHash && txData.receipt.blockNumber))

  // METHODS
  function resetToDefault() {
    txData.loading = false
    txData.isCompleted = false
    txData.receipt = null
  }

  const allowedSpending = async (): Promise<number> => {
    try {
      const tokenInstance = new ethers.Contract(pool.value.underlyingAsset, erc20Abi, signer.value)
      const checkApprove = await tokenInstance.populateTransaction.allowance(account.value, AAVE_LENDING_POOL_ADDRESS)
      const approved = await provider.value.call(checkApprove)
      return parseInt(approved)
    } catch (err) {
      return 0
    }
  }

  const isSpendingApproved = async () =>
    ['ETH', 'MATIC'].includes(pool.value.symbol) ? true : (await allowedSpending()) > amountInTokens.value

  async function approveMaxSpendingWeb3Call(): Promise<{ isCompleted: boolean; receipt: any }> {
    try {
      const erc20 = new ethers.Contract(pool.value.underlyingAsset, erc20Abi, signer.value)
      const approveERC20 = await erc20.populateTransaction.approve(AAVE_LENDING_POOL_ADDRESS.value, MAX_UINT256)
      const txGasLimit = await provider.value.estimateGas(approveERC20)
      const txGasPrice = await provider.value.getGasPrice()
      approveERC20.gasLimit = txGasLimit
      approveERC20.gasPrice = txGasPrice
      const approveResult = await signer.value.sendTransaction(approveERC20)
      const resp = await approveResult.wait()
      return { isCompleted: true, receipt: resp }
    } catch (error) {
      return { isCompleted: false, receipt: error }
    }
  }

  async function depositETHWeb3Call(): Promise<{ isCompleted: boolean; receipt: any }> {
    try {
      const wethGatewayContract = new ethers.Contract(AAVE_WETH_GATEWAY_ADDRESS.value, wethGatewayAbi, signer.value)
      const amount = ethers.utils.parseUnits(`${amountInTokens.value}`, pool.value.decimals)
      const depositCall = await wethGatewayContract.populateTransaction.depositETH(
        AAVE_LENDING_POOL_ADDRESS.value,
        account.value,
        0
      )

      depositCall.gasLimit = ethers.utils.parseUnits(`${ETH_GAS_LIMIT_WEI}`, 'wei')
      depositCall.gasPrice = ethers.utils.parseUnits(`${ETH_GAS_PRICE_GWEI}`, 'gwei')
      depositCall.value = amount

      const depositResult = await signer.value.sendTransaction(depositCall)
      const resp = await depositResult.wait()

      return { isCompleted: true, receipt: resp }
    } catch (error) {
      return { isCompleted: false, receipt: error }
    }
  }

  async function depositWeb3Call(): Promise<{ isCompleted: boolean; receipt: any }> {
    try {
      const lendingPoolContract = new ethers.Contract(AAVE_LENDING_POOL_ADDRESS.value, lendingPoolAbi, signer.value)
      const amount = ethers.utils.parseUnits(`${amountInTokens.value}`, pool.value.decimals)

      const depositCall = await lendingPoolContract.populateTransaction.deposit(
        pool.value.underlyingAsset,
        amount,
        account.value,
        0
      )
      depositCall.gasLimit = await provider.value.estimateGas(depositCall)
      depositCall.gasPrice = await provider.value.getGasPrice()
      const depositResult = await signer.value.sendTransaction(depositCall)
      const resp = await depositResult.wait()
      return { isCompleted: true, receipt: resp }
    } catch (error) {
      return { isCompleted: false, receipt: error }
    }
  }

  async function borrowWeb3Call(): Promise<{ isCompleted: boolean; receipt: any }> {
    try {
      const lendingPoolContract = new ethers.Contract(AAVE_LENDING_POOL_ADDRESS.value, lendingPoolAbi, signer.value)
      const amount = ethers.utils.parseUnits(`${amountInTokens.value}`, pool.value.decimals)
      const borrowCall = await lendingPoolContract.populateTransaction.borrow(
        pool.value.underlyingAsset,
        amount,
        2, // the type of borrow debt. Stable: 1, Variable: 2
        0, // referral code
        account.value
      )
      const txGasLimit = await provider.value.estimateGas(borrowCall)
      const txGasPrice = await provider.value.getGasPrice()
      borrowCall.gasLimit = txGasLimit
      borrowCall.gasPrice = txGasPrice
      const txResult = await signer.value.sendTransaction(borrowCall)
      const resp = await txResult.wait()
      return { isCompleted: true, receipt: resp }
    } catch (err) {
      return { isCompleted: false, receipt: err }
    }
  }

  async function withdrawWeb3Call(): Promise<{ isCompleted: boolean; receipt: any }> {
    try {
      const lendingPoolContract = new ethers.Contract(AAVE_LENDING_POOL_ADDRESS.value, lendingPoolAbi, signer.value)
      const amount = ethers.utils.parseUnits(`${amountInTokens.value}`, pool.value.decimals)
      const withdrawCall = await lendingPoolContract.populateTransaction.withdraw(
        pool.value.underlyingAsset,
        amount,
        account.value
      )
      const txGasLimit = await provider.value.estimateGas(withdrawCall)
      const txGasPrice = await provider.value.getGasPrice()
      withdrawCall.gasLimit = txGasLimit
      withdrawCall.gasPrice = txGasPrice
      const txResult = await signer.value.sendTransaction(withdrawCall)
      const resp = await txResult.wait()
      return { isCompleted: true, receipt: resp }
    } catch (err) {
      return { isCompleted: false, receipt: err }
    }
  }

  async function repayWeb3Call(): Promise<{ isCompleted: boolean; receipt: any }> {
    try {
      const lendingPoolContract = new ethers.Contract(AAVE_LENDING_POOL_ADDRESS.value, lendingPoolAbi, signer.value)
      const amount = ethers.utils.parseUnits(`${amountInTokens.value}`, pool.value.decimals)
      const repayCall = await lendingPoolContract.populateTransaction.repay(
        pool.value.underlyingAsset,
        amount,
        2,
        account.value
      )
      const txGasLimit = await provider.value.estimateGas(repayCall)
      const txGasPrice = await provider.value.getGasPrice()
      repayCall.gasLimit = txGasLimit
      repayCall.gasPrice = txGasPrice
      const txResult = await signer.value.sendTransaction(repayCall)
      const resp = await txResult.wait()
      return { isCompleted: true, receipt: resp }
    } catch (err) {
      return { isCompleted: false, receipt: err }
    }
  }

  async function deposit() {
    txData.loading = true
    const isApproved = await isSpendingApproved()
    if (!isApproved) {
      const { isCompleted, receipt } = await approveMaxSpendingWeb3Call()
      if (!isCompleted) {
        txData.isCompleted = isCompleted
        txData.receipt = receipt
        return
      }
    }

    let result: { isCompleted: boolean; receipt: any }
    ;['ETH', 'MATIC'].includes(pool.value.symbol)
      ? (result = await depositETHWeb3Call())
      : (result = await depositWeb3Call())
    txData.isCompleted = result.isCompleted
    txData.receipt = result.receipt
    txData.loading = false
  }

  async function borrow() {
    txData.loading = true
    const { isCompleted, receipt } = await borrowWeb3Call()
    txData.isCompleted = isCompleted
    txData.receipt = receipt
    txData.loading = false
  }

  async function repay() {
    txData.loading = true
    const isApproved = await isSpendingApproved()
    if (!isApproved) {
      const { isCompleted, receipt } = await approveMaxSpendingWeb3Call()
      if (!isCompleted) {
        txData.isCompleted = isCompleted
        txData.receipt = receipt
        return
      }
    }
    const { isCompleted, receipt } = await repayWeb3Call()
    txData.isCompleted = isCompleted
    txData.receipt = receipt
    txData.loading = false
  }

  async function withdraw() {
    txData.loading = true
    const { isCompleted, receipt } = await withdrawWeb3Call()
    txData.isCompleted = isCompleted
    txData.receipt = receipt
    txData.loading = false
  }
  return { txLoading, receipt, isTxMined, deposit, borrow, repay, withdraw, resetToDefault }
}
