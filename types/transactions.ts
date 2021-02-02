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
