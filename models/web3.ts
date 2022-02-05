import { Component, Ref, Watch, Emit, Vue } from 'vue-property-decorator'
import { BigNumber, ethers, Signer } from 'ethers'
import lendingPoolAbi from '../constracts/abi/aave/lendingPoolAbi.json'
import wethGatewayAbi from '../constracts/abi/aave/wethGatewayAbi.json'
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

  //
  provider: any = null
  signer!: Signer

  // AAve landing pool address
  // https://docs.aave.com/developers/deployed-contracts/deployed-contracts
  AAVE_LENDING_POOL_ADDRESS = '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9'
  AAVE_WETH_GATEWAY_ADDRESS = '0xcc9a0B7c43DC2a5F023Bb9b738E45B0Ef6B06E04'
  AWETH_ADDRESS = '0x030ba81f1c18d280636f32af80b9aad02cf0854e'
  MAX_UINT256 = '115792089237316195423570985008687907853269984665640564039457584007913129639935'
  ETH_GAS_LIMIT_WEI = 1000000
  ETH_GAS_PRICE_GWEI = 105

  dialog = false
  loading = false
  loadingWalletTokenBalance = false
  pool: AavePoolCl | null = null
  healthFactor: number = 0
  totalCollateral: number = 0
  totalBorrowed: number = 0
  maxLTV: number = 0
  actionType: aaveActionTypes = 'deposit'
  alert = false
  showTransactionLogs = false
  alertMessage = { status: 'success', message: '', logs: {} }

  messages = {
    maxLTV: {
      title: 'Loan to Value (LTV) Ratio',
      text: 'The Maximum Loan-to-Value ratio represents the maximum borrowing power of a specific collateral. For example, if a collateral has a LTV of 75%, the user can borrow up to 0.75 worth of ETH in the principal currency for every 1 ETH worth of collateral.',
    },
    liquidationThreshold: {
      title: 'Liquidation threshold',
      text: 'This represents the threshold at which a borrow position will be considered undercollateralized and subject to liquidation for each collateral. For example, if a collateral has a liquidation threshold of 80%, it means that the loan will be liquidated when the debt value is worth 80% of the collateral value.',
    },
    liquidationPenalty: {
      title: 'Liquidation penalty',
      text: 'When a liquidation occurs, liquidators repay part or all of the outstanding borrowed amount on behalf of the borrower. In return, they can buy the collateral at a discount and keep the difference as a bonus!',
    },
    healthFactor: {
      title: 'Health Factor',
      text: 'The health factor represents the safety of your loan derived from the proportion of collateral versus amount borrowed. Keep it above 1 to avoid liquidation.',
    },
  }

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
      this.showTransactionLogs = false
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

  // _allowedToDeposit: number = 0

  values = {
    inputNum: {
      value: 0 as number,

      hidden: true as boolean,
      disabled: false as boolean,
      placeholder: 'Number Of tokens',
      rules: {
        required: (v: string) => !!v || 'Number is required',
        mustBeNumber: (v: string) => !isNaN(parseFloat(v)) || 'Must be Number',
        musBeMoreThen0: () => this.values.inputNum.value > 0 || 'Must be more then 0',
      },
    },
  }

  get allowedToBorrow() {
    if (this.pool) {
      return ((this.totalCollateral * this.maxLTV) / 100 - this.totalBorrowed) / this.pool.usdPrice || 0
    } else return 0
  }

  // TODO: Need to be adjusted
  get allowedToWithdraw() {
    if (this.pool) {
      return (this.totalCollateral * 0.85 - this.totalBorrowed) / this.pool.usdPrice || 0
    } else return 0
  }

  get uiTables() {
    if (this.pool) {
      return {
        deposit: {
          basicStats: [
            { name: 'Utilization rate', value: this.pool.utilizationRatePtc.toFixed(2) + '%' },
            {
              name: 'Available liquidity',
              value: `${this.pool.availableLiquidityBalance.toLocaleString()} ${this.pool.symbol}`,
            },
            { name: 'Deposit APY', value: (this.pool.depositAPY * 100).toFixed(2) + '%' },
            {
              name: 'Used As Collateral',
              value: this.pool.usageAsCollateralEnabled ? 'Yes' : 'No',
              class: this.pool.usageAsCollateralEnabled
                ? ['font-weight-bold', 'green--text']
                : ['font-weight-bold', 'red--text'],
            },
          ],
          reserves: [
            { name: 'Asset price', value: '$ ' + this.pool.usdPrice.toFixed(2) + ' USD' },
            { name: 'Maximum LTV', value: this.pool.loanToValue + '%', isTooltip: true, tooltip: this.messages.maxLTV },
            {
              name: 'Liquidation Threshold',
              value: this.pool.liquidationThreshold > 0 ? this.pool.liquidationThreshold + ' %' : '-',
              isTooltip: true,
              tooltip: this.messages.liquidationThreshold,
            },
            {
              name: 'Liquidation Penalty',
              value: this.pool.liquidationPenalty > 0 ? this.pool.liquidationPenalty + ' %' : '-',
              isTooltip: true,
              tooltip: this.messages.liquidationPenalty,
            },
          ],
          wallet: [
            { name: 'Your balance in Aave', value: this.pool.portfolio.totalDeposits.toLocaleString() },
            {
              name: 'Your wallet balance',
              value: this.pool.portfolio.walletBal.toLocaleString() + ' ' + this.pool.symbol,
            },
            { name: 'Health Factor', value: this.healthFactor > 0 ? this.healthFactor.toLocaleString() : '-' },
          ],
        },
        borrow: {
          basicStats: [
            { name: 'Utilization rate', value: this.pool.utilizationRatePtc.toFixed(2) + '%' },
            {
              name: 'Available liquidity',
              value: `${this.pool.availableLiquidityBalance.toLocaleString()} ${this.pool.symbol}`,
            },
            { name: 'Asset price', value: '$ ' + this.pool.usdPrice.toFixed(2) + ' USD' },
          ],

          reserves: [
            { name: 'Stable borrow APY', value: (this.pool.stableBorrowAPY * 100).toFixed(2) + '%' },
            { name: 'Variable borrow APY', value: (this.pool.variableBorrowAPY * 100).toFixed(2) + '%' },
          ],

          wallet: [
            { name: 'You Borrowed', value: '$ ' + this.totalBorrowed.toLocaleString() + ' USD' },
            { name: 'Total collateral', value: '$ ' + this.totalCollateral.toLocaleString() + ' USD' },
            { name: 'Health Factor', value: this.healthFactor > 0 ? this.healthFactor.toLocaleString() : '-' },
            { name: 'Loan to value', value: this.maxLTV > 0 ? this.maxLTV.toFixed(2) + '%' : '-' },
          ],
        },

        repay: {
          basicStats: [
            { name: 'You borrowed', value: this.pool.portfolio.variableBorrow },
            { name: 'Wallet balance', value: this.pool.portfolio.walletBal },
          ],
          stats: [
            {
              name: 'Liquidation Threshold',
              value: this.healthFactor > 0 ? this.healthFactor.toLocaleString() : '-',
              isTooltip: true,
              tooltip: this.messages.healthFactor,
            },

            {
              name: 'Loan to Value',
              value: this.maxLTV > 0 ? this.maxLTV.toFixed(2) + '%' : '-',
              isTooltip: true,
              tooltip: this.messages.maxLTV,
            },
          ],
        },
        withdraw: {
          stats: [
            { name: 'Your balance in Aave', value: this.pool.portfolio.totalDeposits + ` ${this.pool.symbol}` },
            {
              name: 'Liquidation Threshold',
              value: this.healthFactor > 0 ? this.healthFactor.toLocaleString() : '-',
              isTooltip: true,
              tooltip: this.messages.healthFactor,
            },

            {
              name: 'Loan to Value',
              value: this.maxLTV > 0 ? this.maxLTV.toFixed(2) + '%' : '-',
              isTooltip: true,
              tooltip: this.messages.maxLTV,
            },
          ],
        },
      }
    } else return null
  }

  /**
   * Accept aave pool and  instantiate landing pool contracts
   * @param  pool Aave Pool from backend subgraph API with additional computed properties
   * @param  action Aave Action
   * @param  totalCollateral Aave total Collateral deposits in USD
   * @param  healthFactor Computed healthFactor, https://docs.aave.com/risk/asset-risk/risk-parameters
   * @param totalBorrowed Aave total borrowed in USD
   * @param maxLTV MAX LTV from pool
   */
  init(
    pool: AavePoolCl,
    healthFactor: number = 0,
    totalCollateral: number = 0,
    totalBorrowed: number = 0,
    maxLTV: number = 0,
    action: aaveActionTypes
  ) {
    this.actionType = action
    this.pool = pool
    this.healthFactor = healthFactor
    this.totalCollateral = totalCollateral
    this.totalBorrowed = totalBorrowed
    this.maxLTV = maxLTV
    this.dialog = true
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
          this.AAVE_LENDING_POOL_ADDRESS
        )
        const approved = await this.provider.call(checkApprove)
        return parseInt(approved)
      } catch (err) {
        return 0
      }
    }
    return 0
  }

  private async _CHECK_ALLOWED_SPENDING_WETH_METAMASK_CALL(): Promise<number> {
    if (this.pool) {
      try {
        const tokenInstance = new ethers.Contract(this.AWETH_ADDRESS, erc20Abi, this.signer)
        const walletAddress = await this.signer.getAddress()
        const checkApprove = await tokenInstance.populateTransaction.allowance(
          walletAddress,
          this.AAVE_WETH_GATEWAY_ADDRESS
        )
        const approved = await this.provider.call(checkApprove)
        return parseInt(approved)
      } catch (err) {
        return 0
      }
    }
    return 0
  }

  private async _APPROVE_SPENDING_METAMASK_CALL(): Promise<object | null> {
    if (this.pool) {
      try {
        const erc20 = new ethers.Contract(this.pool.underlyingAsset, erc20Abi, this.signer)
        const approveERC20 = await erc20.populateTransaction.approve(this.AAVE_LENDING_POOL_ADDRESS, this.MAX_UINT256)
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

  private async _APPROVE_SPENDING_WETH_METAMASK_CALL(): Promise<object | null> {
    if (this.pool) {
      try {
        const erc20 = new ethers.Contract(this.AWETH_ADDRESS, erc20Abi, this.signer)
        const approveERC20 = await erc20.populateTransaction.approve(this.AAVE_WETH_GATEWAY_ADDRESS, this.MAX_UINT256)
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

  private async _DEPOSIT_METAMASK_CALL(): Promise<{ isCompleted: boolean; logs: any }> {
    if (this.pool) {
      try {
        const lendingPoolContract = new ethers.Contract(this.AAVE_LENDING_POOL_ADDRESS, lendingPoolAbi, this.signer)
        const amount = ethers.utils.parseUnits(`${this.values.inputNum.value}`, this.pool.decimals)
        const walletAddress = await this.signer.getAddress()
        const depositCall = await lendingPoolContract.populateTransaction.deposit(
          this.pool.underlyingAsset,
          amount,
          walletAddress,
          0
        )
        depositCall.gasLimit = await this.provider.estimateGas(depositCall)
        depositCall.gasPrice = await this.provider.getGasPrice()
        const depositResult = await this.signer.sendTransaction(depositCall)
        const resp = await depositResult.wait()
        return { isCompleted: true, logs: resp }
      } catch (error) {
        return { isCompleted: false, logs: error }
      }
    }
    return { isCompleted: false, logs: {} }
  }

  private async _DEPOSIT_ETH_METAMASK_CALL(): Promise<{ isCompleted: boolean; logs: any }> {
    if (this.pool) {
      try {
        const wethGatewayContract = new ethers.Contract(this.AAVE_WETH_GATEWAY_ADDRESS, wethGatewayAbi, this.signer)
        const amount = ethers.utils.parseUnits(`${this.values.inputNum.value}`, this.pool.decimals)
        const walletAddress = await this.signer.getAddress()
        const depositCall = await wethGatewayContract.populateTransaction.depositETH(
          this.AAVE_LENDING_POOL_ADDRESS,
          walletAddress,
          0
        )
        depositCall.gasLimit = ethers.utils.parseUnits(`${this.ETH_GAS_LIMIT_WEI}`, 'wei')
        depositCall.gasPrice = ethers.utils.parseUnits(`${this.ETH_GAS_PRICE_GWEI}`, 'gwei')
        depositCall.value = amount
        const depositResult = await this.signer.sendTransaction(depositCall)
        const resp = await depositResult.wait()
        return { isCompleted: true, logs: resp }
      } catch (error) {
        return { isCompleted: false, logs: error }
      }
    }
    return { isCompleted: false, logs: {} }
  }

  private async _BORROW_METAMASK_CALL() {
    if (this.pool) {
      try {
        const lendingPoolContract = new ethers.Contract(this.AAVE_LENDING_POOL_ADDRESS, lendingPoolAbi, this.signer)
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
        const resp = await txResult.wait()
        return { isCompleted: true, logs: resp }
      } catch (err) {
        return { isCompleted: false, logs: err }
      }
    }
    return { isCompleted: false, logs: {} }
  }

  private async _BORROW_ETH_METAMASK_CALL(): Promise<object | null> {
    if (this.pool) {
      try {
        const wethGatewayContract = new ethers.Contract(this.AAVE_WETH_GATEWAY_ADDRESS, wethGatewayAbi, this.signer)
        const amount = ethers.utils.parseUnits(`${this.values.inputNum.value}`, this.pool.decimals)
        const borrowCall = await wethGatewayContract.populateTransaction.borrowETH(
          this.AAVE_LENDING_POOL_ADDRESS,
          amount,
          2, // variable rate
          0 // referral code
        )
        borrowCall.gasLimit = await this.provider.estimateGas(borrowCall)
        borrowCall.gasPrice = await this.provider.getGasPrice()
        const txResult = await this.signer.sendTransaction(borrowCall)
        return await txResult.wait()
      } catch (err) {
        return null
      }
    }
    return null
  }

  private async _REPAY_METAMASK_CALL(): Promise<{ isCompleted: boolean; logs: any }> {
    if (this.pool) {
      try {
        const lendingPoolContract = new ethers.Contract(this.AAVE_LENDING_POOL_ADDRESS, lendingPoolAbi, this.signer)
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
        const resp = await txResult.wait()
        return { isCompleted: true, logs: resp }
      } catch (err) {
        return { isCompleted: false, logs: err }
      }
    }
    return { isCompleted: false, logs: {} }
  }

  /*  private async _REPAY_ETH_METAMASK_CALL(): Promise<object | null> {
    if (this.pool) {
      try {
        const wethGatewayContract = new ethers.Contract(this.AAVE_WETH_GATEWAY_ADDRESS, wethGatewayAbi, this.signer)
        const amount = ethers.utils.parseUnits(`${this.values.inputNum.value}`, this.pool.decimals)
        const walletAddress = await this.signer.getAddress()
        const repayCall = await wethGatewayContract.populateTransaction.repayETH(
          this.AAVE_LENDING_POOL_ADDRESS,
          amount,
          2, // variable rate
          walletAddress
        )
        const txGasLimit = await this.provider.estimateGas(repayCall)
        const txGasPrice = await this.provider.getGasPrice()
        repayCall.gasLimit = txGasLimit
        repayCall.gasPrice = txGasPrice
        const txResult = await this.signer.sendTransaction(repayCall)
        return await txResult.wait()
      } catch (err) {
        return null
      }
    }
    return null
  } */

  private async _WITHDRAW_METAMASK_CALL(): Promise<{ isCompleted: boolean; logs: any }> {
    if (this.pool) {
      try {
        const lendingPoolContract = new ethers.Contract(this.AAVE_LENDING_POOL_ADDRESS, lendingPoolAbi, this.signer)
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
        const resp = await txResult.wait()
        return { isCompleted: true, logs: resp }
      } catch (err) {
        return { isCompleted: false, logs: err }
      }
    }
    return { isCompleted: false, logs: {} }
  }

  /*  private async _WITHDRAW_ETH_METAMASK_CALL() {
    if (this.pool) {
      try {
        const wethGatewayContract = new ethers.Contract(this.AAVE_WETH_GATEWAY_ADDRESS, wethGatewayAbi, this.signer)
        const amount = ethers.utils.parseUnits(`${this.values.inputNum.value}`, this.pool.decimals)
        const walletAddress = await this.signer.getAddress()
        const withdrawCall = await wethGatewayContract.populateTransaction.withdrawETH(
          this.AAVE_LENDING_POOL_ADDRESS,
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
  } */

  @Emit('transaction-result')
  transactionResult(status: 'error' | 'success', message: string, logs: any = {}): string {
    this.alert = true
    this.alertMessage = { status, message, logs }
    this.values.inputNum.value = 0
    this.loading = false
    this.values.inputNum.disabled = false
    return status
  }

  async depositEth() {
    const { isCompleted, logs } = await this._DEPOSIT_ETH_METAMASK_CALL()
    if (!isCompleted) {
      return this.transactionResult('error', `Something went wrong.`, logs)
    }
    return this.transactionResult('success', 'Transaction completed successfully', logs)
  }

  async deposit() {
    this.loading = true
    this.values.inputNum.disabled = true
    if (this.pool) {
      if (this.pool.symbol === 'ETH') {
        return this.depositEth()
      }
    }
    const allowedSpending = await this._CHECK_ALLOWED_SPENDING_METAMASK_CALL()
    if (allowedSpending < this.values.inputNum.value) {
      const resp = await this._APPROVE_SPENDING_METAMASK_CALL()
      if (!resp) {
        return this.transactionResult('error', `Cant Approve Spending`)
      }
    }
    const { isCompleted, logs } = await this._DEPOSIT_METAMASK_CALL()
    if (!isCompleted) {
      return this.transactionResult('error', `Something went wrong.`, logs)
    }
    return this.transactionResult('success', 'Transaction completed successfully', logs)
  }

  /*  async borrowEth() {
    const borrowResp = await this._BORROW_ETH_METAMASK_CALL()
    if (!borrowResp) {
      return this.transactionResult('error', `Something went wrong`)
    }
    return this.transactionResult('success', 'Transaction completed successfully')
  } */

  async borrow() {
    this.loading = true
    this.values.inputNum.disabled = true
    if (this.pool) {
      const { isCompleted, logs } = await this._BORROW_METAMASK_CALL()
      if (!isCompleted) {
        return this.transactionResult('error', `Something went wrong`, logs)
      }
      return this.transactionResult('success', 'Transaction completed successfully', logs)
    }
  }

  /*
  async withdrawEth() {
    const allowedSpending = await this._CHECK_ALLOWED_SPENDING_WETH_METAMASK_CALL()
    if (allowedSpending > this.values.inputNum.value) {
      const resp = await this._APPROVE_SPENDING_WETH_METAMASK_CALL()
      if (!resp) {
        return this.transactionResult('error', `Cant Approve Spending`)
      }
      const withdrawResp = await this._WITHDRAW_ETH_METAMASK_CALL()
      if (!withdrawResp) {
        return this.transactionResult('error', `Something went wrong`)
      }
      return this.transactionResult('success', 'Transaction completed successfully')
    }
    return this.transactionResult('error', `Something went wrong`)
  }
*/

  async withdraw() {
    this.loading = true
    this.values.inputNum.disabled = true
    if (this.pool) {
      const { isCompleted, logs } = await this._WITHDRAW_METAMASK_CALL()
      if (!isCompleted) {
        return this.transactionResult('error', `Something went wrong.`, logs)
      }
      return this.transactionResult('success', 'Transaction completed successfully.', logs)
    }
  }

  /*  async repayEth() {
    const repay = await this._REPAY_ETH_METAMASK_CALL()
    if (!repay) {
      return this.transactionResult('error', `Something went wrong.`)
    }
    return this.transactionResult('success', 'Transaction completed successfully')
  } */

  async repay() {
    this.loading = true
    this.values.inputNum.disabled = true

    if (this.pool) {
      const allowedSpending = await this._CHECK_ALLOWED_SPENDING_METAMASK_CALL()
      if (allowedSpending < this.values.inputNum.value) {
        const resp = await this._APPROVE_SPENDING_METAMASK_CALL()
        if (!resp) {
          return this.transactionResult('error', `Cant Approve Spending`)
        }
      }
      const { isCompleted, logs } = await this._REPAY_METAMASK_CALL()
      if (!isCompleted) {
        return this.transactionResult('error', `Something went wrong.`, logs)
      }
      return this.transactionResult('success', 'Transaction completed successfully', logs)
    }
  }
}
