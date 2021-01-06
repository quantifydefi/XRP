/* eslint-disable camelcase */
import 'reflect-metadata'
import { Type } from 'class-transformer'
import {
  HeatmapDataInterface,
  DataValueOptionInterface,
  DataValueConfigInterface,
  HeatmapConfigInterface,
  HeatmapConfigMode,
  TimeFrameOptionInterface,
  TimeFrameConfigInterface,
  DataValueOptionGroupType,
  BalanceHeatmapDataInterface,
  TimeFrameGropeType,
} from '~/types/heatmap'

export class HeatmapData implements HeatmapDataInterface {
  readonly pool_id!: string
  readonly token0_id!: string
  readonly token0_symbol!: string
  readonly token0_name!: string
  readonly token0_price!: number
  readonly token1_id!: string
  readonly token1_symbol!: string
  readonly token1_name!: string
  readonly token1_price!: number
  readonly reserve_eth!: number
  readonly reserve_index!: number
  readonly eth_price_usd!: number
  readonly token0_percent_change_1h!: number
  readonly token1_percent_change_1h!: number
  readonly percent_change_liq_1h!: number
  readonly token0_percent_change_24h!: number
  readonly token1_percent_change_24h!: number
  readonly percent_change_liq_24h!: number
  readonly token0_price_usd!: number
  readonly token1_price_usd!: number
  readonly contract_balance?: number
  readonly unique_token?: string
  readonly balance_usd?: number

  get poolSymbol(): string {
    return `${this.token0_symbol}-${this.token1_symbol}`
  }

  get color1h(): string | undefined {
    const x = this.percent_change_liq_1h
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

  get color24h(): string | undefined {
    const x = this.percent_change_liq_24h
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

  get liquidityTransformed(): number {
    return parseFloat((this.reserve_eth / 10 ** 3).toFixed(2))
  }

  get uniqueTokenSymbol(): string | undefined {
    if (this.unique_token) {
      if (this.unique_token === this.token0_id) {
        return this.token0_symbol
      } else return this.token1_symbol
    }
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

export class HeatmapBalancesData implements BalanceHeatmapDataInterface {
  readonly balance_usd!: number
  readonly contract_balance!: number
  readonly eth_price_usd!: number
  readonly market_cap_usd!: number
  readonly percent_change_liq_1h!: number
  readonly percent_change_liq_24h!: number
  readonly pool_id!: string
  readonly rate_usd!: number
  readonly reserve_eth!: number
  readonly token_pair!: string
  readonly token_price!: number
  readonly token_symbol!: string

  get marketCapFormatted(): number {
    return parseFloat((this.market_cap_usd / 10 ** 6).toFixed(2))
  }

  get liquidityTransformed(): number {
    return parseFloat((this.reserve_eth / 10 ** 3).toFixed(2))
  }

  get color1h(): string | undefined {
    const x = this.percent_change_liq_1h
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

  get color24h(): string | undefined {
    const x = this.percent_change_liq_24h
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
}

export class DataValueOption implements DataValueOptionInterface {
  readonly dataField!: string
  readonly title!: string
  readonly value!: string
  readonly tile!: string
  readonly toolTip!: string
}

export class DataValueOptionGroup implements DataValueOptionGroupType {
  default!: DataValueOption[]
  userAddress!: DataValueOption[]
}

export class DataValueConfig implements DataValueConfigInterface {
  @Type(() => DataValueOptionGroup)
  options!: DataValueOptionGroup

  default!: { title: string; value: string }
  title!: string
  tooltip!: string
}
export class TimeFrameOption implements TimeFrameOptionInterface {
  value!: string
  title!: string
  tile!: string
  colorField!: string
}

export class TimeFrameOptionGroup implements TimeFrameGropeType {
  default!: TimeFrameOptionInterface[]
  userAddress!: TimeFrameOptionInterface[]
}

export class TimeFrameConfig implements TimeFrameConfigInterface {
  title!: string
  tooltip!: string
  default!: { title: string; value: string }
  @Type(() => TimeFrameOptionGroup)
  options!: TimeFrameOptionGroup
}

export class HeatmapConfig implements HeatmapConfigInterface {
  mode!: HeatmapConfigMode

  @Type(() => DataValueConfig)
  blockSize!: DataValueConfig

  @Type(() => TimeFrameConfig)
  timeFrame!: TimeFrameConfig

  numberOfCoins!: number[]
}
