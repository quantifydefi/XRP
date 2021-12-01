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
  Map: any;
};

export type Query = {
  __typename?: 'Query';
  /** Covalent Balances */
  balances: Array<Balance>;
  /** Covalent Chains */
  chains: Array<Chain>;
  /** Coin Gaico Coin Details */
  coinDetails: CoinDetails;
  /** Coin Gaico Coin List */
  coinList: Array<Maybe<CoinList>>;
  /** Gas Stats for ETH */
  gasStats: EthGasStats;
  /** Global Staths for Coin Gaico */
  globalStats: GlobalStats;
  protocol: ProtocolDetails;
  protocols: Array<Protocol>;
  supportedTokens: Array<Token>;
  ticker: Ticker;
  todos: Array<Todo>;
  tokenPair: UniswapBalance;
  tokenResources: Array<Scalars['String']>;
  /** Covalent Balances */
  transactions?: Maybe<Transactions>;
  uniswapBalances: Array<UniswapBalance>;
  uniswapChart: Array<UniswapChart>;
};


export type QueryBalancesArgs = {
  address: Scalars['String'];
  chainIds: Array<Scalars['String']>;
};


export type QueryCoinDetailsArgs = {
  coinId: Scalars['String'];
};


export type QueryProtocolArgs = {
  slug: Scalars['String'];
};


export type QuerySupportedTokensArgs = {
  resource: Array<Scalars['String']>;
};


export type QueryTickerArgs = {
  product?: InputMaybe<Scalars['String']>;
};


export type QueryTokenPairArgs = {
  poolId: Scalars['String'];
};


export type QueryTransactionsArgs = {
  address: Scalars['String'];
  chainId: Scalars['String'];
  pageNumber: Scalars['String'];
  pageSize: Scalars['String'];
};


export type QueryUniswapBalancesArgs = {
  numberOfTokens?: InputMaybe<Scalars['Int']>;
};


export type QueryUniswapChartArgs = {
  interval: ChartIntervals;
  poolId: Scalars['String'];
};

/**
 * Covalent Get Balances for address
 * https://www.covalenthq.com/docs/api/#/0/Class-A/Get-all-chain-statuses/lng=en
 */
export type Balance = {
  __typename?: 'Balance';
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
  balance: Scalars['String'];
  balance24h: Scalars['String'];
  contractAddress: Scalars['String'];
  contractDecimals: Scalars['Float'];
  contractName: Scalars['String'];
  contractTickerSymbol: Scalars['String'];
  lastTransferredAt: Scalars['String'];
  logoUrl: Scalars['String'];
  nftData: Scalars['Float'];
  quote: Scalars['Float'];
  quote24h: Scalars['Float'];
  quoteRate: Scalars['Float'];
  quoteRate24h: Scalars['Float'];
  supportsErc?: Maybe<Array<Scalars['String']>>;
  type: Scalars['String'];
};

