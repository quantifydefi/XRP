import { Component, Emit, Ref, Vue, Watch } from 'vue-property-decorator'
import { BigNumber, ethers, Signer } from 'ethers'
import { ref } from '@nuxtjs/composition-api'
import lendingPoolAbi from '../constracts/abi/aave/lendingPoolAbi.json'
import wethGatewayAbi from '../constracts/abi/aave/wethGatewayAbi.json'
import erc20Abi from '../constracts/abi/erc20Abi.json'
// import curveLPToken from '../constracts/curve/curveLPToken.json'
import { AavePoolCl, CurveCoinCl, CurvePoolCl } from '~/models/pool'
import { Helper } from '~/models/helper'

declare const window: any
export type actionTypes = 'deposit' | 'borrow' | 'repay' | 'withdraw'
export const aaveActions = ref<Array<actionTypes>>(['deposit', 'borrow', 'repay', 'withdraw'])

export const curveActions: { text: string; value: actionTypes }[] = [
  { text: 'Add Liquidity', value: 'deposit' },
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
  actionType: actionTypes = 'deposit'
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

  depositFormValid = false

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

  @Watch('dialog')
  onDialog(value: boolean) {
    if (!value) {
      this.alert = false
      this.values.inputNum.value = 0
    }
  }

  @Watch('actionType')
  onActionChanged(value: actionTypes) {
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

  /** Allowed borrowing (In Tokens) calculated based by totalCollateral (USD) and total Borrowed (USD) */
  get allowedToBorrow(): number {
    if (this.pool) {
      const allowed = ((this.totalCollateral * this.maxLTV) / 100 - this.totalBorrowed) / this.pool.price.priceUsd
      if (allowed > 0) {
        return allowed
      } else return 0
    } else return 0
  }

  /** Allowed withdrawing (In Tokens) calculated based by allowedToBorrow (Tokens) and maxLTV */
  get allowedToWithdraw(): number {
    if (this.pool) {
      if (this.pool.portfolio.totalDeposits === 0) {
        return 0
      }
      const totalAllowedToWithdraw = (this.allowedToBorrow * 100) / this.maxLTV
      if (totalAllowedToWithdraw > this.pool.portfolio.totalDeposits) {
        return this.pool?.portfolio.totalDeposits
      } else return totalAllowedToWithdraw
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
            { name: 'Asset price', value: '$ ' + this.pool.price.priceUsd.toFixed(2) + ' USD' },
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
            { name: 'Asset price', value: '$ ' + this.pool.price.priceUsd.toFixed(2) + ' USD' },
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
    action: actionTypes
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
    try {
      this.provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
      this.signer = await this.provider.getSigner()
    } catch (e) {
      console.log(e)
    }
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

@Component({ name: 'CurvePoolAction' })
export class CurvePoolAction extends Vue {
  @Ref('depositForm') readonly depositForm!: any

  MAX_UINT256 = '115792089237316195423570985008687907853269984665640564039457584007913129639935'

  provider: any = null
  signer!: Signer
  ethABI!: string
  dialog = false
  loading = false
  pool: CurvePoolCl | null = null
  actionType: actionTypes = 'deposit'
  alert = false
  showTransactionLogs = false
  alertMessage = { status: 'success', message: '', logs: {} }
  calculatedLPBalanceCoin: number = 0
  calculatedLPBalanceMetaCoins: number = 0
  maxSlippage = 0.01
  readonly actions = curveActions

  /** Form Validation flag */
  depositFormValid = false

  @Watch('dialog')
  onDialog(value: boolean) {
    if (!value) {
      this.alert = false
      // this.values.inputNum.value = 0
    }
  }

  @Watch('actionType')
  onActionChanged(value: actionTypes) {
    if (value) {
      this.alert = false
      this.showTransactionLogs = false
    }
  }

  @Watch('pool.depositWrapped')
  onDepositWrappedCHanged() {
    this.pool?.resetCoinValues()
    this.calculatedLPBalanceCoin = 0
    this.calculatedLPBalanceMetaCoins = 0
  }

  @Watch('pool.coins', { deep: true })
  async onCoinChange(coins: CurveCoinCl[]) {
    if (this.pool) {
      const amounts: (number | BigNumber)[] = []
      let abi: any
      coins.forEach((coin) => {
        const amount = ethers.utils.parseUnits(`${coin.inputVal.value}`, coin.decimals)
        amounts.push(amount)
      })
      if (this.pool.isMetaPool) {
        abi = await this.readABI(this.pool.ID, true, true)
      } else {
        abi = await this.readABI(this.pool.ID, false, false)
      }
      this.calculatedLPBalanceCoin = await this.calculateLPBalance(this.pool.addresses.swap, amounts, abi)
    }
  }

  @Watch('pool.metaCoins', { deep: true })
  async on3PoolCOinChange(coins: CurveCoinCl[]) {
    if (this.pool) {
      const amounts: (number | BigNumber)[] = []
      coins.forEach((coin) => {
        const amount = ethers.utils.parseUnits(`${coin.inputVal.value}`, coin.decimals)
        amounts.push(amount)
      })
      const abi = this.readABI('3pool', false, false)
      const pool = '0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7'
      this.calculatedLPBalanceMetaCoins = await this.calculateLPBalance(pool, amounts, abi)
    }
  }

  async calculateLPBalance(contractAddress: string, amounts: (number | BigNumber)[], abi: any): Promise<number> {
    try {
      const poolContract = new ethers.Contract(contractAddress, abi, this.signer)
      const calculatedBalances = await poolContract.calc_token_amount(amounts, true)
      return (parseInt(calculatedBalances, 10) / 10 ** 18) * (1 - this.maxSlippage)
    } catch (e) {
      console.log(e)
      return 0
    }
  }

  /**
   * Accept aave pool and  instantiate landing pool contracts
   * @param  pool Aave Pool from backend subgraph API with additional computed properties
   * @param action
   */
  async init(pool: CurvePoolCl, action: actionTypes) {
    this.pool = pool
    this.actionType = action
    this.dialog = true
    await this._calculateWalletBalance()
  }

  @Emit('transaction-result')
  async transactionResult(status: 'error' | 'success', message: string, logs: any = {}): Promise<string> {
    this.alert = true
    this.alertMessage = { status, message, logs }
    this.loading = false
    await this._calculateWalletBalance()
    return status
  }

  setAltImg(event: any) {
    try {
      return Helper.setAltImg(event)
    } catch {}
  }

  /**
   * Initiate Ethers.js Signer and provider to use for future transactions
   */
  async mounted() {
    try {
      this.provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
      this.signer = await this.provider.getSigner()
    } catch (e) {
      console.log(e)
    }
  }

  private async _ALLOWED_TO_SPEND(coin: CurveCoinCl): Promise<{ symbol: string; value: number }> {
    try {
      const tokenInstance = new ethers.Contract(coin.address, erc20Abi, this.signer)
      const walletAddress = await this.signer.getAddress()
      const checkApprove = await tokenInstance.allowance(walletAddress, this.pool?.addresses.swap)
      const approved = parseInt(checkApprove, 10)
      return { symbol: coin.symbol, value: approved }
    } catch (e) {
      console.log(e)
      return { symbol: coin.symbol, value: 0 }
    }
  }

  private async _APPROVE_SPENDING_METAMASK_CALL(coin: CurveCoinCl): Promise<{ symbol: string; value: boolean }> {
    try {
      const erc20 = new ethers.Contract(coin.address, erc20Abi, this.signer)
      const approveCall = await erc20.populateTransaction.approve(this.pool?.addresses.swap, this.MAX_UINT256)
      approveCall.gasLimit = await this.provider.estimateGas(approveCall)
      approveCall.gasPrice = await this.provider.getGasPrice()
      const approveResult = await this.signer.sendTransaction(approveCall)
      await approveResult.wait()
      return { symbol: coin.symbol, value: true }
    } catch (error) {
      console.log(error)
      return { symbol: coin.symbol, value: false }
    }
  }

  private async _REMOVE_LIQUIDITY_METAMASK_CALL(
    contractAddress: string,
    amount: BigNumber,
    minAmounts: number[],
    abi: any
  ): Promise<{ isCompleted: boolean; logs: any }> {
    try {
      const poolContract = new ethers.Contract(contractAddress, abi, this.signer)
      const remLiqCall = await poolContract.populateTransaction.remove_liquidity(amount, minAmounts)
      remLiqCall.gasLimit = await this.provider.estimateGas(remLiqCall)
      remLiqCall.gasPrice = await this.provider.getGasPrice()
      const remCallResult = await this.signer.sendTransaction(remLiqCall)
      const receipt = await remCallResult.wait()
      return { isCompleted: true, logs: receipt }
    } catch (error) {
      console.log(error)
      return { isCompleted: false, logs: error }
    }
  }

  private async _ADD_LIQUIDITY_METAMASK_CALL(
    contractAddress: string,
    amounts: (number | BigNumber)[],
    abi: any
  ): Promise<{ isCompleted: boolean; logs: any }> {
    if (this.pool) {
      try {
        const poolContract = new ethers.Contract(contractAddress, abi, this.signer)
        const walletAddress = await this.signer.getAddress()
        const addLiqCall = await poolContract.populateTransaction.add_liquidity(amounts, 0, {
          from: walletAddress,
        })
        addLiqCall.gasLimit = await this.provider.estimateGas(addLiqCall)
        addLiqCall.gasPrice = await this.provider.getGasPrice()
        const addLiqCallResult = await this.signer.sendTransaction(addLiqCall)
        const receipt = await addLiqCallResult.wait()
        return { isCompleted: true, logs: receipt }
      } catch (error) {
        console.log(error)
        return { isCompleted: false, logs: error }
      }
    }
    return { isCompleted: false, logs: {} }
  }

  /** Get deposit elements */
  private async _depositAmounts(coins: CurveCoinCl[]): Promise<(number | BigNumber)[]> {
    const configs: { [key: string]: CurveCoinCl } = {}
    let promises: any = []
    let promiseResult: { symbol: string; value: number }[] = []
    const result: (number | BigNumber)[] = []

    // Check allowance to spend for coins with value over 0
    coins.forEach((coin) => {
      if (coin.inputVal.value > 0) {
        configs[coin.symbol] = coin
        promises.push(this._ALLOWED_TO_SPEND(coin))
      }
    })
    promiseResult = await Promise.all(promises)
    promiseResult.forEach((elem) => {
      configs[elem.symbol].inputVal.approvedToSpend = elem.value
    })
    promises = []
    for (const [, value] of Object.entries(configs)) {
      if (value.inputVal.value >= value.inputVal.approvedToSpend) {
        await this._APPROVE_SPENDING_METAMASK_CALL(value)
      }
    }

    coins.forEach((coin) => {
      const approvedCoin = configs[coin.symbol]
      if (approvedCoin) {
        const amount = ethers.utils.parseUnits(`${approvedCoin.inputVal.value}`, approvedCoin.decimals)
        result.push(amount)
      } else {
        result.push(0)
      }
    })
    return result
  }

  private readABI(pool: string, depositWrapped: boolean = false, isMetaPool: boolean = false) {
    let abi: any = {}
    if (this.pool) {
      if (isMetaPool) {
        if (depositWrapped) {
          abi = require('../constracts/curve/rsv/swap.json')
        }
      } else {
        const config: any = {
          '3pool': require('../constracts/curve/curveStableSwapAbi.json'),
          link: require('../constracts/curve/link/swap.json'),
          eurt: require('../constracts/curve/link/swap.json'),
          pax: require('../constracts/curve/pax/swap.json'),
          ren: require('../constracts/curve/ren/swap.json'),
          sbtc: require('../constracts/curve/sbtc/swap.json'),
          hbtc: require('../constracts/curve/hbtc/swap.json'),
          usdt: require('../constracts/curve/curveStableSwapAbi.json'),
          susdv2: require('../constracts/curve/susdv2/swap.json'),
          ankreth: require('../constracts/curve/ankreth/swap.json'),
          reth: require('../constracts/curve/reth/swap.json'),
          eurtusd: require('../constracts/curve/link/swap.json'),
          eursusd: require('../constracts/curve/eurs/swap.json'),
          crveth: require('../constracts/curve/rsv/swap.json'),
        }
        abi = config[pool]
      }
      return abi
    }
  }

  private async lPBalance() {
    if (this.pool) {
      try {
        const poolLPContract = new ethers.Contract(this.pool.addresses.lpToken, erc20Abi, this.signer)
        const walletAddress = await this.signer.getAddress()
        const lpBal = await poolLPContract.balanceOf(walletAddress)
        return parseInt(lpBal, 10) / 10 ** 18
      } catch (e) {
        console.log('LP BAL ERROR', e)
        return 0
      }
    }
    return 0
  }

  private async _addLiquidityMetaWrapped(): Promise<{ isCompleted: boolean; logs: any }> {
    if (this.pool) {
      const amounts = await this._depositAmounts(this.pool.coins)
      const abi = this.readABI(this.pool.ID, true, true)
      return await this._ADD_LIQUIDITY_METAMASK_CALL(this.pool.addresses.swap, amounts, abi)
    }
    return { isCompleted: false, logs: {} }
  }

  private async _addLiquidityTo3PoolMeta(): Promise<{ isCompleted: boolean; logs: any }> {
    if (this.pool) {
      const amounts = await this._depositAmounts(this.pool.metaCoins)
      const abi = this.readABI('3pool', false, false)
      const pool = '0xbebc44782c7db0a1a60cb6fe97d0b483032ff1c7'
      return await this._ADD_LIQUIDITY_METAMASK_CALL(pool, amounts, abi)
    }
    return { isCompleted: false, logs: {} }
  }

  private async calculateWalletBalanceForCoin(coin: CurveCoinCl) {
    try {
      const erc20 = new ethers.Contract(coin.address, erc20Abi, this.signer)
      const walletAddress = await this.signer.getAddress()
      const balance = await erc20.balanceOf(walletAddress)
      coin.walletBalance = balance / 10 ** coin.decimals
    } catch (e) {
      console.log(e)
      return 0
    }
  }

  private async _calculateWalletBalance() {
    if (this.pool) {
      let promises: any = []
      this.pool.coins.forEach((coin) => {
        promises.push(this.calculateWalletBalanceForCoin(coin))
      })
      await Promise.all(promises)
      promises = []
    }
  }

  async addLiquidity() {
    if (this.pool) {
      if (this.pool.isMetaPool) {
        if (this.pool.depositWrapped) {
          const { isCompleted, logs } = await this._addLiquidityMetaWrapped()
          if (!isCompleted) {
            return this.transactionResult('error', `Something went wrong.`, logs)
          }
          return this.transactionResult('success', 'Transaction completed successfully.', logs)
        }
      } else {
        const amounts = await this._depositAmounts(this.pool.coins)
        const abi = this.readABI(this.pool.ID, false, false)
        const { isCompleted, logs } = await this._ADD_LIQUIDITY_METAMASK_CALL(this.pool.addresses.swap, amounts, abi)
        if (!isCompleted) {
          return this.transactionResult('error', `Something went wrong.`, logs)
        }
        return this.transactionResult('success', 'Transaction completed successfully.', logs)
      }
    }
  }

  async withdraw() {
    if (this.pool) {
      const amountToRemove = ethers.utils.parseUnits(`${this.pool.lpBalanceToWithdraw}`, 18)
      let abi: any = {}
      const minAmounts: number[] = []

      if (this.pool.depositWrapped) {
        abi = this.readABI(this.pool.ID, true, true)
      } else {
        abi = this.readABI(this.pool.ID, false, false)
      }

      // Set min amounts to 0
      this.pool.coins.forEach(() => {
        minAmounts.push(0)
      })

      const { isCompleted, logs } = await this._REMOVE_LIQUIDITY_METAMASK_CALL(
        this.pool.addresses.swap,
        amountToRemove,
        minAmounts,
        abi
      )
      if (!isCompleted) {
        return this.transactionResult('error', `Something went wrong.`, logs)
      }
      return this.transactionResult('success', 'Transaction completed successfully.', logs)
    }
  }
}
