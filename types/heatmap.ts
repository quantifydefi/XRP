/* eslint-disable camelcase */
export interface HeatmapDataInterface {
  readonly pool_id: string
  readonly token0_id: string
  readonly token0_symbol: string
  readonly token0_name: string
  readonly token0_price: number
  readonly token1_id: string
  readonly token1_symbol: string
  readonly token1_name: string
  readonly token1_price: number
  readonly reserve_eth: number
  readonly reserve_index: number
  readonly eth_price_usd: number
  readonly token0_percent_change_1h: number
  readonly token1_percent_change_1h: number
  readonly percent_change_liq_1h: number
  readonly token0_percent_change_24h: number
  readonly token1_percent_change_24h: number
  readonly percent_change_liq_24h: number
  readonly token0_price_usd: number
  readonly token1_price_usd: number
  readonly contract_balance?: number
  readonly unique_token?: string
  readonly balance_usd?: number
}

export interface BalanceHeatmapDataInterface {
  balance_usd: number
  contract_balance: number
  eth_price_usd: number
  market_cap_usd: number
  percent_change_liq_1h: number
  percent_change_liq_24h: number
  pool_id: string
  rate_usd: number
  reserve_eth: number
  token_pair: string
  token_price: number
  token_symbol: string
}

export type HeatmapConfigMode = 'default' | 'userAddress'

export interface DataValueOptionInterface {
  title: string
  dataField: string
  value: string
  tile: string
  toolTip: string
}

export type DataValueOptionGroupType = {
  [key in HeatmapConfigMode]: DataValueOptionInterface[]
}

export interface DataValueConfigInterface {
  title: string
  tooltip: string
  default: { title: string; value: string }
  options: DataValueOptionGroupType
}

export interface TimeFrameOptionInterface {
  value: string
  title: string
  tile: string
  colorField: string
}

export type TimeFrameGropeType = {
  [key in HeatmapConfigMode]: TimeFrameOptionInterface[]
}

export interface TimeFrameConfigInterface {
  title: string
  tooltip: string
  default: { title: string; value: string }
  options: TimeFrameGropeType
}

export interface HeatmapConfigInterface {
  mode: HeatmapConfigMode
  blockSize: DataValueConfigInterface
  timeFrame: TimeFrameConfigInterface
  numberOfCoins: number[]
}

export enum HeatmapEvents {
  heatmapData = 'heatmap-data',
  exitMetamask = 'exit-metamask',
  balanceHeatmap = 'balance-heatmap',
  heatmapLoading = 'heatmap-loading',
  filterHeatmap = 'filter-heatmap',
}
