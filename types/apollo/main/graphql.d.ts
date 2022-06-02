
declare module '*/config.query.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const AaveMarketsGQL: DocumentNode;
export const GasGQL: DocumentNode;
export const DeFiStats: DocumentNode;
export const RecentPricesGQL: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/pools.query.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const AavePoolGQL: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/portfolio.query.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const BalancesGQL: DocumentNode;

  export default defaultDocument;
}
    