export type Pagination = {
  __typename?: 'Pagination';
  hasMore?: Maybe<Scalars['Boolean']>;
  pageNumber?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

/**
 * Covalent get al Chains
 * https://www.covalenthq.com/docs/api/#/0/Class-A/Get-all-chain-statuses/lng=en
 */
export type Chain = {
  __typename?: 'Chain';
  chainId: Scalars['String'];
  dbSchemaName: Scalars['String'];
  isTestnet: Scalars['Boolean'];
  label: Scalars['String'];
  logoUrl: Scalars['String'];
  name: Scalars['String'];
};

/**
 * Coin Gaico Coin Details
 * https://api.coingecko.com/api/v3/coins/list?include_platform=true
 */
export type CoinDetails = {
  __typename?: 'CoinDetails';
  additional_notices?: Maybe<Array<Maybe<Scalars['String']>>>;
  assetPlatformId?: Maybe<Scalars['String']>;
  blockTimeInMinutes?: Maybe<Scalars['Float']>;
  categories?: Maybe<Array<Maybe<Scalars['String']>>>;
  coingeckoRank?: Maybe<Scalars['Float']>;
  coingeckoScore?: Maybe<Scalars['Float']>;
  communityData?: Maybe<Scalars['Map']>;
  communityScore?: Maybe<Scalars['Float']>;
  contractAddress?: Maybe<Scalars['String']>;
  countryOrigin?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['Map']>;
  developerData?: Maybe<Scalars['Map']>;
  developerScore?: Maybe<Scalars['Float']>;
  genesisDate?: Maybe<Scalars['String']>;
  hashingAlgorithm?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  image?: Maybe<Scalars['Map']>;
  lastUpdated?: Maybe<Scalars['String']>;
  links?: Maybe<Scalars['Map']>;
  liquidityScore?: Maybe<Scalars['Float']>;
  localization?: Maybe<Scalars['Map']>;
  marketCapRank?: Maybe<Scalars['Float']>;
  marketData?: Maybe<MarketData>;
  name?: Maybe<Scalars['String']>;
  platforms?: Maybe<Scalars['Map']>;
  publicInterestScore?: Maybe<Scalars['Float']>;
  publicInterestStats?: Maybe<Scalars['Map']>;
  publicNotice?: Maybe<Scalars['String']>;
  sentimentVotesDownPercentage?: Maybe<Scalars['Float']>;
  sentimentVotesUpPercentage?: Maybe<Scalars['Float']>;
  statusUpdates?: Maybe<Array<Maybe<Scalars['Map']>>>;
  symbol?: Maybe<Scalars['String']>;
  tickers?: Maybe<Array<Maybe<TickerData>>>;
};

export type MarketData = {
  __typename?: 'MarketData';
  ath?: Maybe<Scalars['Map']>;
  athChangePercentage?: Maybe<Scalars['Map']>;
  athDate?: Maybe<Scalars['Map']>;
  atl?: Maybe<Scalars['Map']>;
  atlChangePercentage?: Maybe<Scalars['Map']>;
  atlDate?: Maybe<Scalars['Map']>;
  circulatingSupply?: Maybe<Scalars['Float']>;
  currentPrice?: Maybe<Scalars['Map']>;
  fdvToTvlRatio?: Maybe<Scalars['Float']>;
  fullyDilutedValuation?: Maybe<Scalars['Map']>;
  high24h?: Maybe<Scalars['Map']>;
  lastUpdated?: Maybe<Scalars['String']>;
  low24h?: Maybe<Scalars['Map']>;
  marketCap?: Maybe<Scalars['Map']>;
  marketCapChange24h?: Maybe<Scalars['Float']>;
  marketCapChange24hInCurrency?: Maybe<Scalars['Map']>;
  marketCapChangePercentage24h?: Maybe<Scalars['Float']>;
  marketCapChangePercentage24hInCurrency?: Maybe<Scalars['Map']>;
  marketCapRank?: Maybe<Scalars['Float']>;
  maxSupply?: Maybe<Scalars['Float']>;
  mcapToTvlRatio?: Maybe<Scalars['Float']>;
  priceChange24h?: Maybe<Scalars['Float']>;
  priceChange24hInCurrency?: Maybe<Scalars['Map']>;
  priceChangePercentage14d?: Maybe<Scalars['Float']>;
  priceChangePercentage14dInCurrency?: Maybe<Scalars['Map']>;
  priceChangePercentage1hInCurrency?: Maybe<Scalars['Map']>;
  priceChangePercentage1y?: Maybe<Scalars['Float']>;
  priceChangePercentage1yInCurrency?: Maybe<Scalars['Map']>;
  priceChangePercentage200d?: Maybe<Scalars['Float']>;
  priceChangePercentage200dInCurrency?: Maybe<Scalars['Map']>;
  priceChangePercentage24h?: Maybe<Scalars['Float']>;
  priceChangePercentage24hInCurrency?: Maybe<Scalars['Map']>;
  priceChangePercentage30d?: Maybe<Scalars['Float']>;
  priceChangePercentage30dInCurrency?: Maybe<Scalars['Map']>;
  priceChangePercentage60d?: Maybe<Scalars['Float']>;
  priceChangePercentage60dInCurrency?: Maybe<Scalars['Map']>;
  priceChangePercentage7d?: Maybe<Scalars['Float']>;
  priceChangePercentage7dInCurrency?: Maybe<Scalars['Map']>;
  roi?: Maybe<Scalars['Map']>;
  sparkline7d?: Maybe<Scalars['Map']>;
  totalSupply?: Maybe<Scalars['Float']>;
  totalValueLocked?: Maybe<Scalars['Map']>;
  totalVolume?: Maybe<Scalars['Map']>;
};

export type TickerData = {
  __typename?: 'TickerData';
  base?: Maybe<Scalars['String']>;
  bidAskSpreadPercentage?: Maybe<Scalars['Float']>;
  coinId?: Maybe<Scalars['String']>;
  convertedLast?: Maybe<Scalars['Map']>;
  convertedVolume?: Maybe<Scalars['Map']>;
  isAnomaly?: Maybe<Scalars['Boolean']>;
  isStale?: Maybe<Scalars['Boolean']>;
  last?: Maybe<Scalars['Float']>;
  lastFetchAt?: Maybe<Scalars['String']>;
  lastTradedAt?: Maybe<Scalars['String']>;
  market?: Maybe<Scalars['Map']>;
  target?: Maybe<Scalars['String']>;
  targetCoinId?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['String']>;
  tokenInfoUrl?: Maybe<Scalars['String']>;
  tradeUrl?: Maybe<Scalars['String']>;
  trustScore?: Maybe<Scalars['String']>;
  volume?: Maybe<Scalars['Float']>;
};

/**
 * Coin Gaico coin List
 * https://api.coingecko.com/api/v3/coins/list?include_platform=true
 */
export type CoinList = {
  __typename?: 'CoinList';
  id: Scalars['String'];
  name: Scalars['String'];
  platforms?: Maybe<Scalars['Map']>;
  symbol: Scalars['String'];
};

export type EthGasStats = {
  __typename?: 'EthGasStats';
  fastGasPrice: Scalars['String'];
  gasUsedRatio: Scalars['String'];
  lastBlock: Scalars['String'];
  proposeGasPrice: Scalars['String'];
  safeGasPrice: Scalars['String'];
  suggestBaseFee: Scalars['String'];
};

export type GlobalStats = {
  __typename?: 'GlobalStats';
  defiDominance: Scalars['String'];
  defiMarketCap: Scalars['String'];
  defiToEthRatio: Scalars['String'];
  ethMarketCap: Scalars['String'];
  topCoinDefiDominance: Scalars['Float'];
  topCoinName: Scalars['String'];
  tradingVolume24h: Scalars['String'];
};

/**
 * DeFi Lama Protocol by slug
 * Returns historical data on the TVL of a protocol along with
 * some basic data on it. The fields `tokensInUsd` and `tokens`
 * are only available for some protocols.
 * https://docs.llama.fi/api
 */
export type ProtocolDetails = {
  __typename?: 'ProtocolDetails';
  address: Scalars['String'];
  auditLinks: Array<Scalars['String']>;
  auditNote: Scalars['String'];
  audits: Scalars['String'];
  category: Scalars['String'];
  chain: Scalars['String'];
  chains: Array<Scalars['String']>;
  chainTvls: Scalars['Map'];
  cmcId: Scalars['Int'];
  description: Scalars['String'];
  geckoId: Scalars['String'];
  id: Scalars['ID'];
  logo: Scalars['String'];
  misrepresentedTokens: Scalars['Boolean'];
  module: Scalars['String'];
  name: Scalars['String'];
  oracles: Array<Scalars['String']>;
  symbol: Scalars['String'];
  tvl?: Maybe<Array<Maybe<Scalars['Map']>>>;
  twitter: Scalars['String'];
  url: Scalars['String'];
};

/**
 * DeFi Lama Protocols
 * Returns basic information on all listed protocols, their
 * current TVL and the changes to it in the last hour/day/week.
 * https://docs.llama.fi/api
 */
export type Protocol = {
  __typename?: 'Protocol';
  address: Scalars['String'];
  auditNote: Scalars['String'];
  audits: Scalars['String'];
  category: Scalars['String'];
  chain: Scalars['String'];
  chains: Array<Scalars['String']>;
  chainTvls?: Maybe<Scalars['Map']>;
  change_1d: Scalars['Float'];
  change_1h: Scalars['Float'];
  change_7d: Scalars['Float'];
  cmcId: Scalars['Int'];
  description: Scalars['String'];
  fdv: Scalars['Float'];
  geckoId: Scalars['String'];
  id: Scalars['ID'];
  logo: Scalars['String'];
  mcap: Scalars['Float'];
  module: Scalars['String'];
  name: Scalars['String'];
  oracles: Array<Scalars['String']>;
  slug: Scalars['String'];
  symbol: Scalars['String'];
  tvl: Scalars['Float'];
  twitter: Scalars['String'];
  url: Scalars['String'];
};

export type Token = {
  __typename?: 'Token';
  address: Scalars['String'];
  chainId: Scalars['Float'];
  decimals: Scalars['Float'];
  ID: Scalars['ID'];
  logoURI: Scalars['String'];
  name: Scalars['String'];
  source: Scalars['String'];
  symbol: Scalars['String'];
};

export type Ticker = {
  __typename?: 'Ticker';
  ID: Scalars['String'];
  price: Scalars['Float'];
  time: Scalars['Int'];
  volume: Scalars['Float'];
};

export type Todo = {
  __typename?: 'Todo';
  done: Scalars['Boolean'];
  id: Scalars['ID'];
  text: Scalars['String'];
  user: User;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type UniswapBalance = {
  __typename?: 'UniswapBalance';
  createdAtTimestamp: Scalars['Float'];
  ethPriceUsd: Scalars['Float'];
  excludePair: Scalars['Boolean'];
  liquidityProviderCount: Scalars['Int'];
  percentChangeLiq1h: Scalars['Float'];
  percentChangeLiq24h: Scalars['Float'];
  /** Pool ID from Uniswap */
  poolId: Scalars['String'];
  quoteAsset: Scalars['String'];
  quoteCurrency: Scalars['String'];
  reserveEth: Scalars['Float'];
  reserveIndex: Scalars['Float'];
  /** Token 0 ID from Uniswap */
  token0Id: Scalars['String'];
  token0Name: Scalars['String'];
  token0PercentChange1h: Scalars['Float'];
  token0PercentChange24h: Scalars['Float'];
  token0Price: Scalars['Float'];
  token0PriceUsd: Scalars['Float'];
  token0Symbol: Scalars['String'];
  token1Id: Scalars['String'];
  token1Name: Scalars['String'];
  token1PercentChange1h: Scalars['Float'];
  token1PercentChange24h: Scalars['Float'];
  token1Price: Scalars['Float'];
  token1PriceUsd: Scalars['Float'];
  token1Symbol: Scalars['String'];
  txCount: Scalars['Int'];
  volumeUsd: Scalars['Float'];
};

/**
 * Covalent Get Transactions for address
 * https://www.covalenthq.com/docs/api/#/0/Class-A/Get-all-chain-statuses/lng=en
 */
export type Transactions = {
  __typename?: 'Transactions';
  address: Scalars['String'];
  chainId: Scalars['Float'];
  items?: Maybe<Array<TransactionItem>>;
  nextUpdateAt: Scalars['String'];
  pagination?: Maybe<Pagination>;
  quoteCurrency: Scalars['String'];
  someOtherKeys?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
};

export type TransactionItem = {
  __typename?: 'TransactionItem';
  blockHeight?: Maybe<Scalars['Int']>;
  blockSignedAt?: Maybe<Scalars['String']>;
  fromAddress?: Maybe<Scalars['String']>;
  fromAddressLabel?: Maybe<Scalars['String']>;
  gasOffered?: Maybe<Scalars['Float']>;
  gasPrice?: Maybe<Scalars['Float']>;
  gasQuote?: Maybe<Scalars['Float']>;
  gasQuoteRate?: Maybe<Scalars['Float']>;
  gasSpent?: Maybe<Scalars['Float']>;
  successful?: Maybe<Scalars['Boolean']>;
  toAddress?: Maybe<Scalars['String']>;
  toAddressLabel?: Maybe<Scalars['String']>;
  txHash?: Maybe<Scalars['String']>;
  txOffset?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['String']>;
  valueQuote?: Maybe<Scalars['Float']>;
};

export enum ChartIntervals {
  Int_1D = 'int_1D',
  Int_1M = 'int_1M',
  Int_1Y = 'int_1Y',
  Int_3M = 'int_3M',
  Int_6M = 'int_6M',
  Int_7D = 'int_7D'
}

export type UniswapChart = {
  __typename?: 'UniswapChart';
  ethPriceUsd: Scalars['Float'];
  liquidityUsdMil: Scalars['Float'];
  reserveEth: Scalars['Float'];
  token0Price: Scalars['Float'];
  token1Price: Scalars['Float'];
  unixTime: Scalars['Int'];
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

export type TodoXx = {
  __typename?: 'TodoXX';
  done: Scalars['Boolean'];
  id: Scalars['ID'];
  someOther: User;
  text: Scalars['String'];
  user: User;
};

export type GlobalStatsQueryGqlQueryVariables = Exact<{ [key: string]: never; }>;


export type GlobalStatsQueryGqlQuery = { __typename?: 'Query', globalStats: { __typename?: 'GlobalStats', defiMarketCap: string, ethMarketCap: string, defiToEthRatio: string, tradingVolume24h: string, defiDominance: string, topCoinName: string, topCoinDefiDominance: number }, chains: Array<{ __typename?: 'Chain', name: string, chainId: string, isTestnet: boolean, dbSchemaName: string, label: string, logoUrl: string }>, gasStats: { __typename?: 'EthGasStats', lastBlock: string, safeGasPrice: string, proposeGasPrice: string, fastGasPrice: string, suggestBaseFee: string, gasUsedRatio: string } };

export type BalancesGqlQueryVariables = Exact<{
  chainIds: Array<Scalars['String']> | Scalars['String'];
  address: Scalars['String'];
}>;


export type BalancesGqlQuery = { __typename?: 'Query', balances: Array<{ __typename?: 'Balance', address: string, updatedAt: string, nextUpdateAt: string, quoteCurrency: string, chainId: number, pagination?: { __typename?: 'Pagination', hasMore?: boolean | null | undefined } | null | undefined, items: Array<{ __typename?: 'BalanceItem', contractDecimals: number, contractName: string, contractTickerSymbol: string, contractAddress: string, supportsErc?: Array<string> | null | undefined, logoUrl: string, lastTransferredAt: string, type: string, balance: string, balance24h: string, quoteRate: number, quoteRate24h: number, quote: number, quote24h: number, nftData: number }> }> };
