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
  name: Scalars['String'];
  platforms?: Maybe<Scalars['Map']>;
  publicInterestScore?: Maybe<Scalars['Float']>;
  publicInterestStats?: Maybe<Scalars['Map']>;
  publicNotice?: Maybe<Scalars['String']>;
  sentimentVotesDownPercentage?: Maybe<Scalars['Float']>;
  sentimentVotesUpPercentage?: Maybe<Scalars['Float']>;
  statusUpdates?: Maybe<Array<Maybe<Scalars['Map']>>>;
  symbol: Scalars['String'];
  tickers?: Maybe<Array<Maybe<TickerData>>>;
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

export type CoingeckoInfo = {
  __typename?: 'CoingeckoInfo';
  id: Scalars['String'];
  referenceAssetID: Scalars['String'];
  symbol: Scalars['String'];
};

export type Currency = {
  __typename?: 'Currency';
  code: Scalars['String'];
  slug: Scalars['String'];
  title: Scalars['String'];
  url: Scalars['String'];
};

export type CurveAddresses = {
  __typename?: 'CurveAddresses';
  deposit: Scalars['String'];
  gauge: Scalars['String'];
  lpToken: Scalars['String'];
  stakingRewards: Scalars['String'];
  swap: Scalars['String'];
};

export type CurveCoin = {
  __typename?: 'CurveCoin';
  ID: Scalars['String'];
  address: Scalars['String'];
  coingeckoId: Scalars['String'];
  decimals: Scalars['Int'];
  isLpToken: Scalars['Boolean'];
  liquidity: Scalars['Float'];
  symbol: Scalars['String'];
  tokenBalance: Scalars['Float'];
  type: Scalars['String'];
  usdPrice: Scalars['Float'];
  wrappedCoinType: Scalars['String'];
};

export type CurvePool = {
  __typename?: 'CurvePool';
  ID: Scalars['String'];
  addresses: CurveAddresses;
  adminFee: Scalars['String'];
  assetType: Scalars['String'];
  assets: Scalars['String'];
  baseAPY: Scalars['Float'];
  coingeckoInfo: CoingeckoInfo;
  coins: Array<CurveCoin>;
  dataIndex: Scalars['Int'];
  fee: Scalars['String'];
  hasAMultiplier: Scalars['Boolean'];
  idAlias: Scalars['String'];
  isLendingPool: Scalars['Boolean'];
  isMetaPool: Scalars['Boolean'];
  isOldPool: Scalars['Boolean'];
  lpTokenInfo: LpTokenInfo;
  metaCoins: Array<CurveCoin>;
  name: Scalars['String'];
  pageMetaData: PageMetaData;
  rewards: CurveRewards;
  totalDailyVolume: Scalars['Float'];
  totalLiquidity: Scalars['Float'];
  totalTokenBalance: Scalars['Float'];
  underlyingCoins: Array<CurveCoin>;
  virtualPrice: Scalars['String'];
};

