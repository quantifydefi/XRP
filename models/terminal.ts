/* eslint-disable camelcase */
import 'reflect-metadata'
import Vue from 'vue'
import { Store } from 'vuex'
import { TerminalGridDataInterface } from '~/types/terminal'

export class TerminalGridData implements TerminalGridDataInterface {
  readonly token0_symbol!: string
  readonly token1_symbol!: string
  readonly token1_price!: number
  readonly percent_change_liq_24h!: number
}

export class TerminalGrid {
  /** Vue root Interface **/
  private _$root: Vue

  /** Vuex **/
  private _$store: Store<any>
  private _data: TerminalGridData[] = []

  constructor(store: Store<any>, root: Vue) {
    this._$store = store
    this._$root = root
  }

  get cols() {
    return [
      {
        headerName: 'SYMBOL',
        field: 'token0_symbol',
        cellStyle: { 'justify-content': 'flex-end' },
        width: 35,
        resizable: true,
        cellRenderer: (params: any) =>
          `${params.value}/${params.data.token1_symbol}`,
      },
      {
        headerName: 'PRICE',
        field: 'token1_price',
        cellStyle: { 'justify-content': 'flex-end' },
        width: 35,
        resizable: true,
        valueFormatter: (params: any) => {
          if (params.value >= 10) {
            return params.value.toFixed(8)
          }
          return params.value.toFixed(10)
        },
      },
      {
        headerName: 'LIQ 1D%',
        field: 'percent_change_liq_24h',
        cellStyle: { 'justify-content': 'flex-end', 'text-align': 'center' },
        width: 20,
        resizable: true,
        valueFormatter: (params: any) => `${params.value.toFixed(2)}%`,
      },
    ]
  }

  get data() {
    return this._data
  }

  async getData() {
    try {
      this._data = await this._$store.dispatch('terminal/getTerminalData', {
        numOfCoins: 20,
      })
    } catch {
      this._data = []
    }
  }
}
