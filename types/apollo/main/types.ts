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
  aEmissionPerSecond: Scalars['String'];
  addresses: AaveAddress;
  availableLiquidity: Scalars['String'];
  decimals: Scalars['Int'];
  id: Scalars['String'];
  liquidityRate: Scalars['String'];
  name: Scalars['String'];
  portfolio: AavePortfolio;
  price: AavePoolPrice;
  sEmissionPerSecond: Scalars['String'];
  stableBorrowRate: Scalars['String'];
  symbol: Scalars['String'];
  totalATokenSupply: Scalars['String'];
  totalCurrentVariableDebt: Scalars['String'];
  totalLiquidity: Scalars['String'];
  totalPrincipalStableDebt: Scalars['String'];
  underlyingAsset: Scalars['String'];
  usdPrice: Scalars['Float'];
  utilizationRate: Scalars['String'];
  vEmissionPerSecond: Scalars['String'];
  variableBorrowRate: Scalars['String'];
};

export type AavePoolPrice = {
  __typename?: 'AavePoolPrice';
  id: Scalars['String'];
  priceInEth: Scalars['String'];
};

export type AavePortfolio = {
  __typename?: 'AavePortfolio';
  stableBorrow: Scalars['Float'];
  totalDeposits: Scalars['Float'];
  variableBorrow: Scalars['Float'];
  walletBal: Scalars['Float'];
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
  chainId: Scalars['Int'];
  geckoId: Scalars['String'];
  isTestNet: Scalars['Boolean'];
  label: Scalars['String'];
  logoUrl: Scalars['String'];
  name: Scalars['String'];
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

export type CurveCoin = {
  __typename?: 'CurveCoin';
  balance: Scalars['String'];
  balanceUSD: Scalars['Float'];
  token?: Maybe<CurveToken>;
};

export type CurveCoins = {
  __typename?: 'CurveCoins';
  ID: Scalars['String'];
  address: Scalars['String'];
  coingeckoID: Scalars['String'];
  decimals: Scalars['Int'];
  symbol: Scalars['String'];
  type: Scalars['String'];
  wrappedCoinType: Scalars['String'];
};

export type CurvePool = {
  __typename?: 'CurvePool';
  adminFee: Scalars['String'];
  assetType: Scalars['String'];
  baseAPY: Scalars['Float'];
  coins: Array<CurveCoin>;
  dailyVolume: Scalars['Float'];
  fee: Scalars['String'];
  id: Scalars['String'];
  liquidityUsd: Scalars['Float'];
  name: Scalars['String'];
  registryAddress: Scalars['String'];
  rewards: CurveRewards;
  swapAddress: Scalars['String'];
  totalBalance: Scalars['Float'];
  virtualPrice: Scalars['String'];
};

export type CurveRewards = {
  __typename?: 'CurveRewards';
  maxRewardPtc: Scalars['Float'];
  rewardPtc: Scalars['Float'];
};

export type CurveToken = {
  __typename?: 'CurveToken';
  name: Scalars['String'];
  symbol: Scalars['String'];
  usdPrice: Scalars['Float'];
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

export type Query = {
  __typename?: 'Query';
  /** Aave Pool  */
  aavePools: Array<AavePool>;
  /** Covalent Balances */
  balances: Array<Balance>;
  chains: Array<Chain>;
  /** Curve Pool  */
  curvePools: Array<CurvePool>;
  /** Gas Stats for ETH */
  gasStats: EthGasStats;
  /** Global Staths for Coin Gaico */
  globalStats: GlobalStats;
  protocol: Protocol;
  /** Supported Protocols */
  protocols: Array<Maybe<Protocol>>;
  /** Recent Usd Prices  */
  recentPrices: Scalars['Map'];
  /**
   * If tickers (a comma separated list of tickers
   *     is present), only return the spot prices for these tokens.
   */
  spotPrice?: Maybe<SpotPrice>;
  supportedTokens?: Maybe<Array<Token>>;
  todos: Array<Todo>;
};


export type QueryAavePoolsArgs = {
  chainId: Scalars['Int'];
  userWallet: Scalars['String'];
};


export type QueryBalancesArgs = {
  address: Scalars['String'];
  chainIds: Array<Scalars['Int']>;
};


export type QueryProtocolArgs = {
  protocolId: Scalars['String'];
};


export type QuerySpotPriceArgs = {
  pageNumber: Scalars['Int'];
  pageSize: Scalars['Int'];
  tickers: Scalars['String'];
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

export type TokenBalance = {
  __typename?: 'TokenBalance';
  address?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
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

/**
 * Return spot prices and metadata for all tickers or a select group of tickers. Without tickers
 * query param, it returns a paginated list of all tickers sorted by market cap.
 * https://api.covalenthq.com/v1/pricing/tickers/?quote-currency=USD&format=JSON&key=ckey_docs
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

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type GlobalStatsQueryGqlQueryVariables = Exact<{ [key: string]: never; }>;


export type GlobalStatsQueryGqlQuery = { __typename?: 'Query', globalStats: { __typename?: 'GlobalStats', defiMarketCap: string, ethMarketCap: string, defiToEthRatio: string, tradingVolume24h: string, defiDominance: string, topCoinName: string, topCoinDefiDominance: number }, chains: Array<{ __typename?: 'Chain', name: string, chainId: number, isTestNet: boolean, label: string, logoUrl: string }>, gasStats: { __typename?: 'EthGasStats', lastBlock: string, safeGasPrice: string, proposeGasPrice: string, fastGasPrice: string, suggestBaseFee: string, gasUsedRatio: string } };

export type AllProtocolsGqlQueryVariables = Exact<{ [key: string]: never; }>;


export type AllProtocolsGqlQuery = { __typename?: 'Query', protocols: Array<{ __typename?: 'Protocol', id: string, name: string, address: string, symbol: string, url: string, description: string, chain: string, geckoId: string, category: string, chains: Array<string | null | undefined>, twitter: string } | null | undefined> };

export type CurvePoolsGqlQueryVariables = Exact<{ [key: string]: never; }>;


export type CurvePoolsGqlQuery = { __typename?: 'Query', curvePools: Array<{ __typename?: 'CurvePool', id: string, name: string, assetType: string, fee: string, adminFee: string, totalBalance: number, registryAddress: string, dailyVolume: number, liquidityUsd: number, baseAPY: number, rewards: { __typename?: 'CurveRewards', rewardPtc: number, maxRewardPtc: number }, coins: Array<{ __typename?: 'CurveCoin', balance: string, balanceUSD: number, token?: { __typename?: 'CurveToken', symbol: string, name: string, usdPrice: number } | null | undefined }> }> };

export type AavePoolGqlQueryVariables = Exact<{
  chainId: Scalars['Int'];
  userWallet: Scalars['String'];
}>;


export type AavePoolGqlQuery = { __typename?: 'Query', aavePools: Array<{ __typename?: 'AavePool', id: string, underlyingAsset: string, name: string, symbol: string, decimals: number, totalLiquidity: string, liquidityRate: string, stableBorrowRate: string, variableBorrowRate: string, aEmissionPerSecond: string, vEmissionPerSecond: string, sEmissionPerSecond: string, availableLiquidity: string, utilizationRate: string, totalATokenSupply: string, totalCurrentVariableDebt: string, totalPrincipalStableDebt: string, usdPrice: number, price: { __typename?: 'AavePoolPrice', id: string, priceInEth: string }, addresses: { __typename?: 'AaveAddress', aTokenAddress: string, aTokenSymbol: string, stableDebtTokenAddress: string, variableDebtTokenAddress: string, decimals: number, address: string }, portfolio: { __typename?: 'AavePortfolio', walletBal: number, totalDeposits: number, stableBorrow: number, variableBorrow: number } }> };

export type UsdPriceGqlQueryVariables = Exact<{ [key: string]: never; }>;


export type UsdPriceGqlQuery = { __typename?: 'Query', recentPrices: any };

export type BalancesGqlQueryVariables = Exact<{
  chainIds: Array<Scalars['Int']> | Scalars['Int'];
  address: Scalars['String'];
}>;


export type BalancesGqlQuery = { __typename?: 'Query', balances: Array<{ __typename?: 'Balance', address: string, updatedAt: string, nextUpdateAt: string, quoteCurrency: string, chainId: number, pagination?: { __typename?: 'Pagination', hasMore?: boolean | null | undefined } | null | undefined, items: Array<{ __typename?: 'BalanceItem', contractDecimals: number, contractName: string, contractTickerSymbol: string, contractAddress: string, supportsErc?: Array<string> | null | undefined, logoUrl: string, lastTransferredAt: string, type: string, balance: string, balance24h: string, quoteRate: number, quoteRate24h: number, quote: number, quote24h: number, nftData: number }> }> };

export type ProtocolGqlQueryVariables = Exact<{
  protocolId: Scalars['String'];
}>;


export type ProtocolGqlQuery = { __typename?: 'Query', protocol: { __typename?: 'Protocol', id: string, name: string, address: string, symbol: string, url: string, description: string, chain: string, geckoId: string, category: string, chains: Array<string | null | undefined>, twitter: string, balance: any, updatedAt: number, tokenAddresses: Array<string | null | undefined>, usdTvl: any } };
