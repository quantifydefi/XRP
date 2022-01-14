import { Component, Ref, Watch, Vue, Emit } from 'vue-property-decorator'
import { BigNumber, ethers, Signer } from 'ethers'
import lendingPoolAbi from '../constracts/abi/aave/lendingPoolAbi.json'
import erc20Abi from '../constracts/abi/erc20Abi.json'
import { AavePoolCl } from '~/models/pool'
import { Helper } from '~/models/helper'

export type aaveActionTypes = 'deposit' | 'borrow' | 'repay' | 'withdraw'
declare const window: any

export const aaveActions: { text: string; value: aaveActionTypes }[] = [
  { text: 'Deposit', value: 'deposit' },
  { text: 'Borrow', value: 'borrow' },
  { text: 'Repay', value: 'repay' },
  { text: 'Withdraw', value: 'withdraw' },
]

@Component({ name: 'AavePoolAction' })
export class AavePoolAction extends Vue {
  @Ref('depositForm') readonly depositForm!: any

  provider: any = null
  signer!: Signer

  // AAve landing pool address
  // https://docs.aave.com/developers/deployed-contracts/deployed-contracts
  AAVE_LANDING_POOL_ADDRESS = '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9'
  MAX_UINT256 = '115792089237316195423570985008687907853269984665640564039457584007913129639935'

  dialog = false
  loading = false
  loadingWalletTokenBalance = false
  pool: AavePoolCl | null = null
  actionType: aaveActionTypes = 'deposit'
  alert = false
  message = { status: 'success', message: '' }

  readonly actions = aaveActions

  stepLogs: any = []

  steps: { [key in aaveActionTypes]?: Record<string, string> } = {
    deposit: { checkBalance: 'deposit' },
  }

  depositFormValid = false

  @Watch('dialog')
  onDialog(value: boolean) {
    if (!value) {
      this.alert = false
      this.values.inputNum.value = 0
    }
  }

  @Watch('actionType')
  onActionChanged(value: aaveActionTypes) {
    if (value) {
      this.alert = false
    }
  }

  get amount() {
    return new Intl.NumberFormat('en').format(this.values.inputNum.value)
  }

  set amount(value: string) {
    if (value && value.length > 0) {
      const num = parseFloat(value.replace(/,/g, ''))
      if (!isNaN(num)) {
        this.values.inputNum.value = parseFloat(value.replace(/,/g, ''))
      } else this.values.inputNum.value = 0
    } else this.values.inputNum.value = 0
  }

  /** Formats input to Big Number with appropriate decimals **/
  formatInput(input: number, decimals: number): BigNumber {
    return ethers.utils.parseUnits(`${input}`, decimals)
  }

  _allowedToDeposit: number = 0

  values = {
    inputNum: {
      value: 0 as number,

      hidden: true as boolean,
      disabled: false as boolean,
      placeholder: 'Number Of tokens',
      rules: {
        required: (v: string) => !!v || 'Number  is required',
        mustBeNumber: (v: string) => {
          return !isNaN(parseFloat(v)) || 'Must be Number'
        },
        musBeMoreThen0: (v: string) => {
          return parseFloat(v) > 0 || 'Must be more then 0'
        },
      },
    },
  }

  get allowedToDeposit(): number {
    if (this.pool) {
      if (this.pool?.symbol === 'USDC') {
        return this._allowedToDeposit * 10 ** 12
      }
      return this._allowedToDeposit
    }
    return 0
  }

  /**
   * Accept aave pool and  instantiate landing pool contracts
   * @param  pool Aave Pool from backend subgraph API with additional computed properties
   * @param  action Aave Action
   */
  async init(pool: AavePoolCl, action: aaveActionTypes) {
    this.actionType = action
    this._allowedToDeposit = 0
    this.pool = pool
    this.dialog = true

    // Getting current wallet balance of the token we trying to deposit
    this.loadingWalletTokenBalance = true
    this.values.inputNum.disabled = true
    this._allowedToDeposit = await this._WALLET_BALANCE_METAMASK_CALL()
    this.loadingWalletTokenBalance = false
    this.values.inputNum.disabled = false
  }

  setAltImg(event: any) {
    return Helper.setAltImg(event)
  }

  /**
   * Initiate Ethers.js Signer and provider to use for future transactions
   */
  async mounted() {
    this.provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    this.signer = await this.provider.getSigner()
  }

