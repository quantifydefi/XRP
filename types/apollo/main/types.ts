export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSONMap: any;
  Map: any;
};

export type AaveAddress = {
  __typename?: 'AaveAddress';
  aTokenAddress: Scalars['String'];
  aTokenSymbol: Scalars['String'];
  address: Scalars['String'];
  decimals: Scalars['Int'];
  stableDebtTokenAddress: Scalars['String'];
  symbol: Scalars['String'];
  variableDebtTokenAddress: Scalars['String'];
};

export type AavePool = {
  __typename?: 'AavePool';
  aEmissionPerSecond: Scalars['Float'];
  addresses: AaveAddress;
  availableLiquidity: Scalars['Float'];
  baseLTVasCollateral: Scalars['Float'];
  borrowingEnabled: Scalars['Boolean'];
  decimals: Scalars['Int'];
  id: Scalars['String'];
  liquidityRate: Scalars['Float'];
  name: Scalars['String'];
  portfolioVal: AavePortfolio;
  price: AavePoolPrice;
  reserveLiquidationBonus: Scalars['Float'];
  reserveLiquidationThreshold: Scalars['Float'];
  sEmissionPerSecond: Scalars['Float'];
  stableBorrowRate: Scalars['Float'];
  stableBorrowRateEnabled: Scalars['Boolean'];
  symbol: Scalars['String'];
  totalATokenSupply: Scalars['Float'];
  totalCurrentVariableDebt: Scalars['Float'];
  totalLiquidity: Scalars['Float'];
  totalLiquidityAsCollateral: Scalars['Float'];
  totalPrincipalStableDebt: Scalars['Float'];
  underlyingAsset: Scalars['String'];
  usageAsCollateralEnabled: Scalars['Boolean'];
  utilizationRate: Scalars['Float'];
  vEmissionPerSecond: Scalars['Float'];
  variableBorrowRate: Scalars['Float'];
};

export type AavePoolPrice = {
  __typename?: 'AavePoolPrice';
  id: Scalars['String'];
  priceInEth: Scalars['Float'];
  priceUsd: Scalars['Float'];
};

export type AavePortfolio = {
  __typename?: 'AavePortfolio';
  stableBorrow: Scalars['Float'];
  symbol: Scalars['String'];
  totalDeposits: Scalars['Float'];
  variableBorrow: Scalars['Float'];
  walletBal: Scalars['Float'];
};

