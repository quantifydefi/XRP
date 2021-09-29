/* eslint-disable camelcase */
export interface TransactionInterface {
  timestamp: number
  input_token_id: string
  input_token_name: string
  input_token_symbol: string
  input_token_quantity: number
  output_token_id: number
  output_token_name: number
  output_token_symbol: number
  output_token_quantity: number
  trade_value_usd: number
  transaction_hash: number
  transaction_type: number
}

export interface AdapterInterface {
  protocol_name: string
  asset_name: string
  asset_address: string
  asset_symbol: string
  asset_balance: number
  balance_type: string
}

/** Transaction Fields retrieved from Covalent API **/
export interface TransactionHistoryInterface {
  block_signed_at: string
  block_height: number
  tx_hash: string
  tx_offset: number
  successful: boolean
  from_address: string
  to_address: string
  to_address_label: string
  value: string
  value_quote: number
  gas_offered: number
  gas_spent: number
  gas_price: number
  gas_quote: number
  gas_quote_rate: number
}
