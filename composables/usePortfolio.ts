import { ethers } from 'ethers'
import { ComputedRef, inject } from '@nuxtjs/composition-api'
import erc20Abi from '../constracts/abi/erc20Abi.json'
import { Web3, WEB3_PLUGIN_KEY } from '~/plugins/web3/web3'
import { AaveAddress, AavePortfolio } from '~/types/apollo/main/types'

type Balance = { poolId: string; balance: number }
export type PortfolioMap = { [poolId: string]: AavePortfolio }

async function getERC20Balance(
  poolId: string,
  tokenAddress: string,
  decimals: number,
  walletAddress: string,
  signer: any
): Promise<Balance> {
  try {
    const contract = new ethers.Contract(tokenAddress, erc20Abi, signer)
    const balance = await contract.balanceOf(walletAddress)
    const converted = parseFloat(balance) / 10 ** decimals
    return { poolId, balance: converted }
  } catch (error) {
    return { poolId, balance: 0 }
  }
}

async function getEthBalance(poolId: string, walletAddress: string, provider: any): Promise<Balance> {
  try {
    const balanceInWei = await provider.getBalance(walletAddress)
    const balanceInEth = ethers.utils.formatUnits(balanceInWei)
    return { poolId, balance: parseFloat(balanceInEth) }
  } catch (error) {
    return { poolId, balance: 0 }
  }
}

export default function (addresses: ComputedRef<{ [id: string]: AaveAddress }>) {
  // COMPOSABLES
  const { signer, account, provider } = inject(WEB3_PLUGIN_KEY) as Web3

  // METHODS
  const fetchPortfolio = async (): Promise<PortfolioMap> => {
    const portfolio: PortfolioMap = {}
    const nativeMultCalls: Promise<Balance>[] = []
    const depositMultCalls: Promise<Balance>[] = []
    const variableBorrowMultCalls: Promise<Balance>[] = []

    Object.keys(addresses.value).forEach((key) => {
      const tokenAddress = addresses.value[key].address
      const aTokenAddress = addresses.value[key].aTokenAddress
      const variableBorrowTokenAddress = addresses.value[key].variableDebtTokenAddress
      const decimals = addresses.value[key].decimals

      const request = ['ETH', 'MATIC'].includes(addresses.value[key].symbol)
        ? getEthBalance(key, account.value, provider.value)
        : getERC20Balance(key, tokenAddress, decimals, account.value, signer.value)
      nativeMultCalls.push(request)
      depositMultCalls.push(getERC20Balance(key, aTokenAddress, decimals, account.value, signer.value))
      variableBorrowMultCalls.push(
        getERC20Balance(key, variableBorrowTokenAddress, decimals, account.value, signer.value)
      )
    })

    const toHashMap = (balances: Balance[]) =>
      balances.reduce((map: any, obj) => {
        map[obj.poolId] = obj.balance
        return map
      }, {})

    const native = await Promise.all(nativeMultCalls).then((balances) => toHashMap(balances))
    const deposit = await Promise.all(depositMultCalls).then((balances) => toHashMap(balances))
    const variableBorrow = await Promise.all(variableBorrowMultCalls).then((balances) => toHashMap(balances))

    Object.keys(addresses.value).forEach((key) => {
      portfolio[key] = { symbol: '', walletBal: 0, totalDeposits: 0, stableBorrow: 0, variableBorrow: 0 }
      portfolio[key].walletBal = native[key]
      portfolio[key].totalDeposits = deposit[key]
      portfolio[key].variableBorrow = variableBorrow[key]
    })
    return portfolio
  }

  return { fetchPortfolio }
}
