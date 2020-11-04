/* eslint-disable camelcase */

export interface HeatmapDataInterface {
  readonly id: string
  readonly liquidity: number
  readonly symbol: string
  readonly price_usd: number
  readonly price1h: number
  readonly coin_name: string
  readonly liquidity_index: number
  readonly price_eth: number
  readonly color?: string
  readonly balance_usd?: number
  readonly contract_balance?: number
}

export interface DataValueOptionInterface {
  title: string
  dataField: string
  tile: string
  toolTip: string
}
export interface DataValueOptionsInterface {
  liquidity: DataValueOptionInterface
  balanceUsd: DataValueOptionInterface
}

export interface DataValueConfigInterface {
  title: string
  tooltip: string
  options: DataValueOptionsInterface
}
export interface HeatmapConfigInterface {
  blockSize: DataValueConfigInterface
}
