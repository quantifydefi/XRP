/* eslint-disable camelcase */
export type ChainOptions = 1 | 56 | 137 | 250 | 43114

export interface BalanceDataInterface {
  readonly contract_address: string // token address
  readonly contract_name: string // token name
  readonly contract_ticker_symbol: string // token symbol
  readonly balance: number // qty of token owned
  readonly logo_url: string // token icon
  readonly chain_id: ChainOptions
  readonly quote: number // total value of token
  readonly quote_rate: number // token price
}
