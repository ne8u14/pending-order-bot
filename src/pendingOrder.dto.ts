export interface CanisterJson {
  host: string;
  canisters: CanisterDto[];
  max: string;
  min: string;
  orderCount: number;
}

export interface CanisterDto {
  token_test_DBTC: string;
  token_test_DICP: string;
  token_test_DETH: string;
  DBTC_DICP_fusion: string;
  DBTC_DICP_orderbook_kline: string;
  DBTC_DICP_orderbook_depth: string;
  DETH_DICP_fusion: string;
  DETH_DICP_orderbook_kline: string;
  DETH_DICP_orderbook_depth: string;
}

export interface DepthDto {
  bidPrice: bigint;
  bidVolume: bigint;
  askPrice: bigint;
  askVolume: bigint;
}
