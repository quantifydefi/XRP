declare module '*/config.query.graphql' {
  import { DocumentNode } from 'graphql'
  const defaultDocument: DocumentNode
  export const AaveMarketsGQL: DocumentNode
  export const GasGQL: DocumentNode
  export const DeFiStats: DocumentNode
  export const RecentPricesGQL: DocumentNode
  export const ChainlinkEthUsdPriceGQL: DocumentNode

  export default defaultDocument
}

declare module '*/news.query.graphql' {
  import { DocumentNode } from 'graphql'
  const defaultDocument: DocumentNode
  export const NewsGQL: DocumentNode

  export default defaultDocument
}

declare module '*/pools.query.graphql' {
  import { DocumentNode } from 'graphql'
  const defaultDocument: DocumentNode
  export const AllProtocolsGQL: DocumentNode
  export const CurvePoolsGQL: DocumentNode
  export const AavePoolGQL: DocumentNode

  export default defaultDocument
}

declare module '*/portfolio.query.graphql' {
  import { DocumentNode } from 'graphql'
  const defaultDocument: DocumentNode
  export const BalancesGQL: DocumentNode
  export const ProtocolGQL: DocumentNode
  export const TransactionsGQL: DocumentNode
  export const TransactionLogEventsGQL: DocumentNode

  export default defaultDocument
}

declare module '*/token.query.graphql' {
  import { DocumentNode } from 'graphql'
  const defaultDocument: DocumentNode
  export const QCCoinGQL: DocumentNode
  export const PriceGQL: DocumentNode
  export const HighAndLowGQL: DocumentNode

  export default defaultDocument
}
