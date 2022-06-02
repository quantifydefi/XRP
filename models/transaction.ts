import { LogEvent, TransactionItem } from '~/types/apollo/main/types'

export class Transactions implements TransactionItem {
  blockHeight!: number
  blockSignedAt!: string
  fromAddress!: string
  fromAddressLabel!: string
  fromAddressIsContract!: boolean
  fromAddressName!: string
  fromAddressSymbol!: string
  gasOffered!: number
  gasPrice!: number
  gasQuote!: number
  gasQuoteRate!: number
  gasSpent!: number
  logEvents!: LogEvent[]
  successful!: boolean
  toAddress!: string
  toAddressLabel!: string
  toAddressIsContract!: boolean
  toAddressName!: string
  toAddressSymbol!: string
  txHash!: string
  txOffset!: number
  value!: string
  valueQuote!: number

  get txnFee() {
    return (this.gasPrice / 10 ** 18) * this.gasSpent
  }
}
