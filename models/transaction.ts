/* eslint-disable camelcase */

import { AdapterInterface, TransactionInterface } from '~/types/transactions'

export class Trade implements TransactionInterface {
  input_token_id!: string
  input_token_name!: string
  input_token_quantity!: number
  input_token_symbol!: string
  output_token_id!: number
  output_token_name!: number
  output_token_quantity!: number
  output_token_symbol!: number
  timestamp!: number
  trade_value_usd!: number
  transaction_hash!: number
  transaction_type!: number
}

export class Adapter implements AdapterInterface {
  asset_address!: string
  asset_balance!: number
  asset_name!: string
  asset_symbol!: string
  balance_type!: string
  protocol_name!: string
}
