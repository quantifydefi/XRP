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
  readonly percent_change_1h!: number
  readonly percent_change_24h!: number
  readonly balance_usd!: number
  readonly contract_balance!: number

  get color1h() {
    const x = this.percent_change_1h
    if (x > 0 && x <= 1) {
      return '#71c175'
    } else if (x > 1 && x <= 2.5) {
      return '#4eb153'
    } else if (x > 2.5 && x <= 5) {
      return '#3e8e42'
    } else if (x > 5) {
      return '#2f6a32'
    } else if (x <= 0 && x >= -1) {
      return '#ff8080'
    } else if (x < -1 && x >= -2.5) {
      return '#ff4d4d'
    } else if (x < -2.5 && x >= -5) {
      return '#ff1a1a'
    } else if (x < -5) {
      return '#e60000'
    }
  }

  get color24h() {
    const x = this.percent_change_24h
    if (x > 0 && x <= 1) {
      return '#71c175'
    } else if (x > 1 && x <= 2.5) {
      return '#4eb153'
    } else if (x > 2.5 && x <= 5) {
      return '#3e8e42'
    } else if (x > 5) {
      return '#2f6a32'
    } else if (x <= 0 && x >= -1) {
      return '#ff8080'
    } else if (x < -1 && x >= -2.5) {
      return '#ff4d4d'
    } else if (x < -2.5 && x >= -5) {
      return '#ff1a1a'
    } else if (x < -5) {
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
export class TimeFrameOption {
  value!: string
  title!: string
  tile!: string
  colorField!: string
}
export class TimeFrameConfig {
  title!: string
  tooltip!: string
  default!: { title: string; value: string }
  @Type(() => TimeFrameOption)
  options!: TimeFrameOption[]
}

export class HeatmapConfig implements HeatmapConfigInterface {
  @Type(() => DataValueConfig)
  blockSize!: DataValueConfig

  @Type(() => TimeFrameConfig)
  timeFrame!: TimeFrameConfig

  numberOfCoins!: number[]
}
