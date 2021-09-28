/* eslint-disable camelcase */
import 'reflect-metadata'
import { Type } from 'class-transformer'
import { Store } from 'vuex'
import { TerminalGridDataInterface } from '~/types/terminal'

export class TerminalGridData implements TerminalGridDataInterface {
  readonly pool_id!: string
  readonly token0_id!: string
  readonly token1_id!: string
  readonly token0_symbol!: string
  readonly token1_symbol!: string
  readonly token1_price!: number
  readonly percent_change_liq_24h!: number
  readonly reserve_eth!: number
  readonly eth_price_usd!: number
}

export class TerminalGrid {
  /** Vuex **/
  private _$store: Store<any>

  @Type(() => TerminalGridData)
  private _data: TerminalGridData[] = []

  constructor(store: Store<any>) {
    this._$store = store
  }

  get cols() {
    return [
      {
        text: 'SYMBOL',
        align: 'start',
        value: 'token0_symbol',
        class: 'px-2 text-no-wrap subtitle-2 font-weight-bold',
        width: 90,
      },
      {
        text: 'LIQUIDITY',
        align: 'start',
        value: 'liquidity',
        class: 'px-2 text-no-wrap subtitle-2 font-weight-bold',
        width: 70,
      },
      {
        text: 'LIQ 1D%',
        align: '',
        value: 'percent_change_liq_24h',
        class: 'px-2 text-no-wrap subtitle-2 font-weight-bold',
        width: 30,
      },
    ]
  }

  get data() {
    return this._data
  }

  async getData(): Promise<void> {
    try {
      this._data = await this._$store.dispatch('terminal/getTerminalData', {
        numOfCoins: 160,
      })
    } catch {
      /* istanbul ignore next */
      this._data = []
    }
  }

  static getTokenImage(tokenId: string): string {
    return `https://tokens.dharma.io/assets/${tokenId}/icon.png`
  }

  static calcReserveEthUsd(reserveEth: number, ethPriceUsd: number): string {
    return new Intl.NumberFormat('en', {
      currency: 'USD',
      style: 'currency',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(reserveEth * ethPriceUsd)
  }
}