export type Balance = {
  __typename?: 'Balance';
  aavePools: Array<AavePool>;
  address: Scalars['String'];
  chainId: Scalars['Float'];
  items: Array<BalanceItem>;
  nextUpdateAt: Scalars['String'];
  pagination?: Maybe<Pagination>;
  quoteCurrency: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type BalanceItem = {
  __typename?: 'BalanceItem';
  balance: Scalars['Float'];
  balance24h: Scalars['Float'];
  contractAddress: Scalars['String'];
  contractDecimals: Scalars['Float'];
  contractName: Scalars['String'];
  contractTickerSymbol: Scalars['String'];
  lastTransferredAt: Scalars['String'];
  nftData: Scalars['Float'];
  quote: Scalars['Float'];
  quote24h: Scalars['Float'];
  quoteRate: Scalars['Float'];
  quoteRate24h: Scalars['Float'];
  supportsErc?: Maybe<Array<Scalars['String']>>;
  type: Scalars['String'];
};

export type Chain = {
  __typename?: 'Chain';
  blockExplorerUrl: Scalars['String'];
  chainId: Scalars['Int'];
  geckoId: Scalars['String'];
  isTestNet: Scalars['Boolean'];
  label: Scalars['String'];
  logoUrl: Scalars['String'];
  name: Scalars['String'];
  rpcUrl: Scalars['String'];
  symbol: Scalars['String'];
};

export type DailyChart = {
  __typename?: 'DailyChart';
  date: Scalars['Int'];
  priceUsd: Scalars['Float'];
};

export type EthGasStatsResult = {
  __typename?: 'EthGasStatsResult';
  fastGasPrice: Scalars['Float'];
  gasUsedRatio: Scalars['String'];
  lastBlock: Scalars['Int'];
  proposeGasPrice: Scalars['Float'];
  safeGasPrice: Scalars['Float'];
  suggestBaseFee: Scalars['Float'];
};

export type GasStats = {
  __typename?: 'GasStats';
  blockExplorer: Scalars['String'];
  gas: EthGasStatsResult;
  name: Scalars['String'];
  symbol: Scalars['String'];
};

export type GlobalStats = {
  __typename?: 'GlobalStats';
  defiDominance: Scalars['Float'];
  defiMarketCap: Scalars['Float'];
  defiToEthRatio: Scalars['Float'];
  ethMarketCap: Scalars['Float'];
  topCoinDefiDominance: Scalars['Float'];
  topCoinName: Scalars['String'];
  tradingVolume24h: Scalars['Float'];
};

export type HighAndLow = {
  __typename?: 'HighAndLow';
  high: Scalars['Float'];
  interval: Scalars['String'];
  low: Scalars['Float'];
  unixTime: Scalars['Int'];
};

export type LogEvent = {
  __typename?: 'LogEvent';
  decoded: LogEventDecoded;
  logOffset: Scalars['Int'];
  senderAddress: Scalars['String'];
  senderContractDecimals: Scalars['Int'];
  senderContractTickerSymbol: Scalars['String'];
  senderLogoUrl: Scalars['String'];
  senderName: Scalars['String'];
  txHash: Scalars['String'];
};

export type LogEventDecoded = {
  __typename?: 'LogEventDecoded';
  name: Scalars['String'];
  params: Array<Maybe<LogEventParams>>;
  signature: Scalars['String'];
};

export type LogEventParams = {
  __typename?: 'LogEventParams';
  decoded: Scalars['Boolean'];
  name: Scalars['String'];
  type: Scalars['String'];
  value: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo: Todo;
};


export type MutationCreateTodoArgs = {
  input: NewTodo;
};

export type NewTodo = {
  text: Scalars['String'];
  userId: Scalars['String'];
};

/**
 * Returns news by coin symbol
 * https://cryptopanic.com/api/v1/posts/?auth_token=API_KEY&currencies=COIN_SYMBOL
 */
export type News = {
  __typename?: 'News';
  currencies: Array<NewsCurrency>;
  id: Scalars['Int'];
  publishedAt: Scalars['String'];
  title: Scalars['String'];
  url: Scalars['String'];
};

export type NewsCurrency = {
  __typename?: 'NewsCurrency';
  code: Scalars['String'];
  slug: Scalars['String'];
  title: Scalars['String'];
  url: Scalars['String'];
};

export type Pagination = {
  __typename?: 'Pagination';
  hasMore?: Maybe<Scalars['Boolean']>;
  pageNumber?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type Price = {
  __typename?: 'Price';
  dataSource: Scalars['String'];
  priceEth: Scalars['Float'];
  priceUsd: Scalars['Float'];
  qcKey: Scalars['String'];
  symbolName: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Aave Addresses  */
  aaveAddresses: Array<AaveAddress>;
  /** Aave Pool  */
  aavePools: Array<AavePool>;
  /** Portfolio Balances */
  balances: Array<Balance>;
  chains: Array<Chain>;
  dailyChart: Array<DailyChart>;
  /** Gas Stats for ETH */
  gas: Array<GasStats>;
  /** Global Staths for Coin Gaico */
  globalStats: GlobalStats;
  /** Recent Usd Prices  */
  recentPrices: Scalars['Map'];
  todos: Array<Todo>;
  token: Token;
  /** Portfolio Transactions */
  transactions: Transaction;
};


export type QueryAaveAddressesArgs = {
  chainId: Scalars['Int'];
};


export type QueryAavePoolsArgs = {
  chainId: Scalars['Int'];
};


export type QueryBalancesArgs = {
  address: Scalars['String'];
  chainIds: Array<Scalars['Int']>;
};


export type QueryDailyChartArgs = {
  coinGeckoID?: Scalars['String'];
};


export type QueryTokenArgs = {
  chainId?: Scalars['Int'];
  contractAddress?: Scalars['String'];
  decimals?: Scalars['Int'];
  interval?: TimeInterval;
  qcKey: Scalars['String'];
  walletAddress?: Scalars['String'];
};


export type QueryTransactionsArgs = {
  address: Scalars['String'];
  chainId?: Scalars['Int'];
  pageNumber?: Scalars['Int'];
  pageSize?: Scalars['Int'];
};

export enum TimeInterval {
  Interval_1H = 'INTERVAL_1H',
  Interval_1Week = 'INTERVAL_1WEEK',
  Interval_2H = 'INTERVAL_2H',
  Interval_4H = 'INTERVAL_4H',
  Interval_5Min = 'INTERVAL_5MIN',
  Interval_15Min = 'INTERVAL_15MIN',
  Interval_24H = 'INTERVAL_24H',
  Interval_30Min = 'INTERVAL_30MIN'
}

export type Todo = {
  __typename?: 'Todo';
  done: Scalars['Boolean'];
  id: Scalars['ID'];
  text: Scalars['String'];
  user: User;
};

export type Token = {
  __typename?: 'Token';
  ID?: Maybe<Scalars['ID']>;
  aavePools: Array<AavePool>;
  aaveSymbol: Scalars['String'];
  balances: Array<Balance>;
  bitbucketRepos?: Maybe<Scalars['JSONMap']>;
  chainId: Scalars['Int'];
  circulatingSupply: Scalars['Float'];
  coinDescription: Scalars['String'];
  coinGeckoID: Scalars['String'];
  contractAddress: Scalars['String'];
  decimals: Scalars['Int'];
  discordChannelId: Scalars['String'];
  explorerUrls?: Maybe<Scalars['JSONMap']>;
  facebookUrl: Scalars['String'];
  githubRepos?: Maybe<Scalars['JSONMap']>;
  interval: TimeInterval;
  isAaveToken: Scalars['Boolean'];
  isQCToken: Scalars['Boolean'];
  marketcap: Scalars['Float'];
  news: Array<News>;
  price: Price;
  price24h: Scalars['Float'];
  qcKey: Scalars['String'];
  rank: Scalars['Int'];
  resistance1h: Scalars['Float'];
  safeScore: Scalars['Float'];
  subredditUrl: Scalars['String'];
  support1h: Scalars['Float'];
  symbolName: Scalars['String'];
  telegramChannelId: Scalars['String'];
  tokenInterval: HighAndLow;
  twitterUrl: Scalars['String'];
  volume24h: Scalars['Float'];
  walletAddress: Scalars['String'];
  websiteUrl?: Maybe<Scalars['JSONMap']>;
};

export type Transaction = {
  __typename?: 'Transaction';
  address: Scalars['String'];
  chainID: Scalars['Float'];
  items: Array<TransactionItem>;
  nextUpdateAt: Scalars['String'];
  pagination?: Maybe<Pagination>;
  quoteCurrency: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type TransactionItem = {
  __typename?: 'TransactionItem';
  blockSignedAt: Scalars['String'];
  fromAddress: Scalars['String'];
  fromAddressIsContract: Scalars['Boolean'];
  fromAddressName: Scalars['String'];
  fromAddressSymbol: Scalars['String'];
  gasPrice: Scalars['Float'];
  gasQuote: Scalars['Float'];
  gasSpent: Scalars['Float'];
  logEvents?: Maybe<Array<LogEvent>>;
  successful: Scalars['Boolean'];
  toAddress: Scalars['String'];
  toAddressIsContract: Scalars['Boolean'];
  toAddressName: Scalars['String'];
  toAddressSymbol: Scalars['String'];
  txDetails?: Maybe<Array<TxDetail>>;
  txHash: Scalars['String'];
  value: Scalars['String'];
  valueQuote: Scalars['Float'];
};

export type TxDetail = {
  __typename?: 'TxDetail';
  fromAddress: Scalars['String'];
  method: Scalars['String'];
  priceUSD: Scalars['Float'];
  toAddress: Scalars['String'];
  tokenAddress: Scalars['String'];
  tokenContractDecimals: Scalars['Int'];
  tokenContractSymbol: Scalars['String'];
  tokenLogoUrl: Scalars['String'];
  tokenSymbolName: Scalars['String'];
  value: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type SupportedChainsGqlQueryVariables = Exact<{ [key: string]: never; }>;


export type SupportedChainsGqlQuery = { __typename?: 'Query', chains: Array<{ __typename?: 'Chain', chainId: number, name: string, geckoId: string, symbol: string, label: string, logoUrl: string, isTestNet: boolean, rpcUrl: string, blockExplorerUrl: string }> };

export type GasGqlQueryVariables = Exact<{ [key: string]: never; }>;


export type GasGqlQuery = { __typename?: 'Query', gas: Array<{ __typename?: 'GasStats', symbol: string, blockExplorer: string, name: string, gas: { __typename?: 'EthGasStatsResult', lastBlock: number, safeGasPrice: number, proposeGasPrice: number, fastGasPrice: number, suggestBaseFee: number } }> };

export type DeFiStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type DeFiStatsQuery = { __typename?: 'Query', globalStats: { __typename?: 'GlobalStats', defiMarketCap: number, ethMarketCap: number, defiToEthRatio: number, tradingVolume24h: number, defiDominance: number, topCoinName: string, topCoinDefiDominance: number } };

export type RecentPricesGqlQueryVariables = Exact<{ [key: string]: never; }>;


export type RecentPricesGqlQuery = { __typename?: 'Query', recentPrices: any };

export type AavePoolGqlQueryVariables = Exact<{
  chainId: Scalars['Int'];
}>;


export type AavePoolGqlQuery = { __typename?: 'Query', aavePools: Array<{ __typename?: 'AavePool', id: string, underlyingAsset: string, name: string, symbol: string, decimals: number, totalLiquidity: number, liquidityRate: number, stableBorrowRate: number, variableBorrowRate: number, aEmissionPerSecond: number, vEmissionPerSecond: number, sEmissionPerSecond: number, availableLiquidity: number, utilizationRate: number, totalATokenSupply: number, totalCurrentVariableDebt: number, totalPrincipalStableDebt: number, totalLiquidityAsCollateral: number, baseLTVasCollateral: number, reserveLiquidationThreshold: number, reserveLiquidationBonus: number, usageAsCollateralEnabled: boolean, borrowingEnabled: boolean, stableBorrowRateEnabled: boolean, price: { __typename?: 'AavePoolPrice', id: string, priceInEth: number, priceUsd: number }, addresses: { __typename?: 'AaveAddress', aTokenAddress: string, aTokenSymbol: string, stableDebtTokenAddress: string, variableDebtTokenAddress: string, decimals: number, address: string, symbol: string }, portfolioVal: { __typename?: 'AavePortfolio', totalDeposits: number, walletBal: number, stableBorrow: number, variableBorrow: number } }> };

export type BalancesGqlQueryVariables = Exact<{
  chainIds: Array<Scalars['Int']> | Scalars['Int'];
  address: Scalars['String'];
}>;


export type BalancesGqlQuery = { __typename?: 'Query', balances: Array<{ __typename?: 'Balance', address: string, updatedAt: string, nextUpdateAt: string, quoteCurrency: string, chainId: number, pagination?: { __typename?: 'Pagination', hasMore?: boolean | null } | null, items: Array<{ __typename?: 'BalanceItem', contractDecimals: number, contractName: string, contractTickerSymbol: string, contractAddress: string, supportsErc?: Array<string> | null, lastTransferredAt: string, type: string, balance: number, balance24h: number, quoteRate: number, quoteRate24h: number, quote: number, quote24h: number, nftData: number }>, aavePools: Array<{ __typename?: 'AavePool', symbol: string, id: string, name: string, liquidityRate: number, borrowingEnabled: boolean, stableBorrowRateEnabled: boolean, stableBorrowRate: number, variableBorrowRate: number, portfolioVal: { __typename?: 'AavePortfolio', totalDeposits: number, walletBal: number, stableBorrow: number, variableBorrow: number }, price: { __typename?: 'AavePoolPrice', id: string, priceInEth: number, priceUsd: number }, addresses: { __typename?: 'AaveAddress', address: string, decimals: number } }> }> };

export type TransactionsGqlQueryVariables = Exact<{
  chainId: Scalars['Int'];
  address: Scalars['String'];
  pageNumber: Scalars['Int'];
  pageSize: Scalars['Int'];
}>;


export type TransactionsGqlQuery = { __typename?: 'Query', transactions: { __typename?: 'Transaction', pagination?: { __typename?: 'Pagination', hasMore?: boolean | null, pageSize?: number | null, pageNumber?: number | null } | null, items: Array<{ __typename?: 'TransactionItem', blockSignedAt: string, txHash: string, successful: boolean, fromAddress: string, fromAddressName: string, fromAddressSymbol: string, fromAddressIsContract: boolean, toAddress: string, toAddressName: string, toAddressIsContract: boolean, toAddressSymbol: string, value: string, valueQuote: number, gasQuote: number, gasPrice: number, gasSpent: number, txDetails?: Array<{ __typename?: 'TxDetail', fromAddress: string, toAddress: string, value: string, tokenSymbolName: string, tokenContractSymbol: string, tokenContractDecimals: number, tokenAddress: string, tokenLogoUrl: string, priceUSD: number }> | null, logEvents?: Array<{ __typename?: 'LogEvent', logOffset: number, txHash: string, senderContractDecimals: number, senderName: string, senderContractTickerSymbol: string, senderAddress: string, senderLogoUrl: string, decoded: { __typename?: 'LogEventDecoded', name: string, signature: string, params: Array<{ __typename?: 'LogEventParams', name: string, type: string, decoded: boolean, value: string } | null> } }> | null }> } };

export type TokenQueryGqlQueryVariables = Exact<{
  qcKey: Scalars['String'];
  walletAddress: Scalars['String'];
  interval: TimeInterval;
  contractAddress: Scalars['String'];
  chainId: Scalars['Int'];
  decimals: Scalars['Int'];
}>;


export type TokenQueryGqlQuery = { __typename?: 'Query', token: { __typename?: 'Token', ID?: string | null, walletAddress: string, interval: TimeInterval, qcKey: string, aaveSymbol: string, isAaveToken: boolean, isQCToken: boolean, coinGeckoID: string, symbolName: string, rank: number, chainId: number, price24h: number, marketcap: number, volume24h: number, circulatingSupply: number, support1h: number, resistance1h: number, safeScore: number, websiteUrl?: any | null, bitbucketRepos?: any | null, githubRepos?: any | null, explorerUrls?: any | null, telegramChannelId: string, twitterUrl: string, subredditUrl: string, facebookUrl: string, coinDescription: string, tokenInterval: { __typename?: 'HighAndLow', high: number, low: number, interval: string, unixTime: number }, price: { __typename?: 'Price', qcKey: string, symbolName: string, priceUsd: number, priceEth: number }, news: Array<{ __typename?: 'News', id: number, title: string, url: string, publishedAt: string, currencies: Array<{ __typename?: 'NewsCurrency', code: string, title: string, slug: string, url: string }> }>, balances: Array<{ __typename?: 'Balance', chainId: number, items: Array<{ __typename?: 'BalanceItem', balance: number }> }> } };

export type DailyChartGqlQueryVariables = Exact<{
  coinGeckoID: Scalars['String'];
}>;


export type DailyChartGqlQuery = { __typename?: 'Query', dailyChart: Array<{ __typename?: 'DailyChart', date: number, priceUsd: number }> };
