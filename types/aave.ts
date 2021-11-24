/* eslint-disable camelcase */
export interface AaveBalanceDataInterface {
  underlying: {
    contract_decimals: number
    contract_symbol: string
    contract_address: string
    logo_url: string
    available_balance: number
    quote_rate: number
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
    contract_symbol: string
    contract_address: string
    logo_url: string
    available_balance: number
    quote_rate: number
  }
  variable_borrow_apr: number
  stable_borrow_apr: number
  supply_apy: number
}
