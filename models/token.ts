/* eslint-disable camelcase */
import { ChartDataInterface, SearchPoolInterface, TokenInterface } from '~/types/token'

export class Token implements TokenInterface {
  readonly base_asset!: string
  readonly created_at_timestamp!: number
  readonly eth_price_btc!: number
  readonly eth_price_usd!: number
  readonly exclude_pair!: boolean
  readonly liquidity_provider_count!: number
  readonly pool_id!: string
  readonly quote_asset!: string
  readonly quote_currency!: string
  readonly reserve_eth!: number
  readonly reserve_index!: number
  readonly token0_id!: string
  readonly token0_name!: string
  readonly token0_price!: number
  readonly token0_symbol!: string
  readonly token1_id!: string
  readonly token1_name!: string
  readonly token1_price!: number
  readonly token1_symbol!: string
  readonly tx_count!: number
  readonly volume_usd!: number

  readonly percent_change_liq_1h!: number
  readonly percent_change_liq_24h!: number
  readonly token0_percent_change_1h!: number
  readonly token0_percent_change_24h!: number
  readonly token1_percent_change_1h!: number
  readonly token1_percent_change_24h!: number

  get volumeUsdFormatted() {
    return parseFloat((this.volume_usd / 10 ** 3).toFixed(2))
  }

  get reserveEthUsd() {
    return parseFloat((this.reserve_eth * this.eth_price_usd).toFixed(2))
  }

  get date() {
    return new Date(this.created_at_timestamp * 1000)
  }

  coinImage(tokenId: string): string {
    return `https://tokens.dharma.io/assets/${tokenId}/icon.png`
  }

  static isQuoteToken(symbol: string, token: Token | any): boolean {
    const key: any = Object.keys(token).find((key: any) => token[key] === symbol)
    return key.split('_')[0] === token.quote_asset
  }
}

export class TokenChartConfig {
  timeInterval!: any
  defaultTimeRange!: string
  timeRange!: string[]
}

export class ChartData implements ChartDataInterface {
  eth_price_usd!: number
  liquidity_usd_mil!: number
  reserve_eth!: number
  token0_price!: number
  token1_price!: number
  unix_time!: number

  get date() {
    return new Date(this.unix_time * 1000)
  }
}

export class TokenPoolSearch implements SearchPoolInterface {
  pool_id!: string
  token0_id!: string
  token0_name!: string
  token0_symbol!: string
  token1_id!: string
  token1_name!: string
  token1_symbol!: string
}