  private async _CHECK_ALLOWED_SPENDING_METAMASK_CALL(): Promise<number> {
    if (this.pool) {
      try {
        const tokenInstance = new ethers.Contract(this.pool.underlyingAsset, erc20Abi, this.signer)
        const walletAddress = await this.signer.getAddress()
        const checkApprove = await tokenInstance.populateTransaction.allowance(
          walletAddress,
          this.AAVE_LANDING_POOL_ADDRESS
        )
        const approved = await this.provider.call(checkApprove)
        return parseInt(approved)
      } catch (err) {
        console.log(err)
        return 0
      }
    }
    return 0
  }

  private async _APPROVE_SPENDING_METAMASK_CALL(): Promise<object | null> {
    if (this.pool) {
      try {
        const erc20 = new ethers.Contract(this.pool.underlyingAsset, erc20Abi, this.signer)
        const approveERC20 = await erc20.populateTransaction.approve(this.AAVE_LANDING_POOL_ADDRESS, this.MAX_UINT256)
        const txGasLimit = await this.provider.estimateGas(approveERC20)
        const txGasPrice = await this.provider.getGasPrice()
        approveERC20.gasLimit = txGasLimit
        approveERC20.gasPrice = txGasPrice
        const approveResult = await this.signer.sendTransaction(approveERC20)
        return await approveResult.wait()
      } catch (error) {
        console.log(error)
        return null
      }
    }
    return null
  }

  private async _DEPOSIT_METAMASK_CALL(): Promise<object | null> {
    if (this.pool) {
      try {
        const lendingPoolContract = new ethers.Contract(this.AAVE_LANDING_POOL_ADDRESS, lendingPoolAbi, this.signer)
        const amount = ethers.utils.parseUnits(`${this.values.inputNum.value}`, this.pool.decimals)
        const walletAddress = await this.signer.getAddress()
        const depositCall = await lendingPoolContract.populateTransaction.deposit(
          this.pool.underlyingAsset,
          amount,
          walletAddress,
          0
        )
        const txGasLimit = await this.provider.estimateGas(depositCall)
        const txGasPrice = await this.provider.getGasPrice()
        depositCall.gasLimit = txGasLimit
        depositCall.gasPrice = txGasPrice
        const depositResult = await this.signer.sendTransaction(depositCall)
        return await depositResult.wait()
      } catch (error) {
        console.log(error)
        return null
      }
    }
    return null
  }

  private async _BORROW_METAMASK_CALL() {
    if (this.pool) {
      try {
        const lendingPoolContract = new ethers.Contract(this.AAVE_LANDING_POOL_ADDRESS, lendingPoolAbi, this.signer)
        const walletAddress = await this.signer.getAddress()
        const amount = ethers.utils.parseUnits(`${this.values.inputNum.value}`, this.pool.decimals)
        const borrowCall = await lendingPoolContract.populateTransaction.borrow(
          this.pool.underlyingAsset,
          amount,
          2, // variable rate
          0, // referral code
          walletAddress
        )

        const txGasLimit = await this.provider.estimateGas(borrowCall)
        const txGasPrice = await this.provider.getGasPrice()
        borrowCall.gasLimit = txGasLimit
        borrowCall.gasPrice = txGasPrice
        const txResult = await this.signer.sendTransaction(borrowCall)
        return await txResult.wait()
      } catch (err) {
        return null
      }
    }
  }

  private async _REPAY_METAMASK_CALL() {
    if (this.pool) {
      try {
        const lendingPoolContract = new ethers.Contract(this.AAVE_LANDING_POOL_ADDRESS, lendingPoolAbi, this.signer)
        const amount = ethers.utils.parseUnits(`${this.values.inputNum.value}`, this.pool.decimals)
        const walletAddress = await this.signer.getAddress()
        const repayCall = await lendingPoolContract.populateTransaction.repay(
          this.pool.underlyingAsset,
          amount,
          2,
          walletAddress
        )

        const txGasLimit = await this.provider.estimateGas(repayCall)
        const txGasPrice = await this.provider.getGasPrice()
        repayCall.gasLimit = txGasLimit
        repayCall.gasPrice = txGasPrice

        const txResult = await this.signer.sendTransaction(repayCall)
        return await txResult.wait()
      } catch (err) {
        console.log(err)
        return null
      }
    }
  }

