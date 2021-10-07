import 'reflect-metadata'
import { Store } from 'vuex'
import { BalanceDataInterface } from '~/types/balance'
import { Helper } from '~/models/helper'

export class BalanceData implements BalanceDataInterface {
  readonly chainId!: number
  readonly tokenAddress!: string
  readonly tokenName!: string
  readonly tokenSymbol!: string
  readonly tokenBalance!: number
  readonly tokenPrice!: number
  readonly totalValue!: number
  readonly logoUrl!: string
}

export class Balances {
  private static instance: Balances

  private _$store: Store<any>

  private _data: BalanceData[] = []

  private constructor(store: Store<any>) {
    this._$store = store
  }

  static getInstance(store: Store<any>) {
    if (this.instance) {
      return this.instance
    }

    this.instance = new Balances(store)
    return this.instance
  }

  get cols() {
    return [
      {
        text: 'Token',
        align: 'start',
        value: 'tokenSymbol',
        class: 'px-2',
        width: 60,
      },
      {
        text: 'Balance',
        align: 'start',
        value: 'tokenBalance',
        class: 'px-2',
        width: 80,
      },
      {
        text: 'Price',
        align: 'start',
        value: 'tokenPrice',
        class: 'px-2',
        width: 80,
      },
      {
        text: 'Value',
        align: 'start',
        value: 'totalValue',
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

  get data() {
    return this._data
  }

  async getData(): Promise<void> {
    const assets = []
    try {
      for (const network of this.networks) {
        assets.push(
          await this._$store.dispatch('balance/getBalances', {
            chainId: network.chainId,
            address: this._$store.state.wallet.address,
          })
        )
      }
      this._data = assets
    } catch {
      this._data = []
    }
  }

  get totalBalance() {
    let total = 0

    for (const item of this.data) {
      for (const obj of Object.values(item)) {
        total += obj.totalValue
      }
    }

    return Helper.priceFormatter(total)
  }

  tokenImage(symbol: string): string {
    return Helper.getTokenImage(symbol)
  }
}
