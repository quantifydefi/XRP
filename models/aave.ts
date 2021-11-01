/* eslint-disable camelcase */
import 'reflect-metadata'
import { Store } from 'vuex'
import { AaveAssetDataInterface, AaveBalanceDataInterface } from '@/types/aave'
import { Helper } from '~/models/helper'

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
    this._balanceData = await this._$store.dispatch('aave/getAaveBalances', {
      chainId: this.chainId,
      address: this.address,
      store: this._$store,
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
    return [
      {
        underlying: {
          contract_decimals: 6,
          contract_name: 'Tether USD',
          contract_ticker_symbol: 'USDT',
          contract_address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
          supports_erc: ['erc20'],
          logo_url:
            'https://logos.covalenthq.com/tokens/0xdac17f958d2ee523a2206206994597c13d831ec7.png',
          quote_rate: 1.0,
        },
        atoken: {
          contract_decimals: 6,
          contract_name: 'Aave Interest bearing USDT',
          contract_ticker_symbol: 'aUSDT',
          contract_address: '0x3ed3b47dd13ec9a98b44e6204a523e766b225811',
          supports_erc: ['erc20'],
          logo_url:
            'https://www.covalenthq.com/static/images/safekeep/logos/aave/aUSDT.svg',
        },
        variable_borrow_apr: 0.5604672,
        stable_borrow_apr: 0.6404672,
        supply_apy: 0.48995268,
        lending_pool_contract: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        lending_pool_addresses_provider:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_addresses_provider_registry:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_collateral_manager:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_configurator: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_rate_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        price_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        pool_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        emergency_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        protocol_data_provider: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        weth_gateway: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        collector_contract: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
      },
      {
        underlying: {
          contract_decimals: 8,
          contract_name: 'Wrapped BTC',
          contract_ticker_symbol: 'WBTC',
          contract_address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
          supports_erc: ['erc20'],
          logo_url:
            'https://logos.covalenthq.com/tokens/0x2260fac5e5542a773aa44fbcfedf7c193bc2c599.png',
          quote_rate: 62146.0,
        },
        atoken: {
          contract_decimals: 8,
          contract_name: 'Aave Interest bearing WBTC',
          contract_ticker_symbol: 'aWBTC',
          contract_address: '0x9ff58f4ffb29fa2266ab25e75e2a8b3503311656',
          supports_erc: ['erc20'],
          logo_url:
            'https://www.covalenthq.com/static/images/safekeep/logos/aave/aWBTC.svg',
        },
        variable_borrow_apr: 0.0034690644,
        stable_borrow_apr: 0.034336332,
        supply_apy: 8.0174075e-5,
        lending_pool_contract: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        lending_pool_addresses_provider:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_addresses_provider_registry:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_collateral_manager:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_configurator: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_rate_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        price_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        pool_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        emergency_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        protocol_data_provider: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        weth_gateway: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        collector_contract: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
      },
      {
        underlying: {
          contract_decimals: 18,
          contract_name: 'Wrapped Ether',
          contract_ticker_symbol: 'WETH',
          contract_address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          supports_erc: ['erc20'],
          logo_url:
            'https://logos.covalenthq.com/tokens/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png',
          quote_rate: 4401.38,
        },
        atoken: {
          contract_decimals: 18,
          contract_name: 'Aave Interest bearing WETH',
          contract_ticker_symbol: 'aWETH',
          contract_address: '0x030ba81f1c18d280636f32af80b9aad02cf0854e',
          supports_erc: ['erc20'],
          logo_url:
            'https://www.covalenthq.com/static/images/safekeep/logos/aave/aWETH.svg',
        },
        variable_borrow_apr: 0.0030735163,
        stable_borrow_apr: 0.033841897,
        supply_apy: 7.854285e-5,
        lending_pool_contract: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        lending_pool_addresses_provider:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_addresses_provider_registry:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_collateral_manager:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_configurator: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_rate_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        price_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        pool_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        emergency_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        protocol_data_provider: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        weth_gateway: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        collector_contract: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
      },
      {
        underlying: {
          contract_decimals: 18,
          contract_name: 'yearn.finance',
          contract_ticker_symbol: 'YFI',
          contract_address: '0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e',
          supports_erc: ['erc20'],
          logo_url:
            'https://logos.covalenthq.com/tokens/0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e.png',
          quote_rate: 35221.0,
        },
        atoken: {
          contract_decimals: 18,
          contract_name: 'Aave Interest bearing YFI',
          contract_ticker_symbol: 'aYFI',
          contract_address: '0x5165d24277cd063f5ac44efd447b27025e888f37',
          supports_erc: ['erc20'],
          logo_url:
            'https://www.covalenthq.com/static/images/safekeep/logos/aave/aYFI.svg',
        },
        variable_borrow_apr: 0.029075868,
        stable_borrow_apr: 0.041536953,
        supply_apy: 0.0043478026,
        lending_pool_contract: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        lending_pool_addresses_provider:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_addresses_provider_registry:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_collateral_manager:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_configurator: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_rate_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        price_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        pool_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        emergency_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        protocol_data_provider: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        weth_gateway: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        collector_contract: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
      },
      {
        underlying: {
          contract_decimals: 18,
          contract_name: '0x Protocol Token',
          contract_ticker_symbol: 'ZRX',
          contract_address: '0xe41d2489571d322189246dafa5ebde1f4699f498',
          supports_erc: ['erc20'],
          logo_url:
            'https://logos.covalenthq.com/tokens/0xe41d2489571d322189246dafa5ebde1f4699f498.png',
          quote_rate: 1.04,
        },
        atoken: {
          contract_decimals: 18,
          contract_name: 'Aave Interest bearing ZRX',
          contract_ticker_symbol: 'aZRX',
          contract_address: '0xdf7ff54aacacbff42dfe29dd6144a69b629f8c9e',
          supports_erc: ['erc20'],
          logo_url:
            'https://www.covalenthq.com/static/images/safekeep/logos/aave/aZRX.svg',
        },
        variable_borrow_apr: 0.061145015,
        stable_borrow_apr: 0.11735002,
        supply_apy: 0.017384093,
        lending_pool_contract: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        lending_pool_addresses_provider:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_addresses_provider_registry:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_collateral_manager:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_configurator: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_rate_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        price_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        pool_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        emergency_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        protocol_data_provider: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        weth_gateway: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        collector_contract: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
      },
      {
        underlying: {
          contract_decimals: 18,
          contract_name: 'Uniswap',
          contract_ticker_symbol: 'UNI',
          contract_address: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
          supports_erc: ['erc20'],
          logo_url:
            'https://logos.covalenthq.com/tokens/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984.png',
          quote_rate: 25.33,
        },
        atoken: {
          contract_decimals: 18,
          contract_name: 'Aave Interest bearing UNI',
          contract_ticker_symbol: 'aUNI',
          contract_address: '0xb9d7cb55f463405cdfbe4e90a6d2df01c2b92bf1',
          supports_erc: ['erc20'],
          logo_url:
            'https://www.covalenthq.com/static/images/safekeep/logos/aave/aUNI.svg',
        },
        variable_borrow_apr: 0.010310741,
        stable_borrow_apr: 0.017675556,
        supply_apy: 5.467406e-4,
        lending_pool_contract: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        lending_pool_addresses_provider:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_addresses_provider_registry:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_collateral_manager:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_configurator: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_rate_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        price_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        pool_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        emergency_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        protocol_data_provider: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        weth_gateway: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        collector_contract: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
      },
      {
        underlying: {
          contract_decimals: 18,
          contract_name: 'Aave Token',
          contract_ticker_symbol: 'AAVE',
          contract_address: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
          supports_erc: ['erc20'],
          logo_url:
            'https://logos.covalenthq.com/tokens/0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9.png',
          quote_rate: 331.1,
        },
        atoken: {
          contract_decimals: 18,
          contract_name: 'Aave Interest bearing AAVE',
          contract_ticker_symbol: 'aAAVE',
          contract_address: '0xffc97d72e13e01096502cb8eb52dee56f74dad7b',
          supports_erc: ['erc20'],
          logo_url:
            'https://www.covalenthq.com/static/images/safekeep/logos/aave/aAAVE.svg',
        },
        variable_borrow_apr: 0.0,
        stable_borrow_apr: 0.0,
        supply_apy: 0.0,
        lending_pool_contract: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        lending_pool_addresses_provider:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_addresses_provider_registry:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_collateral_manager:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_configurator: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_rate_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        price_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        pool_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        emergency_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        protocol_data_provider: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        weth_gateway: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        collector_contract: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
      },
      {
        underlying: {
          contract_decimals: 18,
          contract_name: 'Basic Attention Token',
          contract_ticker_symbol: 'BAT',
          contract_address: '0x0d8775f648430679a709e98d2b0cb6250d2887ef',
          supports_erc: ['erc20'],
          logo_url:
            'https://logos.covalenthq.com/tokens/0x0d8775f648430679a709e98d2b0cb6250d2887ef.png',
          quote_rate: 0.837205,
        },
        atoken: {
          contract_decimals: 18,
          contract_name: 'Aave Interest bearing BAT',
          contract_ticker_symbol: 'aBAT',
          contract_address: '0x05ec93c0365baaeabf7aeffb0972ea7ecdd39cf1',
          supports_erc: ['erc20'],
          logo_url:
            'https://www.covalenthq.com/static/images/safekeep/logos/aave/aBAT.svg',
        },
        variable_borrow_apr: 0.043117084,
        stable_borrow_apr: 0.091595836,
        supply_apy: 0.009538222,
        lending_pool_contract: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        lending_pool_addresses_provider:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_addresses_provider_registry:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_collateral_manager:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_configurator: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_rate_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        price_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        pool_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        emergency_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        protocol_data_provider: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        weth_gateway: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        collector_contract: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
      },
      {
        underlying: {
          contract_decimals: 18,
          contract_name: 'Binance USD',
          contract_ticker_symbol: 'BUSD',
          contract_address: '0x4fabb145d64652a948d72533023f6e7a623c7c53',
          supports_erc: ['erc20'],
          logo_url:
            'https://logos.covalenthq.com/tokens/0x4fabb145d64652a948d72533023f6e7a623c7c53.png',
          quote_rate: 1.0,
        },
        atoken: {
          contract_decimals: 18,
          contract_name: 'Aave Interest bearing BUSD',
          contract_ticker_symbol: 'aBUSD',
          contract_address: '0xa361718326c15715591c299427c62086f69923d9',
          supports_erc: ['erc20'],
          logo_url:
            'https://www.covalenthq.com/static/images/safekeep/logos/aave/aBUSD.svg',
        },
        variable_borrow_apr: 0.11756468,
        stable_borrow_apr: 0.0,
        supply_apy: 0.08628796,
        lending_pool_contract: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        lending_pool_addresses_provider:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_addresses_provider_registry:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_collateral_manager:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_configurator: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_rate_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        price_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        pool_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        emergency_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        protocol_data_provider: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        weth_gateway: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        collector_contract: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
      },
      {
        underlying: {
          contract_decimals: 18,
          contract_name: 'Dai Stablecoin',
          contract_ticker_symbol: 'DAI',
          contract_address: '0x6b175474e89094c44da98b954eedeac495271d0f',
          supports_erc: ['erc20'],
          logo_url:
            'https://logos.covalenthq.com/tokens/0x6b175474e89094c44da98b954eedeac495271d0f.png',
          quote_rate: 0.999594,
        },
        atoken: {
          contract_decimals: 18,
          contract_name: 'Aave Interest bearing DAI',
          contract_ticker_symbol: 'aDAI',
          contract_address: '0x028171bca77440897b824ca71d1c56cac55b68a3',
          supports_erc: ['erc20'],
          logo_url:
            'https://www.covalenthq.com/static/images/safekeep/logos/aave/aDAI.svg',
        },
        variable_borrow_apr: 0.23271045,
        stable_borrow_apr: 0.31271046,
        supply_apy: 0.17758109,
        lending_pool_contract: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        lending_pool_addresses_provider:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_addresses_provider_registry:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_collateral_manager:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_configurator: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_rate_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        price_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        pool_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        emergency_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        protocol_data_provider: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        weth_gateway: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        collector_contract: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
      },
      {
        underlying: {
          contract_decimals: 18,
          contract_name: 'Enjin Coin',
          contract_ticker_symbol: 'ENJ',
          contract_address: '0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c',
          supports_erc: ['erc20'],
          logo_url:
            'https://logos.covalenthq.com/tokens/0xf629cbd94d3791c9250152bd8dfbdf380e2a3b9c.png',
          quote_rate: 2.38,
        },
        atoken: {
          contract_decimals: 18,
          contract_name: 'Aave Interest bearing ENJ',
          contract_ticker_symbol: 'aENJ',
          contract_address: '0xac6df26a590f08dcc95d5a4705ae8abbc88509ef',
          supports_erc: ['erc20'],
          logo_url:
            'https://www.covalenthq.com/static/images/safekeep/logos/aave/aENJ.svg',
        },
        variable_borrow_apr: 0.0053621405,
        stable_borrow_apr: 0.007660201,
        supply_apy: 1.1971201e-4,
        lending_pool_contract: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        lending_pool_addresses_provider:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_addresses_provider_registry:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_collateral_manager:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_configurator: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_rate_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        price_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        pool_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        emergency_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        protocol_data_provider: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        weth_gateway: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        collector_contract: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
      },
      {
        underlying: {
          contract_decimals: 18,
          contract_name: 'Kyber Network Crystal',
          contract_ticker_symbol: 'KNC',
          contract_address: '0xdd974d5c2e2928dea5f71b9825b8b646686bd200',
          supports_erc: ['erc20'],
          logo_url:
            'https://logos.covalenthq.com/tokens/0xdd974d5c2e2928dea5f71b9825b8b646686bd200.png',
          quote_rate: 1.71,
        },
        atoken: {
          contract_decimals: 18,
          contract_name: 'Aave Interest bearing KNC',
          contract_ticker_symbol: 'aKNC',
          contract_address: '0x39c6b3e42d6a679d7d776778fe880bc9487c2eda',
          supports_erc: ['erc20'],
          logo_url:
            'https://www.covalenthq.com/static/images/safekeep/logos/aave/aKNC.svg',
        },
        variable_borrow_apr: 0.030835202,
        stable_borrow_apr: 0.068544,
        supply_apy: 0.0064269793,
        lending_pool_contract: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        lending_pool_addresses_provider:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_addresses_provider_registry:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_collateral_manager:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_configurator: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_rate_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        price_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        pool_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        emergency_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        protocol_data_provider: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        weth_gateway: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        collector_contract: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
      },
      {
        underlying: {
          contract_decimals: 18,
          contract_name: 'ChainLink Token',
          contract_ticker_symbol: 'LINK',
          contract_address: '0x514910771af9ca656af840dff83e8264ecf986ca',
          supports_erc: ['erc20'],
          logo_url:
            'https://logos.covalenthq.com/tokens/0x514910771af9ca656af840dff83e8264ecf986ca.png',
          quote_rate: 31.14,
        },
        atoken: {
          contract_decimals: 18,
          contract_name: 'Aave Interest bearing LINK',
          contract_ticker_symbol: 'aLINK',
          contract_address: '0xa06bc25b5805d5f8d82847d191cb4af5a3e873e0',
          supports_erc: ['erc20'],
          logo_url:
            'https://www.covalenthq.com/static/images/safekeep/logos/aave/aLINK.svg',
        },
        variable_borrow_apr: 0.0012572028,
        stable_borrow_apr: 0.031796005,
        supply_apy: 1.7965982e-5,
        lending_pool_contract: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        lending_pool_addresses_provider:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_addresses_provider_registry:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_collateral_manager:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_configurator: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_rate_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        price_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        pool_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        emergency_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        protocol_data_provider: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        weth_gateway: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        collector_contract: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
      },
      {
        underlying: {
          contract_decimals: 18,
          contract_name: 'Decentraland MANA',
          contract_ticker_symbol: 'MANA',
          contract_address: '0x0f5d2fb29fb7d3cfee444a200298f468908cc942',
          supports_erc: ['erc20'],
          logo_url:
            'https://logos.covalenthq.com/tokens/0x0f5d2fb29fb7d3cfee444a200298f468908cc942.png',
          quote_rate: 1.26,
        },
        atoken: {
          contract_decimals: 18,
          contract_name: 'Aave Interest bearing MANA',
          contract_ticker_symbol: 'aMANA',
          contract_address: '0xa685a61171bb30d4072b338c80cb7b2c865c873e',
          supports_erc: ['erc20'],
          logo_url:
            'https://www.covalenthq.com/static/images/safekeep/logos/aave/aMANA.svg',
        },
        variable_borrow_apr: 0.0123345,
        stable_borrow_apr: 0.047620714,
        supply_apy: 7.5764884e-4,
        lending_pool_contract: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        lending_pool_addresses_provider:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_addresses_provider_registry:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_collateral_manager:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_configurator: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_rate_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        price_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        pool_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        emergency_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        protocol_data_provider: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        weth_gateway: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        collector_contract: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
      },
      {
        underlying: {
          contract_decimals: 18,
          contract_name: 'Maker Token',
          contract_ticker_symbol: 'MKR',
          contract_address: '0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2',
          supports_erc: ['erc20'],
          logo_url:
            'https://logos.covalenthq.com/tokens/0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2.png',
          quote_rate: 2439.48,
        },
        atoken: {
          contract_decimals: 18,
          contract_name: 'Aave Interest bearing MKR',
          contract_ticker_symbol: 'aMKR',
          contract_address: '0xc713e5e149d5d0715dcd1c156a020976e7e56b88',
          supports_erc: ['erc20'],
          logo_url:
            'https://www.covalenthq.com/static/images/safekeep/logos/aave/aMKR.svg',
        },
        variable_borrow_apr: 0.0018192121,
        stable_borrow_apr: 0.032598875,
        supply_apy: 1.9809862e-5,
        lending_pool_contract: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        lending_pool_addresses_provider:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_addresses_provider_registry:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_collateral_manager:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_configurator: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_rate_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        price_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        pool_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        emergency_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        protocol_data_provider: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        weth_gateway: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        collector_contract: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
      },
      {
        underlying: {
          contract_decimals: 18,
          contract_name: 'Republic Token',
          contract_ticker_symbol: 'REN',
          contract_address: '0x408e41876cccdc0f92210600ef50372656052a38',
          supports_erc: ['erc20'],
          logo_url:
            'https://logos.covalenthq.com/tokens/0x408e41876cccdc0f92210600ef50372656052a38.png',
          quote_rate: 1.06,
        },
        atoken: {
          contract_decimals: 18,
          contract_name: 'Aave Interest bearing REN',
          contract_ticker_symbol: 'aREN',
          contract_address: '0xcc12abe4ff81c9378d670de1b57f8e0dd228d77a',
          supports_erc: ['erc20'],
          logo_url:
            'https://www.covalenthq.com/static/images/safekeep/logos/aave/aREN.svg',
        },
        variable_borrow_apr: 0.009998934,
        stable_borrow_apr: 0.014284192,
        supply_apy: 5.9170614e-4,
        lending_pool_contract: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        lending_pool_addresses_provider:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_addresses_provider_registry:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_collateral_manager:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_configurator: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_rate_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        price_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        pool_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        emergency_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        protocol_data_provider: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        weth_gateway: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        collector_contract: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
      },
      {
        underlying: {
          contract_decimals: 18,
          contract_name: 'Synthetix Network Token',
          contract_ticker_symbol: 'SNX',
          contract_address: '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
          supports_erc: ['erc20'],
          logo_url:
            'https://logos.covalenthq.com/tokens/0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f.png',
          quote_rate: 10.21,
        },
        atoken: {
          contract_decimals: 18,
          contract_name: 'Aave Interest bearing SNX',
          contract_ticker_symbol: 'aSNX',
          contract_address: '0x35f6b052c598d933d69a4eec4d04c73a191fe6c2',
          supports_erc: ['erc20'],
          logo_url:
            'https://www.covalenthq.com/static/images/safekeep/logos/aave/aSNX.svg',
        },
        variable_borrow_apr: 0.1074636,
        stable_borrow_apr: 0.0,
        supply_apy: 0.036072902,
        lending_pool_contract: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        lending_pool_addresses_provider:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_addresses_provider_registry:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_collateral_manager:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_configurator: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_rate_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        price_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        pool_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        emergency_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        protocol_data_provider: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        weth_gateway: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        collector_contract: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
      },
      {
        underlying: {
          contract_decimals: 18,
          contract_name: 'Synth sUSD',
          contract_ticker_symbol: 'sUSD',
          contract_address: '0x57ab1ec28d129707052df4df418d58a2d46d5f51',
          supports_erc: ['erc20'],
          logo_url:
            'https://logos.covalenthq.com/tokens/0x57ab1ec28d129707052df4df418d58a2d46d5f51.png',
          quote_rate: 0.995697,
        },
        atoken: {
          contract_decimals: 18,
          contract_name: 'Aave Interest bearing sUSD',
          contract_ticker_symbol: 'aSUSD',
          contract_address: '0x6c5024cd4f8a59110119c56f8933403a539555eb',
          supports_erc: ['erc20'],
          logo_url:
            'https://www.covalenthq.com/static/images/safekeep/logos/aave/aSUSD.svg',
        },
        variable_borrow_apr: 0.11679663,
        stable_borrow_apr: 0.0,
        supply_apy: 0.07618497,
        lending_pool_contract: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        lending_pool_addresses_provider:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_addresses_provider_registry:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_collateral_manager:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_configurator: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_rate_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        price_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        pool_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        emergency_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        protocol_data_provider: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        weth_gateway: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        collector_contract: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
      },
      {
        underlying: {
          contract_decimals: 18,
          contract_name: 'TrueUSD',
          contract_ticker_symbol: 'TUSD',
          contract_address: '0x0000000000085d4780b73119b644ae5ecd22b376',
          supports_erc: ['erc20'],
          logo_url:
            'https://logos.covalenthq.com/tokens/0x0000000000085d4780b73119b644ae5ecd22b376.png',
          quote_rate: 1.01,
        },
        atoken: {
          contract_decimals: 18,
          contract_name: 'Aave Interest bearing TUSD',
          contract_ticker_symbol: 'aTUSD',
          contract_address: '0x101cc05f4a51c0319f570d5e146a8c625198e636',
          supports_erc: ['erc20'],
          logo_url:
            'https://www.covalenthq.com/static/images/safekeep/logos/aave/aTUSD.svg',
        },
        variable_borrow_apr: 0.03412492,
        stable_borrow_apr: 0.11706246,
        supply_apy: 0.027111102,
        lending_pool_contract: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        lending_pool_addresses_provider:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_addresses_provider_registry:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_collateral_manager:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_configurator: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_rate_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        price_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        pool_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        emergency_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        protocol_data_provider: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        weth_gateway: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        collector_contract: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
      },
      {
        underlying: {
          contract_decimals: 6,
          contract_name: 'USD Coin',
          contract_ticker_symbol: 'USDC',
          contract_address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
          supports_erc: ['erc20'],
          logo_url:
            'https://logos.covalenthq.com/tokens/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png',
          quote_rate: 1.0,
        },
        atoken: {
          contract_decimals: 6,
          contract_name: 'Aave Interest bearing USDC',
          contract_ticker_symbol: 'aUSDC',
          contract_address: '0xbcca60bb61934080951369a648fb03df4f96263c',
          supports_erc: ['erc20'],
          logo_url:
            'https://www.covalenthq.com/static/images/safekeep/logos/aave/aUSDC.svg',
        },
        variable_borrow_apr: 0.22896217,
        stable_borrow_apr: 0.29896218,
        supply_apy: 0.18983875,
        lending_pool_contract: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        lending_pool_addresses_provider:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_addresses_provider_registry:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_collateral_manager:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_configurator: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_rate_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        price_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        pool_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        emergency_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        protocol_data_provider: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        weth_gateway: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        collector_contract: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
      },
      {
        underlying: {
          contract_decimals: 18,
          contract_name: 'Curve DAO Token',
          contract_ticker_symbol: 'CRV',
          contract_address: '0xd533a949740bb3306d119cc777fa900ba034cd52',
          supports_erc: ['erc20'],
          logo_url:
            'https://logos.covalenthq.com/tokens/0xd533a949740bb3306d119cc777fa900ba034cd52.png',
          quote_rate: 4.83,
        },
        atoken: {
          contract_decimals: 18,
          contract_name: 'Aave Interest bearing CRV',
          contract_ticker_symbol: 'aCRV',
          contract_address: '0x8dae6cb04688c62d939ed9b68d32bc62e49970b1',
          supports_erc: ['erc20'],
          logo_url:
            'https://www.covalenthq.com/static/images/safekeep/logos/aave/aCRV.svg',
        },
        variable_borrow_apr: 0.1189934,
        stable_borrow_apr: 0.1789934,
        supply_apy: 0.04369268,
        lending_pool_contract: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        lending_pool_addresses_provider:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_addresses_provider_registry:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_collateral_manager:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_configurator: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_rate_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        price_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        pool_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        emergency_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        protocol_data_provider: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        weth_gateway: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        collector_contract: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
      },
      {
        underlying: {
          contract_decimals: 2,
          contract_name: 'Gemini dollar',
          contract_ticker_symbol: 'GUSD',
          contract_address: '0x056fd409e1d7a124bd7017459dfea2f387b6d5cd',
          supports_erc: ['erc20'],
          logo_url:
            'https://logos.covalenthq.com/tokens/0x056fd409e1d7a124bd7017459dfea2f387b6d5cd.png',
          quote_rate: 0.996003,
        },
        atoken: {
          contract_decimals: 2,
          contract_name: 'Aave Interest bearing GUSD',
          contract_ticker_symbol: 'aGUSD',
          contract_address: '0xd37ee7e4f452c6638c96536e68090de8cbcdb583',
          supports_erc: ['erc20'],
          logo_url:
            'https://www.covalenthq.com/static/images/safekeep/logos/aave/aGUSD.svg',
        },
        variable_borrow_apr: 0.21570474,
        stable_borrow_apr: 0.25570473,
        supply_apy: 0.16212946,
        lending_pool_contract: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        lending_pool_addresses_provider:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_addresses_provider_registry:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_collateral_manager:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_configurator: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_rate_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        price_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        pool_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        emergency_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        protocol_data_provider: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        weth_gateway: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        collector_contract: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
      },
      {
        underlying: {
          contract_decimals: 18,
          contract_name: 'Balancer',
          contract_ticker_symbol: 'BAL',
          contract_address: '0xba100000625a3754423978a60c9317c58a424e3d',
          supports_erc: ['erc20'],
          logo_url:
            'https://logos.covalenthq.com/tokens/0xba100000625a3754423978a60c9317c58a424e3d.png',
          quote_rate: 26.21,
        },
        atoken: {
          contract_decimals: 18,
          contract_name: 'Aave Interest bearing BAL',
          contract_ticker_symbol: 'aBAL',
          contract_address: '0x272f97b7a56a387ae942350bbc7df5700f8a4576',
          supports_erc: ['erc20'],
          logo_url:
            'https://www.covalenthq.com/static/images/safekeep/logos/aave/aBAL.svg',
        },
        variable_borrow_apr: 0.026017662,
        stable_borrow_apr: 0.06716809,
        supply_apy: 0.0034812966,
        lending_pool_contract: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        lending_pool_addresses_provider:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_addresses_provider_registry:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_collateral_manager:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_configurator: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_rate_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        price_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        pool_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        emergency_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        protocol_data_provider: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        weth_gateway: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        collector_contract: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
      },
      {
        underlying: {
          contract_decimals: 18,
          contract_name: 'SushiBar',
          contract_ticker_symbol: 'xSUSHI',
          contract_address: '0x8798249c2e607446efb7ad49ec89dd1865ff4272',
          supports_erc: ['erc20'],
          logo_url:
            'https://logos.covalenthq.com/tokens/0x8798249c2e607446efb7ad49ec89dd1865ff4272.png',
          quote_rate: 13.88,
        },
        atoken: {
          contract_decimals: 18,
          contract_name: 'Aave Interest bearing xSUSHI',
          contract_ticker_symbol: 'aXSUSHI',
          contract_address: '0xf256cc7847e919fac9b808cc216cac87ccf2f47a',
          supports_erc: ['erc20'],
          logo_url:
            'https://www.covalenthq.com/static/images/safekeep/logos/aave/aXSUSHI.svg',
        },
        variable_borrow_apr: 0.0652484,
        stable_borrow_apr: 0.0,
        supply_apy: 0.017789658,
        lending_pool_contract: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        lending_pool_addresses_provider:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_addresses_provider_registry:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_collateral_manager:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_configurator: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_rate_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        price_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        pool_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        emergency_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        protocol_data_provider: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        weth_gateway: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        collector_contract: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
      },
      {
        underlying: {
          contract_decimals: 18,
          contract_name: 'renFIL',
          contract_ticker_symbol: 'renFIL',
          contract_address: '0xd5147bc8e386d91cc5dbe72099dac6c9b99276f5',
          supports_erc: ['erc20'],
          logo_url:
            'https://logos.covalenthq.com/tokens/0xd5147bc8e386d91cc5dbe72099dac6c9b99276f5.png',
          quote_rate: 63.15,
        },
        atoken: {
          contract_decimals: 18,
          contract_name: 'Aave Interest bearing renFIL',
          contract_ticker_symbol: 'aRENFIL',
          contract_address: '0x514cd6756ccbe28772d4cb81bc3156ba9d1744aa',
          supports_erc: ['erc20'],
          logo_url:
            'https://www.covalenthq.com/static/images/safekeep/logos/aave/aRENFIL.svg',
        },
        variable_borrow_apr: 0.008152101,
        stable_borrow_apr: 0.0,
        supply_apy: 4.9367873e-4,
        lending_pool_contract: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        lending_pool_addresses_provider:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_addresses_provider_registry:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_collateral_manager:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_configurator: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_rate_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        price_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        pool_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        emergency_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        protocol_data_provider: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        weth_gateway: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        collector_contract: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
      },
      {
        underlying: {
          contract_decimals: 18,
          contract_name: 'Rai Reflex Index',
          contract_ticker_symbol: 'RAI',
          contract_address: '0x03ab458634910aad20ef5f1c8ee96f1d6ac54919',
          supports_erc: ['erc20'],
          logo_url:
            'https://logos.covalenthq.com/tokens/0x03ab458634910aad20ef5f1c8ee96f1d6ac54919.png',
          quote_rate: 3.03,
        },
        atoken: {
          contract_decimals: 18,
          contract_name: 'Aave Interest bearing RAI',
          contract_ticker_symbol: 'aRAI',
          contract_address: '0xc9bc48c72154ef3e5425641a3c747242112a46af',
          supports_erc: ['erc20'],
          logo_url:
            'https://www.covalenthq.com/static/images/safekeep/logos/aave/aRAI.svg',
        },
        variable_borrow_apr: 0.026938971,
        stable_borrow_apr: 0.013469486,
        supply_apy: 0.01161133,
        lending_pool_contract: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        lending_pool_addresses_provider:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_addresses_provider_registry:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_collateral_manager:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_configurator: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_rate_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        price_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        pool_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        emergency_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        protocol_data_provider: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        weth_gateway: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        collector_contract: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
      },
      {
        underlying: {
          contract_decimals: 9,
          contract_name: 'Ampleforth',
          contract_ticker_symbol: 'AMPL',
          contract_address: '0xd46ba6d942050d489dbd938a2c909a5d5039a161',
          supports_erc: ['erc20'],
          logo_url:
            'https://logos.covalenthq.com/tokens/0xd46ba6d942050d489dbd938a2c909a5d5039a161.png',
          quote_rate: 1.51,
        },
        atoken: {
          contract_decimals: 9,
          contract_name: 'Aave Interest bearing AMPL',
          contract_ticker_symbol: 'aAMPL',
          contract_address: '0x1e6bb68acec8fefbd87d192be09bb274170a0548',
          supports_erc: ['erc20'],
          logo_url:
            'https://www.covalenthq.com/static/images/safekeep/logos/aave/aAMPL.svg',
        },
        variable_borrow_apr: 7.5286665,
        stable_borrow_apr: 0.0,
        supply_apy: 6.7755585,
        lending_pool_contract: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        lending_pool_addresses_provider:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_addresses_provider_registry:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_collateral_manager:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_configurator: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_rate_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        price_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        pool_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        emergency_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        protocol_data_provider: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        weth_gateway: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        collector_contract: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
      },
      {
        underlying: {
          contract_decimals: 18,
          contract_name: 'Paxos Standard',
          contract_ticker_symbol: 'PAX',
          contract_address: '0x8e870d67f660d95d5be530380d0ec0bd388289e1',
          supports_erc: ['erc20'],
          logo_url:
            'https://logos.covalenthq.com/tokens/0x8e870d67f660d95d5be530380d0ec0bd388289e1.png',
          quote_rate: 1.0,
        },
        atoken: {
          contract_decimals: 18,
          contract_name: 'Aave Interest bearing PAX',
          contract_ticker_symbol: 'aPAX',
          contract_address: '0x2e8f4bdbe3d47d7d7de490437aea9915d930f1a3',
          supports_erc: ['erc20'],
          logo_url:
            'https://www.covalenthq.com/static/images/safekeep/logos/aave/aPAX.svg',
        },
        variable_borrow_apr: 0.1779724,
        stable_borrow_apr: 0.0,
        supply_apy: 0.14784095,
        lending_pool_contract: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        lending_pool_addresses_provider:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_addresses_provider_registry:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_collateral_manager:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_configurator: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_rate_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        price_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        pool_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        emergency_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        protocol_data_provider: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        weth_gateway: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        collector_contract: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
      },
      {
        underlying: {
          contract_decimals: 18,
          contract_name: 'DefiPulse Index',
          contract_ticker_symbol: 'DPI',
          contract_address: '0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b',
          supports_erc: ['erc20'],
          logo_url:
            'https://logos.covalenthq.com/tokens/0x1494ca1f11d487c2bbe4543e90080aeba4ba3c2b.png',
          quote_rate: 348.09,
        },
        atoken: {
          contract_decimals: 18,
          contract_name: 'Aave Interest bearing DPI',
          contract_ticker_symbol: 'aDPI',
          contract_address: '0x6f634c6135d2ebd550000ac92f494f9cb8183dae',
          supports_erc: ['erc20'],
          logo_url:
            'https://www.covalenthq.com/static/images/safekeep/logos/aave/aDPI.svg',
        },
        variable_borrow_apr: 0.0011458986,
        stable_borrow_apr: 0.0,
        supply_apy: 7.5033354e-6,
        lending_pool_contract: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        lending_pool_addresses_provider:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_addresses_provider_registry:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_collateral_manager:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_configurator: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_rate_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        price_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        pool_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        emergency_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        protocol_data_provider: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        weth_gateway: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        collector_contract: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
      },
      {
        underlying: {
          contract_decimals: 18,
          contract_name: 'Frax',
          contract_ticker_symbol: 'FRAX',
          contract_address: '0x853d955acef822db058eb8505911ed77f175b99e',
          supports_erc: ['erc20'],
          logo_url:
            'https://logos.covalenthq.com/tokens/0x853d955acef822db058eb8505911ed77f175b99e.png',
          quote_rate: 1.0,
        },
        atoken: {
          contract_decimals: 18,
          contract_name: 'Aave Interest bearing FRAX',
          contract_ticker_symbol: 'aFRAX',
          contract_address: '0xd4937682df3c8aef4fe912a96a74121c0829e664',
          supports_erc: ['erc20'],
          logo_url:
            'https://www.covalenthq.com/static/images/safekeep/logos/aave/aFRAX.svg',
        },
        variable_borrow_apr: 0.033218734,
        stable_borrow_apr: 0.0,
        supply_apy: 0.01765575,
        lending_pool_contract: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        lending_pool_addresses_provider:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_addresses_provider_registry:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_collateral_manager:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_configurator: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_rate_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        price_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        pool_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        emergency_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        protocol_data_provider: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        weth_gateway: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        collector_contract: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
      },
      {
        underlying: {
          contract_decimals: 18,
          contract_name: 'Fei USD',
          contract_ticker_symbol: 'FEI',
          contract_address: '0x956f47f50a910163d8bf957cf5846d573e7f87ca',
          supports_erc: ['erc20'],
          logo_url:
            'https://logos.covalenthq.com/tokens/0x956f47f50a910163d8bf957cf5846d573e7f87ca.png',
          quote_rate: 0.997598,
        },
        atoken: {
          contract_decimals: 18,
          contract_name: 'Aave Interest bearing FEI',
          contract_ticker_symbol: 'aFEI',
          contract_address: '0x683923db55fead99a79fa01a27eec3cb19679cc3',
          supports_erc: ['erc20'],
          logo_url:
            'https://www.covalenthq.com/static/images/safekeep/logos/aave/aFEI.svg',
        },
        variable_borrow_apr: 0.35754177,
        stable_borrow_apr: 0.33754176,
        supply_apy: 0.24699225,
        lending_pool_contract: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
        lending_pool_addresses_provider:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_addresses_provider_registry:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_collateral_manager:
          '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_pool_configurator: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        lending_rate_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        price_oracle: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        pool_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        emergency_admin: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        protocol_data_provider: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        weth_gateway: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
        collector_contract: '0xb53c1a33016b2dc2ff3653530bff1848a515c8c5',
      },
    ]
  }

  get polygonAssets() {
    return this._polygonAssets
  }

  // Todo: add params to only get current selected chain.
  async getData(): Promise<void> {
    this._ethereumAssets = await this._$store.dispatch('aave/getAaveAssets', {
      chainId: 1,
    })

    this._polygonAssets = await this._$store.dispatch('aave/getAaveAssets', {
      chainId: 137,
    })
  }

  /** Returns an alternate image url**/
  setAltImg(event: ErrorEvent) {
    return Helper.setAltImg(event)
  }
}
