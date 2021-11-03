/* eslint-disable camelcase */
import 'reflect-metadata'
import { Store } from 'vuex'
import { AaveAssetDataInterface, AaveBalanceDataInterface } from '@/types/aave'
import { Helper } from '~/models/helper'
import { ChainOptions } from '~/types/balance'

export class AaveBalanceData implements AaveBalanceDataInterface {
  underlying!: {
    contract_decimals: number
    contract_symbol: string
    contract_address: string
    logo_url: string
    available_balance: number
    quote_rate: number
  }

  supply_position!: {
    supplied: string
    balance: number
    balance_quote: number
    apy: number
  }

  borrow_position!: {
    borrowed: string
    balance: number
    balance_quote: number
    apr: number
  }
}

export class AaveAssetData implements AaveAssetDataInterface {
  underlying!: {
    contract_decimals: number
    contract_name: string
    contract_symbol: string
    contract_address: string
    logo_url: string
    available_balance: number
    quote_rate: number
  }

  supply_position!: {
    supplied: string
    balance: number
    balance_quote: number
    apy: number
  }

  borrow_position!: {
    borrowed: string
    balance: number
    balance_quote: number
    apr: number
  }

  variable_borrow_apr!: number
  stable_borrow_apr!: number
  supply_apy!: number
}

export class AaveBalance {
  loading: boolean = false
  address: string = ''
  chainId: number = 1

  private static instance: AaveBalance

  private _$store: Store<any>
  private _balanceData: AaveBalanceData[] = []

  constructor(store: Store<any>, chainId: number, address: string) {
    this._$store = store
    this.chainId = chainId
    this.address = address
  }

  // private constructor(store: Store<any>, chainId: number, address: string) {
  //   this._$store = store
  //   this.chainId = chainId
  //   this.address = address
  // }
  //
  // static getInstance(store: Store<any>, chainId: number, address: string) {
  //   if (this.instance) {
  //     return this.instance
  //   }
  //
  //   this.instance = new AaveBalance(store, chainId, address)
  //   return this.instance
  // }

  get cols() {
    return [
      {
        text: 'Assets',
        align: 'left',
        class: 'text-no-wrap justify-content-between',
        value: 'underlying.contract_symbol',
      },
      {
        text: 'Balance',
        align: 'left',
        class: 'text-no-wrap',
        value: 'underlying.available_balance',
      },
      {
        text: 'Supplied',
        align: 'left',
        class: 'text-no-wrap',
        value: 'supply_position.supplied',
      },
      {
        text: 'Borrowed',
        align: 'left',
        class: 'text-no-wrap',
        value: 'borrow_position.borrowed',
      },
      {
        text: '',
        align: 'center',
        class: 'text-no-wrap',
        value: 'actions',
        sortable: false,
      },
    ]
  }

  get balanceData() {
    return this._balanceData
  }

  async getData(): Promise<void> {
    this.loading = true

    try {
      this._balanceData = await this._$store.dispatch('aave/getAaveBalances', {
        chainId: this.chainId,
        address: this.address,
        store: this._$store,
      })
      this.loading = false
    } catch (err) {
      this.loading = false
      console.log(err)
    }
  }

  setAltImg(event: any) {
    event.target.src = require(`~/assets/images/generic/aave-generic.png`)
  }
}

export class AaveAssets {
  loading = false

  private _$store: Store<any>
  private _ethereumAssets: AaveAssetData[] = []
  private _polygonAssets: AaveAssets[] = []

  constructor(store: Store<any>) {
    this._$store = store
  }

  get cols() {
    return [
      {
        text: 'Assets',
        align: 'start',
        value: 'underlying.contract_symbol',
      },
      {
        text: 'Balance',
        align: 'left',
        value: 'underlying.available_balance',
      },
      {
        text: 'Supply',
        align: 'center',
        value: 'supply_apy',
      },
      {
        text: 'Borrow APR',
        align: 'center',
        value: 'stable_borrow_apr',
      },
      {
        text: 'Borrow APY',
        align: 'center',
        value: 'variable_borrow_apr',
      },

      {
        text: '',
        align: 'center',
        value: 'actions',
        sortable: false,
      },
    ]
  }

  get ethereumAssets() {
    return this._ethereumAssets
  }

  get polygonAssets() {
    return this._polygonAssets
  }

  private async _getProtocolAssets(chainId: ChainOptions) {
    try {
      return await this._$store.dispatch('aave/getAaveAssets', {
        chainId,
        store: this._$store,
        // address: this._$store.state.wallet.address,
        address: '0xf705b9ba1908ca505537f309b08e6949c1b8f31f',
      })
    } catch (err) {
      return []
    }
  }

  async getEthereumAssets() {
    this.loading = true
    this._ethereumAssets = await this._getProtocolAssets(1)
    this.loading = false
  }

  async getPolygonAssets() {
    this.loading = true
    this._polygonAssets = await this._getProtocolAssets(137)
    this.loading = false
  }

  /** Returns an alternate image url**/
  setAltImg(event: ErrorEvent) {
    return Helper.setAltImg(event)
  }
}
