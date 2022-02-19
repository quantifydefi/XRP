// eslint-disable-next-line import/named
import { ContractInterface, ethers } from 'ethers'
import axios from 'axios'
import { Log } from '@ethersproject/abstract-provider/src.ts/index'
import { Provider } from '@ethersproject/abstract-provider'
import erc20Abi from '../../constracts/abi/erc20Abi.json'
import uniswapV3PoolAbi from '../../constracts/abi/uniswap/uniswapV3PoolAbi.json'
const MAIN_NET_FORK_URL = process.env.MAIN_NET_FORK_URL || ''
const TXN_HASH = '0xe3b91b39ca3fc5a563de03ddfeeae3d4b7e28f87d60ba8d14349ecbb94eb8042'

describe('Transactions', () => {
  const provider = new ethers.providers.JsonRpcProvider(MAIN_NET_FORK_URL)

  /**
   * Fetches contract's abi from etherscan
   * **/
  const fetchContractAbi = async (address: string) => {
    try {
      const {
        data: { result },
      } = await axios.get(
        `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${process.env.ETHERSCAN_API_KEY}`
      )
      const abiEvents = JSON.parse(result)
      // const events = Object.values(abiEvents).filter((item: any) => item.type === 'event')
      return abiEvents
    } catch (err) {
      console.log(err)
      return []
    }
  }

  /**
   * Fetches transaction logs
   * **/
  const fetchTransactionLogs = async (txnHash: string): Promise<Array<Log>> => {
    try {
      const tx = await provider.waitForTransaction(txnHash)
      return tx.logs
    } catch (err) {
      // console.log(err)
      return []
    }
  }

  /**
   * Returns contractInfo = {
   *   name,
   *   symbol,
   *   decimals
   * }
   * **/
  const fetchContractInfo = async (
    address: string,
    erc20Abi: ContractInterface,
    provider: Provider
  ): Promise<{ name: string; symbol: string; decimals: number }> => {
    const contract = new ethers.Contract(address, erc20Abi, provider)

    const contractInfo = {
      name: '',
      symbol: '',
      decimals: 0,
    }

    try {
      contractInfo.name = await contract.name()
      contractInfo.symbol = await contract.symbol()
    } catch (err) {}

    try {
      contractInfo.decimals = await contract.decimals()
    } catch (err) {}

    return contractInfo
  }

  test('it fetches transaction receipt from blockchain', async () => {
    const logs = await fetchTransactionLogs(TXN_HASH)
    console.log(logs)
  })

  test('it fetches transaction events abi in index 0', async () => {
    const logs = await fetchTransactionLogs(TXN_HASH)
    const contractEventsAbi = await fetchContractAbi(logs[0].address)
    console.log(contractEventsAbi)
  })

  test("fetches contract's name, symbol, and decimals of transaction log in index 3", async () => {
    const logs = await fetchTransactionLogs(TXN_HASH)
    const contractInfo = await fetchContractInfo(logs[3].address, erc20Abi, provider)
    console.log(contractInfo)
  })

  test("it decodes logs in index 0 with contract's abi", async () => {
    const logs = await fetchTransactionLogs(TXN_HASH)
    const contractEventsAbi = await fetchContractAbi(logs[0].address)
    const inter = new ethers.utils.Interface(contractEventsAbi)
    const decodedInput = inter.parseLog({ topics: logs[0].topics, data: logs[0].data })
    console.log(decodedInput)
  })

  test('decoded event log in index 0', async () => {
    const index = 3
    const logs = await fetchTransactionLogs(TXN_HASH)

    let contractInfo = await fetchContractInfo(logs[index].address, erc20Abi, provider)
    let contractAbi

    // if methoidId is equals to 0xc42079f9 which is the Swap signature, use UniswapV3Pool abi else fetch abi from etherscan
    if (logs[index].topics[0].substring(0, 10) === '0xc42079f9') {
      contractAbi = uniswapV3PoolAbi
      contractInfo = {
        name: 'UniswapV3Pool',
        symbol: 'UniswapV3Pool',
        decimals: 0,
      }
    } else {
      contractAbi = await fetchContractAbi(logs[index].address)
    }

    const inter = new ethers.utils.Interface(contractAbi)

    const decodedInput = inter.parseLog({ topics: logs[index].topics, data: logs[index].data })

    const params = []

    for (const i in decodedInput.eventFragment.inputs) {
      params.push({
        name: decodedInput.eventFragment.inputs[i].name,
        type: decodedInput.eventFragment.inputs[i].type,
        value: decodedInput.args[decodedInput.eventFragment.inputs[i].name],
      })
    }

    const decoded = {
      ...contractInfo,
      address: logs[index].address,
      function: decodedInput.name,
      signature: decodedInput.signature,
      methodId: decodedInput.topic.substring(2, 10),
      params,
    }

    console.log(decoded)
  })
})
