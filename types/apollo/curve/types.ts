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
  Bytes: any;
  BigInt: any;
  BigDecimal: any;
};

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  addLiquidityEvent?: Maybe<AddLiquidityEvent>;
  addLiquidityEvents: Array<AddLiquidityEvent>;
  adminFeeChangelog?: Maybe<AdminFeeChangelog>;
  adminFeeChangelogs: Array<AdminFeeChangelog>;
  amplificationCoeffChangelog?: Maybe<AmplificationCoeffChangelog>;
  amplificationCoeffChangelogs: Array<AmplificationCoeffChangelog>;
  coin?: Maybe<Coin>;
  coins: Array<Coin>;
  contract?: Maybe<Contract>;
  contracts: Array<Contract>;
  contractVersion?: Maybe<ContractVersion>;
  contractVersions: Array<ContractVersion>;
  dailyVolume?: Maybe<DailyVolume>;
  dailyVolumes: Array<DailyVolume>;
  exchange?: Maybe<Exchange>;
  exchanges: Array<Exchange>;
  feeChangelog?: Maybe<FeeChangelog>;
  feeChangelogs: Array<FeeChangelog>;
  gauge?: Maybe<Gauge>;
  gaugeDeposit?: Maybe<GaugeDeposit>;
  gaugeDeposits: Array<GaugeDeposit>;
  gaugeLiquidities: Array<GaugeLiquidity>;
  gaugeLiquidity?: Maybe<GaugeLiquidity>;
  gauges: Array<Gauge>;
  gaugeTotalWeight?: Maybe<GaugeTotalWeight>;
  gaugeTotalWeights: Array<GaugeTotalWeight>;
  gaugeType?: Maybe<GaugeType>;
  gaugeTypes: Array<GaugeType>;
  gaugeTypeWeight?: Maybe<GaugeTypeWeight>;
  gaugeTypeWeights: Array<GaugeTypeWeight>;
  gaugeWeight?: Maybe<GaugeWeight>;
  gaugeWeights: Array<GaugeWeight>;
  gaugeWeightVote?: Maybe<GaugeWeightVote>;
  gaugeWeightVotes: Array<GaugeWeightVote>;
  gaugeWithdraw?: Maybe<GaugeWithdraw>;
  gaugeWithdraws: Array<GaugeWithdraw>;
  hourlyVolume?: Maybe<HourlyVolume>;
  hourlyVolumes: Array<HourlyVolume>;
  lpToken?: Maybe<LpToken>;
  lpTokens: Array<LpToken>;
  pool?: Maybe<Pool>;
  poolEvent?: Maybe<PoolEvent>;
  poolEvents: Array<PoolEvent>;
  pools: Array<Pool>;
  proposal?: Maybe<Proposal>;
  proposals: Array<Proposal>;
  proposalVote?: Maybe<ProposalVote>;
  proposalVotes: Array<ProposalVote>;
  removeLiquidityEvent?: Maybe<RemoveLiquidityEvent>;
  removeLiquidityEvents: Array<RemoveLiquidityEvent>;
  removeLiquidityOneEvent?: Maybe<RemoveLiquidityOneEvent>;
  removeLiquidityOneEvents: Array<RemoveLiquidityOneEvent>;
  systemState?: Maybe<SystemState>;
  systemStates: Array<SystemState>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  tradeVolume?: Maybe<TradeVolume>;
  tradeVolumes: Array<TradeVolume>;
  transferOwnershipEvent?: Maybe<TransferOwnershipEvent>;
  transferOwnershipEvents: Array<TransferOwnershipEvent>;
  underlyingCoin?: Maybe<UnderlyingCoin>;
  underlyingCoins: Array<UnderlyingCoin>;
  votingApp?: Maybe<VotingApp>;
  votingApps: Array<VotingApp>;
  weeklyVolume?: Maybe<WeeklyVolume>;
  weeklyVolumes: Array<WeeklyVolume>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_Filter>;
};


export type QueryAddLiquidityEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAddLiquidityEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AddLiquidityEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AddLiquidityEvent_Filter>;
};


export type QueryAdminFeeChangelogArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAdminFeeChangelogsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AdminFeeChangelog_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AdminFeeChangelog_Filter>;
};


export type QueryAmplificationCoeffChangelogArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAmplificationCoeffChangelogsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AmplificationCoeffChangelog_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AmplificationCoeffChangelog_Filter>;
};


export type QueryCoinArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryCoinsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Coin_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Coin_Filter>;
};


export type QueryContractArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryContractsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Contract_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Contract_Filter>;
};


export type QueryContractVersionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryContractVersionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ContractVersion_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ContractVersion_Filter>;
};


export type QueryDailyVolumeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryDailyVolumesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyVolume_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyVolume_Filter>;
};


export type QueryExchangeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryExchangesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Exchange_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Exchange_Filter>;
};


export type QueryFeeChangelogArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryFeeChangelogsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FeeChangelog_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FeeChangelog_Filter>;
};


export type QueryGaugeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryGaugeDepositArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryGaugeDepositsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GaugeDeposit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<GaugeDeposit_Filter>;
};


export type QueryGaugeLiquiditiesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GaugeLiquidity_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<GaugeLiquidity_Filter>;
};


export type QueryGaugeLiquidityArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryGaugesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Gauge_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Gauge_Filter>;
};


export type QueryGaugeTotalWeightArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryGaugeTotalWeightsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GaugeTotalWeight_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<GaugeTotalWeight_Filter>;
};


export type QueryGaugeTypeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryGaugeTypesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GaugeType_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<GaugeType_Filter>;
};


export type QueryGaugeTypeWeightArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryGaugeTypeWeightsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GaugeTypeWeight_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<GaugeTypeWeight_Filter>;
};


export type QueryGaugeWeightArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryGaugeWeightsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GaugeWeight_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<GaugeWeight_Filter>;
};


export type QueryGaugeWeightVoteArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryGaugeWeightVotesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GaugeWeightVote_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<GaugeWeightVote_Filter>;
};


export type QueryGaugeWithdrawArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryGaugeWithdrawsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GaugeWithdraw_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<GaugeWithdraw_Filter>;
};


export type QueryHourlyVolumeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryHourlyVolumesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HourlyVolume_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HourlyVolume_Filter>;
};


export type QueryLpTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryLpTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LpToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LpToken_Filter>;
};


export type QueryPoolArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPoolEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryPoolEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolEvent_Filter>;
};


export type QueryPoolsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pool_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Pool_Filter>;
};


export type QueryProposalArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProposalsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Proposal_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Proposal_Filter>;
};


export type QueryProposalVoteArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryProposalVotesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProposalVote_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalVote_Filter>;
};


export type QueryRemoveLiquidityEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRemoveLiquidityEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RemoveLiquidityEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RemoveLiquidityEvent_Filter>;
};


export type QueryRemoveLiquidityOneEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryRemoveLiquidityOneEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RemoveLiquidityOneEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RemoveLiquidityOneEvent_Filter>;
};


export type QuerySystemStateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerySystemStatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SystemState_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SystemState_Filter>;
};


export type QueryTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};


export type QueryTradeVolumeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTradeVolumesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TradeVolume_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TradeVolume_Filter>;
};


export type QueryTransferOwnershipEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTransferOwnershipEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TransferOwnershipEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TransferOwnershipEvent_Filter>;
};


export type QueryUnderlyingCoinArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUnderlyingCoinsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UnderlyingCoin_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UnderlyingCoin_Filter>;
};


export type QueryVotingAppArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryVotingAppsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VotingApp_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VotingApp_Filter>;
};


export type QueryWeeklyVolumeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryWeeklyVolumesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WeeklyVolume_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WeeklyVolume_Filter>;
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type Account = {
  __typename?: 'Account';
  address: Scalars['Bytes'];
  /**  Liquidity gauges this account contributed to  */
  gauges?: Maybe<Array<GaugeLiquidity>>;
  /**    */
  gaugeWeightVotes?: Maybe<Array<GaugeWeightVote>>;
  id: Scalars['ID'];
  /**  Proposal created by this account  */
  proposals?: Maybe<Array<Proposal>>;
  /**    */
  proposalVotes?: Maybe<Array<ProposalVote>>;
};


export type AccountGaugesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GaugeLiquidity_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GaugeLiquidity_Filter>;
};


export type AccountGaugeWeightVotesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GaugeWeightVote_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GaugeWeightVote_Filter>;
};


export type AccountProposalsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Proposal_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Proposal_Filter>;
};


export type AccountProposalVotesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProposalVote_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProposalVote_Filter>;
};

export enum GaugeLiquidity_OrderBy {
  Block = 'block',
  Gauge = 'gauge',
  Id = 'id',
  OriginalBalance = 'originalBalance',
  OriginalSupply = 'originalSupply',
  Timestamp = 'timestamp',
  Transaction = 'transaction',
  User = 'user',
  WorkingBalance = 'workingBalance',
  WorkingSupply = 'workingSupply'
}

export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type GaugeLiquidity_Filter = {
  block?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gauge?: InputMaybe<Scalars['String']>;
  gauge_contains?: InputMaybe<Scalars['String']>;
  gauge_ends_with?: InputMaybe<Scalars['String']>;
  gauge_gt?: InputMaybe<Scalars['String']>;
  gauge_gte?: InputMaybe<Scalars['String']>;
  gauge_in?: InputMaybe<Array<Scalars['String']>>;
  gauge_lt?: InputMaybe<Scalars['String']>;
  gauge_lte?: InputMaybe<Scalars['String']>;
  gauge_not?: InputMaybe<Scalars['String']>;
  gauge_not_contains?: InputMaybe<Scalars['String']>;
  gauge_not_ends_with?: InputMaybe<Scalars['String']>;
  gauge_not_in?: InputMaybe<Array<Scalars['String']>>;
  gauge_not_starts_with?: InputMaybe<Scalars['String']>;
  gauge_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  originalBalance?: InputMaybe<Scalars['BigInt']>;
  originalBalance_gt?: InputMaybe<Scalars['BigInt']>;
  originalBalance_gte?: InputMaybe<Scalars['BigInt']>;
  originalBalance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originalBalance_lt?: InputMaybe<Scalars['BigInt']>;
  originalBalance_lte?: InputMaybe<Scalars['BigInt']>;
  originalBalance_not?: InputMaybe<Scalars['BigInt']>;
  originalBalance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originalSupply?: InputMaybe<Scalars['BigInt']>;
  originalSupply_gt?: InputMaybe<Scalars['BigInt']>;
  originalSupply_gte?: InputMaybe<Scalars['BigInt']>;
  originalSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  originalSupply_lt?: InputMaybe<Scalars['BigInt']>;
  originalSupply_lte?: InputMaybe<Scalars['BigInt']>;
  originalSupply_not?: InputMaybe<Scalars['BigInt']>;
  originalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transaction?: InputMaybe<Scalars['Bytes']>;
  transaction_contains?: InputMaybe<Scalars['Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transaction_not?: InputMaybe<Scalars['Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['Bytes']>;
  transaction_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  user?: InputMaybe<Scalars['String']>;
  user_contains?: InputMaybe<Scalars['String']>;
  user_ends_with?: InputMaybe<Scalars['String']>;
  user_gt?: InputMaybe<Scalars['String']>;
  user_gte?: InputMaybe<Scalars['String']>;
  user_in?: InputMaybe<Array<Scalars['String']>>;
  user_lt?: InputMaybe<Scalars['String']>;
  user_lte?: InputMaybe<Scalars['String']>;
  user_not?: InputMaybe<Scalars['String']>;
  user_not_contains?: InputMaybe<Scalars['String']>;
  user_not_ends_with?: InputMaybe<Scalars['String']>;
  user_not_in?: InputMaybe<Array<Scalars['String']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']>;
  user_starts_with?: InputMaybe<Scalars['String']>;
  workingBalance?: InputMaybe<Scalars['BigInt']>;
  workingBalance_gt?: InputMaybe<Scalars['BigInt']>;
  workingBalance_gte?: InputMaybe<Scalars['BigInt']>;
  workingBalance_in?: InputMaybe<Array<Scalars['BigInt']>>;
  workingBalance_lt?: InputMaybe<Scalars['BigInt']>;
  workingBalance_lte?: InputMaybe<Scalars['BigInt']>;
  workingBalance_not?: InputMaybe<Scalars['BigInt']>;
  workingBalance_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  workingSupply?: InputMaybe<Scalars['BigInt']>;
  workingSupply_gt?: InputMaybe<Scalars['BigInt']>;
  workingSupply_gte?: InputMaybe<Scalars['BigInt']>;
  workingSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  workingSupply_lt?: InputMaybe<Scalars['BigInt']>;
  workingSupply_lte?: InputMaybe<Scalars['BigInt']>;
  workingSupply_not?: InputMaybe<Scalars['BigInt']>;
  workingSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type GaugeLiquidity = {
  __typename?: 'GaugeLiquidity';
  block: Scalars['BigInt'];
  gauge: Gauge;
  id: Scalars['ID'];
  originalBalance: Scalars['BigInt'];
  originalSupply: Scalars['BigInt'];
  timestamp: Scalars['BigInt'];
  transaction: Scalars['Bytes'];
  user: Account;
  workingBalance: Scalars['BigInt'];
  workingSupply: Scalars['BigInt'];
};

export type Gauge = {
  __typename?: 'Gauge';
  address: Scalars['Bytes'];
  created: Scalars['BigInt'];
  createdAtBlock: Scalars['BigInt'];
  createdAtTransaction: Scalars['Bytes'];
  id: Scalars['ID'];
  pool?: Maybe<Pool>;
  type: GaugeType;
  weights?: Maybe<Array<GaugeWeight>>;
  weightVotes?: Maybe<Array<GaugeWeightVote>>;
};


export type GaugeWeightsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GaugeWeight_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GaugeWeight_Filter>;
};


export type GaugeWeightVotesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GaugeWeightVote_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GaugeWeightVote_Filter>;
};

export type Pool = {
  __typename?: 'Pool';
  /**  Amplification coefficient multiplied by n * (n - 1)  */
  A?: Maybe<Scalars['BigInt']>;
  addedAt: Scalars['BigInt'];
  addedAtBlock: Scalars['BigInt'];
  addedAtTransaction: Scalars['Bytes'];
  /**  Admin fee is represented as a percentage of the total fee collected on a swap  */
  adminFee?: Maybe<Scalars['BigDecimal']>;
  /**  Reference asset type  */
  assetType?: Maybe<AssetType>;
  /**  Number of coins composing the pool  */
  coinCount: Scalars['BigInt'];
  /**  List of the swappable coins within the pool  */
  coins?: Maybe<Array<Coin>>;
  /**  Cumulative daily trade volume  */
  dailyVolumes?: Maybe<Array<DailyVolume>>;
  events?: Maybe<Array<PoolEvent>>;
  exchangeCount: Scalars['BigInt'];
  exchanges?: Maybe<Array<Exchange>>;
  /**  Fee to charge for exchanges  */
  fee?: Maybe<Scalars['BigDecimal']>;
  gaugeCount: Scalars['BigInt'];
  /**  List of gauge contracts associated with the pool  */
  gauges?: Maybe<Array<Gauge>>;
  /**  Cumulative hourly trade volume  */
  hourlyVolumes?: Maybe<Array<HourlyVolume>>;
  /**  Pool address  */
  id: Scalars['ID'];
  /**  Identify whether pool is a metapool  */
  isMeta: Scalars['Boolean'];
  locked: Scalars['BigDecimal'];
  /**  Address of the token representing LP share  */
  lpToken: LpToken;
  /**  Pool's human-readable name  */
  name: Scalars['String'];
  /**  Admin address  */
  owner?: Maybe<Scalars['Bytes']>;
  /**  Registry contract address from where this pool was registered  */
  registryAddress: Scalars['Bytes'];
  removedAt?: Maybe<Scalars['BigInt']>;
  removedAtBlock?: Maybe<Scalars['BigInt']>;
  removedAtTransaction?: Maybe<Scalars['Bytes']>;
  /**  Swap contract address  */
  swapAddress: Scalars['Bytes'];
  /**  List of the swappable underlying coins within the pool  */
  underlyingCoins?: Maybe<Array<UnderlyingCoin>>;
  /**  Number of underlying coins composing the pool  */
  underlyingCount: Scalars['BigInt'];
  /**  Average dollar value of pool token  */
  virtualPrice: Scalars['BigDecimal'];
  /**  Cumulative weekly trade volume  */
  weeklyVolumes?: Maybe<Array<WeeklyVolume>>;
};


export type PoolCoinsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Coin_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Coin_Filter>;
};


export type PoolDailyVolumesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyVolume_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DailyVolume_Filter>;
};


export type PoolEventsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PoolEvent_Filter>;
};


export type PoolExchangesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Exchange_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Exchange_Filter>;
};


export type PoolGaugesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Gauge_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Gauge_Filter>;
};


