import type { ActionTree, MutationTree } from 'vuex'
import axios from 'axios'
import fiatTokenAbi from '~/constracts/abi/fiatTokenV2_1_abi.json'

export const state = () => ({})
export type TransactionState = ReturnType<typeof state>

export const mutations: MutationTree<TransactionState> = {}

export const actions: ActionTree<TransactionState, TransactionState> = {
  /**
   * GET Contract abi from verified contracts on Etherscan
   * @see https://docs.etherscan.io/api-endpoints/contracts#get-contract-abi-for-verified-contract-source-codes
   * @param {string}  address
   * @return {string} Verified Contract ABI
   **/
  async getContractAbi(_, { contractAddress }): Promise<string> {
    /** If contract is USDC return fiatTokenV2_abi */
    if (contractAddress === '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48') {
      return JSON.stringify(fiatTokenAbi)
    } else {
      const {
        data: { result },
      } = await axios.get(
        `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apiKey=${process.env.etherscanApiKey}`
      )

      return result
    }
  },
}
