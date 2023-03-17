import { BigNumber as EthersBigNumber, ethers } from 'ethers'
import { TradeType } from '@uniswap/sdk'
import {
  formatEther as EthersFormatEther,
  hexlify as EthersHexlify,
  parseEther as EthersParseEther,
} from 'ethers/lib/utils'
import BigNumber from 'bignumber.js'
import { UniswapToken } from '~/types/apollo/main/types'
import uniswapRouterV2Abi from '~/constracts/abi/uniswapRouterV2Abi.json'
import { UniswapRouterV2Contract } from '~/types/abi/uniswap-router-v2-contract'

type TradeDirection = keyof typeof TradeType

export interface Transaction {
  to: string
  from: string
  data: string
  value: string
  gasLimit: any
  gasPrice: any
}

export interface TradeContext {
  quoteDirection: TradeDirection
  expectedConvertQuote: string
  minAmountConvertQuote: string | null
  maximumSent: string | null
  tradeExpires: number
  routePath: string[]
  transaction: Transaction
}

export class Constants {
  public static readonly HEX_START = '0x'
  public static readonly EMPTY_HEX_STRING = `${Constants.HEX_START}00`
}

export enum TradePath {
  ethToErc20 = 'ethToErc20',
  erc20ToEth = 'erc20ToEth',
  erc20ToErc20 = 'erc20ToErc20',
}

export const VERSE_ROUTER_ADDRESS = '0xB4B0ea46Fe0E9e8EAB4aFb765b527739F2718671'
const WETH_ADDRESS = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'

/**
 * Convert a string value to wei
 * @param value The value
 */
export function parseEther(value: BigNumber): BigNumber {
  return new BigNumber(EthersParseEther(new BigNumber(value).toFixed()).toHexString())
}

/**
 * Convert to hex
 * @param value The value
 */
export function hexlify(value: BigNumber): string {
  return EthersHexlify(EthersBigNumber.from(value.toFixed(0)))
}

/**
 * format ether from wei
 * @param wei The value
 */
export function formatEther(wei: any): BigNumber {
  return new BigNumber(EthersFormatEther(new BigNumber(wei).toFixed()))
}

export function toEthersBigNumber(value: BigNumber): EthersBigNumber {
  return EthersBigNumber.from(value.toFixed())
}
export const WETH = (chainId: number) => {
  const tokens: { [key: number]: UniswapToken } = {
    1: {
      address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      chainId: 1,
      decimals: 18,
      name: 'Wrapped Ether',
      symbol: 'WETH',
    },
  }
  return tokens[chainId]
}

export class UniswapV2 {
  readonly _fromToken!: UniswapToken
  readonly _toToken!: UniswapToken
  readonly _tradePath!: TradePath
  private _routePath: string[] = []
  readonly _userWallet: string
  readonly _provider!: any
  readonly _slippage = 0.0005
  readonly _deadlineMinutes = 20

  constructor(
    fromToken: UniswapToken,
    toToken: UniswapToken,
    tradePath: TradePath = TradePath.erc20ToErc20,
    userWallet: string,
    ethersProvider: any
  ) {
    this._fromToken = fromToken
    this._toToken = toToken
    this._tradePath = tradePath
    this._userWallet = userWallet
    this._provider = ethersProvider
    this.routePath()
  }

  private routePath() {
    if (this._tradePath === TradePath.ethToErc20) {
      this._routePath = [WETH_ADDRESS, this._toToken.address]
    }
    if (this._tradePath === TradePath.erc20ToErc20) {
      this._routePath = [this._fromToken.address, this._toToken.address]
    }
    if (this._tradePath === TradePath.erc20ToEth) {
      this._routePath = [this._fromToken.address, WETH_ADDRESS]
    }
    return []
  }