export type CurveRewards = {
  __typename?: 'CurveRewards';
  maxRewardPtc: Scalars['Float'];
  rewardPtc: Scalars['Float'];
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

/**
 * Covalent Get single Transaction Log Event by chainId and txHash
 * https://www.covalenthq.com/docs/api/#/0/Class-A/Get-a-transaction/lng=en
 */
export type LogEvent = {
  __typename?: 'LogEvent';
  blockHeight: Scalars['Int'];
  blockSignedAt: Scalars['String'];
  decoded: LogEventDecoded;
  logOffset: Scalars['Int'];
  rawLogData: Scalars['String'];
  rawLogTopics: Array<Maybe<Scalars['String']>>;
  rawLogTopicsBytes: Scalars['String'];
  senderAddress: Scalars['String'];
  senderAddressLabel: Scalars['String'];
  senderContractDecimals: Scalars['Int'];
  senderContractTickerSymbol: Scalars['String'];
  senderLogoUrl: Scalars['String'];
  senderName: Scalars['String'];
  txHash: Scalars['String'];
  txOffset: Scalars['Int'];
};

export type LogEventDecoded = {
  __typename?: 'LogEventDecoded';
  name: Scalars['String'];
  params: Array<LogEventParams>;
  signature: Scalars['String'];
};

export type LogEventParams = {
  __typename?: 'LogEventParams';
  decoded: Scalars['Boolean'];
  indexed: Scalars['Boolean'];
  name: Scalars['String'];
  type: Scalars['String'];
  value: Scalars['String'];
};

export type LpTokenInfo = {
  __typename?: 'LpTokenInfo';
  name: Scalars['String'];
  symbol: Scalars['String'];
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
  priceChangePercentage1hInCurrency?: Maybe<Scalars['Map']>;
  priceChangePercentage1y?: Maybe<Scalars['Float']>;
  priceChangePercentage1yInCurrency?: Maybe<Scalars['Map']>;
  priceChangePercentage7d?: Maybe<Scalars['Float']>;
  priceChangePercentage7dInCurrency?: Maybe<Scalars['Map']>;
  priceChangePercentage14d?: Maybe<Scalars['Float']>;
  priceChangePercentage14dInCurrency?: Maybe<Scalars['Map']>;
  priceChangePercentage24h?: Maybe<Scalars['Float']>;
  priceChangePercentage24hInCurrency?: Maybe<Scalars['Map']>;
  priceChangePercentage30d?: Maybe<Scalars['Float']>;
  priceChangePercentage30dInCurrency?: Maybe<Scalars['Map']>;
  priceChangePercentage60d?: Maybe<Scalars['Float']>;
  priceChangePercentage60dInCurrency?: Maybe<Scalars['Map']>;
  priceChangePercentage200d?: Maybe<Scalars['Float']>;
  priceChangePercentage200dInCurrency?: Maybe<Scalars['Map']>;
  roi?: Maybe<Scalars['Map']>;
  sparkline7d?: Maybe<Scalars['Map']>;
  totalSupply?: Maybe<Scalars['Float']>;
  totalValueLocked?: Maybe<Scalars['Map']>;
  totalVolume?: Maybe<Scalars['Map']>;
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
  currencies?: Maybe<Array<Currency>>;
  id: Scalars['Int'];
  publishedAt: Scalars['String'];
  title: Scalars['String'];
  url: Scalars['String'];
};

export type PageMetaData = {
  __typename?: 'PageMetaData';
  description: Scalars['String'];
  title: Scalars['String'];
};

export type Pagination = {
  __typename?: 'Pagination';
  hasMore?: Maybe<Scalars['Boolean']>;
  pageNumber?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type Protocol = {
  __typename?: 'Protocol';
  address: Scalars['String'];
  balance: Scalars['Map'];
  category: Scalars['String'];
  chain: Scalars['String'];
  chains: Array<Maybe<Scalars['String']>>;
  description: Scalars['String'];
  geckoId: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  symbol: Scalars['String'];
  tokenAddresses: Array<Maybe<Scalars['String']>>;
  twitter: Scalars['String'];
  updatedAt: Scalars['Int'];
  url: Scalars['String'];
  usdTvl: Scalars['Map'];
};

export type QcCoin = {
  __typename?: 'QCCoin';
  ID?: Maybe<Scalars['ID']>;
  price: QcPrice;
  qcMetrics: QcMetrics;
  qcProfile: QcProfile;
};

export type QcMetrics = {
  __typename?: 'QCMetrics';
  circulatingSupply: Scalars['Float'];
  marketcap: Scalars['Float'];
  price24h: Scalars['Float'];
  resistance1h: Scalars['Float'];
  safeScore: Scalars['Float'];
  support1h: Scalars['Float'];
  volume24h: Scalars['Float'];
};

export type QcPrice = {
  __typename?: 'QCPrice';
  dataSource: Scalars['String'];
  priceBtc: Scalars['Float'];
  priceUsd: Scalars['Float'];
  qcKey: Scalars['String'];
  symbolName: Scalars['String'];
};

export type QcProfile = {
  __typename?: 'QCProfile';
  bitbucketRepos: Scalars['JSONMap'];
  coinDescription: Scalars['String'];
  discordChannelId: Scalars['String'];
  explorerUrls: Scalars['JSONMap'];
  facebookUrl: Scalars['String'];
  githubRepos: Scalars['JSONMap'];
  qcKey: Scalars['String'];
  rank: Scalars['Int'];
  subredditUrl: Scalars['String'];
  symbolName: Scalars['String'];
  telegramChannelId: Scalars['String'];
  twitterUrl: Scalars['String'];
  websiteUrl: Scalars['JSONMap'];
};

export type Query = {
  __typename?: 'Query';
  /** Aave Pool  */
  aavePools: Array<AavePool>;
  /** Covalent Balances */
  balances: Array<Balance>;
  chainLinkAddresses: Scalars['Map'];
  chainLinkPrice: Scalars['Map'];
  chains: Array<Chain>;
  /** Curve Pool  */
  curvePools: Array<CurvePool>;
  /** Eth ABI  */
  ethABI: Scalars['String'];
  /** Gas Stats for ETH */
  gas: Array<GasStats>;
  /** Global Staths for Coin Gaico */
  globalStats: GlobalStats;
  highAndLow: HighAndLow;
  /** Crypto Panic News */
  news?: Maybe<Array<News>>;
  protocol: Protocol;
  /** Supported Protocols */
  protocols: Array<Maybe<Protocol>>;
  qcCoin: QcCoin;
  /** Recent Usd Prices  */
  recentPrices: Scalars['Map'];
  /**
   * If tickers (a comma separated list of tickers
   *     is present), only return the spot prices for these tokens.
   */
  spotPrice?: Maybe<SpotPrice>;
  todos: Array<Todo>;
  /** Single Transaction from Covalent */
  transactionLogEvents: Array<LogEvent>;
  /** Transactions */
  transactions: Array<Transaction>;
};


export type QueryAavePoolsArgs = {
  chainId: Scalars['Int'];
};


export type QueryBalancesArgs = {
  address: Scalars['String'];
  chainIds: Array<Scalars['Int']>;
};


export type QueryChainLinkPriceArgs = {
  chainId?: Scalars['Int'];
  pairs?: Array<Scalars['String']>;
};


export type QueryEthAbiArgs = {
  address: Scalars['String'];
};


export type QueryHighAndLowArgs = {
  intervalType: Scalars['String'];
  qcKey: Scalars['String'];
};


export type QueryNewsArgs = {
  qcKey: Scalars['String'];
};


export type QueryProtocolArgs = {
  protocolId: Scalars['String'];
};


export type QueryQcCoinArgs = {
  qcKey: Scalars['String'];
};


export type QuerySpotPriceArgs = {
  pageNumber: Scalars['Int'];
  pageSize: Scalars['Int'];
  tickers: Scalars['String'];
};


export type QueryTransactionLogEventsArgs = {
  chainId?: Scalars['Int'];
  txHash: Scalars['String'];
};


export type QueryTransactionsArgs = {
  address: Scalars['String'];
  chainId?: Scalars['Int'];
  pageNumber?: Scalars['Int'];
  pageSize?: Scalars['Int'];
};

/**
 * Covalent Get Transactions for address
 * https://www.covalenthq.com/docs/api/#/0/Class-A/Get-all-chain-statuses/lng=en
 */
export type SpotPrice = {
  __typename?: 'SpotPrice';
  items: Array<Maybe<SpotPriceItem>>;
  pagination?: Maybe<Pagination>;
  updatedAt: Scalars['String'];
};

export type SpotPriceItem = {
  __typename?: 'SpotPriceItem';
  contractAddress: Scalars['String'];
  contractDecimals: Scalars['Int'];
  contractName: Scalars['String'];
  contractTickerSymbol: Scalars['String'];
  logoUrl: Scalars['String'];
  quoteRate: Scalars['Float'];
  rank: Scalars['Int'];
  supportsErc: Scalars['String'];
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

export type Todo = {
  __typename?: 'Todo';
  done: Scalars['Boolean'];
  id: Scalars['ID'];
  text: Scalars['String'];
  user: User;
};

export type Token = {
  __typename?: 'Token';
  ID: Scalars['ID'];
  address: Scalars['String'];
  chainKey: Scalars['String'];
  coingeckoId: Scalars['String'];
  logoURI: Scalars['String'];
  name: Scalars['String'];
  symbol: Scalars['String'];
};

/**
 * Return spot prices and metadata for all tickers or a select group of tickers. Without tickers
 * query param, it returns a paginated list of all tickers sorted by market cap.
 * https://api.covalenthq.com/v1/pricing/tickers/?quote-currency=USD&format=JSON&key=ckey_docs
 */
export type Transaction = {
  __typename?: 'Transaction';
  blockHash: Scalars['String'];
  blockNumber: Scalars['String'];
  confirmations: Scalars['String'];
  contractAddress: Scalars['String'];
  cumulativeGasUsed: Scalars['String'];
  from: Scalars['String'];
  function: Scalars['String'];
  gas: Scalars['String'];
  gasPrice: Scalars['String'];
  gasUsed: Scalars['String'];
  hash: Scalars['String'];
  input: Scalars['String'];
  isError: Scalars['String'];
  methodId: Scalars['String'];
  nonce: Scalars['String'];
  timeStamp: Scalars['String'];
  to: Scalars['String'];
  tokenTo: Token;
  transactionIndex: Scalars['String'];
  txreceiptStatus: Scalars['String'];
  value: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type AaveMarketsGqlQueryVariables = Exact<{ [key: string]: never; }>;


export type AaveMarketsGqlQuery = { __typename?: 'Query', chains: Array<{ __typename?: 'Chain', chainId: number, name: string, geckoId: string, symbol: string, label: string, logoUrl: string, isTestNet: boolean, rpcUrl: string, blockExplorerUrl: string }> };

export type GasGqlQueryVariables = Exact<{ [key: string]: never; }>;


export type GasGqlQuery = { __typename?: 'Query', gas: Array<{ __typename?: 'GasStats', symbol: string, blockExplorer: string, name: string, gas: { __typename?: 'EthGasStatsResult', lastBlock: number, safeGasPrice: number, proposeGasPrice: number, fastGasPrice: number, suggestBaseFee: number } }> };

export type DeFiStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type DeFiStatsQuery = { __typename?: 'Query', globalStats: { __typename?: 'GlobalStats', defiMarketCap: number, ethMarketCap: number, defiToEthRatio: number, tradingVolume24h: number, defiDominance: number, topCoinName: string, topCoinDefiDominance: number } };

export type RecentPricesGqlQueryVariables = Exact<{ [key: string]: never; }>;


export type RecentPricesGqlQuery = { __typename?: 'Query', recentPrices: any };

export type ChainlinkEthUsdPriceGqlQueryVariables = Exact<{ [key: string]: never; }>;


export type ChainlinkEthUsdPriceGqlQuery = { __typename?: 'Query', chainLinkPrice: any };

export type NewsGqlQueryVariables = Exact<{
  qcKey: Scalars['String'];
}>;


export type NewsGqlQuery = { __typename?: 'Query', news?: Array<{ __typename?: 'News', id: number, url: string, title: string, publishedAt: string, currencies?: Array<{ __typename?: 'Currency', code: string, title: string, slug: string, url: string }> | null }> | null };

export type AllProtocolsGqlQueryVariables = Exact<{ [key: string]: never; }>;


export type AllProtocolsGqlQuery = { __typename?: 'Query', protocols: Array<{ __typename?: 'Protocol', id: string, name: string, address: string, symbol: string, url: string, description: string, chain: string, geckoId: string, category: string, chains: Array<string | null>, twitter: string } | null> };

export type CurvePoolsGqlQueryVariables = Exact<{ [key: string]: never; }>;


export type CurvePoolsGqlQuery = { __typename?: 'Query', curvePools: Array<{ __typename?: 'CurvePool', ID: string, dataIndex: number, idAlias: string, name: string, assets: string, isLendingPool: boolean, isMetaPool: boolean, hasAMultiplier: boolean, isOldPool: boolean, fee: string, adminFee: string, assetType: string, virtualPrice: string, totalDailyVolume: number, totalTokenBalance: number, totalLiquidity: number, baseAPY: number, pageMetaData: { __typename?: 'PageMetaData', title: string, description: string }, lpTokenInfo: { __typename?: 'LpTokenInfo', name: string, symbol: string }, coingeckoInfo: { __typename?: 'CoingeckoInfo', id: string, symbol: string }, coins: Array<{ __typename?: 'CurveCoin', symbol: string, address: string, coingeckoId: string, type: string, decimals: number, tokenBalance: number, liquidity: number, usdPrice: number, isLpToken: boolean }>, metaCoins: Array<{ __typename?: 'CurveCoin', symbol: string, address: string, coingeckoId: string, type: string, decimals: number, tokenBalance: number, liquidity: number, usdPrice: number, isLpToken: boolean }>, underlyingCoins: Array<{ __typename?: 'CurveCoin', ID: string, coingeckoId: string }>, addresses: { __typename?: 'CurveAddresses', swap: string, lpToken: string, gauge: string, deposit: string }, rewards: { __typename?: 'CurveRewards', rewardPtc: number, maxRewardPtc: number } }> };

export type AavePoolGqlQueryVariables = Exact<{
  chainId: Scalars['Int'];
}>;


export type AavePoolGqlQuery = { __typename?: 'Query', aavePools: Array<{ __typename?: 'AavePool', id: string, underlyingAsset: string, name: string, symbol: string, decimals: number, totalLiquidity: number, liquidityRate: number, stableBorrowRate: number, variableBorrowRate: number, aEmissionPerSecond: number, vEmissionPerSecond: number, sEmissionPerSecond: number, availableLiquidity: number, utilizationRate: number, totalATokenSupply: number, totalCurrentVariableDebt: number, totalPrincipalStableDebt: number, totalLiquidityAsCollateral: number, baseLTVasCollateral: number, reserveLiquidationThreshold: number, reserveLiquidationBonus: number, usageAsCollateralEnabled: boolean, borrowingEnabled: boolean, stableBorrowRateEnabled: boolean, price: { __typename?: 'AavePoolPrice', id: string, priceInEth: number, priceUsd: number }, addresses: { __typename?: 'AaveAddress', aTokenAddress: string, aTokenSymbol: string, stableDebtTokenAddress: string, variableDebtTokenAddress: string, decimals: number, address: string, symbol: string } }> };

export type BalancesGqlQueryVariables = Exact<{
  chainIds: Array<Scalars['Int']> | Scalars['Int'];
  address: Scalars['String'];
}>;


export type BalancesGqlQuery = { __typename?: 'Query', balances: Array<{ __typename?: 'Balance', address: string, updatedAt: string, nextUpdateAt: string, quoteCurrency: string, chainId: number, pagination?: { __typename?: 'Pagination', hasMore?: boolean | null } | null, items: Array<{ __typename?: 'BalanceItem', contractDecimals: number, contractName: string, contractTickerSymbol: string, contractAddress: string, supportsErc?: Array<string> | null, logoUrl: string, lastTransferredAt: string, type: string, balance: string, balance24h: string, quoteRate: number, quoteRate24h: number, quote: number, quote24h: number, nftData: number }> }> };

export type ProtocolGqlQueryVariables = Exact<{
  protocolId: Scalars['String'];
}>;


export type ProtocolGqlQuery = { __typename?: 'Query', protocol: { __typename?: 'Protocol', id: string, name: string, address: string, symbol: string, url: string, description: string, chain: string, geckoId: string, category: string, chains: Array<string | null>, twitter: string, balance: any, updatedAt: number, tokenAddresses: Array<string | null>, usdTvl: any } };

export type TransactionsGqlQueryVariables = Exact<{
  chainId: Scalars['Int'];
  address: Scalars['String'];
  pageNumber: Scalars['Int'];
  pageSize: Scalars['Int'];
}>;


export type TransactionsGqlQuery = { __typename?: 'Query', transactions: Array<{ __typename?: 'Transaction', blockNumber: string, timeStamp: string, hash: string, nonce: string, blockHash: string, transactionIndex: string, from: string, to: string, value: string, gas: string, gasPrice: string, isError: string, txreceiptStatus: string, input: string, contractAddress: string, cumulativeGasUsed: string, gasUsed: string, confirmations: string, methodId: string, function: string, tokenTo: { __typename?: 'Token', chainKey: string, coingeckoId: string, address: string, name: string, symbol: string } }> };

export type TransactionLogEventsGqlQueryVariables = Exact<{
  chainId: Scalars['Int'];
  txHash: Scalars['String'];
}>;


export type TransactionLogEventsGqlQuery = { __typename?: 'Query', transactionLogEvents: Array<{ __typename?: 'LogEvent', senderAddress: string, senderContractDecimals: number, senderContractTickerSymbol: string, senderLogoUrl: string, decoded: { __typename?: 'LogEventDecoded', name: string, params: Array<{ __typename?: 'LogEventParams', name: string, type: string, value: string }> } }> };

export type QcCoinGqlQueryVariables = Exact<{
  qcKey: Scalars['String'];
}>;


export type QcCoinGqlQuery = { __typename?: 'Query', qcCoin: { __typename?: 'QCCoin', qcProfile: { __typename?: 'QCProfile', rank: number, symbolName: string, qcKey: string, coinDescription: string, websiteUrl: any, explorerUrls: any, githubRepos: any, bitbucketRepos: any, twitterUrl: string, facebookUrl: string, subredditUrl: string, discordChannelId: string, telegramChannelId: string }, qcMetrics: { __typename?: 'QCMetrics', marketcap: number, volume24h: number, price24h: number, circulatingSupply: number, safeScore: number, support1h: number, resistance1h: number } } };

export type PriceGqlQueryVariables = Exact<{
  qcKey: Scalars['String'];
}>;


export type PriceGqlQuery = { __typename?: 'Query', qcCoin: { __typename?: 'QCCoin', price: { __typename?: 'QCPrice', priceUsd: number, priceBtc: number, dataSource: string, symbolName: string, qcKey: string } } };

export type HighAndLowGqlQueryVariables = Exact<{
  qcKey: Scalars['String'];
  intervalType: Scalars['String'];
}>;


export type HighAndLowGqlQuery = { __typename?: 'Query', highAndLow: { __typename?: 'HighAndLow', high: number, low: number, interval: string, unixTime: number } };
