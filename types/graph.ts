declare interface TransactionEvent {
  network: string;
  contract: string;
  name: string;
  topic: string;
  address: string;
  signature: string;
  outputDataMap: any;
  outputDataMapHex: string;
  indexedParams: any;
  allFunctionParams: any;
}


interface TransactionEvents {
  items: (TransactionEvent | undefined)[];
}

export interface BlockMetric {
  contract: string;
  address: string;
  totalLiquidity: number;
  token0Symbol: string;
  token1Symbol: string;
  change1h: number;
}

export interface BlockMetrics {
  items: (BlockMetric | undefined)[];
}


export interface XRPTransaction {
  account: string;
  amount?: any;
  destination?: string;
  fee: string;
  flags: number;
  lastLedgerSequence: number;
  offerSequence: number;
  sequence: number;
  signingPubKey: string;
  takerGets: any;
  takerPays: any;
  transactionType: string;
  txnSignature: string;
  date: number;
  hash: string;
  inLedger: number;
  ledgerIndex: number;
  meta: any;
  metadata: any;
  validated: boolean;
  warnings: any[];
  Memos: any[];
}

export interface XRPLedgerData {
  accepted: boolean;
  accountHash: string;
  closeFlags: number;
  closeTime: number;
  closeTimeHuman: string;
  closeTimeResolution: number;
  closed: boolean;
  hash: string;
  ledgerHash: string;
  ledgerIndex: string;
  parentCloseTime: number;
  parentHash: string;
  seqNum: string;
  totalCoins: string;
  totalCoins1: string;
  transactionHash: string;
  transactions: (XRPTransaction | undefined)[];
}


export interface XRPLedger {
  ledgerHash: string;
  ledgerIndex: number;
  validated: boolean;
  eventsCount: { [key: string]: any };
  txCount: number;
  ledger?: XRPLedgerData;
}

export interface XRPTransactions {
  items: XRPTransaction[];
}

export interface Block {
  id: number;
  network: string;
  blockNumber: number;
  minedAt: number;
  txCount: number;
  swapCount: number;
  mintCount: number;
  burnCount: number;
  pairCreatedCount: number;
  events: TransactionEvents;
  metrics: BlockMetrics;
  XRPLedger: XRPLedger;
  xrpTransactions: XRPTransactions;
  createdAt: number;
  updatedAt: number;
}