  private formatAmountToTrade(amountToTrade: BigNumber, direction: TradeDirection): string {
    if (this._tradePath === TradePath.ethToErc20) {
      if (direction === 'EXACT_INPUT') {
        const amountToTradeWei = parseEther(amountToTrade)
        return hexlify(amountToTradeWei)
      } else {
        return hexlify(amountToTrade.shiftedBy(this._toToken.decimals))
      }
    }

    if (this._tradePath === TradePath.erc20ToEth) {
      if (direction === 'EXACT_INPUT') {
        return hexlify(amountToTrade.shiftedBy(this._fromToken.decimals))
      } else {
        const amountToTradeWei = parseEther(amountToTrade)
        return hexlify(amountToTradeWei)
      }
    }

    if (this._tradePath === TradePath.erc20ToErc20) {
      if (direction === 'EXACT_INPUT') {
        return hexlify(amountToTrade.shiftedBy(this._fromToken.decimals))
      } else {
        return hexlify(amountToTrade.shiftedBy(this._toToken.decimals))
      }
    }
    return ''
  }

  /**
   * Work out the expected convert quote taking off slippage
   * @param expectedConvertQuote The expected convert quote
   * @param tradeDirection Direction of the trade
   */
  private getExpectedConvertQuoteOrTokenAmountInMaxWithSlippage(
    expectedConvertQuote: string,
    tradeDirection: TradeDirection
  ): string {
    const decimals = tradeDirection === 'EXACT_INPUT' ? this._toToken.decimals : this._fromToken.decimals
    return new BigNumber(expectedConvertQuote)
      .minus(new BigNumber(expectedConvertQuote).times(this._slippage).toFixed(decimals))
      .toFixed(decimals)
  }

  /**
   * Generate trade amount erc20 > eth for input direction
   * @param tokenAmount The amount in
   * @param ethAmountOutMin The min amount to receive
   * @param path route path
   * @param deadline The deadline it expiries unix time
   */
  private async generateTradeDataErc20ToEthInput(
    tokenAmount: BigNumber,
    ethAmountOutMin: BigNumber,
    path: string[],
    deadline: string
  ): Promise<string> {
    // uniswap adds extra digits on even if the token is say 8 digits long
    const amountIn = tokenAmount.shiftedBy(this._fromToken.decimals).decimalPlaces(0)
    const contract = new ethers.Contract(VERSE_ROUTER_ADDRESS, uniswapRouterV2Abi)
    const tx = await contract.populateTransaction.swapExactTokensForETH(
      hexlify(amountIn),
      hexlify(parseEther(ethAmountOutMin)),
      path,
      this._userWallet,
      deadline
    )
    return tx?.data ?? ''
  }

  /**
   * Generate trade amount erc20 > eth for input direction
   * @param tokenAmountInMax The amount in max
   * @param ethAmountOut The amount to receive
   * @param path
   * @param deadline The deadline it expiries unix time
   */
  private async generateTradeDataErc20ToEthOutput(
    tokenAmountInMax: BigNumber,
    ethAmountOut: BigNumber,
    path: string[],
    deadline: string
  ): Promise<string> {
    // uniswap adds extra digits on even if the token is say 8 digits long
    const amountInMax = tokenAmountInMax.shiftedBy(this._fromToken.decimals).decimalPlaces(0)
    const contract = new ethers.Contract(VERSE_ROUTER_ADDRESS, uniswapRouterV2Abi)
    const tx = await contract.populateTransaction.swapTokensForExactETH(
      hexlify(parseEther(ethAmountOut)),
      hexlify(amountInMax),
      path,
      this._userWallet,
      deadline
    )
    return tx?.data ?? ''
  }

