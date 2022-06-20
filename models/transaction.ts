import { LogEvent, TransactionItem } from '~/types/apollo/main/types'

export class Transactions implements TransactionItem {
  blockSignedAt!: string
  fromAddress!: string
  fromAddressIsContract!: boolean
  fromAddressName!: string
  fromAddressSymbol!: string
  gasPrice!: number
  gasSpent!: number
  gasQuote!: number
  logEvents!: LogEvent[]
  successful!: boolean
  toAddress!: string
  toAddressIsContract!: boolean
  toAddressName!: string
  toAddressSymbol!: string
  txHash!: string
  value!: string
  valueQuote!: number

  get txnFee() {
    return (this.gasPrice / 10 ** 18) * this.gasSpent
  }
}
