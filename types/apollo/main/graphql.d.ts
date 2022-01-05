
declare module '*/config.query.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const GlobalStatsQueryGQL: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/pools.query.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const AllProtocolsGQL: DocumentNode;
export const CurvePoolsGQL: DocumentNode;
export const AavePoolGQL: DocumentNode;
export const UsdPriceGQL: DocumentNode;

  export default defaultDocument;
}
    

declare module '*/portfolio.query.graphql' {
  import { DocumentNode } from 'graphql';
  const defaultDocument: DocumentNode;
  export const BalancesGQL: DocumentNode;
export const ProtocolGQL: DocumentNode;

  export default defaultDocument;
}
    