export type PoolHourlyVolumesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HourlyVolume_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<HourlyVolume_Filter>;
};


export type PoolUnderlyingCoinsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UnderlyingCoin_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UnderlyingCoin_Filter>;
};


export type PoolWeeklyVolumesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WeeklyVolume_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<WeeklyVolume_Filter>;
};

export enum AssetType {
  Btc = 'BTC',
  Crypto = 'CRYPTO',
  Eth = 'ETH',
  Eur = 'EUR',
  Link = 'LINK',
  Other = 'OTHER',
  Usd = 'USD'
}

export enum Coin_OrderBy {
  Balance = 'balance',
  Id = 'id',
  Index = 'index',
  Pool = 'pool',
  Rate = 'rate',
  Token = 'token',
  Underlying = 'underlying',
  Updated = 'updated',
  UpdatedAtBlock = 'updatedAtBlock',
  UpdatedAtTransaction = 'updatedAtTransaction'
}

export type Coin_Filter = {
  balance?: InputMaybe<Scalars['BigDecimal']>;
  balance_gt?: InputMaybe<Scalars['BigDecimal']>;
  balance_gte?: InputMaybe<Scalars['BigDecimal']>;
  balance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  balance_lt?: InputMaybe<Scalars['BigDecimal']>;
  balance_lte?: InputMaybe<Scalars['BigDecimal']>;
  balance_not?: InputMaybe<Scalars['BigDecimal']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  index?: InputMaybe<Scalars['Int']>;
  index_gt?: InputMaybe<Scalars['Int']>;
  index_gte?: InputMaybe<Scalars['Int']>;
  index_in?: InputMaybe<Array<Scalars['Int']>>;
  index_lt?: InputMaybe<Scalars['Int']>;
  index_lte?: InputMaybe<Scalars['Int']>;
  index_not?: InputMaybe<Scalars['Int']>;
  index_not_in?: InputMaybe<Array<Scalars['Int']>>;
  pool?: InputMaybe<Scalars['String']>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  rate?: InputMaybe<Scalars['BigDecimal']>;
  rate_gt?: InputMaybe<Scalars['BigDecimal']>;
  rate_gte?: InputMaybe<Scalars['BigDecimal']>;
  rate_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  rate_lt?: InputMaybe<Scalars['BigDecimal']>;
  rate_lte?: InputMaybe<Scalars['BigDecimal']>;
  rate_not?: InputMaybe<Scalars['BigDecimal']>;
  rate_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  token?: InputMaybe<Scalars['String']>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  underlying?: InputMaybe<Scalars['String']>;
  underlying_contains?: InputMaybe<Scalars['String']>;
  underlying_ends_with?: InputMaybe<Scalars['String']>;
  underlying_gt?: InputMaybe<Scalars['String']>;
  underlying_gte?: InputMaybe<Scalars['String']>;
  underlying_in?: InputMaybe<Array<Scalars['String']>>;
  underlying_lt?: InputMaybe<Scalars['String']>;
  underlying_lte?: InputMaybe<Scalars['String']>;
  underlying_not?: InputMaybe<Scalars['String']>;
  underlying_not_contains?: InputMaybe<Scalars['String']>;
  underlying_not_ends_with?: InputMaybe<Scalars['String']>;
  underlying_not_in?: InputMaybe<Array<Scalars['String']>>;
  underlying_not_starts_with?: InputMaybe<Scalars['String']>;
  underlying_starts_with?: InputMaybe<Scalars['String']>;
  updated?: InputMaybe<Scalars['BigInt']>;
  updated_gt?: InputMaybe<Scalars['BigInt']>;
  updated_gte?: InputMaybe<Scalars['BigInt']>;
  updated_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updated_lt?: InputMaybe<Scalars['BigInt']>;
  updated_lte?: InputMaybe<Scalars['BigInt']>;
  updated_not?: InputMaybe<Scalars['BigInt']>;
  updated_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAtBlock?: InputMaybe<Scalars['BigInt']>;
  updatedAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  updatedAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  updatedAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  updatedAtBlock_not?: InputMaybe<Scalars['BigInt']>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAtTransaction?: InputMaybe<Scalars['Bytes']>;
  updatedAtTransaction_contains?: InputMaybe<Scalars['Bytes']>;
  updatedAtTransaction_in?: InputMaybe<Array<Scalars['Bytes']>>;
  updatedAtTransaction_not?: InputMaybe<Scalars['Bytes']>;
  updatedAtTransaction_not_contains?: InputMaybe<Scalars['Bytes']>;
  updatedAtTransaction_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export type Coin = {
  __typename?: 'Coin';
  balance: Scalars['BigDecimal'];
  /**  Equals to: <pool_id>-<coin_index> */
  id: Scalars['ID'];
  /**  Coin index  */
  index: Scalars['Int'];
  pool: Pool;
  /**  Exchange rate between this coin and the associated underlying coin within the pool  */
  rate: Scalars['BigDecimal'];
  token: Token;
  underlying: UnderlyingCoin;
  updated: Scalars['BigInt'];
  updatedAtBlock: Scalars['BigInt'];
  updatedAtTransaction: Scalars['Bytes'];
};

export type Token = {
  __typename?: 'Token';
  address: Scalars['Bytes'];
  coins?: Maybe<Array<Coin>>;
  decimals: Scalars['BigInt'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  pools?: Maybe<Array<Pool>>;
  symbol?: Maybe<Scalars['String']>;
  underlyingCoins?: Maybe<Array<UnderlyingCoin>>;
};


export type TokenCoinsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Coin_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Coin_Filter>;
};


export type TokenPoolsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pool_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Pool_Filter>;
};


export type TokenUnderlyingCoinsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UnderlyingCoin_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UnderlyingCoin_Filter>;
};

export enum Pool_OrderBy {
  A = 'A',
  AddedAt = 'addedAt',
  AddedAtBlock = 'addedAtBlock',
  AddedAtTransaction = 'addedAtTransaction',
  AdminFee = 'adminFee',
  AssetType = 'assetType',
  CoinCount = 'coinCount',
  Coins = 'coins',
  DailyVolumes = 'dailyVolumes',
  Events = 'events',
  ExchangeCount = 'exchangeCount',
  Exchanges = 'exchanges',
  Fee = 'fee',
  GaugeCount = 'gaugeCount',
  Gauges = 'gauges',
  HourlyVolumes = 'hourlyVolumes',
  Id = 'id',
  IsMeta = 'isMeta',
  Locked = 'locked',
  LpToken = 'lpToken',
  Name = 'name',
  Owner = 'owner',
  RegistryAddress = 'registryAddress',
  RemovedAt = 'removedAt',
  RemovedAtBlock = 'removedAtBlock',
  RemovedAtTransaction = 'removedAtTransaction',
  SwapAddress = 'swapAddress',
  UnderlyingCoins = 'underlyingCoins',
  UnderlyingCount = 'underlyingCount',
  VirtualPrice = 'virtualPrice',
  WeeklyVolumes = 'weeklyVolumes'
}