  private async _WITHDRAW_METAMASK_CALL() {
    if (this.pool) {
      try {
        const lendingPoolContract = new ethers.Contract(this.AAVE_LANDING_POOL_ADDRESS, lendingPoolAbi, this.signer)
        const amount = ethers.utils.parseUnits(`${this.values.inputNum.value}`, this.pool.decimals)
        const walletAddress = await this.signer.getAddress()
        const withdrawCall = await lendingPoolContract.populateTransaction.withdraw(
          this.pool.underlyingAsset,
          amount,
          walletAddress
        )
        const txGasLimit = await this.provider.estimateGas(withdrawCall)
        const txGasPrice = await this.provider.getGasPrice()
        withdrawCall.gasLimit = txGasLimit
        withdrawCall.gasPrice = txGasPrice
        const txResult = await this.signer.sendTransaction(withdrawCall)
        return await txResult.wait()
      } catch (err) {
        console.log(err)
        return null
      }
    }
  }

  private async _WALLET_BALANCE_METAMASK_CALL(): Promise<number> {
    if (this.pool) {
      try {
        const contract = new ethers.Contract(this.pool.underlyingAsset, erc20Abi, this.signer)
        const walletAddress = await this.signer.getAddress()
        const contractBalance = await contract.populateTransaction.balanceOf(walletAddress)
        const bal = await this.provider.call(contractBalance)
        const t = ethers.utils.formatUnits(bal, 'ether')
        return parseFloat(t)
      } catch (error) {
        return 0
      }
    }
    return 0
  }

  /* async deposit_ex() {
    // set global loading
    this.loading = true
    this.values.inputNum.disabled = true

    const log = {
      isLoading: true,
      icon: 'mdi-checkbox-marked-circle',
      text: 'Checking Wallet balance',
      iconColor: 'green',
      value: 'walletCheck',
    }
    this.stepLogs.push(log)

    // get amount of tokens in the wallet
    this._allowedToDeposit = await this._WALLET_BALANCE_METAMASK_CALL()
    const logIndex = this.stepLogs.findIndex((obj: any) => obj.value === 'walletCheck')
    this.stepLogs[logIndex].isLoading = false
    if (this.allowedToDeposit > this.values.inputNum.value) {
      console.log('Move')
    } else {
      console.log('error')
      this.stepLogs[logIndex].isLoading = false
      this.stepLogs[logIndex].icon = 'mdi-alert-circle'
      this.stepLogs[logIndex].iconColor = 'red'
    }

    console.log(this.allowedToDeposit)

    // const receipt = await this._DEPOSIT_METAMASK_CALL()
    // console.log(receipt, 'RRRRRRRRRRRRRRR')
    this.loading = false
  }
*/
  @Emit('transaction-result')
  transactionResult(status: 'error' | 'success', message: string) {
    this.alert = true
    this.message = { status, message }
    this.values.inputNum.value = 0
    this.loading = false
    this.values.inputNum.disabled = false
    return status
  }

  async deposit() {
    this.loading = true
    this.values.inputNum.disabled = true
    const allowedSpending = await this._CHECK_ALLOWED_SPENDING_METAMASK_CALL()
    if (allowedSpending < this.values.inputNum.value) {
      const resp = await this._APPROVE_SPENDING_METAMASK_CALL()
      if (!resp) {
        this.transactionResult('error', `Cant Approve Spending`)
        return
      }
    }
    const depositResp = await this._DEPOSIT_METAMASK_CALL()
    if (!depositResp) {
      return this.transactionResult('error', `Something went wrong.`)
    }
    return this.transactionResult('success', 'Transaction completed successfully')
  }

  async borrow() {
    this.loading = true
    this.values.inputNum.disabled = true
    const borrowResp = await this._BORROW_METAMASK_CALL()
    if (!borrowResp) {
      return this.transactionResult('error', `Something went wrong.`)
    }
    return this.transactionResult('success', 'Transaction completed successfully')
  }

  async withdraw() {
    this.loading = true
    this.values.inputNum.disabled = true
    const borrowResp = await this._WITHDRAW_METAMASK_CALL()
    if (!borrowResp) {
      return this.transactionResult('error', `Something went wrong`)
    }
    return this.transactionResult('success', 'Transaction completed successfully')
  }

  async repay() {
    this.loading = true
    this.values.inputNum.disabled = true
    const allowedSpending = await this._CHECK_ALLOWED_SPENDING_METAMASK_CALL()
    if (allowedSpending < this.values.inputNum.value) {
      const resp = await this._APPROVE_SPENDING_METAMASK_CALL()
      if (!resp) {
        this.transactionResult('error', `Cant Approve Spending`)
        return
      }
    }
    const repay = await this._REPAY_METAMASK_CALL()
    if (!repay) {
      return this.transactionResult('error', `Something went wrong.`)
    }
    return this.transactionResult('success', 'Transaction completed successfully')
  }
}
