/* eslint-disable camelcase */
export interface TokenInterface {
  pool_id: string
  token0_id: string
  token0_symbol: string
  token0_name: string
  token0_price: number
  token1_id: string
  token1_symbol: string
  token1_name: string
  token1_price: number
  reserve_eth: number
  reserve_index: number
  volume_usd: number
  tx_count: number
  created_at_timestamp: number
  liquidity_provider_count: number
  eth_price_usd: number
  eth_price_btc: number
  base_asset: string
  quote_asset: string
  quote_currency: string
  exclude_pair: boolean

  percent_change_liq_1h: number
  percent_change_liq_24h: number
  token0_percent_change_1h: number
  token1_percent_change_1h: number
  token0_percent_change_24h: number
  token1_percent_change_24h: number
}

export interface ChartDataInterface {
  unix_time: number
  reserve_eth: number
  token0_price_usd: number
  token1_price_usd: number
  token0_price: number
  token1_price: number
  liquidity_usd_mil: number
  eth_price_usd: number
}
