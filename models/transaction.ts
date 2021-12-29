/* eslint-disable camelcase */
import 'reflect-metadata'
import { Store } from 'vuex'

import { AdapterInterface, TransactionInterface, TransactionHistoryInterface } from '~/types/transactions'

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

export class TransactionData implements TransactionHistoryInterface {
  block_signed_at!: string
  block_height!: number
  tx_hash!: string
  tx_offset!: number
  successful!: boolean
  from_address!: string
  to_address!: string
  to_address_label!: string
  value!: string
  value_quote!: number
  gas_offered!: number
  gas_spent!: number
  gas_price!: number
  gas_quote!: number
  gas_quote_rate!: number
}

export class TransactionsHistory {
  loading = false
  chainId = 1
  address = ''

  private _$store: Store<any>
  private _data: TransactionData[] = []

  constructor(store: Store<any>, chainId: number, address: string) {
    this._$store = store
    this.chainId = chainId
    this.address = address
  }

  get cols() {
    return [
      {
        text: 'Block Signed At',
        align: 'start',
        value: 'block_signed_at',
        class: 'px-2',
      },
      {
        text: 'Status',
        align: 'start',
        value: 'successful',
        class: 'px-2 text-no-wrap',
      },
      {
        text: 'Txn Hash',
        align: 'start',
        value: 'tx_hash',
        class: 'px-2',
      },
      {
        text: 'From',
        align: 'start',
        value: 'from_address',
        class: 'px-2',
      },
      {
        text: 'To',
        align: 'start',
        value: 'to_address',
        class: 'px-2',
      },
      {
        text: 'Value',
        align: 'start',
        value: 'value',
        class: 'px-2',
      },
      {
        text: 'Amount',
        align: 'start',
        value: 'value_quote',
        class: 'px-2',
      },
      {
        text: 'Txn Fee',
        align: 'start',
        value: 'gas_quote',
        class: 'px-2',
      },
    ]
  }

  get data() {
    return this._data
  }

  async getData() {
    try {
      this.loading = true
      this._data = await this._$store.dispatch('wallet/getTransactionsHistory', {
        chainId: this.chainId,
        address: this.address,
      })
      this.loading = false
    } catch (error) {
      this._data = []
      // this._$root.$emit('notification', { text: 'Something Went Wrong' })
    }
  }
}
