/* eslint-disable camelcase */
import 'reflect-metadata'
import { Store } from 'vuex'
import { AaveAssetDataInterface, AaveBalanceDataInterface } from '@/types/aave'

export class AaveBalanceData implements AaveBalanceDataInterface {
  readonly balance!: {
    atoken_contract_address: string
    atoken_contract_ticker_symbol: string
    atoken_contract_name: string
    atoken_contract_decimals: number
    atoken_balance: string
    asset_contract_decimals: number
    asset_contract_address: string
    asset_contract_ticker_symbol: number
    logo_url: string
    liquidity_rate: number
    quote_rate: number
    quote: number
    borrow_balance: string
    borrow_rate: number
    borrow_quote: number
    origination_fee: string
  }

  readonly supply_position!: {
    supplied: string
    balance: string
    balance_quote: number
    apy: string
  }

  readonly borrow_position!: {
    borrowed: string
    balance: string
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
  address = ''

  private _$store: Store<any>
  private _ethereumBalance: AaveBalanceData[] = []
  private _polygonBalance: AaveBalanceData[] = []

  constructor(store: Store<any>, address: string) {
    this._$store = store
    this.address = address
  }

  get cols() {
    return [
      {
        text: 'Symbol',
        align: 'center',
        class: 'text-no-wrap',
        value: 'balance.atoken_contract_ticker_symbol',
        sortable: false,
      },
      {
        text: 'Contract Name',
        align: 'start',
        class: 'text-no-wrap',
        value: 'balance.atoken_contract_name',
      },
      {
        text: 'Decimals',
        align: 'start',
        class: 'text-no-wrap',
        value: 'balance.atoken_contract_decimals',
      },
      {
        text: 'Balance',
        align: 'start',
        class: 'text-no-wrap',
        value: 'balance.atoken_balance',
      },
      // {
      //   text: 'Contract Symbol',
      //   align: 'start',
      //   class: 'pt-3',
      //   value: 'balance.asset_contract_ticker_symbol',
      // },
      {
        text: 'Liq Rate',
        align: 'start',
        class: 'text-no-wrap',
        value: 'balance.liquidity_rate',
      },
      {
        text: 'Quote Rate',
        align: 'start',
        class: 'text-no-wrap',
        value: 'balance.quote_rate',
      },
      {
        text: 'Quote',
        align: 'start',
        class: 'text-no-wrap',
        value: 'balance.quote',
      },
      {
        text: 'Borrow Balance',
        align: 'start',
        class: 'text-no-wrap',
        value: 'balance.borrow_balance',
      },
      {
        text: 'Borrow Rate',
        align: 'start',
        class: 'text-no-wrap',
        value: 'balance.borrow_rate',
      },
      {
        text: 'Borrow Quote',
        align: 'start',
        class: 'text-no-wrap',
        value: 'balance.borrow_quote',
      },
      // {
      //   text: 'Origination Fee',
      //   align: 'start',
      //   class: 'text-no-wrap',
      //   value: 'balance.origination_fee',
      // },
      {
        text: 'Supply',
        align: 'start',
        class: 'text-no-wrap',
        value: 'supply_position.supplied',
      },
      {
        text: 'Borrow',
        align: 'start',
        class: 'text-no-wrap',
        value: 'borrow_position.supplied',
      },
    ]
  }

  get ethereumBalance() {
    return this._ethereumBalance
  }

  get polygonBalance() {
    return this._polygonBalance
  }

  async getData(): Promise<void> {
    this._ethereumBalance = await this._$store.dispatch(
      'aave/getAaveBalances',
      {
        chainId: 1,
        address: this.address,
      }
    )

    this._polygonBalance = await this._$store.dispatch('aave/getAaveBalances', {
      chainId: 137,
      address: this.address,
    })
  }

  setAltImg(event: any) {
    event.target.src = require(`~/assets/images/generic/aave-generic.png`)
  }
}

export class AaveAssets {
  private _$store: Store<any>
  private _ethereumAssets: AaveAssetData[] = []
  private _polygonAssets: AaveAssets[] = []

  constructor(store: Store<any>) {
    this._$store = store
  }

  get cols() {
    return [
      {
        text: 'Symbol',
        align: 'center',
        class: 'text-no-wrap',
        value: 'underlying.contract_ticker_symbol',
      },
      {
        text: 'Quote Rate',
        align: 'start',
        class: 'text-no-wrap',
        value: 'underlying.quote_rate',
      },
      {
        text: 'Contract Decimals',
        align: 'start',
        class: 'pt-3',
        value: 'underlying.contract_decimals',
        width: 30,
      },
      {
        text: 'Contract Name',
        align: 'start',
        class: 'text-no-wrap',
        value: 'underlying.contract_name',
      },
      // {
      //   text: 'Contract Symbol',
      //   align: 'start',
      //   class: 'pt-3',
      //   value: 'underlying.contract_ticker_symbol',
      // },
      {
        text: 'Contract Address',
        align: 'start',
        class: 'text-no-wrap',
        value: 'underlying.contract_address',
      },
      {
        text: 'Atoken Logo',
        align: 'center',
        class: 'pt-3',
        value: 'atoken.logo_url',
      },
      {
        text: 'Atoken Contract Decimals',
        align: 'start',
        class: 'py-3',
        value: 'atoken.contract_decimals',
      },
      {
        text: 'Atoken Contract Name',
        align: 'start',
        value: 'atoken.contract_name',
      },
      // {
      //   text: 'Atoken Symbol',
      //   align: 'start',
      //   class: 'text-no-wrap',
      //   value: 'atoken.contract_ticker_symbol',
      // },
      {
        text: 'Atoken Contract Address',
        align: 'start',
        class: 'text-no-wrap',
        value: 'atoken.contract_address',
      },
      {
        text: 'Supply APY',
        align: 'start',
        value: 'supply_apy',
      },
      {
        text: 'Variable Borrow APR',
        align: 'start',
        value: 'variable_borrow_apr',
      },
      {
        text: 'Stable Borrow APR',
        align: 'start',
        value: 'stable_borrow_apr',
      },

      {
        text: 'Lending Pool Contract',
        align: 'start',
        class: 'text-no-wrap',
        value: 'lending_pool_contract',
      },
    ]
  }

  get ethereumAssets() {
    return this._ethereumAssets
  }

  get polygonAssets() {
    return this._polygonAssets
  }

  async getData(): Promise<void> {
    this._ethereumAssets = await this._$store.dispatch('aave/getAaveAssets', {
      chainId: 1,
    })
    this._polygonAssets = await this._$store.dispatch('aave/getAaveAssets', {
      chainId: 137,
    })
  }

  setAltImg(event: any) {
    event.target.src = require(`~/assets/images/generic/aave-generic.png`)
  }
}
