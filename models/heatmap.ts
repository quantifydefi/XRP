/* eslint-disable camelcase */
import 'reflect-metadata'
import { Type } from 'class-transformer'
import {
  HeatmapDataInterface,
  DataValueOptionInterface,
  DataValueConfigInterface,
  HeatmapConfigInterface,
} from '~/types/heatmap'

export class HeatmapData implements HeatmapDataInterface {
  readonly id: string = ''
  readonly symbol!: string
  readonly coin_name!: string
  readonly liquidity!: number
  readonly liquidity_index!: number
  readonly price_eth!: number
  readonly price_usd!: number
  readonly price1h!: number
  readonly balance_usd!: number
  readonly contract_balance!: number

  get color() {
    const x = this.price1h
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

  get liquidityTransformed() {
    return parseFloat((this.liquidity / 10 ** 3).toFixed(2))
  }

  static hasUsdBalance(data: HeatmapData[]): boolean {
    const balances = []
    for (const elem in data) {
      if (data[elem].contract_balance) {
        balances.push(data[elem].contract_balance)
      }
    }
    return balances.length > 0
  }
}

export class DataValueOption implements DataValueOptionInterface {
  dataField!: string
  title!: string
  tile!: string
  toolTip!: string
}

export class DataValueOptions {
  @Type(() => DataValueOption)
  liquidity!: DataValueOption

  @Type(() => DataValueOption)
  balanceUsd!: DataValueOption
}

export class DataValueConfig implements DataValueConfigInterface {
  @Type(() => DataValueOptions)
  options!: DataValueOptions

  title!: string
  tooltip!: string
}

export class HeatmapConfig implements HeatmapConfigInterface {
  @Type(() => DataValueConfig)
  dataValue!: DataValueConfig

  numberOfCoins!: number[]
}