export type Pool_Filter = {
  A?: InputMaybe<Scalars['BigInt']>;
  A_gt?: InputMaybe<Scalars['BigInt']>;
  A_gte?: InputMaybe<Scalars['BigInt']>;
  A_in?: InputMaybe<Array<Scalars['BigInt']>>;
  A_lt?: InputMaybe<Scalars['BigInt']>;
  A_lte?: InputMaybe<Scalars['BigInt']>;
  A_not?: InputMaybe<Scalars['BigInt']>;
  A_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  addedAt?: InputMaybe<Scalars['BigInt']>;
  addedAt_gt?: InputMaybe<Scalars['BigInt']>;
  addedAt_gte?: InputMaybe<Scalars['BigInt']>;
  addedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  addedAt_lt?: InputMaybe<Scalars['BigInt']>;
  addedAt_lte?: InputMaybe<Scalars['BigInt']>;
  addedAt_not?: InputMaybe<Scalars['BigInt']>;
  addedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  addedAtBlock?: InputMaybe<Scalars['BigInt']>;
  addedAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  addedAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  addedAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  addedAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  addedAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  addedAtBlock_not?: InputMaybe<Scalars['BigInt']>;
  addedAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  addedAtTransaction?: InputMaybe<Scalars['Bytes']>;
  addedAtTransaction_contains?: InputMaybe<Scalars['Bytes']>;
  addedAtTransaction_in?: InputMaybe<Array<Scalars['Bytes']>>;
  addedAtTransaction_not?: InputMaybe<Scalars['Bytes']>;
  addedAtTransaction_not_contains?: InputMaybe<Scalars['Bytes']>;
  addedAtTransaction_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  adminFee?: InputMaybe<Scalars['BigDecimal']>;
  adminFee_gt?: InputMaybe<Scalars['BigDecimal']>;
  adminFee_gte?: InputMaybe<Scalars['BigDecimal']>;
  adminFee_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  adminFee_lt?: InputMaybe<Scalars['BigDecimal']>;
  adminFee_lte?: InputMaybe<Scalars['BigDecimal']>;
  adminFee_not?: InputMaybe<Scalars['BigDecimal']>;
  adminFee_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  assetType?: InputMaybe<AssetType>;
  assetType_in?: InputMaybe<Array<AssetType>>;
  assetType_not?: InputMaybe<AssetType>;
  assetType_not_in?: InputMaybe<Array<AssetType>>;
  coinCount?: InputMaybe<Scalars['BigInt']>;
  coinCount_gt?: InputMaybe<Scalars['BigInt']>;
  coinCount_gte?: InputMaybe<Scalars['BigInt']>;
  coinCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  coinCount_lt?: InputMaybe<Scalars['BigInt']>;
  coinCount_lte?: InputMaybe<Scalars['BigInt']>;
  coinCount_not?: InputMaybe<Scalars['BigInt']>;
  coinCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  exchangeCount?: InputMaybe<Scalars['BigInt']>;
  exchangeCount_gt?: InputMaybe<Scalars['BigInt']>;
  exchangeCount_gte?: InputMaybe<Scalars['BigInt']>;
  exchangeCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  exchangeCount_lt?: InputMaybe<Scalars['BigInt']>;
  exchangeCount_lte?: InputMaybe<Scalars['BigInt']>;
  exchangeCount_not?: InputMaybe<Scalars['BigInt']>;
  exchangeCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fee?: InputMaybe<Scalars['BigDecimal']>;
  fee_gt?: InputMaybe<Scalars['BigDecimal']>;
  fee_gte?: InputMaybe<Scalars['BigDecimal']>;
  fee_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  fee_lt?: InputMaybe<Scalars['BigDecimal']>;
  fee_lte?: InputMaybe<Scalars['BigDecimal']>;
  fee_not?: InputMaybe<Scalars['BigDecimal']>;
  fee_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  gaugeCount?: InputMaybe<Scalars['BigInt']>;
  gaugeCount_gt?: InputMaybe<Scalars['BigInt']>;
  gaugeCount_gte?: InputMaybe<Scalars['BigInt']>;
  gaugeCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gaugeCount_lt?: InputMaybe<Scalars['BigInt']>;
  gaugeCount_lte?: InputMaybe<Scalars['BigInt']>;
  gaugeCount_not?: InputMaybe<Scalars['BigInt']>;
  gaugeCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  isMeta?: InputMaybe<Scalars['Boolean']>;
  isMeta_in?: InputMaybe<Array<Scalars['Boolean']>>;
  isMeta_not?: InputMaybe<Scalars['Boolean']>;
  isMeta_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  locked?: InputMaybe<Scalars['BigDecimal']>;
  locked_gt?: InputMaybe<Scalars['BigDecimal']>;
  locked_gte?: InputMaybe<Scalars['BigDecimal']>;
  locked_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  locked_lt?: InputMaybe<Scalars['BigDecimal']>;
  locked_lte?: InputMaybe<Scalars['BigDecimal']>;
  locked_not?: InputMaybe<Scalars['BigDecimal']>;
  locked_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  lpToken?: InputMaybe<Scalars['String']>;
  lpToken_contains?: InputMaybe<Scalars['String']>;
  lpToken_ends_with?: InputMaybe<Scalars['String']>;
  lpToken_gt?: InputMaybe<Scalars['String']>;
  lpToken_gte?: InputMaybe<Scalars['String']>;
  lpToken_in?: InputMaybe<Array<Scalars['String']>>;
  lpToken_lt?: InputMaybe<Scalars['String']>;
  lpToken_lte?: InputMaybe<Scalars['String']>;
  lpToken_not?: InputMaybe<Scalars['String']>;
  lpToken_not_contains?: InputMaybe<Scalars['String']>;
  lpToken_not_ends_with?: InputMaybe<Scalars['String']>;
  lpToken_not_in?: InputMaybe<Array<Scalars['String']>>;
  lpToken_not_starts_with?: InputMaybe<Scalars['String']>;
  lpToken_starts_with?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['Bytes']>;
  owner_contains?: InputMaybe<Scalars['Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_not?: InputMaybe<Scalars['Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  registryAddress?: InputMaybe<Scalars['Bytes']>;
  registryAddress_contains?: InputMaybe<Scalars['Bytes']>;
  registryAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  registryAddress_not?: InputMaybe<Scalars['Bytes']>;
  registryAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  registryAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  removedAt?: InputMaybe<Scalars['BigInt']>;
  removedAt_gt?: InputMaybe<Scalars['BigInt']>;
  removedAt_gte?: InputMaybe<Scalars['BigInt']>;
  removedAt_in?: InputMaybe<Array<Scalars['BigInt']>>;
  removedAt_lt?: InputMaybe<Scalars['BigInt']>;
  removedAt_lte?: InputMaybe<Scalars['BigInt']>;
  removedAt_not?: InputMaybe<Scalars['BigInt']>;
  removedAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  removedAtBlock?: InputMaybe<Scalars['BigInt']>;
  removedAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  removedAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  removedAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  removedAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  removedAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  removedAtBlock_not?: InputMaybe<Scalars['BigInt']>;
  removedAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  removedAtTransaction?: InputMaybe<Scalars['Bytes']>;
  removedAtTransaction_contains?: InputMaybe<Scalars['Bytes']>;
  removedAtTransaction_in?: InputMaybe<Array<Scalars['Bytes']>>;
  removedAtTransaction_not?: InputMaybe<Scalars['Bytes']>;
  removedAtTransaction_not_contains?: InputMaybe<Scalars['Bytes']>;
  removedAtTransaction_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  swapAddress?: InputMaybe<Scalars['Bytes']>;
  swapAddress_contains?: InputMaybe<Scalars['Bytes']>;
  swapAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
  swapAddress_not?: InputMaybe<Scalars['Bytes']>;
  swapAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
  swapAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  underlyingCount?: InputMaybe<Scalars['BigInt']>;
  underlyingCount_gt?: InputMaybe<Scalars['BigInt']>;
  underlyingCount_gte?: InputMaybe<Scalars['BigInt']>;
  underlyingCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  underlyingCount_lt?: InputMaybe<Scalars['BigInt']>;
  underlyingCount_lte?: InputMaybe<Scalars['BigInt']>;
  underlyingCount_not?: InputMaybe<Scalars['BigInt']>;
  underlyingCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  virtualPrice?: InputMaybe<Scalars['BigDecimal']>;
  virtualPrice_gt?: InputMaybe<Scalars['BigDecimal']>;
  virtualPrice_gte?: InputMaybe<Scalars['BigDecimal']>;
  virtualPrice_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  virtualPrice_lt?: InputMaybe<Scalars['BigDecimal']>;
  virtualPrice_lte?: InputMaybe<Scalars['BigDecimal']>;
  virtualPrice_not?: InputMaybe<Scalars['BigDecimal']>;
  virtualPrice_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum UnderlyingCoin_OrderBy {
  Balance = 'balance',
  Coin = 'coin',
  Id = 'id',
  Index = 'index',
  Pool = 'pool',
  Token = 'token',
  Updated = 'updated',
  UpdatedAtBlock = 'updatedAtBlock',
  UpdatedAtTransaction = 'updatedAtTransaction'
}

export type UnderlyingCoin_Filter = {
  balance?: InputMaybe<Scalars['BigDecimal']>;
  balance_gt?: InputMaybe<Scalars['BigDecimal']>;
  balance_gte?: InputMaybe<Scalars['BigDecimal']>;
  balance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  balance_lt?: InputMaybe<Scalars['BigDecimal']>;
  balance_lte?: InputMaybe<Scalars['BigDecimal']>;
  balance_not?: InputMaybe<Scalars['BigDecimal']>;
  balance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  coin?: InputMaybe<Scalars['String']>;
  coin_contains?: InputMaybe<Scalars['String']>;
  coin_ends_with?: InputMaybe<Scalars['String']>;
  coin_gt?: InputMaybe<Scalars['String']>;
  coin_gte?: InputMaybe<Scalars['String']>;
  coin_in?: InputMaybe<Array<Scalars['String']>>;
  coin_lt?: InputMaybe<Scalars['String']>;
  coin_lte?: InputMaybe<Scalars['String']>;
  coin_not?: InputMaybe<Scalars['String']>;
  coin_not_contains?: InputMaybe<Scalars['String']>;
  coin_not_ends_with?: InputMaybe<Scalars['String']>;
  coin_not_in?: InputMaybe<Array<Scalars['String']>>;
  coin_not_starts_with?: InputMaybe<Scalars['String']>;
  coin_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  index?: InputMaybe<Scalars['Int']>;
  index_gt?: InputMaybe<Scalars['Int']>;
  index_gte?: InputMaybe<Scalars['Int']>;
  index_in?: InputMaybe<Array<Scalars['Int']>>;
  index_lt?: InputMaybe<Scalars['Int']>;
  index_lte?: InputMaybe<Scalars['Int']>;
  index_not?: InputMaybe<Scalars['Int']>;
  index_not_in?: InputMaybe<Array<Scalars['Int']>>;
  pool?: InputMaybe<Scalars['String']>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['String']>;
  token_contains?: InputMaybe<Scalars['String']>;
  token_ends_with?: InputMaybe<Scalars['String']>;
  token_gt?: InputMaybe<Scalars['String']>;
  token_gte?: InputMaybe<Scalars['String']>;
  token_in?: InputMaybe<Array<Scalars['String']>>;
  token_lt?: InputMaybe<Scalars['String']>;
  token_lte?: InputMaybe<Scalars['String']>;
  token_not?: InputMaybe<Scalars['String']>;
  token_not_contains?: InputMaybe<Scalars['String']>;
  token_not_ends_with?: InputMaybe<Scalars['String']>;
  token_not_in?: InputMaybe<Array<Scalars['String']>>;
  token_not_starts_with?: InputMaybe<Scalars['String']>;
  token_starts_with?: InputMaybe<Scalars['String']>;
  updated?: InputMaybe<Scalars['BigInt']>;
  updated_gt?: InputMaybe<Scalars['BigInt']>;
  updated_gte?: InputMaybe<Scalars['BigInt']>;
  updated_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updated_lt?: InputMaybe<Scalars['BigInt']>;
  updated_lte?: InputMaybe<Scalars['BigInt']>;
  updated_not?: InputMaybe<Scalars['BigInt']>;
  updated_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAtBlock?: InputMaybe<Scalars['BigInt']>;
  updatedAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  updatedAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  updatedAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  updatedAtBlock_not?: InputMaybe<Scalars['BigInt']>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAtTransaction?: InputMaybe<Scalars['Bytes']>;
  updatedAtTransaction_contains?: InputMaybe<Scalars['Bytes']>;
  updatedAtTransaction_in?: InputMaybe<Array<Scalars['Bytes']>>;
  updatedAtTransaction_not?: InputMaybe<Scalars['Bytes']>;
  updatedAtTransaction_not_contains?: InputMaybe<Scalars['Bytes']>;
  updatedAtTransaction_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export type UnderlyingCoin = {
  __typename?: 'UnderlyingCoin';
  balance: Scalars['BigDecimal'];
  coin: Coin;
  /**  Equals to: <pool_id>-<coin_index> */
  id: Scalars['ID'];
  /**  Coin index  */
  index: Scalars['Int'];
  pool: Pool;
  token: Token;
  updated: Scalars['BigInt'];
  updatedAtBlock: Scalars['BigInt'];
  updatedAtTransaction: Scalars['Bytes'];
};

export enum DailyVolume_OrderBy {
  Id = 'id',
  Pool = 'pool',
  Timestamp = 'timestamp',
  Volume = 'volume'
}

export type DailyVolume_Filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  pool?: InputMaybe<Scalars['String']>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volume_lt?: InputMaybe<Scalars['BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['BigDecimal']>;
  volume_not?: InputMaybe<Scalars['BigDecimal']>;
  volume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export type DailyVolume = TradeVolume & {
  __typename?: 'DailyVolume';
  id: Scalars['ID'];
  pool: Pool;
  timestamp: Scalars['BigInt'];
  volume: Scalars['BigDecimal'];
};

export type TradeVolume = {
  pool: Pool;
  timestamp: Scalars['BigInt'];
  volume: Scalars['BigDecimal'];
};

export enum PoolEvent_OrderBy {
  Block = 'block',
  Pool = 'pool',
  Timestamp = 'timestamp',
  Transaction = 'transaction'
}

export type PoolEvent_Filter = {
  block?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pool?: InputMaybe<Scalars['String']>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transaction?: InputMaybe<Scalars['Bytes']>;
  transaction_contains?: InputMaybe<Scalars['Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transaction_not?: InputMaybe<Scalars['Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['Bytes']>;
  transaction_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export type PoolEvent = {
  block: Scalars['BigInt'];
  pool: Pool;
  timestamp: Scalars['BigInt'];
  transaction: Scalars['Bytes'];
};

export enum Exchange_OrderBy {
  AmountBought = 'amountBought',
  AmountSold = 'amountSold',
  Block = 'block',
  Buyer = 'buyer',
  Id = 'id',
  Pool = 'pool',
  Receiver = 'receiver',
  Timestamp = 'timestamp',
  TokenBought = 'tokenBought',
  TokenSold = 'tokenSold',
  Transaction = 'transaction'
}

export type Exchange_Filter = {
  amountBought?: InputMaybe<Scalars['BigDecimal']>;
  amountBought_gt?: InputMaybe<Scalars['BigDecimal']>;
  amountBought_gte?: InputMaybe<Scalars['BigDecimal']>;
  amountBought_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amountBought_lt?: InputMaybe<Scalars['BigDecimal']>;
  amountBought_lte?: InputMaybe<Scalars['BigDecimal']>;
  amountBought_not?: InputMaybe<Scalars['BigDecimal']>;
  amountBought_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amountSold?: InputMaybe<Scalars['BigDecimal']>;
  amountSold_gt?: InputMaybe<Scalars['BigDecimal']>;
  amountSold_gte?: InputMaybe<Scalars['BigDecimal']>;
  amountSold_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  amountSold_lt?: InputMaybe<Scalars['BigDecimal']>;
  amountSold_lte?: InputMaybe<Scalars['BigDecimal']>;
  amountSold_not?: InputMaybe<Scalars['BigDecimal']>;
  amountSold_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  block?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  buyer?: InputMaybe<Scalars['String']>;
  buyer_contains?: InputMaybe<Scalars['String']>;
  buyer_ends_with?: InputMaybe<Scalars['String']>;
  buyer_gt?: InputMaybe<Scalars['String']>;
  buyer_gte?: InputMaybe<Scalars['String']>;
  buyer_in?: InputMaybe<Array<Scalars['String']>>;
  buyer_lt?: InputMaybe<Scalars['String']>;
  buyer_lte?: InputMaybe<Scalars['String']>;
  buyer_not?: InputMaybe<Scalars['String']>;
  buyer_not_contains?: InputMaybe<Scalars['String']>;
  buyer_not_ends_with?: InputMaybe<Scalars['String']>;
  buyer_not_in?: InputMaybe<Array<Scalars['String']>>;
  buyer_not_starts_with?: InputMaybe<Scalars['String']>;
  buyer_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  pool?: InputMaybe<Scalars['String']>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  receiver?: InputMaybe<Scalars['String']>;
  receiver_contains?: InputMaybe<Scalars['String']>;
  receiver_ends_with?: InputMaybe<Scalars['String']>;
  receiver_gt?: InputMaybe<Scalars['String']>;
  receiver_gte?: InputMaybe<Scalars['String']>;
  receiver_in?: InputMaybe<Array<Scalars['String']>>;
  receiver_lt?: InputMaybe<Scalars['String']>;
  receiver_lte?: InputMaybe<Scalars['String']>;
  receiver_not?: InputMaybe<Scalars['String']>;
  receiver_not_contains?: InputMaybe<Scalars['String']>;
  receiver_not_ends_with?: InputMaybe<Scalars['String']>;
  receiver_not_in?: InputMaybe<Array<Scalars['String']>>;
  receiver_not_starts_with?: InputMaybe<Scalars['String']>;
  receiver_starts_with?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenBought?: InputMaybe<Scalars['String']>;
  tokenBought_contains?: InputMaybe<Scalars['String']>;
  tokenBought_ends_with?: InputMaybe<Scalars['String']>;
  tokenBought_gt?: InputMaybe<Scalars['String']>;
  tokenBought_gte?: InputMaybe<Scalars['String']>;
  tokenBought_in?: InputMaybe<Array<Scalars['String']>>;
  tokenBought_lt?: InputMaybe<Scalars['String']>;
  tokenBought_lte?: InputMaybe<Scalars['String']>;
  tokenBought_not?: InputMaybe<Scalars['String']>;
  tokenBought_not_contains?: InputMaybe<Scalars['String']>;
  tokenBought_not_ends_with?: InputMaybe<Scalars['String']>;
  tokenBought_not_in?: InputMaybe<Array<Scalars['String']>>;
  tokenBought_not_starts_with?: InputMaybe<Scalars['String']>;
  tokenBought_starts_with?: InputMaybe<Scalars['String']>;
  tokenSold?: InputMaybe<Scalars['String']>;
  tokenSold_contains?: InputMaybe<Scalars['String']>;
  tokenSold_ends_with?: InputMaybe<Scalars['String']>;
  tokenSold_gt?: InputMaybe<Scalars['String']>;
  tokenSold_gte?: InputMaybe<Scalars['String']>;
  tokenSold_in?: InputMaybe<Array<Scalars['String']>>;
  tokenSold_lt?: InputMaybe<Scalars['String']>;
  tokenSold_lte?: InputMaybe<Scalars['String']>;
  tokenSold_not?: InputMaybe<Scalars['String']>;
  tokenSold_not_contains?: InputMaybe<Scalars['String']>;
  tokenSold_not_ends_with?: InputMaybe<Scalars['String']>;
  tokenSold_not_in?: InputMaybe<Array<Scalars['String']>>;
  tokenSold_not_starts_with?: InputMaybe<Scalars['String']>;
  tokenSold_starts_with?: InputMaybe<Scalars['String']>;
  transaction?: InputMaybe<Scalars['Bytes']>;
  transaction_contains?: InputMaybe<Scalars['Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transaction_not?: InputMaybe<Scalars['Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['Bytes']>;
  transaction_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export type Exchange = PoolEvent & {
  __typename?: 'Exchange';
  amountBought: Scalars['BigDecimal'];
  amountSold: Scalars['BigDecimal'];
  block: Scalars['BigInt'];
  buyer: Account;
  id: Scalars['ID'];
  pool: Pool;
  receiver: Account;
  timestamp: Scalars['BigInt'];
  tokenBought: Token;
  tokenSold: Token;
  transaction: Scalars['Bytes'];
};

export enum Gauge_OrderBy {
  Address = 'address',
  Created = 'created',
  CreatedAtBlock = 'createdAtBlock',
  CreatedAtTransaction = 'createdAtTransaction',
  Id = 'id',
  Pool = 'pool',
  Type = 'type',
  Weights = 'weights',
  WeightVotes = 'weightVotes'
}

export type Gauge_Filter = {
  address?: InputMaybe<Scalars['Bytes']>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  created?: InputMaybe<Scalars['BigInt']>;
  created_gt?: InputMaybe<Scalars['BigInt']>;
  created_gte?: InputMaybe<Scalars['BigInt']>;
  created_in?: InputMaybe<Array<Scalars['BigInt']>>;
  created_lt?: InputMaybe<Scalars['BigInt']>;
  created_lte?: InputMaybe<Scalars['BigInt']>;
  created_not?: InputMaybe<Scalars['BigInt']>;
  created_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAtBlock?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_not?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAtTransaction?: InputMaybe<Scalars['Bytes']>;
  createdAtTransaction_contains?: InputMaybe<Scalars['Bytes']>;
  createdAtTransaction_in?: InputMaybe<Array<Scalars['Bytes']>>;
  createdAtTransaction_not?: InputMaybe<Scalars['Bytes']>;
  createdAtTransaction_not_contains?: InputMaybe<Scalars['Bytes']>;
  createdAtTransaction_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  pool?: InputMaybe<Scalars['String']>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  type_contains?: InputMaybe<Scalars['String']>;
  type_ends_with?: InputMaybe<Scalars['String']>;
  type_gt?: InputMaybe<Scalars['String']>;
  type_gte?: InputMaybe<Scalars['String']>;
  type_in?: InputMaybe<Array<Scalars['String']>>;
  type_lt?: InputMaybe<Scalars['String']>;
  type_lte?: InputMaybe<Scalars['String']>;
  type_not?: InputMaybe<Scalars['String']>;
  type_not_contains?: InputMaybe<Scalars['String']>;
  type_not_ends_with?: InputMaybe<Scalars['String']>;
  type_not_in?: InputMaybe<Array<Scalars['String']>>;
  type_not_starts_with?: InputMaybe<Scalars['String']>;
  type_starts_with?: InputMaybe<Scalars['String']>;
};

export enum HourlyVolume_OrderBy {
  Id = 'id',
  Pool = 'pool',
  Timestamp = 'timestamp',
  Volume = 'volume'
}

export type HourlyVolume_Filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  pool?: InputMaybe<Scalars['String']>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volume_lt?: InputMaybe<Scalars['BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['BigDecimal']>;
  volume_not?: InputMaybe<Scalars['BigDecimal']>;
  volume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export type HourlyVolume = TradeVolume & {
  __typename?: 'HourlyVolume';
  id: Scalars['ID'];
  pool: Pool;
  timestamp: Scalars['BigInt'];
  volume: Scalars['BigDecimal'];
};

export type LpToken = {
  __typename?: 'LpToken';
  address: Scalars['Bytes'];
  decimals: Scalars['BigInt'];
  gauge?: Maybe<Gauge>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  pool?: Maybe<Pool>;
  symbol?: Maybe<Scalars['String']>;
};

export enum WeeklyVolume_OrderBy {
  Id = 'id',
  Pool = 'pool',
  Timestamp = 'timestamp',
  Volume = 'volume'
}

export type WeeklyVolume_Filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  pool?: InputMaybe<Scalars['String']>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volume_lt?: InputMaybe<Scalars['BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['BigDecimal']>;
  volume_not?: InputMaybe<Scalars['BigDecimal']>;
  volume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export type WeeklyVolume = TradeVolume & {
  __typename?: 'WeeklyVolume';
  id: Scalars['ID'];
  pool: Pool;
  timestamp: Scalars['BigInt'];
  volume: Scalars['BigDecimal'];
};

export type GaugeType = {
  __typename?: 'GaugeType';
  gaugeCount: Scalars['BigInt'];
  gauges?: Maybe<Array<Gauge>>;
  id: Scalars['ID'];
  name: Scalars['String'];
  weights?: Maybe<Array<GaugeTypeWeight>>;
};


export type GaugeTypeGaugesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Gauge_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Gauge_Filter>;
};


export type GaugeTypeWeightsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GaugeTypeWeight_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<GaugeTypeWeight_Filter>;
};

export enum GaugeTypeWeight_OrderBy {
  Id = 'id',
  Time = 'time',
  Type = 'type',
  Weight = 'weight'
}

export type GaugeTypeWeight_Filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  time?: InputMaybe<Scalars['BigInt']>;
  time_gt?: InputMaybe<Scalars['BigInt']>;
  time_gte?: InputMaybe<Scalars['BigInt']>;
  time_in?: InputMaybe<Array<Scalars['BigInt']>>;
  time_lt?: InputMaybe<Scalars['BigInt']>;
  time_lte?: InputMaybe<Scalars['BigInt']>;
  time_not?: InputMaybe<Scalars['BigInt']>;
  time_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  type?: InputMaybe<Scalars['String']>;
  type_contains?: InputMaybe<Scalars['String']>;
  type_ends_with?: InputMaybe<Scalars['String']>;
  type_gt?: InputMaybe<Scalars['String']>;
  type_gte?: InputMaybe<Scalars['String']>;
  type_in?: InputMaybe<Array<Scalars['String']>>;
  type_lt?: InputMaybe<Scalars['String']>;
  type_lte?: InputMaybe<Scalars['String']>;
  type_not?: InputMaybe<Scalars['String']>;
  type_not_contains?: InputMaybe<Scalars['String']>;
  type_not_ends_with?: InputMaybe<Scalars['String']>;
  type_not_in?: InputMaybe<Array<Scalars['String']>>;
  type_not_starts_with?: InputMaybe<Scalars['String']>;
  type_starts_with?: InputMaybe<Scalars['String']>;
  weight?: InputMaybe<Scalars['BigDecimal']>;
  weight_gt?: InputMaybe<Scalars['BigDecimal']>;
  weight_gte?: InputMaybe<Scalars['BigDecimal']>;
  weight_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  weight_lt?: InputMaybe<Scalars['BigDecimal']>;
  weight_lte?: InputMaybe<Scalars['BigDecimal']>;
  weight_not?: InputMaybe<Scalars['BigDecimal']>;
  weight_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export type GaugeTypeWeight = {
  __typename?: 'GaugeTypeWeight';
  id: Scalars['ID'];
  time: Scalars['BigInt'];
  type: GaugeType;
  weight: Scalars['BigDecimal'];
};

export enum GaugeWeight_OrderBy {
  Gauge = 'gauge',
  Id = 'id',
  Time = 'time',
  Weight = 'weight'
}

export type GaugeWeight_Filter = {
  gauge?: InputMaybe<Scalars['String']>;
  gauge_contains?: InputMaybe<Scalars['String']>;
  gauge_ends_with?: InputMaybe<Scalars['String']>;
  gauge_gt?: InputMaybe<Scalars['String']>;
  gauge_gte?: InputMaybe<Scalars['String']>;
  gauge_in?: InputMaybe<Array<Scalars['String']>>;
  gauge_lt?: InputMaybe<Scalars['String']>;
  gauge_lte?: InputMaybe<Scalars['String']>;
  gauge_not?: InputMaybe<Scalars['String']>;
  gauge_not_contains?: InputMaybe<Scalars['String']>;
  gauge_not_ends_with?: InputMaybe<Scalars['String']>;
  gauge_not_in?: InputMaybe<Array<Scalars['String']>>;
  gauge_not_starts_with?: InputMaybe<Scalars['String']>;
  gauge_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  time?: InputMaybe<Scalars['BigInt']>;
  time_gt?: InputMaybe<Scalars['BigInt']>;
  time_gte?: InputMaybe<Scalars['BigInt']>;
  time_in?: InputMaybe<Array<Scalars['BigInt']>>;
  time_lt?: InputMaybe<Scalars['BigInt']>;
  time_lte?: InputMaybe<Scalars['BigInt']>;
  time_not?: InputMaybe<Scalars['BigInt']>;
  time_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  weight?: InputMaybe<Scalars['BigDecimal']>;
  weight_gt?: InputMaybe<Scalars['BigDecimal']>;
  weight_gte?: InputMaybe<Scalars['BigDecimal']>;
  weight_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  weight_lt?: InputMaybe<Scalars['BigDecimal']>;
  weight_lte?: InputMaybe<Scalars['BigDecimal']>;
  weight_not?: InputMaybe<Scalars['BigDecimal']>;
  weight_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export type GaugeWeight = {
  __typename?: 'GaugeWeight';
  gauge: Gauge;
  id: Scalars['ID'];
  time: Scalars['BigInt'];
  weight: Scalars['BigDecimal'];
};

export enum GaugeWeightVote_OrderBy {
  Gauge = 'gauge',
  Id = 'id',
  Time = 'time',
  User = 'user',
  Weight = 'weight'
}

export type GaugeWeightVote_Filter = {
  gauge?: InputMaybe<Scalars['String']>;
  gauge_contains?: InputMaybe<Scalars['String']>;
  gauge_ends_with?: InputMaybe<Scalars['String']>;
  gauge_gt?: InputMaybe<Scalars['String']>;
  gauge_gte?: InputMaybe<Scalars['String']>;
  gauge_in?: InputMaybe<Array<Scalars['String']>>;
  gauge_lt?: InputMaybe<Scalars['String']>;
  gauge_lte?: InputMaybe<Scalars['String']>;
  gauge_not?: InputMaybe<Scalars['String']>;
  gauge_not_contains?: InputMaybe<Scalars['String']>;
  gauge_not_ends_with?: InputMaybe<Scalars['String']>;
  gauge_not_in?: InputMaybe<Array<Scalars['String']>>;
  gauge_not_starts_with?: InputMaybe<Scalars['String']>;
  gauge_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  time?: InputMaybe<Scalars['BigInt']>;
  time_gt?: InputMaybe<Scalars['BigInt']>;
  time_gte?: InputMaybe<Scalars['BigInt']>;
  time_in?: InputMaybe<Array<Scalars['BigInt']>>;
  time_lt?: InputMaybe<Scalars['BigInt']>;
  time_lte?: InputMaybe<Scalars['BigInt']>;
  time_not?: InputMaybe<Scalars['BigInt']>;
  time_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  user?: InputMaybe<Scalars['String']>;
  user_contains?: InputMaybe<Scalars['String']>;
  user_ends_with?: InputMaybe<Scalars['String']>;
  user_gt?: InputMaybe<Scalars['String']>;
  user_gte?: InputMaybe<Scalars['String']>;
  user_in?: InputMaybe<Array<Scalars['String']>>;
  user_lt?: InputMaybe<Scalars['String']>;
  user_lte?: InputMaybe<Scalars['String']>;
  user_not?: InputMaybe<Scalars['String']>;
  user_not_contains?: InputMaybe<Scalars['String']>;
  user_not_ends_with?: InputMaybe<Scalars['String']>;
  user_not_in?: InputMaybe<Array<Scalars['String']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']>;
  user_starts_with?: InputMaybe<Scalars['String']>;
  weight?: InputMaybe<Scalars['BigDecimal']>;
  weight_gt?: InputMaybe<Scalars['BigDecimal']>;
  weight_gte?: InputMaybe<Scalars['BigDecimal']>;
  weight_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  weight_lt?: InputMaybe<Scalars['BigDecimal']>;
  weight_lte?: InputMaybe<Scalars['BigDecimal']>;
  weight_not?: InputMaybe<Scalars['BigDecimal']>;
  weight_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export type GaugeWeightVote = {
  __typename?: 'GaugeWeightVote';
  gauge: Gauge;
  id: Scalars['ID'];
  time: Scalars['BigInt'];
  user: Account;
  weight: Scalars['BigDecimal'];
};

export enum Proposal_OrderBy {
  App = 'app',
  Created = 'created',
  CreatedAtBlock = 'createdAtBlock',
  CreatedAtTransaction = 'createdAtTransaction',
  Creator = 'creator',
  CurrentQuorum = 'currentQuorum',
  CurrentSupport = 'currentSupport',
  Executed = 'executed',
  ExecutedAtBlock = 'executedAtBlock',
  ExecutedAtTransaction = 'executedAtTransaction',
  ExecutionScript = 'executionScript',
  ExpireDate = 'expireDate',
  Id = 'id',
  Metadata = 'metadata',
  MinimumQuorum = 'minimumQuorum',
  NegativeVoteCount = 'negativeVoteCount',
  Number = 'number',
  PositiveVoteCount = 'positiveVoteCount',
  RequiredSupport = 'requiredSupport',
  SnapshotBlock = 'snapshotBlock',
  StakedSupport = 'stakedSupport',
  Text = 'text',
  TotalStaked = 'totalStaked',
  Updated = 'updated',
  UpdatedAtBlock = 'updatedAtBlock',
  UpdatedAtTransaction = 'updatedAtTransaction',
  VoteCount = 'voteCount',
  Votes = 'votes',
  VotingPower = 'votingPower'
}

export type Proposal_Filter = {
  app?: InputMaybe<Scalars['String']>;
  app_contains?: InputMaybe<Scalars['String']>;
  app_ends_with?: InputMaybe<Scalars['String']>;
  app_gt?: InputMaybe<Scalars['String']>;
  app_gte?: InputMaybe<Scalars['String']>;
  app_in?: InputMaybe<Array<Scalars['String']>>;
  app_lt?: InputMaybe<Scalars['String']>;
  app_lte?: InputMaybe<Scalars['String']>;
  app_not?: InputMaybe<Scalars['String']>;
  app_not_contains?: InputMaybe<Scalars['String']>;
  app_not_ends_with?: InputMaybe<Scalars['String']>;
  app_not_in?: InputMaybe<Array<Scalars['String']>>;
  app_not_starts_with?: InputMaybe<Scalars['String']>;
  app_starts_with?: InputMaybe<Scalars['String']>;
  created?: InputMaybe<Scalars['BigInt']>;
  created_gt?: InputMaybe<Scalars['BigInt']>;
  created_gte?: InputMaybe<Scalars['BigInt']>;
  created_in?: InputMaybe<Array<Scalars['BigInt']>>;
  created_lt?: InputMaybe<Scalars['BigInt']>;
  created_lte?: InputMaybe<Scalars['BigInt']>;
  created_not?: InputMaybe<Scalars['BigInt']>;
  created_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAtBlock?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_not?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAtTransaction?: InputMaybe<Scalars['Bytes']>;
  createdAtTransaction_contains?: InputMaybe<Scalars['Bytes']>;
  createdAtTransaction_in?: InputMaybe<Array<Scalars['Bytes']>>;
  createdAtTransaction_not?: InputMaybe<Scalars['Bytes']>;
  createdAtTransaction_not_contains?: InputMaybe<Scalars['Bytes']>;
  createdAtTransaction_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  creator?: InputMaybe<Scalars['String']>;
  creator_contains?: InputMaybe<Scalars['String']>;
  creator_ends_with?: InputMaybe<Scalars['String']>;
  creator_gt?: InputMaybe<Scalars['String']>;
  creator_gte?: InputMaybe<Scalars['String']>;
  creator_in?: InputMaybe<Array<Scalars['String']>>;
  creator_lt?: InputMaybe<Scalars['String']>;
  creator_lte?: InputMaybe<Scalars['String']>;
  creator_not?: InputMaybe<Scalars['String']>;
  creator_not_contains?: InputMaybe<Scalars['String']>;
  creator_not_ends_with?: InputMaybe<Scalars['String']>;
  creator_not_in?: InputMaybe<Array<Scalars['String']>>;
  creator_not_starts_with?: InputMaybe<Scalars['String']>;
  creator_starts_with?: InputMaybe<Scalars['String']>;
  currentQuorum?: InputMaybe<Scalars['BigDecimal']>;
  currentQuorum_gt?: InputMaybe<Scalars['BigDecimal']>;
  currentQuorum_gte?: InputMaybe<Scalars['BigDecimal']>;
  currentQuorum_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  currentQuorum_lt?: InputMaybe<Scalars['BigDecimal']>;
  currentQuorum_lte?: InputMaybe<Scalars['BigDecimal']>;
  currentQuorum_not?: InputMaybe<Scalars['BigDecimal']>;
  currentQuorum_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  currentSupport?: InputMaybe<Scalars['BigDecimal']>;
  currentSupport_gt?: InputMaybe<Scalars['BigDecimal']>;
  currentSupport_gte?: InputMaybe<Scalars['BigDecimal']>;
  currentSupport_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  currentSupport_lt?: InputMaybe<Scalars['BigDecimal']>;
  currentSupport_lte?: InputMaybe<Scalars['BigDecimal']>;
  currentSupport_not?: InputMaybe<Scalars['BigDecimal']>;
  currentSupport_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  executed?: InputMaybe<Scalars['BigInt']>;
  executed_gt?: InputMaybe<Scalars['BigInt']>;
  executed_gte?: InputMaybe<Scalars['BigInt']>;
  executed_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executed_lt?: InputMaybe<Scalars['BigInt']>;
  executed_lte?: InputMaybe<Scalars['BigInt']>;
  executed_not?: InputMaybe<Scalars['BigInt']>;
  executed_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedAtBlock?: InputMaybe<Scalars['BigInt']>;
  executedAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  executedAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  executedAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  executedAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  executedAtBlock_not?: InputMaybe<Scalars['BigInt']>;
  executedAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  executedAtTransaction?: InputMaybe<Scalars['Bytes']>;
  executedAtTransaction_contains?: InputMaybe<Scalars['Bytes']>;
  executedAtTransaction_in?: InputMaybe<Array<Scalars['Bytes']>>;
  executedAtTransaction_not?: InputMaybe<Scalars['Bytes']>;
  executedAtTransaction_not_contains?: InputMaybe<Scalars['Bytes']>;
  executedAtTransaction_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  executionScript?: InputMaybe<Scalars['Bytes']>;
  executionScript_contains?: InputMaybe<Scalars['Bytes']>;
  executionScript_in?: InputMaybe<Array<Scalars['Bytes']>>;
  executionScript_not?: InputMaybe<Scalars['Bytes']>;
  executionScript_not_contains?: InputMaybe<Scalars['Bytes']>;
  executionScript_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  expireDate?: InputMaybe<Scalars['BigInt']>;
  expireDate_gt?: InputMaybe<Scalars['BigInt']>;
  expireDate_gte?: InputMaybe<Scalars['BigInt']>;
  expireDate_in?: InputMaybe<Array<Scalars['BigInt']>>;
  expireDate_lt?: InputMaybe<Scalars['BigInt']>;
  expireDate_lte?: InputMaybe<Scalars['BigInt']>;
  expireDate_not?: InputMaybe<Scalars['BigInt']>;
  expireDate_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  metadata?: InputMaybe<Scalars['String']>;
  metadata_contains?: InputMaybe<Scalars['String']>;
  metadata_ends_with?: InputMaybe<Scalars['String']>;
  metadata_gt?: InputMaybe<Scalars['String']>;
  metadata_gte?: InputMaybe<Scalars['String']>;
  metadata_in?: InputMaybe<Array<Scalars['String']>>;
  metadata_lt?: InputMaybe<Scalars['String']>;
  metadata_lte?: InputMaybe<Scalars['String']>;
  metadata_not?: InputMaybe<Scalars['String']>;
  metadata_not_contains?: InputMaybe<Scalars['String']>;
  metadata_not_ends_with?: InputMaybe<Scalars['String']>;
  metadata_not_in?: InputMaybe<Array<Scalars['String']>>;
  metadata_not_starts_with?: InputMaybe<Scalars['String']>;
  metadata_starts_with?: InputMaybe<Scalars['String']>;
  minimumQuorum?: InputMaybe<Scalars['BigDecimal']>;
  minimumQuorum_gt?: InputMaybe<Scalars['BigDecimal']>;
  minimumQuorum_gte?: InputMaybe<Scalars['BigDecimal']>;
  minimumQuorum_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  minimumQuorum_lt?: InputMaybe<Scalars['BigDecimal']>;
  minimumQuorum_lte?: InputMaybe<Scalars['BigDecimal']>;
  minimumQuorum_not?: InputMaybe<Scalars['BigDecimal']>;
  minimumQuorum_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  negativeVoteCount?: InputMaybe<Scalars['BigInt']>;
  negativeVoteCount_gt?: InputMaybe<Scalars['BigInt']>;
  negativeVoteCount_gte?: InputMaybe<Scalars['BigInt']>;
  negativeVoteCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  negativeVoteCount_lt?: InputMaybe<Scalars['BigInt']>;
  negativeVoteCount_lte?: InputMaybe<Scalars['BigInt']>;
  negativeVoteCount_not?: InputMaybe<Scalars['BigInt']>;
  negativeVoteCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  number?: InputMaybe<Scalars['BigInt']>;
  number_gt?: InputMaybe<Scalars['BigInt']>;
  number_gte?: InputMaybe<Scalars['BigInt']>;
  number_in?: InputMaybe<Array<Scalars['BigInt']>>;
  number_lt?: InputMaybe<Scalars['BigInt']>;
  number_lte?: InputMaybe<Scalars['BigInt']>;
  number_not?: InputMaybe<Scalars['BigInt']>;
  number_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  positiveVoteCount?: InputMaybe<Scalars['BigInt']>;
  positiveVoteCount_gt?: InputMaybe<Scalars['BigInt']>;
  positiveVoteCount_gte?: InputMaybe<Scalars['BigInt']>;
  positiveVoteCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  positiveVoteCount_lt?: InputMaybe<Scalars['BigInt']>;
  positiveVoteCount_lte?: InputMaybe<Scalars['BigInt']>;
  positiveVoteCount_not?: InputMaybe<Scalars['BigInt']>;
  positiveVoteCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  requiredSupport?: InputMaybe<Scalars['BigDecimal']>;
  requiredSupport_gt?: InputMaybe<Scalars['BigDecimal']>;
  requiredSupport_gte?: InputMaybe<Scalars['BigDecimal']>;
  requiredSupport_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  requiredSupport_lt?: InputMaybe<Scalars['BigDecimal']>;
  requiredSupport_lte?: InputMaybe<Scalars['BigDecimal']>;
  requiredSupport_not?: InputMaybe<Scalars['BigDecimal']>;
  requiredSupport_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  snapshotBlock?: InputMaybe<Scalars['BigInt']>;
  snapshotBlock_gt?: InputMaybe<Scalars['BigInt']>;
  snapshotBlock_gte?: InputMaybe<Scalars['BigInt']>;
  snapshotBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  snapshotBlock_lt?: InputMaybe<Scalars['BigInt']>;
  snapshotBlock_lte?: InputMaybe<Scalars['BigInt']>;
  snapshotBlock_not?: InputMaybe<Scalars['BigInt']>;
  snapshotBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  stakedSupport?: InputMaybe<Scalars['BigDecimal']>;
  stakedSupport_gt?: InputMaybe<Scalars['BigDecimal']>;
  stakedSupport_gte?: InputMaybe<Scalars['BigDecimal']>;
  stakedSupport_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  stakedSupport_lt?: InputMaybe<Scalars['BigDecimal']>;
  stakedSupport_lte?: InputMaybe<Scalars['BigDecimal']>;
  stakedSupport_not?: InputMaybe<Scalars['BigDecimal']>;
  stakedSupport_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  text?: InputMaybe<Scalars['String']>;
  text_contains?: InputMaybe<Scalars['String']>;
  text_ends_with?: InputMaybe<Scalars['String']>;
  text_gt?: InputMaybe<Scalars['String']>;
  text_gte?: InputMaybe<Scalars['String']>;
  text_in?: InputMaybe<Array<Scalars['String']>>;
  text_lt?: InputMaybe<Scalars['String']>;
  text_lte?: InputMaybe<Scalars['String']>;
  text_not?: InputMaybe<Scalars['String']>;
  text_not_contains?: InputMaybe<Scalars['String']>;
  text_not_ends_with?: InputMaybe<Scalars['String']>;
  text_not_in?: InputMaybe<Array<Scalars['String']>>;
  text_not_starts_with?: InputMaybe<Scalars['String']>;
  text_starts_with?: InputMaybe<Scalars['String']>;
  totalStaked?: InputMaybe<Scalars['BigDecimal']>;
  totalStaked_gt?: InputMaybe<Scalars['BigDecimal']>;
  totalStaked_gte?: InputMaybe<Scalars['BigDecimal']>;
  totalStaked_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  totalStaked_lt?: InputMaybe<Scalars['BigDecimal']>;
  totalStaked_lte?: InputMaybe<Scalars['BigDecimal']>;
  totalStaked_not?: InputMaybe<Scalars['BigDecimal']>;
  totalStaked_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  updated?: InputMaybe<Scalars['BigInt']>;
  updated_gt?: InputMaybe<Scalars['BigInt']>;
  updated_gte?: InputMaybe<Scalars['BigInt']>;
  updated_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updated_lt?: InputMaybe<Scalars['BigInt']>;
  updated_lte?: InputMaybe<Scalars['BigInt']>;
  updated_not?: InputMaybe<Scalars['BigInt']>;
  updated_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAtBlock?: InputMaybe<Scalars['BigInt']>;
  updatedAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  updatedAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  updatedAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  updatedAtBlock_not?: InputMaybe<Scalars['BigInt']>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAtTransaction?: InputMaybe<Scalars['Bytes']>;
  updatedAtTransaction_contains?: InputMaybe<Scalars['Bytes']>;
  updatedAtTransaction_in?: InputMaybe<Array<Scalars['Bytes']>>;
  updatedAtTransaction_not?: InputMaybe<Scalars['Bytes']>;
  updatedAtTransaction_not_contains?: InputMaybe<Scalars['Bytes']>;
  updatedAtTransaction_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  voteCount?: InputMaybe<Scalars['BigInt']>;
  voteCount_gt?: InputMaybe<Scalars['BigInt']>;
  voteCount_gte?: InputMaybe<Scalars['BigInt']>;
  voteCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  voteCount_lt?: InputMaybe<Scalars['BigInt']>;
  voteCount_lte?: InputMaybe<Scalars['BigInt']>;
  voteCount_not?: InputMaybe<Scalars['BigInt']>;
  voteCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  votingPower?: InputMaybe<Scalars['BigDecimal']>;
  votingPower_gt?: InputMaybe<Scalars['BigDecimal']>;
  votingPower_gte?: InputMaybe<Scalars['BigDecimal']>;
  votingPower_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  votingPower_lt?: InputMaybe<Scalars['BigDecimal']>;
  votingPower_lte?: InputMaybe<Scalars['BigDecimal']>;
  votingPower_not?: InputMaybe<Scalars['BigDecimal']>;
  votingPower_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export type Proposal = {
  __typename?: 'Proposal';
  /**  Voting app instance  */
  app: VotingApp;
  /**    */
  created: Scalars['BigInt'];
  /**    */
  createdAtBlock: Scalars['BigInt'];
  /**    */
  createdAtTransaction: Scalars['Bytes'];
  /**  Proposal creator's account  */
  creator: Account;
  /**    */
  currentQuorum: Scalars['BigDecimal'];
  /**    */
  currentSupport: Scalars['BigDecimal'];
  /**    */
  executed?: Maybe<Scalars['BigInt']>;
  /**    */
  executedAtBlock?: Maybe<Scalars['BigInt']>;
  /**    */
  executedAtTransaction?: Maybe<Scalars['Bytes']>;
  /**    */
  executionScript: Scalars['Bytes'];
  /**    */
  expireDate: Scalars['BigInt'];
  id: Scalars['ID'];
  /**  Link to metadata file  */
  metadata?: Maybe<Scalars['String']>;
  /**  Percentage of positive votes in total possible votes for this proposal to be accepted  */
  minimumQuorum: Scalars['BigDecimal'];
  /**  Number of negative votes (no) received by the proposal  */
  negativeVoteCount: Scalars['BigInt'];
  /**  Sequential number in related to the realted voting app  */
  number: Scalars['BigInt'];
  /**  Number of positive votes (yes) received by the proposal  */
  positiveVoteCount: Scalars['BigInt'];
  /**  Percentage of positive votes needed for this proposal to be accepted  */
  requiredSupport: Scalars['BigDecimal'];
  /**    */
  snapshotBlock: Scalars['BigInt'];
  /**    */
  stakedSupport: Scalars['BigDecimal'];
  /**  Proposal description text  */
  text?: Maybe<Scalars['String']>;
  /**    */
  totalStaked: Scalars['BigDecimal'];
  /**    */
  updated?: Maybe<Scalars['BigInt']>;
  /**    */
  updatedAtBlock?: Maybe<Scalars['BigInt']>;
  /**    */
  updatedAtTransaction?: Maybe<Scalars['Bytes']>;
  /**  Number of votes received by the proposal  */
  voteCount: Scalars['BigInt'];
  /**    */
  votes?: Maybe<Array<ProposalVote>>;
  /**    */
  votingPower: Scalars['BigDecimal'];
};


export type ProposalVotesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProposalVote_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ProposalVote_Filter>;
};

export type VotingApp = {
  __typename?: 'VotingApp';
  /**  Voting app instance  */
  address: Scalars['Bytes'];
  /**  App codename  */
  codename: Scalars['String'];
  /**  Equals to app address  */
  id: Scalars['ID'];
  /**  Minimum balance needed to create a proposal  */
  minimumBalance: Scalars['BigDecimal'];
  /**  Percentage of positive votes in total possible votes for a proposal to be accepted  */
  minimumQuorum: Scalars['BigDecimal'];
  /**  Minimum time needed to pass between user's previous proposal and a user creating a new proposal  */
  minimumTime: Scalars['BigInt'];
  /**  Number of proposals created with this app  */
  proposalCount: Scalars['BigInt'];
  /**  Proposals created through this app instance  */
  proposals?: Maybe<Array<Proposal>>;
  /**  Percentage of positive votes needed for a proposal to be accepted  */
  requiredSupport: Scalars['BigDecimal'];
  /**  Address of the token used for voting  */
  token: Scalars['Bytes'];
  /**  Number of votes received by all the proposals created with this app  */
  voteCount: Scalars['BigInt'];
  /**  Seconds that a proposal will be open for vote (unless enough votes have been cast to make an early decision)  */
  voteTime: Scalars['BigInt'];
};


export type VotingAppProposalsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Proposal_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Proposal_Filter>;
};

export enum ProposalVote_OrderBy {
  Created = 'created',
  CreatedAtBlock = 'createdAtBlock',
  CreatedAtTransaction = 'createdAtTransaction',
  Id = 'id',
  Proposal = 'proposal',
  Stake = 'stake',
  Supports = 'supports',
  Voter = 'voter'
}

export type ProposalVote_Filter = {
  created?: InputMaybe<Scalars['BigInt']>;
  created_gt?: InputMaybe<Scalars['BigInt']>;
  created_gte?: InputMaybe<Scalars['BigInt']>;
  created_in?: InputMaybe<Array<Scalars['BigInt']>>;
  created_lt?: InputMaybe<Scalars['BigInt']>;
  created_lte?: InputMaybe<Scalars['BigInt']>;
  created_not?: InputMaybe<Scalars['BigInt']>;
  created_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAtBlock?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_not?: InputMaybe<Scalars['BigInt']>;
  createdAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  createdAtTransaction?: InputMaybe<Scalars['Bytes']>;
  createdAtTransaction_contains?: InputMaybe<Scalars['Bytes']>;
  createdAtTransaction_in?: InputMaybe<Array<Scalars['Bytes']>>;
  createdAtTransaction_not?: InputMaybe<Scalars['Bytes']>;
  createdAtTransaction_not_contains?: InputMaybe<Scalars['Bytes']>;
  createdAtTransaction_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  proposal?: InputMaybe<Scalars['String']>;
  proposal_contains?: InputMaybe<Scalars['String']>;
  proposal_ends_with?: InputMaybe<Scalars['String']>;
  proposal_gt?: InputMaybe<Scalars['String']>;
  proposal_gte?: InputMaybe<Scalars['String']>;
  proposal_in?: InputMaybe<Array<Scalars['String']>>;
  proposal_lt?: InputMaybe<Scalars['String']>;
  proposal_lte?: InputMaybe<Scalars['String']>;
  proposal_not?: InputMaybe<Scalars['String']>;
  proposal_not_contains?: InputMaybe<Scalars['String']>;
  proposal_not_ends_with?: InputMaybe<Scalars['String']>;
  proposal_not_in?: InputMaybe<Array<Scalars['String']>>;
  proposal_not_starts_with?: InputMaybe<Scalars['String']>;
  proposal_starts_with?: InputMaybe<Scalars['String']>;
  stake?: InputMaybe<Scalars['BigDecimal']>;
  stake_gt?: InputMaybe<Scalars['BigDecimal']>;
  stake_gte?: InputMaybe<Scalars['BigDecimal']>;
  stake_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  stake_lt?: InputMaybe<Scalars['BigDecimal']>;
  stake_lte?: InputMaybe<Scalars['BigDecimal']>;
  stake_not?: InputMaybe<Scalars['BigDecimal']>;
  stake_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  supports?: InputMaybe<Scalars['Boolean']>;
  supports_in?: InputMaybe<Array<Scalars['Boolean']>>;
  supports_not?: InputMaybe<Scalars['Boolean']>;
  supports_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  voter?: InputMaybe<Scalars['String']>;
  voter_contains?: InputMaybe<Scalars['String']>;
  voter_ends_with?: InputMaybe<Scalars['String']>;
  voter_gt?: InputMaybe<Scalars['String']>;
  voter_gte?: InputMaybe<Scalars['String']>;
  voter_in?: InputMaybe<Array<Scalars['String']>>;
  voter_lt?: InputMaybe<Scalars['String']>;
  voter_lte?: InputMaybe<Scalars['String']>;
  voter_not?: InputMaybe<Scalars['String']>;
  voter_not_contains?: InputMaybe<Scalars['String']>;
  voter_not_ends_with?: InputMaybe<Scalars['String']>;
  voter_not_in?: InputMaybe<Array<Scalars['String']>>;
  voter_not_starts_with?: InputMaybe<Scalars['String']>;
  voter_starts_with?: InputMaybe<Scalars['String']>;
};

export type ProposalVote = {
  __typename?: 'ProposalVote';
  created: Scalars['BigInt'];
  createdAtBlock: Scalars['BigInt'];
  createdAtTransaction: Scalars['Bytes'];
  id: Scalars['ID'];
  proposal: Proposal;
  stake: Scalars['BigDecimal'];
  supports: Scalars['Boolean'];
  voter: Account;
};

export enum Account_OrderBy {
  Address = 'address',
  Gauges = 'gauges',
  GaugeWeightVotes = 'gaugeWeightVotes',
  Id = 'id',
  Proposals = 'proposals',
  ProposalVotes = 'proposalVotes'
}

export type Account_Filter = {
  address?: InputMaybe<Scalars['Bytes']>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
};

export type AddLiquidityEvent = PoolEvent & {
  __typename?: 'AddLiquidityEvent';
  block: Scalars['BigInt'];
  fees: Array<Scalars['BigInt']>;
  id: Scalars['ID'];
  invariant: Scalars['BigInt'];
  pool: Pool;
  provider: Account;
  timestamp: Scalars['BigInt'];
  tokenAmounts: Array<Scalars['BigInt']>;
  tokenSupply: Scalars['BigInt'];
  transaction: Scalars['Bytes'];
};

export enum AddLiquidityEvent_OrderBy {
  Block = 'block',
  Fees = 'fees',
  Id = 'id',
  Invariant = 'invariant',
  Pool = 'pool',
  Provider = 'provider',
  Timestamp = 'timestamp',
  TokenAmounts = 'tokenAmounts',
  TokenSupply = 'tokenSupply',
  Transaction = 'transaction'
}

export type AddLiquidityEvent_Filter = {
  block?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fees?: InputMaybe<Array<Scalars['BigInt']>>;
  fees_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  fees_not?: InputMaybe<Array<Scalars['BigInt']>>;
  fees_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  invariant?: InputMaybe<Scalars['BigInt']>;
  invariant_gt?: InputMaybe<Scalars['BigInt']>;
  invariant_gte?: InputMaybe<Scalars['BigInt']>;
  invariant_in?: InputMaybe<Array<Scalars['BigInt']>>;
  invariant_lt?: InputMaybe<Scalars['BigInt']>;
  invariant_lte?: InputMaybe<Scalars['BigInt']>;
  invariant_not?: InputMaybe<Scalars['BigInt']>;
  invariant_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pool?: InputMaybe<Scalars['String']>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  provider_contains?: InputMaybe<Scalars['String']>;
  provider_ends_with?: InputMaybe<Scalars['String']>;
  provider_gt?: InputMaybe<Scalars['String']>;
  provider_gte?: InputMaybe<Scalars['String']>;
  provider_in?: InputMaybe<Array<Scalars['String']>>;
  provider_lt?: InputMaybe<Scalars['String']>;
  provider_lte?: InputMaybe<Scalars['String']>;
  provider_not?: InputMaybe<Scalars['String']>;
  provider_not_contains?: InputMaybe<Scalars['String']>;
  provider_not_ends_with?: InputMaybe<Scalars['String']>;
  provider_not_in?: InputMaybe<Array<Scalars['String']>>;
  provider_not_starts_with?: InputMaybe<Scalars['String']>;
  provider_starts_with?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenAmounts?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenAmounts_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenAmounts_not?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenAmounts_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenSupply?: InputMaybe<Scalars['BigInt']>;
  tokenSupply_gt?: InputMaybe<Scalars['BigInt']>;
  tokenSupply_gte?: InputMaybe<Scalars['BigInt']>;
  tokenSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenSupply_lt?: InputMaybe<Scalars['BigInt']>;
  tokenSupply_lte?: InputMaybe<Scalars['BigInt']>;
  tokenSupply_not?: InputMaybe<Scalars['BigInt']>;
  tokenSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transaction?: InputMaybe<Scalars['Bytes']>;
  transaction_contains?: InputMaybe<Scalars['Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transaction_not?: InputMaybe<Scalars['Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['Bytes']>;
  transaction_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export type AdminFeeChangelog = PoolEvent & {
  __typename?: 'AdminFeeChangelog';
  block: Scalars['BigInt'];
  id: Scalars['ID'];
  pool: Pool;
  timestamp: Scalars['BigInt'];
  transaction: Scalars['Bytes'];
  value: Scalars['BigDecimal'];
};

export enum AdminFeeChangelog_OrderBy {
  Block = 'block',
  Id = 'id',
  Pool = 'pool',
  Timestamp = 'timestamp',
  Transaction = 'transaction',
  Value = 'value'
}

export type AdminFeeChangelog_Filter = {
  block?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  pool?: InputMaybe<Scalars['String']>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transaction?: InputMaybe<Scalars['Bytes']>;
  transaction_contains?: InputMaybe<Scalars['Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transaction_not?: InputMaybe<Scalars['Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['Bytes']>;
  transaction_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  value?: InputMaybe<Scalars['BigDecimal']>;
  value_gt?: InputMaybe<Scalars['BigDecimal']>;
  value_gte?: InputMaybe<Scalars['BigDecimal']>;
  value_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  value_lt?: InputMaybe<Scalars['BigDecimal']>;
  value_lte?: InputMaybe<Scalars['BigDecimal']>;
  value_not?: InputMaybe<Scalars['BigDecimal']>;
  value_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export type AmplificationCoeffChangelog = PoolEvent & {
  __typename?: 'AmplificationCoeffChangelog';
  block: Scalars['BigInt'];
  id: Scalars['ID'];
  pool: Pool;
  timestamp: Scalars['BigInt'];
  transaction: Scalars['Bytes'];
  value: Scalars['BigInt'];
};

export enum AmplificationCoeffChangelog_OrderBy {
  Block = 'block',
  Id = 'id',
  Pool = 'pool',
  Timestamp = 'timestamp',
  Transaction = 'transaction',
  Value = 'value'
}

export type AmplificationCoeffChangelog_Filter = {
  block?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  pool?: InputMaybe<Scalars['String']>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transaction?: InputMaybe<Scalars['Bytes']>;
  transaction_contains?: InputMaybe<Scalars['Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transaction_not?: InputMaybe<Scalars['Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['Bytes']>;
  transaction_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  value?: InputMaybe<Scalars['BigInt']>;
  value_gt?: InputMaybe<Scalars['BigInt']>;
  value_gte?: InputMaybe<Scalars['BigInt']>;
  value_in?: InputMaybe<Array<Scalars['BigInt']>>;
  value_lt?: InputMaybe<Scalars['BigInt']>;
  value_lte?: InputMaybe<Scalars['BigInt']>;
  value_not?: InputMaybe<Scalars['BigInt']>;
  value_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type Contract = {
  __typename?: 'Contract';
  added: Scalars['BigInt'];
  addedAtBlock: Scalars['BigInt'];
  addedAtTransaction: Scalars['Bytes'];
  /**  Human-readable description  */
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  modified: Scalars['BigInt'];
  modifiedAtBlock: Scalars['BigInt'];
  modifiedAtTransaction: Scalars['Bytes'];
  versions?: Maybe<Array<ContractVersion>>;
};


export type ContractVersionsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ContractVersion_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ContractVersion_Filter>;
};

export enum ContractVersion_OrderBy {
  Added = 'added',
  AddedAtBlock = 'addedAtBlock',
  AddedAtTransaction = 'addedAtTransaction',
  Address = 'address',
  Contract = 'contract',
  Id = 'id',
  Version = 'version'
}

export type ContractVersion_Filter = {
  added?: InputMaybe<Scalars['BigInt']>;
  added_gt?: InputMaybe<Scalars['BigInt']>;
  added_gte?: InputMaybe<Scalars['BigInt']>;
  added_in?: InputMaybe<Array<Scalars['BigInt']>>;
  added_lt?: InputMaybe<Scalars['BigInt']>;
  added_lte?: InputMaybe<Scalars['BigInt']>;
  added_not?: InputMaybe<Scalars['BigInt']>;
  added_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  addedAtBlock?: InputMaybe<Scalars['BigInt']>;
  addedAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  addedAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  addedAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  addedAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  addedAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  addedAtBlock_not?: InputMaybe<Scalars['BigInt']>;
  addedAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  addedAtTransaction?: InputMaybe<Scalars['Bytes']>;
  addedAtTransaction_contains?: InputMaybe<Scalars['Bytes']>;
  addedAtTransaction_in?: InputMaybe<Array<Scalars['Bytes']>>;
  addedAtTransaction_not?: InputMaybe<Scalars['Bytes']>;
  addedAtTransaction_not_contains?: InputMaybe<Scalars['Bytes']>;
  addedAtTransaction_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address?: InputMaybe<Scalars['Bytes']>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  contract?: InputMaybe<Scalars['String']>;
  contract_contains?: InputMaybe<Scalars['String']>;
  contract_ends_with?: InputMaybe<Scalars['String']>;
  contract_gt?: InputMaybe<Scalars['String']>;
  contract_gte?: InputMaybe<Scalars['String']>;
  contract_in?: InputMaybe<Array<Scalars['String']>>;
  contract_lt?: InputMaybe<Scalars['String']>;
  contract_lte?: InputMaybe<Scalars['String']>;
  contract_not?: InputMaybe<Scalars['String']>;
  contract_not_contains?: InputMaybe<Scalars['String']>;
  contract_not_ends_with?: InputMaybe<Scalars['String']>;
  contract_not_in?: InputMaybe<Array<Scalars['String']>>;
  contract_not_starts_with?: InputMaybe<Scalars['String']>;
  contract_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  version?: InputMaybe<Scalars['BigInt']>;
  version_gt?: InputMaybe<Scalars['BigInt']>;
  version_gte?: InputMaybe<Scalars['BigInt']>;
  version_in?: InputMaybe<Array<Scalars['BigInt']>>;
  version_lt?: InputMaybe<Scalars['BigInt']>;
  version_lte?: InputMaybe<Scalars['BigInt']>;
  version_not?: InputMaybe<Scalars['BigInt']>;
  version_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type ContractVersion = {
  __typename?: 'ContractVersion';
  added: Scalars['BigInt'];
  addedAtBlock: Scalars['BigInt'];
  addedAtTransaction: Scalars['Bytes'];
  address: Scalars['Bytes'];
  contract: Contract;
  id: Scalars['ID'];
  version: Scalars['BigInt'];
};

export enum Contract_OrderBy {
  Added = 'added',
  AddedAtBlock = 'addedAtBlock',
  AddedAtTransaction = 'addedAtTransaction',
  Description = 'description',
  Id = 'id',
  Modified = 'modified',
  ModifiedAtBlock = 'modifiedAtBlock',
  ModifiedAtTransaction = 'modifiedAtTransaction',
  Versions = 'versions'
}

export type Contract_Filter = {
  added?: InputMaybe<Scalars['BigInt']>;
  added_gt?: InputMaybe<Scalars['BigInt']>;
  added_gte?: InputMaybe<Scalars['BigInt']>;
  added_in?: InputMaybe<Array<Scalars['BigInt']>>;
  added_lt?: InputMaybe<Scalars['BigInt']>;
  added_lte?: InputMaybe<Scalars['BigInt']>;
  added_not?: InputMaybe<Scalars['BigInt']>;
  added_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  addedAtBlock?: InputMaybe<Scalars['BigInt']>;
  addedAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  addedAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  addedAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  addedAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  addedAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  addedAtBlock_not?: InputMaybe<Scalars['BigInt']>;
  addedAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  addedAtTransaction?: InputMaybe<Scalars['Bytes']>;
  addedAtTransaction_contains?: InputMaybe<Scalars['Bytes']>;
  addedAtTransaction_in?: InputMaybe<Array<Scalars['Bytes']>>;
  addedAtTransaction_not?: InputMaybe<Scalars['Bytes']>;
  addedAtTransaction_not_contains?: InputMaybe<Scalars['Bytes']>;
  addedAtTransaction_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  description?: InputMaybe<Scalars['String']>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_ends_with?: InputMaybe<Scalars['String']>;
  description_gt?: InputMaybe<Scalars['String']>;
  description_gte?: InputMaybe<Scalars['String']>;
  description_in?: InputMaybe<Array<Scalars['String']>>;
  description_lt?: InputMaybe<Scalars['String']>;
  description_lte?: InputMaybe<Scalars['String']>;
  description_not?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  description_not_in?: InputMaybe<Array<Scalars['String']>>;
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  description_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  modified?: InputMaybe<Scalars['BigInt']>;
  modified_gt?: InputMaybe<Scalars['BigInt']>;
  modified_gte?: InputMaybe<Scalars['BigInt']>;
  modified_in?: InputMaybe<Array<Scalars['BigInt']>>;
  modified_lt?: InputMaybe<Scalars['BigInt']>;
  modified_lte?: InputMaybe<Scalars['BigInt']>;
  modified_not?: InputMaybe<Scalars['BigInt']>;
  modified_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  modifiedAtBlock?: InputMaybe<Scalars['BigInt']>;
  modifiedAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  modifiedAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  modifiedAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  modifiedAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  modifiedAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  modifiedAtBlock_not?: InputMaybe<Scalars['BigInt']>;
  modifiedAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  modifiedAtTransaction?: InputMaybe<Scalars['Bytes']>;
  modifiedAtTransaction_contains?: InputMaybe<Scalars['Bytes']>;
  modifiedAtTransaction_in?: InputMaybe<Array<Scalars['Bytes']>>;
  modifiedAtTransaction_not?: InputMaybe<Scalars['Bytes']>;
  modifiedAtTransaction_not_contains?: InputMaybe<Scalars['Bytes']>;
  modifiedAtTransaction_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export type FeeChangelog = PoolEvent & {
  __typename?: 'FeeChangelog';
  block: Scalars['BigInt'];
  id: Scalars['ID'];
  pool: Pool;
  timestamp: Scalars['BigInt'];
  transaction: Scalars['Bytes'];
  value: Scalars['BigDecimal'];
};

export enum FeeChangelog_OrderBy {
  Block = 'block',
  Id = 'id',
  Pool = 'pool',
  Timestamp = 'timestamp',
  Transaction = 'transaction',
  Value = 'value'
}

export type FeeChangelog_Filter = {
  block?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  pool?: InputMaybe<Scalars['String']>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transaction?: InputMaybe<Scalars['Bytes']>;
  transaction_contains?: InputMaybe<Scalars['Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transaction_not?: InputMaybe<Scalars['Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['Bytes']>;
  transaction_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  value?: InputMaybe<Scalars['BigDecimal']>;
  value_gt?: InputMaybe<Scalars['BigDecimal']>;
  value_gte?: InputMaybe<Scalars['BigDecimal']>;
  value_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  value_lt?: InputMaybe<Scalars['BigDecimal']>;
  value_lte?: InputMaybe<Scalars['BigDecimal']>;
  value_not?: InputMaybe<Scalars['BigDecimal']>;
  value_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export type GaugeDeposit = {
  __typename?: 'GaugeDeposit';
  gauge: Gauge;
  id: Scalars['ID'];
  provider: Account;
  value: Scalars['BigDecimal'];
};

export enum GaugeDeposit_OrderBy {
  Gauge = 'gauge',
  Id = 'id',
  Provider = 'provider',
  Value = 'value'
}

export type GaugeDeposit_Filter = {
  gauge?: InputMaybe<Scalars['String']>;
  gauge_contains?: InputMaybe<Scalars['String']>;
  gauge_ends_with?: InputMaybe<Scalars['String']>;
  gauge_gt?: InputMaybe<Scalars['String']>;
  gauge_gte?: InputMaybe<Scalars['String']>;
  gauge_in?: InputMaybe<Array<Scalars['String']>>;
  gauge_lt?: InputMaybe<Scalars['String']>;
  gauge_lte?: InputMaybe<Scalars['String']>;
  gauge_not?: InputMaybe<Scalars['String']>;
  gauge_not_contains?: InputMaybe<Scalars['String']>;
  gauge_not_ends_with?: InputMaybe<Scalars['String']>;
  gauge_not_in?: InputMaybe<Array<Scalars['String']>>;
  gauge_not_starts_with?: InputMaybe<Scalars['String']>;
  gauge_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  provider?: InputMaybe<Scalars['String']>;
  provider_contains?: InputMaybe<Scalars['String']>;
  provider_ends_with?: InputMaybe<Scalars['String']>;
  provider_gt?: InputMaybe<Scalars['String']>;
  provider_gte?: InputMaybe<Scalars['String']>;
  provider_in?: InputMaybe<Array<Scalars['String']>>;
  provider_lt?: InputMaybe<Scalars['String']>;
  provider_lte?: InputMaybe<Scalars['String']>;
  provider_not?: InputMaybe<Scalars['String']>;
  provider_not_contains?: InputMaybe<Scalars['String']>;
  provider_not_ends_with?: InputMaybe<Scalars['String']>;
  provider_not_in?: InputMaybe<Array<Scalars['String']>>;
  provider_not_starts_with?: InputMaybe<Scalars['String']>;
  provider_starts_with?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['BigDecimal']>;
  value_gt?: InputMaybe<Scalars['BigDecimal']>;
  value_gte?: InputMaybe<Scalars['BigDecimal']>;
  value_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  value_lt?: InputMaybe<Scalars['BigDecimal']>;
  value_lte?: InputMaybe<Scalars['BigDecimal']>;
  value_not?: InputMaybe<Scalars['BigDecimal']>;
  value_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export type GaugeTotalWeight = {
  __typename?: 'GaugeTotalWeight';
  id: Scalars['ID'];
  time: Scalars['BigInt'];
  weight: Scalars['BigDecimal'];
};

export enum GaugeTotalWeight_OrderBy {
  Id = 'id',
  Time = 'time',
  Weight = 'weight'
}

export type GaugeTotalWeight_Filter = {
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  time?: InputMaybe<Scalars['BigInt']>;
  time_gt?: InputMaybe<Scalars['BigInt']>;
  time_gte?: InputMaybe<Scalars['BigInt']>;
  time_in?: InputMaybe<Array<Scalars['BigInt']>>;
  time_lt?: InputMaybe<Scalars['BigInt']>;
  time_lte?: InputMaybe<Scalars['BigInt']>;
  time_not?: InputMaybe<Scalars['BigInt']>;
  time_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  weight?: InputMaybe<Scalars['BigDecimal']>;
  weight_gt?: InputMaybe<Scalars['BigDecimal']>;
  weight_gte?: InputMaybe<Scalars['BigDecimal']>;
  weight_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  weight_lt?: InputMaybe<Scalars['BigDecimal']>;
  weight_lte?: InputMaybe<Scalars['BigDecimal']>;
  weight_not?: InputMaybe<Scalars['BigDecimal']>;
  weight_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum GaugeType_OrderBy {
  GaugeCount = 'gaugeCount',
  Gauges = 'gauges',
  Id = 'id',
  Name = 'name',
  Weights = 'weights'
}

export type GaugeType_Filter = {
  gaugeCount?: InputMaybe<Scalars['BigInt']>;
  gaugeCount_gt?: InputMaybe<Scalars['BigInt']>;
  gaugeCount_gte?: InputMaybe<Scalars['BigInt']>;
  gaugeCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gaugeCount_lt?: InputMaybe<Scalars['BigInt']>;
  gaugeCount_lte?: InputMaybe<Scalars['BigInt']>;
  gaugeCount_not?: InputMaybe<Scalars['BigInt']>;
  gaugeCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
};

export type GaugeWithdraw = {
  __typename?: 'GaugeWithdraw';
  gauge: Gauge;
  id: Scalars['ID'];
  provider: Account;
  value: Scalars['BigDecimal'];
};

export enum GaugeWithdraw_OrderBy {
  Gauge = 'gauge',
  Id = 'id',
  Provider = 'provider',
  Value = 'value'
}

export type GaugeWithdraw_Filter = {
  gauge?: InputMaybe<Scalars['String']>;
  gauge_contains?: InputMaybe<Scalars['String']>;
  gauge_ends_with?: InputMaybe<Scalars['String']>;
  gauge_gt?: InputMaybe<Scalars['String']>;
  gauge_gte?: InputMaybe<Scalars['String']>;
  gauge_in?: InputMaybe<Array<Scalars['String']>>;
  gauge_lt?: InputMaybe<Scalars['String']>;
  gauge_lte?: InputMaybe<Scalars['String']>;
  gauge_not?: InputMaybe<Scalars['String']>;
  gauge_not_contains?: InputMaybe<Scalars['String']>;
  gauge_not_ends_with?: InputMaybe<Scalars['String']>;
  gauge_not_in?: InputMaybe<Array<Scalars['String']>>;
  gauge_not_starts_with?: InputMaybe<Scalars['String']>;
  gauge_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  provider?: InputMaybe<Scalars['String']>;
  provider_contains?: InputMaybe<Scalars['String']>;
  provider_ends_with?: InputMaybe<Scalars['String']>;
  provider_gt?: InputMaybe<Scalars['String']>;
  provider_gte?: InputMaybe<Scalars['String']>;
  provider_in?: InputMaybe<Array<Scalars['String']>>;
  provider_lt?: InputMaybe<Scalars['String']>;
  provider_lte?: InputMaybe<Scalars['String']>;
  provider_not?: InputMaybe<Scalars['String']>;
  provider_not_contains?: InputMaybe<Scalars['String']>;
  provider_not_ends_with?: InputMaybe<Scalars['String']>;
  provider_not_in?: InputMaybe<Array<Scalars['String']>>;
  provider_not_starts_with?: InputMaybe<Scalars['String']>;
  provider_starts_with?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['BigDecimal']>;
  value_gt?: InputMaybe<Scalars['BigDecimal']>;
  value_gte?: InputMaybe<Scalars['BigDecimal']>;
  value_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  value_lt?: InputMaybe<Scalars['BigDecimal']>;
  value_lte?: InputMaybe<Scalars['BigDecimal']>;
  value_not?: InputMaybe<Scalars['BigDecimal']>;
  value_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export enum LpToken_OrderBy {
  Address = 'address',
  Decimals = 'decimals',
  Gauge = 'gauge',
  Id = 'id',
  Name = 'name',
  Pool = 'pool',
  Symbol = 'symbol'
}

export type LpToken_Filter = {
  address?: InputMaybe<Scalars['Bytes']>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  decimals?: InputMaybe<Scalars['BigInt']>;
  decimals_gt?: InputMaybe<Scalars['BigInt']>;
  decimals_gte?: InputMaybe<Scalars['BigInt']>;
  decimals_in?: InputMaybe<Array<Scalars['BigInt']>>;
  decimals_lt?: InputMaybe<Scalars['BigInt']>;
  decimals_lte?: InputMaybe<Scalars['BigInt']>;
  decimals_not?: InputMaybe<Scalars['BigInt']>;
  decimals_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gauge?: InputMaybe<Scalars['String']>;
  gauge_contains?: InputMaybe<Scalars['String']>;
  gauge_ends_with?: InputMaybe<Scalars['String']>;
  gauge_gt?: InputMaybe<Scalars['String']>;
  gauge_gte?: InputMaybe<Scalars['String']>;
  gauge_in?: InputMaybe<Array<Scalars['String']>>;
  gauge_lt?: InputMaybe<Scalars['String']>;
  gauge_lte?: InputMaybe<Scalars['String']>;
  gauge_not?: InputMaybe<Scalars['String']>;
  gauge_not_contains?: InputMaybe<Scalars['String']>;
  gauge_not_ends_with?: InputMaybe<Scalars['String']>;
  gauge_not_in?: InputMaybe<Array<Scalars['String']>>;
  gauge_not_starts_with?: InputMaybe<Scalars['String']>;
  gauge_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  pool?: InputMaybe<Scalars['String']>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
};

export type RemoveLiquidityEvent = PoolEvent & {
  __typename?: 'RemoveLiquidityEvent';
  block: Scalars['BigInt'];
  fees?: Maybe<Array<Scalars['BigInt']>>;
  id: Scalars['ID'];
  invariant?: Maybe<Scalars['BigInt']>;
  pool: Pool;
  provider: Account;
  timestamp: Scalars['BigInt'];
  tokenAmounts: Array<Scalars['BigInt']>;
  tokenSupply?: Maybe<Scalars['BigInt']>;
  transaction: Scalars['Bytes'];
};

export enum RemoveLiquidityEvent_OrderBy {
  Block = 'block',
  Fees = 'fees',
  Id = 'id',
  Invariant = 'invariant',
  Pool = 'pool',
  Provider = 'provider',
  Timestamp = 'timestamp',
  TokenAmounts = 'tokenAmounts',
  TokenSupply = 'tokenSupply',
  Transaction = 'transaction'
}

export type RemoveLiquidityEvent_Filter = {
  block?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fees?: InputMaybe<Array<Scalars['BigInt']>>;
  fees_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  fees_not?: InputMaybe<Array<Scalars['BigInt']>>;
  fees_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  invariant?: InputMaybe<Scalars['BigInt']>;
  invariant_gt?: InputMaybe<Scalars['BigInt']>;
  invariant_gte?: InputMaybe<Scalars['BigInt']>;
  invariant_in?: InputMaybe<Array<Scalars['BigInt']>>;
  invariant_lt?: InputMaybe<Scalars['BigInt']>;
  invariant_lte?: InputMaybe<Scalars['BigInt']>;
  invariant_not?: InputMaybe<Scalars['BigInt']>;
  invariant_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  pool?: InputMaybe<Scalars['String']>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  provider_contains?: InputMaybe<Scalars['String']>;
  provider_ends_with?: InputMaybe<Scalars['String']>;
  provider_gt?: InputMaybe<Scalars['String']>;
  provider_gte?: InputMaybe<Scalars['String']>;
  provider_in?: InputMaybe<Array<Scalars['String']>>;
  provider_lt?: InputMaybe<Scalars['String']>;
  provider_lte?: InputMaybe<Scalars['String']>;
  provider_not?: InputMaybe<Scalars['String']>;
  provider_not_contains?: InputMaybe<Scalars['String']>;
  provider_not_ends_with?: InputMaybe<Scalars['String']>;
  provider_not_in?: InputMaybe<Array<Scalars['String']>>;
  provider_not_starts_with?: InputMaybe<Scalars['String']>;
  provider_starts_with?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenAmounts?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenAmounts_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenAmounts_not?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenAmounts_not_contains?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenSupply?: InputMaybe<Scalars['BigInt']>;
  tokenSupply_gt?: InputMaybe<Scalars['BigInt']>;
  tokenSupply_gte?: InputMaybe<Scalars['BigInt']>;
  tokenSupply_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenSupply_lt?: InputMaybe<Scalars['BigInt']>;
  tokenSupply_lte?: InputMaybe<Scalars['BigInt']>;
  tokenSupply_not?: InputMaybe<Scalars['BigInt']>;
  tokenSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transaction?: InputMaybe<Scalars['Bytes']>;
  transaction_contains?: InputMaybe<Scalars['Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transaction_not?: InputMaybe<Scalars['Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['Bytes']>;
  transaction_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export type RemoveLiquidityOneEvent = PoolEvent & {
  __typename?: 'RemoveLiquidityOneEvent';
  block: Scalars['BigInt'];
  coinAmount: Scalars['BigInt'];
  id: Scalars['ID'];
  pool: Pool;
  provider: Account;
  timestamp: Scalars['BigInt'];
  tokenAmount: Scalars['BigInt'];
  transaction: Scalars['Bytes'];
};

export enum RemoveLiquidityOneEvent_OrderBy {
  Block = 'block',
  CoinAmount = 'coinAmount',
  Id = 'id',
  Pool = 'pool',
  Provider = 'provider',
  Timestamp = 'timestamp',
  TokenAmount = 'tokenAmount',
  Transaction = 'transaction'
}

export type RemoveLiquidityOneEvent_Filter = {
  block?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  coinAmount?: InputMaybe<Scalars['BigInt']>;
  coinAmount_gt?: InputMaybe<Scalars['BigInt']>;
  coinAmount_gte?: InputMaybe<Scalars['BigInt']>;
  coinAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  coinAmount_lt?: InputMaybe<Scalars['BigInt']>;
  coinAmount_lte?: InputMaybe<Scalars['BigInt']>;
  coinAmount_not?: InputMaybe<Scalars['BigInt']>;
  coinAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  pool?: InputMaybe<Scalars['String']>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  provider?: InputMaybe<Scalars['String']>;
  provider_contains?: InputMaybe<Scalars['String']>;
  provider_ends_with?: InputMaybe<Scalars['String']>;
  provider_gt?: InputMaybe<Scalars['String']>;
  provider_gte?: InputMaybe<Scalars['String']>;
  provider_in?: InputMaybe<Array<Scalars['String']>>;
  provider_lt?: InputMaybe<Scalars['String']>;
  provider_lte?: InputMaybe<Scalars['String']>;
  provider_not?: InputMaybe<Scalars['String']>;
  provider_not_contains?: InputMaybe<Scalars['String']>;
  provider_not_ends_with?: InputMaybe<Scalars['String']>;
  provider_not_in?: InputMaybe<Array<Scalars['String']>>;
  provider_not_starts_with?: InputMaybe<Scalars['String']>;
  provider_starts_with?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenAmount?: InputMaybe<Scalars['BigInt']>;
  tokenAmount_gt?: InputMaybe<Scalars['BigInt']>;
  tokenAmount_gte?: InputMaybe<Scalars['BigInt']>;
  tokenAmount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenAmount_lt?: InputMaybe<Scalars['BigInt']>;
  tokenAmount_lte?: InputMaybe<Scalars['BigInt']>;
  tokenAmount_not?: InputMaybe<Scalars['BigInt']>;
  tokenAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transaction?: InputMaybe<Scalars['Bytes']>;
  transaction_contains?: InputMaybe<Scalars['Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transaction_not?: InputMaybe<Scalars['Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['Bytes']>;
  transaction_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export type SystemState = {
  __typename?: 'SystemState';
  /**  Number of contracts in the AddressProvider registry  */
  contractCount: Scalars['BigInt'];
  /**  Number of gauges registered  */
  gaugeCount: Scalars['BigInt'];
  /**  Number of gauge types registered  */
  gaugeTypeCount: Scalars['BigInt'];
  /**  Singleton ID, equals to 'current'  */
  id: Scalars['ID'];
  /**  Number of active pools  */
  poolCount: Scalars['BigInt'];
  /**  Current pool registry address  */
  registryContract?: Maybe<Scalars['Bytes']>;
  /**  Number of tokens registered  */
  tokenCount: Scalars['BigInt'];
  /**  Total number of pools (including removed ones)  */
  totalPoolCount: Scalars['BigInt'];
  updated: Scalars['BigInt'];
  updatedAtBlock: Scalars['BigInt'];
  updatedAtTransaction: Scalars['Bytes'];
};

export enum SystemState_OrderBy {
  ContractCount = 'contractCount',
  GaugeCount = 'gaugeCount',
  GaugeTypeCount = 'gaugeTypeCount',
  Id = 'id',
  PoolCount = 'poolCount',
  RegistryContract = 'registryContract',
  TokenCount = 'tokenCount',
  TotalPoolCount = 'totalPoolCount',
  Updated = 'updated',
  UpdatedAtBlock = 'updatedAtBlock',
  UpdatedAtTransaction = 'updatedAtTransaction'
}

export type SystemState_Filter = {
  contractCount?: InputMaybe<Scalars['BigInt']>;
  contractCount_gt?: InputMaybe<Scalars['BigInt']>;
  contractCount_gte?: InputMaybe<Scalars['BigInt']>;
  contractCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  contractCount_lt?: InputMaybe<Scalars['BigInt']>;
  contractCount_lte?: InputMaybe<Scalars['BigInt']>;
  contractCount_not?: InputMaybe<Scalars['BigInt']>;
  contractCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gaugeCount?: InputMaybe<Scalars['BigInt']>;
  gaugeCount_gt?: InputMaybe<Scalars['BigInt']>;
  gaugeCount_gte?: InputMaybe<Scalars['BigInt']>;
  gaugeCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gaugeCount_lt?: InputMaybe<Scalars['BigInt']>;
  gaugeCount_lte?: InputMaybe<Scalars['BigInt']>;
  gaugeCount_not?: InputMaybe<Scalars['BigInt']>;
  gaugeCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gaugeTypeCount?: InputMaybe<Scalars['BigInt']>;
  gaugeTypeCount_gt?: InputMaybe<Scalars['BigInt']>;
  gaugeTypeCount_gte?: InputMaybe<Scalars['BigInt']>;
  gaugeTypeCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  gaugeTypeCount_lt?: InputMaybe<Scalars['BigInt']>;
  gaugeTypeCount_lte?: InputMaybe<Scalars['BigInt']>;
  gaugeTypeCount_not?: InputMaybe<Scalars['BigInt']>;
  gaugeTypeCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  poolCount?: InputMaybe<Scalars['BigInt']>;
  poolCount_gt?: InputMaybe<Scalars['BigInt']>;
  poolCount_gte?: InputMaybe<Scalars['BigInt']>;
  poolCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  poolCount_lt?: InputMaybe<Scalars['BigInt']>;
  poolCount_lte?: InputMaybe<Scalars['BigInt']>;
  poolCount_not?: InputMaybe<Scalars['BigInt']>;
  poolCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  registryContract?: InputMaybe<Scalars['Bytes']>;
  registryContract_contains?: InputMaybe<Scalars['Bytes']>;
  registryContract_in?: InputMaybe<Array<Scalars['Bytes']>>;
  registryContract_not?: InputMaybe<Scalars['Bytes']>;
  registryContract_not_contains?: InputMaybe<Scalars['Bytes']>;
  registryContract_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tokenCount?: InputMaybe<Scalars['BigInt']>;
  tokenCount_gt?: InputMaybe<Scalars['BigInt']>;
  tokenCount_gte?: InputMaybe<Scalars['BigInt']>;
  tokenCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  tokenCount_lt?: InputMaybe<Scalars['BigInt']>;
  tokenCount_lte?: InputMaybe<Scalars['BigInt']>;
  tokenCount_not?: InputMaybe<Scalars['BigInt']>;
  tokenCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalPoolCount?: InputMaybe<Scalars['BigInt']>;
  totalPoolCount_gt?: InputMaybe<Scalars['BigInt']>;
  totalPoolCount_gte?: InputMaybe<Scalars['BigInt']>;
  totalPoolCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  totalPoolCount_lt?: InputMaybe<Scalars['BigInt']>;
  totalPoolCount_lte?: InputMaybe<Scalars['BigInt']>;
  totalPoolCount_not?: InputMaybe<Scalars['BigInt']>;
  totalPoolCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updated?: InputMaybe<Scalars['BigInt']>;
  updated_gt?: InputMaybe<Scalars['BigInt']>;
  updated_gte?: InputMaybe<Scalars['BigInt']>;
  updated_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updated_lt?: InputMaybe<Scalars['BigInt']>;
  updated_lte?: InputMaybe<Scalars['BigInt']>;
  updated_not?: InputMaybe<Scalars['BigInt']>;
  updated_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAtBlock?: InputMaybe<Scalars['BigInt']>;
  updatedAtBlock_gt?: InputMaybe<Scalars['BigInt']>;
  updatedAtBlock_gte?: InputMaybe<Scalars['BigInt']>;
  updatedAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAtBlock_lt?: InputMaybe<Scalars['BigInt']>;
  updatedAtBlock_lte?: InputMaybe<Scalars['BigInt']>;
  updatedAtBlock_not?: InputMaybe<Scalars['BigInt']>;
  updatedAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  updatedAtTransaction?: InputMaybe<Scalars['Bytes']>;
  updatedAtTransaction_contains?: InputMaybe<Scalars['Bytes']>;
  updatedAtTransaction_in?: InputMaybe<Array<Scalars['Bytes']>>;
  updatedAtTransaction_not?: InputMaybe<Scalars['Bytes']>;
  updatedAtTransaction_not_contains?: InputMaybe<Scalars['Bytes']>;
  updatedAtTransaction_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum Token_OrderBy {
  Address = 'address',
  Coins = 'coins',
  Decimals = 'decimals',
  Id = 'id',
  Name = 'name',
  Pools = 'pools',
  Symbol = 'symbol',
  UnderlyingCoins = 'underlyingCoins'
}

export type Token_Filter = {
  address?: InputMaybe<Scalars['Bytes']>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  decimals?: InputMaybe<Scalars['BigInt']>;
  decimals_gt?: InputMaybe<Scalars['BigInt']>;
  decimals_gte?: InputMaybe<Scalars['BigInt']>;
  decimals_in?: InputMaybe<Array<Scalars['BigInt']>>;
  decimals_lt?: InputMaybe<Scalars['BigInt']>;
  decimals_lte?: InputMaybe<Scalars['BigInt']>;
  decimals_not?: InputMaybe<Scalars['BigInt']>;
  decimals_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  name?: InputMaybe<Scalars['String']>;
  name_contains?: InputMaybe<Scalars['String']>;
  name_ends_with?: InputMaybe<Scalars['String']>;
  name_gt?: InputMaybe<Scalars['String']>;
  name_gte?: InputMaybe<Scalars['String']>;
  name_in?: InputMaybe<Array<Scalars['String']>>;
  name_lt?: InputMaybe<Scalars['String']>;
  name_lte?: InputMaybe<Scalars['String']>;
  name_not?: InputMaybe<Scalars['String']>;
  name_not_contains?: InputMaybe<Scalars['String']>;
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  name_not_in?: InputMaybe<Array<Scalars['String']>>;
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  name_starts_with?: InputMaybe<Scalars['String']>;
  pools?: InputMaybe<Array<Scalars['String']>>;
  pools_contains?: InputMaybe<Array<Scalars['String']>>;
  pools_not?: InputMaybe<Array<Scalars['String']>>;
  pools_not_contains?: InputMaybe<Array<Scalars['String']>>;
  symbol?: InputMaybe<Scalars['String']>;
  symbol_contains?: InputMaybe<Scalars['String']>;
  symbol_ends_with?: InputMaybe<Scalars['String']>;
  symbol_gt?: InputMaybe<Scalars['String']>;
  symbol_gte?: InputMaybe<Scalars['String']>;
  symbol_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_lt?: InputMaybe<Scalars['String']>;
  symbol_lte?: InputMaybe<Scalars['String']>;
  symbol_not?: InputMaybe<Scalars['String']>;
  symbol_not_contains?: InputMaybe<Scalars['String']>;
  symbol_not_ends_with?: InputMaybe<Scalars['String']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>;
  symbol_not_starts_with?: InputMaybe<Scalars['String']>;
  symbol_starts_with?: InputMaybe<Scalars['String']>;
};

export enum TradeVolume_OrderBy {
  Pool = 'pool',
  Timestamp = 'timestamp',
  Volume = 'volume'
}

export type TradeVolume_Filter = {
  pool?: InputMaybe<Scalars['String']>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  volume?: InputMaybe<Scalars['BigDecimal']>;
  volume_gt?: InputMaybe<Scalars['BigDecimal']>;
  volume_gte?: InputMaybe<Scalars['BigDecimal']>;
  volume_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  volume_lt?: InputMaybe<Scalars['BigDecimal']>;
  volume_lte?: InputMaybe<Scalars['BigDecimal']>;
  volume_not?: InputMaybe<Scalars['BigDecimal']>;
  volume_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
};

export type TransferOwnershipEvent = PoolEvent & {
  __typename?: 'TransferOwnershipEvent';
  block: Scalars['BigInt'];
  id: Scalars['ID'];
  newAdmin: Scalars['Bytes'];
  pool: Pool;
  timestamp: Scalars['BigInt'];
  transaction: Scalars['Bytes'];
};

export enum TransferOwnershipEvent_OrderBy {
  Block = 'block',
  Id = 'id',
  NewAdmin = 'newAdmin',
  Pool = 'pool',
  Timestamp = 'timestamp',
  Transaction = 'transaction'
}

export type TransferOwnershipEvent_Filter = {
  block?: InputMaybe<Scalars['BigInt']>;
  block_gt?: InputMaybe<Scalars['BigInt']>;
  block_gte?: InputMaybe<Scalars['BigInt']>;
  block_in?: InputMaybe<Array<Scalars['BigInt']>>;
  block_lt?: InputMaybe<Scalars['BigInt']>;
  block_lte?: InputMaybe<Scalars['BigInt']>;
  block_not?: InputMaybe<Scalars['BigInt']>;
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  newAdmin?: InputMaybe<Scalars['Bytes']>;
  newAdmin_contains?: InputMaybe<Scalars['Bytes']>;
  newAdmin_in?: InputMaybe<Array<Scalars['Bytes']>>;
  newAdmin_not?: InputMaybe<Scalars['Bytes']>;
  newAdmin_not_contains?: InputMaybe<Scalars['Bytes']>;
  newAdmin_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  pool?: InputMaybe<Scalars['String']>;
  pool_contains?: InputMaybe<Scalars['String']>;
  pool_ends_with?: InputMaybe<Scalars['String']>;
  pool_gt?: InputMaybe<Scalars['String']>;
  pool_gte?: InputMaybe<Scalars['String']>;
  pool_in?: InputMaybe<Array<Scalars['String']>>;
  pool_lt?: InputMaybe<Scalars['String']>;
  pool_lte?: InputMaybe<Scalars['String']>;
  pool_not?: InputMaybe<Scalars['String']>;
  pool_not_contains?: InputMaybe<Scalars['String']>;
  pool_not_ends_with?: InputMaybe<Scalars['String']>;
  pool_not_in?: InputMaybe<Array<Scalars['String']>>;
  pool_not_starts_with?: InputMaybe<Scalars['String']>;
  pool_starts_with?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transaction?: InputMaybe<Scalars['Bytes']>;
  transaction_contains?: InputMaybe<Scalars['Bytes']>;
  transaction_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transaction_not?: InputMaybe<Scalars['Bytes']>;
  transaction_not_contains?: InputMaybe<Scalars['Bytes']>;
  transaction_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
};

export enum VotingApp_OrderBy {
  Address = 'address',
  Codename = 'codename',
  Id = 'id',
  MinimumBalance = 'minimumBalance',
  MinimumQuorum = 'minimumQuorum',
  MinimumTime = 'minimumTime',
  ProposalCount = 'proposalCount',
  Proposals = 'proposals',
  RequiredSupport = 'requiredSupport',
  Token = 'token',
  VoteCount = 'voteCount',
  VoteTime = 'voteTime'
}

export type VotingApp_Filter = {
  address?: InputMaybe<Scalars['Bytes']>;
  address_contains?: InputMaybe<Scalars['Bytes']>;
  address_in?: InputMaybe<Array<Scalars['Bytes']>>;
  address_not?: InputMaybe<Scalars['Bytes']>;
  address_not_contains?: InputMaybe<Scalars['Bytes']>;
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  codename?: InputMaybe<Scalars['String']>;
  codename_contains?: InputMaybe<Scalars['String']>;
  codename_ends_with?: InputMaybe<Scalars['String']>;
  codename_gt?: InputMaybe<Scalars['String']>;
  codename_gte?: InputMaybe<Scalars['String']>;
  codename_in?: InputMaybe<Array<Scalars['String']>>;
  codename_lt?: InputMaybe<Scalars['String']>;
  codename_lte?: InputMaybe<Scalars['String']>;
  codename_not?: InputMaybe<Scalars['String']>;
  codename_not_contains?: InputMaybe<Scalars['String']>;
  codename_not_ends_with?: InputMaybe<Scalars['String']>;
  codename_not_in?: InputMaybe<Array<Scalars['String']>>;
  codename_not_starts_with?: InputMaybe<Scalars['String']>;
  codename_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  minimumBalance?: InputMaybe<Scalars['BigDecimal']>;
  minimumBalance_gt?: InputMaybe<Scalars['BigDecimal']>;
  minimumBalance_gte?: InputMaybe<Scalars['BigDecimal']>;
  minimumBalance_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  minimumBalance_lt?: InputMaybe<Scalars['BigDecimal']>;
  minimumBalance_lte?: InputMaybe<Scalars['BigDecimal']>;
  minimumBalance_not?: InputMaybe<Scalars['BigDecimal']>;
  minimumBalance_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  minimumQuorum?: InputMaybe<Scalars['BigDecimal']>;
  minimumQuorum_gt?: InputMaybe<Scalars['BigDecimal']>;
  minimumQuorum_gte?: InputMaybe<Scalars['BigDecimal']>;
  minimumQuorum_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  minimumQuorum_lt?: InputMaybe<Scalars['BigDecimal']>;
  minimumQuorum_lte?: InputMaybe<Scalars['BigDecimal']>;
  minimumQuorum_not?: InputMaybe<Scalars['BigDecimal']>;
  minimumQuorum_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  minimumTime?: InputMaybe<Scalars['BigInt']>;
  minimumTime_gt?: InputMaybe<Scalars['BigInt']>;
  minimumTime_gte?: InputMaybe<Scalars['BigInt']>;
  minimumTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  minimumTime_lt?: InputMaybe<Scalars['BigInt']>;
  minimumTime_lte?: InputMaybe<Scalars['BigInt']>;
  minimumTime_not?: InputMaybe<Scalars['BigInt']>;
  minimumTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposalCount?: InputMaybe<Scalars['BigInt']>;
  proposalCount_gt?: InputMaybe<Scalars['BigInt']>;
  proposalCount_gte?: InputMaybe<Scalars['BigInt']>;
  proposalCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  proposalCount_lt?: InputMaybe<Scalars['BigInt']>;
  proposalCount_lte?: InputMaybe<Scalars['BigInt']>;
  proposalCount_not?: InputMaybe<Scalars['BigInt']>;
  proposalCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  requiredSupport?: InputMaybe<Scalars['BigDecimal']>;
  requiredSupport_gt?: InputMaybe<Scalars['BigDecimal']>;
  requiredSupport_gte?: InputMaybe<Scalars['BigDecimal']>;
  requiredSupport_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  requiredSupport_lt?: InputMaybe<Scalars['BigDecimal']>;
  requiredSupport_lte?: InputMaybe<Scalars['BigDecimal']>;
  requiredSupport_not?: InputMaybe<Scalars['BigDecimal']>;
  requiredSupport_not_in?: InputMaybe<Array<Scalars['BigDecimal']>>;
  token?: InputMaybe<Scalars['Bytes']>;
  token_contains?: InputMaybe<Scalars['Bytes']>;
  token_in?: InputMaybe<Array<Scalars['Bytes']>>;
  token_not?: InputMaybe<Scalars['Bytes']>;
  token_not_contains?: InputMaybe<Scalars['Bytes']>;
  token_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  voteCount?: InputMaybe<Scalars['BigInt']>;
  voteCount_gt?: InputMaybe<Scalars['BigInt']>;
  voteCount_gte?: InputMaybe<Scalars['BigInt']>;
  voteCount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  voteCount_lt?: InputMaybe<Scalars['BigInt']>;
  voteCount_lte?: InputMaybe<Scalars['BigInt']>;
  voteCount_not?: InputMaybe<Scalars['BigInt']>;
  voteCount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  voteTime?: InputMaybe<Scalars['BigInt']>;
  voteTime_gt?: InputMaybe<Scalars['BigInt']>;
  voteTime_gte?: InputMaybe<Scalars['BigInt']>;
  voteTime_in?: InputMaybe<Array<Scalars['BigInt']>>;
  voteTime_lt?: InputMaybe<Scalars['BigInt']>;
  voteTime_lte?: InputMaybe<Scalars['BigInt']>;
  voteTime_not?: InputMaybe<Scalars['BigInt']>;
  voteTime_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accounts: Array<Account>;
  addLiquidityEvent?: Maybe<AddLiquidityEvent>;
  addLiquidityEvents: Array<AddLiquidityEvent>;
  adminFeeChangelog?: Maybe<AdminFeeChangelog>;
  adminFeeChangelogs: Array<AdminFeeChangelog>;
  amplificationCoeffChangelog?: Maybe<AmplificationCoeffChangelog>;
  amplificationCoeffChangelogs: Array<AmplificationCoeffChangelog>;
  coin?: Maybe<Coin>;
  coins: Array<Coin>;
  contract?: Maybe<Contract>;
  contracts: Array<Contract>;
  contractVersion?: Maybe<ContractVersion>;
  contractVersions: Array<ContractVersion>;
  dailyVolume?: Maybe<DailyVolume>;
  dailyVolumes: Array<DailyVolume>;
  exchange?: Maybe<Exchange>;
  exchanges: Array<Exchange>;
  feeChangelog?: Maybe<FeeChangelog>;
  feeChangelogs: Array<FeeChangelog>;
  gauge?: Maybe<Gauge>;
  gaugeDeposit?: Maybe<GaugeDeposit>;
  gaugeDeposits: Array<GaugeDeposit>;
  gaugeLiquidities: Array<GaugeLiquidity>;
  gaugeLiquidity?: Maybe<GaugeLiquidity>;
  gauges: Array<Gauge>;
  gaugeTotalWeight?: Maybe<GaugeTotalWeight>;
  gaugeTotalWeights: Array<GaugeTotalWeight>;
  gaugeType?: Maybe<GaugeType>;
  gaugeTypes: Array<GaugeType>;
  gaugeTypeWeight?: Maybe<GaugeTypeWeight>;
  gaugeTypeWeights: Array<GaugeTypeWeight>;
  gaugeWeight?: Maybe<GaugeWeight>;
  gaugeWeights: Array<GaugeWeight>;
  gaugeWeightVote?: Maybe<GaugeWeightVote>;
  gaugeWeightVotes: Array<GaugeWeightVote>;
  gaugeWithdraw?: Maybe<GaugeWithdraw>;
  gaugeWithdraws: Array<GaugeWithdraw>;
  hourlyVolume?: Maybe<HourlyVolume>;
  hourlyVolumes: Array<HourlyVolume>;
  lpToken?: Maybe<LpToken>;
  lpTokens: Array<LpToken>;
  pool?: Maybe<Pool>;
  poolEvent?: Maybe<PoolEvent>;
  poolEvents: Array<PoolEvent>;
  pools: Array<Pool>;
  proposal?: Maybe<Proposal>;
  proposals: Array<Proposal>;
  proposalVote?: Maybe<ProposalVote>;
  proposalVotes: Array<ProposalVote>;
  removeLiquidityEvent?: Maybe<RemoveLiquidityEvent>;
  removeLiquidityEvents: Array<RemoveLiquidityEvent>;
  removeLiquidityOneEvent?: Maybe<RemoveLiquidityOneEvent>;
  removeLiquidityOneEvents: Array<RemoveLiquidityOneEvent>;
  systemState?: Maybe<SystemState>;
  systemStates: Array<SystemState>;
  token?: Maybe<Token>;
  tokens: Array<Token>;
  tradeVolume?: Maybe<TradeVolume>;
  tradeVolumes: Array<TradeVolume>;
  transferOwnershipEvent?: Maybe<TransferOwnershipEvent>;
  transferOwnershipEvents: Array<TransferOwnershipEvent>;
  underlyingCoin?: Maybe<UnderlyingCoin>;
  underlyingCoins: Array<UnderlyingCoin>;
  votingApp?: Maybe<VotingApp>;
  votingApps: Array<VotingApp>;
  weeklyVolume?: Maybe<WeeklyVolume>;
  weeklyVolumes: Array<WeeklyVolume>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_Filter>;
};


export type SubscriptionAddLiquidityEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAddLiquidityEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AddLiquidityEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AddLiquidityEvent_Filter>;
};


export type SubscriptionAdminFeeChangelogArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAdminFeeChangelogsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AdminFeeChangelog_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AdminFeeChangelog_Filter>;
};


export type SubscriptionAmplificationCoeffChangelogArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAmplificationCoeffChangelogsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AmplificationCoeffChangelog_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AmplificationCoeffChangelog_Filter>;
};


export type SubscriptionCoinArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionCoinsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Coin_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Coin_Filter>;
};


export type SubscriptionContractArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionContractsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Contract_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Contract_Filter>;
};


export type SubscriptionContractVersionArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionContractVersionsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ContractVersion_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ContractVersion_Filter>;
};


export type SubscriptionDailyVolumeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionDailyVolumesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<DailyVolume_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<DailyVolume_Filter>;
};


export type SubscriptionExchangeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionExchangesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Exchange_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Exchange_Filter>;
};


export type SubscriptionFeeChangelogArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionFeeChangelogsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<FeeChangelog_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<FeeChangelog_Filter>;
};


export type SubscriptionGaugeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionGaugeDepositArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionGaugeDepositsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GaugeDeposit_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<GaugeDeposit_Filter>;
};


export type SubscriptionGaugeLiquiditiesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GaugeLiquidity_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<GaugeLiquidity_Filter>;
};


export type SubscriptionGaugeLiquidityArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionGaugesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Gauge_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Gauge_Filter>;
};


export type SubscriptionGaugeTotalWeightArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionGaugeTotalWeightsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GaugeTotalWeight_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<GaugeTotalWeight_Filter>;
};


export type SubscriptionGaugeTypeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionGaugeTypesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GaugeType_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<GaugeType_Filter>;
};


export type SubscriptionGaugeTypeWeightArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionGaugeTypeWeightsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GaugeTypeWeight_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<GaugeTypeWeight_Filter>;
};


export type SubscriptionGaugeWeightArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionGaugeWeightsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GaugeWeight_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<GaugeWeight_Filter>;
};


export type SubscriptionGaugeWeightVoteArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionGaugeWeightVotesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GaugeWeightVote_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<GaugeWeightVote_Filter>;
};


export type SubscriptionGaugeWithdrawArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionGaugeWithdrawsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<GaugeWithdraw_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<GaugeWithdraw_Filter>;
};


export type SubscriptionHourlyVolumeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionHourlyVolumesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<HourlyVolume_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<HourlyVolume_Filter>;
};


export type SubscriptionLpTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionLpTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<LpToken_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<LpToken_Filter>;
};


export type SubscriptionPoolArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPoolEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionPoolEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PoolEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<PoolEvent_Filter>;
};


export type SubscriptionPoolsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Pool_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Pool_Filter>;
};


export type SubscriptionProposalArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProposalsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Proposal_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Proposal_Filter>;
};


export type SubscriptionProposalVoteArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionProposalVotesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<ProposalVote_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<ProposalVote_Filter>;
};


export type SubscriptionRemoveLiquidityEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRemoveLiquidityEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RemoveLiquidityEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RemoveLiquidityEvent_Filter>;
};


export type SubscriptionRemoveLiquidityOneEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionRemoveLiquidityOneEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<RemoveLiquidityOneEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<RemoveLiquidityOneEvent_Filter>;
};


export type SubscriptionSystemStateArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionSystemStatesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<SystemState_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<SystemState_Filter>;
};


export type SubscriptionTokenArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTokensArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Token_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Token_Filter>;
};


export type SubscriptionTradeVolumeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTradeVolumesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TradeVolume_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TradeVolume_Filter>;
};


export type SubscriptionTransferOwnershipEventArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTransferOwnershipEventsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<TransferOwnershipEvent_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<TransferOwnershipEvent_Filter>;
};


export type SubscriptionUnderlyingCoinArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUnderlyingCoinsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UnderlyingCoin_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UnderlyingCoin_Filter>;
};


export type SubscriptionVotingAppArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionVotingAppsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<VotingApp_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<VotingApp_Filter>;
};


export type SubscriptionWeeklyVolumeArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionWeeklyVolumesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<WeeklyVolume_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<WeeklyVolume_Filter>;
};

export type CurveTestQueryVariables = Exact<{ [key: string]: never; }>;


export type CurveTestQuery = { __typename?: 'Query', _meta?: { __typename?: '_Meta_', deployment: string, hasIndexingErrors: boolean, block: { __typename?: '_Block_', number: number } } | null | undefined };
