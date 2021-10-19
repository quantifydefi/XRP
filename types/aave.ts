/* eslint-disable camelcase */
export interface AaveBalanceDataInterface {
  balance: {
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

  supply_position: {
    supplied: string
    balance: number
    balance_quote: number
    apy: number
  }

  borrow_position: {
    borrowed: string
    balance: number
    balance_quote: number
    apr: number
  }
}

export interface AaveAssetDataInterface {
  underlying: {
    contract_decimals: number
    contract_name: string
    contract_ticker_symbol: string
    contract_address: string
    supports_erc: string[]
    logo_url: string
    quote_rate: number
  }
  atoken: {
    contract_decimals: number
    contract_name: string
    contract_ticker_symbol: string
    contract_address: string
    supports_erc: string[]
    logo_url: string
  }
  variable_borrow_apr: number
  stable_borrow_apr: number
  supply_apy: number
  lending_pool_contract: string
  lending_pool_addresses_provider: string
  lending_pool_addresses_provider_registry: string
  lending_pool_collateral_manager: string
  lending_pool_configurator: string
  lending_rate_oracle: string
  price_oracle: string
  pool_admin: string
  emergency_admin: string
  protocol_data_provider: string
  weth_gateway: string
  collector_contract: string
}
