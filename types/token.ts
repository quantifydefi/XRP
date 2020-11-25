/* eslint-disable camelcase */
export interface TokenInterface {
  reserve_eth: number
  reserve_index: number
  symbol: string
  name: string
  token_price: number
  volume_usd: number
  tx_count: number
  created_at_timestamp: number
  liquidity_provider_count: number
  liquidity_usd_mil: number
  price_usd: number
  eth_price_usd: number
  id: string
}

export interface ChartDataInterface {
  unix_time: number
  reserve_eth: number
  token_price: number
  price_usd: number
  liquidity_usd_mil: number
  eth_price_usd: number
}
