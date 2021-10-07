/* eslint-disable camelcase */
export type ChainOptions = 1 | 56 | 137 | 250 | 43114

export interface BalanceDataInterface {
  readonly tokenAddress: string
  readonly tokenName: string
  readonly tokenSymbol: string
  readonly tokenBalance: number
  readonly tokenPrice: number
  readonly totalValue: number
  readonly chainId: number
}
