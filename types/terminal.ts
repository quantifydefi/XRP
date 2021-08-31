/* eslint-disable camelcase */
export interface TerminalGridDataInterface {
  readonly pool_id: string
  readonly token0_id: string
  readonly token1_id: string
  readonly token0_symbol: string
  readonly token1_symbol: string
  readonly token1_price: number
  readonly percent_change_liq_24h: number
  readonly reserve_eth: number
  readonly eth_price_usd: number
}
