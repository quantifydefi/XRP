/* eslint-disable camelcase */
export interface BalanceDataInterface {
  readonly tokenAddress: string
  readonly tokenName: string
  readonly tokenSymbol: string
  readonly tokenBalance: number | string
  readonly tokenPrice: number
  readonly totalValue: number
  readonly chainId: number
  readonly networkName: string
}

export type ChainOptions = 1 | 56 | 137 | 250 | 43114
