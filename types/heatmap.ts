/* eslint-disable camelcase */
export interface heatmapDataInterface {
  id: string
  liquidity: number
  symbol: string
  price_usd: number
  price1h: number
  coin_name: string
  liquidity_index: number
  price_eth: number
  color?: string
}

export interface heatmapConfigInterface {
  display: string
  timeFrame: string
  numOfCoins: number | string
  exchange: string
  grouped: boolean
}