  /**
   * Generate trade data eth > erc20
   * @param tokenAmount The token amount
   * @param path Route path
   * @param deadline The deadline it expiries unix time
   */
  private async generateTradeDataEthToErc20Input(
    tokenAmount: BigNumber,
    path: string[],
    deadline: string
  ): Promise<string> {
    // uniswap adds extra digits on even if the token is say 8 digits long
    const convertedMinTokens = tokenAmount.shiftedBy(this._toToken.decimals).decimalPlaces(0)
    const contract = new ethers.Contract(VERSE_ROUTER_ADDRESS, uniswapRouterV2Abi)
    const tx = await contract.populateTransaction.swapExactETHForTokens(
      hexlify(convertedMinTokens),
      path,
      this._userWallet,
      deadline
    )
    return tx?.data ?? ''
  }

  /**
   * Generate trade data eth > erc20
   * @param tokenAmountOut
   * @param path
   * @param deadline The deadline it expiries unix time
   */
  private async generateTradeDataEthToErc20Output(
    tokenAmountOut: BigNumber,
    path: string[],
    deadline: string
  ): Promise<string> {
    const amountOut = tokenAmountOut.shiftedBy(this._toToken.decimals).decimalPlaces(0)
    const contract = new ethers.Contract(VERSE_ROUTER_ADDRESS, uniswapRouterV2Abi)
    const tx = await contract.populateTransaction.swapETHForExactTokens(
      hexlify(amountOut),
      path,
      this._userWallet,
      deadline
    )
    return tx?.data ?? ''
  }

  /**
   * Generate trade amount erc20 > erc20 for input
   * @param tokenAmount The token amount
   * @param tokenAmountMin
   * @param path
   * @param deadline The deadline it expiries unix time
   */
  private async generateTradeDataErc20ToErc20Input(
    tokenAmount: BigNumber,
    tokenAmountMin: BigNumber,
    path: string[],
    deadline: string
  ): Promise<string> {
    // uniswap adds extra digits on even if the token is say 8 digits long
    const amountIn = tokenAmount.shiftedBy(this._fromToken.decimals).decimalPlaces(0)
    const amountMin = tokenAmountMin.shiftedBy(this._toToken.decimals).decimalPlaces(0)
    // console.log(amountIn, amountMin, 'MMMMMM')
    const contract = new ethers.Contract(VERSE_ROUTER_ADDRESS, uniswapRouterV2Abi)
    const tx = await contract.populateTransaction.swapExactTokensForTokens(
      hexlify(amountIn),
      hexlify(amountMin),
      path,
      this._userWallet,
      deadline
    )
    return tx?.data ?? ''
  }

  /**
   * Generate trade amount erc20 > erc20 for output
   * @param tokenAmountInMax
   * @param tokenAmountOut The min token amount out
   * @param path
   * @param deadline The deadline it expiries unix time
   */
  private async generateTradeDataErc20ToErc20Output(
    tokenAmountInMax: BigNumber,
    tokenAmountOut: BigNumber,
    path: string[],
    deadline: string
  ): Promise<string> {
    // uniswap adds extra digits on even if the token is say 8 digits long
    const amountInMax = tokenAmountInMax.shiftedBy(this._fromToken.decimals).decimalPlaces(0)
    const amountOut = tokenAmountOut.shiftedBy(this._toToken.decimals).decimalPlaces(0)
    const contract = new ethers.Contract(VERSE_ROUTER_ADDRESS, uniswapRouterV2Abi)
    const tx = await contract.populateTransaction.swapTokensForExactTokens(
      hexlify(amountOut),
      hexlify(amountInMax),
      path,
      this._userWallet,
      deadline
    )
    return tx?.data ?? ''
  }

  public generateTradeDeadlineUnixTime(): number {
    const now = new Date()
    const expiryDate = new Date(now.getTime() + this._deadlineMinutes * 60000)
    return (expiryDate.getTime() / 1e3) | 0
  }

