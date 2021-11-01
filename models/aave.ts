/* eslint-disable camelcase */
import 'reflect-metadata'
import { Store } from 'vuex'
import { AaveAssetDataInterface, AaveBalanceDataInterface } from '@/types/aave'
import { Helper } from '~/models/helper'
import { ChainOptions } from '~/types/balance'

export class AaveBalanceData implements AaveBalanceDataInterface {
  balance!: {
    available_balance: number
    atoken_contract_address: string
    atoken_contract_ticker_symbol: string
    atoken_contract_name: string
    atoken_contract_decimals: number
    atoken_balance: number
    asset_contract_address: string
    asset_contract_ticker_symbol: string
    asset_contract_decimals: number
    logo_url: string
    liquidity_rate: number
    quote_rate: number
    quote: number
    borrow_balance: number
    borrow_rate: number
    borrow_quote: number
  }

  readonly supply_position!: {
    supplied: string
    balance: number
    balance_quote: number
    apy: number
  }

  readonly borrow_position!: {
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
    contract_ticker_symbol: string
    contract_address: string
    supports_erc: string[]
    logo_url: string
    quote_rate: number
  }

  atoken!: {
    contract_decimals: number
    contract_name: string
    contract_ticker_symbol: string
    contract_address: string
    supports_erc: string[]
    logo_url: string
  }

  variable_borrow_apr!: number
  stable_borrow_apr!: number
  supply_apy!: number
  lending_pool_contract!: string
  lending_pool_addresses_provider!: string
  lending_pool_addresses_provider_registry!: string
  lending_pool_collateral_manager!: string
  lending_pool_configurator!: string
  lending_rate_oracle!: string
  price_oracle!: string
  pool_admin!: string
  emergency_admin!: string
  protocol_data_provider!: string
  weth_gateway!: string
  collector_contract!: string
}

export class AaveBalance {
  loading = false
  address = ''
  chainId = 1

  private _$store: Store<any>
  private _balanceData: AaveBalanceData[] = []

  constructor(store: Store<any>, chainId: number, address: string) {
    this._$store = store
    this.chainId = chainId
    this.address = address
  }

  get cols() {
    return [
      {
        text: 'Assets',
        align: 'left',
        class: 'text-no-wrap',
        value: 'balance.asset_contract_ticker_symbol',
        width: 200,
      },
      {
        text: 'Balance',
        align: 'left',
        class: 'text-no-wrap',
        value: 'balance.available_balance',
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
        value: 'underlying.contract_ticker_symbol',
        width: 240,
      },
      {
        text: 'Last Price',
        align: 'left',
        class: 'text-no-wrap',
        value: 'underlying.quote_rate',
      },
      {
        text: 'Supply',
        align: 'center',
        value: 'supply_apy',
      },
      {
        text: 'Borrow APY',
        align: 'center',
        value: 'variable_borrow_apr',
      },
      {
        text: 'Borrow APR',
        align: 'center',
        value: 'stable_borrow_apr',
      },
      {
        text: '',
        align: 'center',
        value: 'actions',
        sortable: false,
        width: 310,
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
