/* eslint-disable */
import 'reflect-metadata'
import {Store} from 'vuex'
import {BalanceDataInterface, ChainOptions} from '~/types/balance'
import {Helper} from '~/models/helper'

export class BalanceData implements BalanceDataInterface {
  readonly contract_address!: string // token address
  readonly contract_name!: string // token name
  readonly contract_ticker_symbol!: string // token symbol
  readonly balance!: number // qty of tokens owned
  readonly quote_rate!: number // token price
  readonly quote!: number // total value
  readonly logo_url!: string // token icon
  readonly chain_id!: ChainOptions
}

export class Balance {
  loading: boolean = false

  private static instance: Balance

  private _$store: Store<any>

  private _balances: BalanceData[] = []


  private constructor(store: Store<any>) {
    this._$store = store
  }

  static getInstance(store: Store<any>) {
    if (this.instance) {
      return this.instance
    }

    this.instance = new Balance(store)
    return this.instance
  }

  get cols() {
    return [
      {
        text: 'Token',
        align: 'start',
        value: 'contract_ticker_symbol',
        class: 'px-2',
        width: 60,
      },
      {
        text: 'Balance',
        align: 'start',
        value: 'balance',
        class: 'px-2',
        width: 80,
      },
      {
        text: 'Price',
        align: 'start',
        value: 'quote_rate',
        class: 'px-2',
        width: 80,
      },
      {
        text: 'Value',
        align: 'start',
        value: 'quote',
        class: 'px-2',
        width: 90,
      },
    ]
  }

  get networks() {
    return [
      {
        chainId: 1,
        network: 'Ethereum',
        symbol: 'eth',
      },
      {
        chainId: 56,
        network: 'Binance',
        symbol: 'bnb',
      },
      {
        chainId: 137,
        network: 'Polygon',
        symbol: 'matic',
      },
      {
        chainId: 250,
        network: 'Fantom',
        symbol: 'ftm',
      },
      {
        chainId: 43114,
        network: 'Avalanche',
        symbol: 'avax',
      },
    ]
  }

  get balances() {
    return this._balances
  }


  /** Fetches all balances for supported chains **/
  async getBalances(): Promise<void> {
    this.loading = true
    const assets = []
    try {
      for (const network of this.networks) {
        assets.push(
          await this._$store.dispatch('balance/getBalances', {
            chainId: network.chainId,
            address: this._$store.state.wallet.address,
            // address: '0xF705b9ba1908cA505537F309B08E6949C1b8f31F'
          })
        )
      }
      this._balances = assets
      this.loading = false
    } catch {
      this.loading = false
      this._balances = []

    }
  }


  /** Returns the total balances for all supported chains **/
  get totalBalance() {
    let total = 0

    for (const item of this.balances) {
      for (const token of Object.values(item)) {
        total += token.quote // total value
      }
    }
    return Helper.priceFormatter(total)
  }

  /** Returns token image url **/
  tokenImage(symbol: string): string {
    return Helper.getTokenImage(symbol)
  }

  /** Returns an alternate image url**/
  altImage(event: ErrorEvent) {
    return Helper.setAltImg(event)
  }
}