  async _getAmounts(amount: BigNumber, direction: TradeDirection): Promise<ethers.BigNumber[]> {
    const contract = new ethers.Contract(
      VERSE_ROUTER_ADDRESS,
      uniswapRouterV2Abi,
      this._provider
    ) as unknown as UniswapRouterV2Contract
    const amountToTrade = this.formatAmountToTrade(amount, direction)

    try {
      return direction === 'EXACT_INPUT'
        ? await contract.getAmountsOut(amountToTrade, this._routePath)
        : await contract.getAmountsIn(amountToTrade, this._routePath)
    } catch (e) {
      // adding WRTH to path
      if (this._tradePath === TradePath.erc20ToErc20) {
        this._routePath = [this._fromToken.address, WETH_ADDRESS, this._toToken.address]
        return direction === 'EXACT_INPUT'
          ? await contract.getAmountsOut(amountToTrade, this._routePath)
          : await contract.getAmountsIn(amountToTrade, this._routePath)
      } else return []
    }
  }

  // eslint-disable-next-line require-await
  private async executePathEthToErc20(amountToTrade: BigNumber, direction: TradeDirection): Promise<TradeContext> {
    const amountsCallContext = await this._getAmounts(amountToTrade, direction)

    const convertQuoteUnformatted =
      direction === 'EXACT_INPUT'
        ? new BigNumber(amountsCallContext[amountsCallContext.length - 1]._hex)
        : new BigNumber(amountsCallContext[0]._hex)

    const expectedConvertQuote =
      direction === 'EXACT_INPUT'
        ? convertQuoteUnformatted.shiftedBy(this._toToken.decimals * -1).toFixed(this._toToken.decimals)
        : new BigNumber(formatEther(convertQuoteUnformatted)).toFixed(this._fromToken.decimals)

    const expectedConvertQuoteOrTokenAmountInMaxWithSlippage =
      this.getExpectedConvertQuoteOrTokenAmountInMaxWithSlippage(expectedConvertQuote, direction)
    const tradeExpires = this.generateTradeDeadlineUnixTime()

    const data =
      direction === 'EXACT_INPUT'
        ? await this.generateTradeDataEthToErc20Input(amountToTrade, this._routePath, tradeExpires.toString())
        : await this.generateTradeDataEthToErc20Output(amountToTrade, this._routePath, tradeExpires.toString())

    return {
      quoteDirection: direction,
      expectedConvertQuote,
      minAmountConvertQuote: direction === 'EXACT_INPUT' ? expectedConvertQuoteOrTokenAmountInMaxWithSlippage : null,
      maximumSent: direction === 'EXACT_INPUT' ? null : expectedConvertQuoteOrTokenAmountInMaxWithSlippage,
      tradeExpires,
      routePath: this._routePath,
      transaction: {
        to: VERSE_ROUTER_ADDRESS,
        from: this._userWallet,
        data,
        value: toEthersBigNumber(
          parseEther(direction === 'EXACT_INPUT' ? amountToTrade : new BigNumber(expectedConvertQuote))
        ).toHexString(),
        gasLimit: null as any,
        gasPrice: null as any,
      },
    }
  }

