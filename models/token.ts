/* eslint-disable camelcase */
import { ChartDataInterface, TokenInterface } from '~/types/token'

export class Token implements TokenInterface {
  created_at_timestamp!: number
  id!: string
  liquidity_provider_count!: number
  name!: string
  reserve_eth!: number
  liquidity_usd_mil!: number
  reserve_index!: number
  symbol!: string
  token_price!: number
  tx_count!: number
  volume_usd!: number
  eth_price_usd!: number
  price_usd!: number
  percent_change_24h!: number

  get percent24hColor() {
    const x = this.percent_change_24h
    if (x * 100 > 0 && x * 100 <= 1) {
      return '#71c175'
    } else if (x * 100 > 1 && x * 100 <= 2.5) {
      return '#4eb153'
    } else if (x * 100 > 2.5 && x * 100 <= 5) {
      return '#3e8e42'
    } else if (x * 100 > 5) {
      return '#2f6a32'
    } else if (x * 100 <= 0 && x * 100 >= -1) {
      return '#ff8080'
    } else if (x * 100 < -1 && x * 100 >= -2.5) {
      return '#ff4d4d'
    } else if (x * 100 < -2.5 && x * 100 >= -5) {
      return '#ff1a1a'
    } else if (x * 100 < -5) {
      return '#e60000'
    }
  }

  get volumeUsdFormatted() {
    return parseFloat((this.volume_usd / 10 ** 3).toFixed(2))
  }

  get date() {
    return new Date(this.created_at_timestamp * 1000)
  }

  get coinImage(): string {
    return `https://tokens.dharma.io/assets/${this.id}/icon.png`
  }
}

export class TokenChartConfig {
  timeInterval!: any
  defaultTimeRange!: string
  timeRange!: string[]
}

export class ChartData implements ChartDataInterface {
  unix_time!: number
  reserve_eth!: number
  token_price!: number
  price_usd!: number
  liquidity_usd_mil!: number
  eth_price_usd!: number

  get date() {
    return new Date(this.unix_time * 1000)
  }
}