  private async executePathErc20ToErc20(amountToTrade: BigNumber, direction: TradeDirection): Promise<TradeContext> {
    const amountsCallContext = await this._getAmounts(amountToTrade, direction)

    const convertQuoteUnformatted =
      direction === 'EXACT_INPUT'
        ? new BigNumber(amountsCallContext[amountsCallContext.length - 1]._hex)
        : new BigNumber(amountsCallContext[0]._hex)

    const expectedConvertQuote =
      direction === 'EXACT_INPUT'
        ? convertQuoteUnformatted.shiftedBy(this._toToken.decimals * -1).toFixed(this._toToken.decimals)
        : convertQuoteUnformatted.shiftedBy(this._fromToken.decimals * -1).toFixed(this._fromToken.decimals)
    const expectedConvertQuoteOrTokenAmountInMaxWithSlippage =
      this.getExpectedConvertQuoteOrTokenAmountInMaxWithSlippage(expectedConvertQuote, direction)
    const tradeExpires = this.generateTradeDeadlineUnixTime()

    const data =
      direction === 'EXACT_INPUT'
        ? await this.generateTradeDataErc20ToErc20Input(
            amountToTrade,
            new BigNumber(expectedConvertQuoteOrTokenAmountInMaxWithSlippage),
            this._routePath,
            tradeExpires.toString()
          )
        : await this.generateTradeDataErc20ToErc20Output(
            new BigNumber(expectedConvertQuote),
            amountToTrade,
            this._routePath,
            tradeExpires.toString()
          )

    return {
      quoteDirection: direction,
      expectedConvertQuote,
      minAmountConvertQuote: direction === 'EXACT_INPUT' ? expectedConvertQuoteOrTokenAmountInMaxWithSlippage : null,
      maximumSent: direction === 'EXACT_INPUT' ? null : expectedConvertQuoteOrTokenAmountInMaxWithSlippage,
      tradeExpires,
      routePath: this._routePath,
      transaction: {
        to: VERSE_ROUTER_ADDRESS,
        from: this._userWallet,
        data,
        value: Constants.EMPTY_HEX_STRING,
        gasLimit: null as any,
        gasPrice: null as any,
      },
    }
  }

  private async executePathErc20ToETH(amountToTrade: BigNumber, direction: TradeDirection): Promise<TradeContext> {
    const amountsCallContext = await this._getAmounts(amountToTrade, direction)
    const convertQuoteUnformatted =
      direction === 'EXACT_INPUT'
        ? new BigNumber(amountsCallContext[amountsCallContext.length - 1]._hex)
        : new BigNumber(amountsCallContext[0]._hex)

    const expectedConvertQuote =
      direction === 'EXACT_INPUT'
        ? new BigNumber(formatEther(convertQuoteUnformatted)).toFixed(this._toToken.decimals)
        : convertQuoteUnformatted.shiftedBy(this._fromToken.decimals * -1).toFixed(this._fromToken.decimals)

    const expectedConvertQuoteOrTokenAmountInMaxWithSlippage =
      this.getExpectedConvertQuoteOrTokenAmountInMaxWithSlippage(expectedConvertQuote, direction)
    const tradeExpires = this.generateTradeDeadlineUnixTime()

    const data =
      direction === 'EXACT_INPUT'
        ? await this.generateTradeDataErc20ToEthInput(
            amountToTrade,
            new BigNumber(expectedConvertQuoteOrTokenAmountInMaxWithSlippage),
            this._routePath,
            tradeExpires.toString()
          )
        : await this.generateTradeDataErc20ToEthOutput(
            new BigNumber(expectedConvertQuote),
            amountToTrade,
            this._routePath,
            tradeExpires.toString()
          )

    return {
      quoteDirection: direction,
      expectedConvertQuote,
      minAmountConvertQuote: direction === 'EXACT_INPUT' ? expectedConvertQuoteOrTokenAmountInMaxWithSlippage : null,
      maximumSent: direction === 'EXACT_INPUT' ? null : expectedConvertQuoteOrTokenAmountInMaxWithSlippage,
      tradeExpires,
      routePath: this._routePath,
      transaction: {
        to: VERSE_ROUTER_ADDRESS,
        from: this._userWallet,
        data,
        value: Constants.EMPTY_HEX_STRING,
        gasLimit: null as any,
        gasPrice: null as any,
      },
    }
  }

  public async trade(amount: string, direction: TradeDirection) {
    if (this._tradePath === TradePath.ethToErc20) {
      return await this.executePathEthToErc20(new BigNumber(amount), direction)
    }
    if (this._tradePath === TradePath.erc20ToErc20) {
      return await this.executePathErc20ToErc20(new BigNumber(amount), direction)
    }
    if (this._tradePath === TradePath.erc20ToEth) {
      return await this.executePathErc20ToETH(new BigNumber(amount), direction)
    } else {
      throw new Error('Unknown Trade path')
    }
  }
}
