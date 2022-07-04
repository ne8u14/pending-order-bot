import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type BooleanActorResponse = { 'Ok' : boolean } |
  { 'Err' : ErrorInfo };
export type BurnLiquidityActorResponse = { 'Ok' : BurnLiquidityResponse } |
  { 'Err' : ErrorInfo };
export interface BurnLiquidityRequest { 'liquidity' : bigint }
export interface BurnLiquidityResponse {
  'pool_volume' : bigint,
  'user_liquidity' : bigint,
  'volume' : bigint,
  'pool_amount' : bigint,
  'amount' : bigint,
  'pool_liquidity' : bigint,
}
export type CanisterNames = { 'OrderbookDepth' : null } |
  { 'AmountToken' : null } |
  { 'OrderbookKline' : null } |
  { 'SELF' : null } |
  { 'CanisterManagement' : null } |
  { 'BucketManager' : null } |
  { 'OrderbookTradeList' : null } |
  { 'VolumeToken' : null } |
  { 'EventStorage' : null } |
  { 'Fusion' : null } |
  { 'BalanceKeeper' : null };
export interface ErrorInfo { 'code' : number, 'message' : string }
export interface EventData {
  'code' : number,
  'data' : Array<number>,
  'version' : bigint,
}
export interface GetFusionEventsRequest { 'limit' : number }
export interface GetFusionEventsResponse {
  'left_count' : number,
  'events' : Array<EventData>,
}
export type GetSwapInfoActorResponse = { 'Ok' : SwapInfoResponse } |
  { 'Err' : ErrorInfo };
export type GetUserOrdersActorResponse = { 'Ok' : Array<MyOrderItem> } |
  { 'Err' : ErrorInfo };
export type GetVersionResponse = { 'Ok' : bigint } |
  { 'Err' : ErrorInfo };
export interface InitArgs {
  'dev_named_canister_ids' : Array<[CanisterNames, Principal]>,
}
export type MintLiquidityActorResponse = { 'Ok' : BurnLiquidityRequest } |
  { 'Err' : ErrorInfo };
export interface MintLiquidityRequest { 'volume' : bigint, 'amount' : bigint }
export interface MyOrderItem {
  'id' : OrderId,
  'order_direction' : OrderDirection,
  'volume' : bigint,
  'created_at' : bigint,
  'filled' : bigint,
  'price' : bigint,
}
export type OrderDirection = { 'Ask' : null } |
  { 'Bid' : null };
export interface OrderId { 'id' : bigint }
export interface RemoveFusionEventsRequest {
  'end_version_excluded' : bigint,
  'start_version_included' : bigint,
}
export interface RemoveFusionEventsResponse { 'left_count' : number }
export interface StateExportData { 'state_data' : Array<number> }
export type StateExportResponse = { 'Ok' : StateExportData } |
  { 'Err' : ErrorInfo };
export type SubmitOrderActorResponse = { 'Ok' : SubmitOrderResponse } |
  { 'Err' : ErrorInfo };
export type SubmitOrderDetails = {
    'Limit' : {
      'order_direction' : OrderDirection,
      'volume' : bigint,
      'price' : bigint,
    }
  } |
  { 'SwapExactTokensForTokens' : SwapExactTokensForTokensRequest } |
  { 'SwapTokensForExactTokens' : SwapTokensForExactTokensRequest };
export interface SubmitOrderResponse {
  'state_version_before_submission' : bigint,
  'order_id' : OrderId,
}
export interface SwapExactTokensForTokensRequest {
  'amount_out_min' : bigint,
  'order_direction' : OrderDirection,
  'exact_token' : bigint,
}
export interface SwapInfoResponse {
  'pool_volume' : bigint,
  'user_liquidity' : bigint,
  'pool_amount' : bigint,
  'pool_liquidity' : bigint,
}
export interface SwapTokensForExactTokensRequest {
  'order_direction' : OrderDirection,
  'amount_in_max' : bigint,
  'exact_token' : bigint,
}
export type TrySwapTokenActorResponse = { 'Ok' : TrySwapTokenResponse } |
  { 'Err' : ErrorInfo };
export interface TrySwapTokenRequest {
  'order_direction' : OrderDirection,
  'exact_token' : bigint,
}
export interface TrySwapTokenResponse { 'value' : bigint }
export interface _SERVICE {
  'batch_submit_order' : ActorMethod<
    [Array<SubmitOrderDetails>],
    SubmitOrderActorResponse,
  >,
  'burn_liquidity' : ActorMethod<
    [BurnLiquidityRequest],
    BurnLiquidityActorResponse,
  >,
  'cancel_all_orders' : ActorMethod<[], BooleanActorResponse>,
  'cancel_order' : ActorMethod<[OrderId], BooleanActorResponse>,
  'export_state' : ActorMethod<[], StateExportResponse>,
  'get_events' : ActorMethod<[GetFusionEventsRequest], GetFusionEventsResponse>,
  'get_swap_info' : ActorMethod<[], GetSwapInfoActorResponse>,
  'get_user_orders' : ActorMethod<[], GetUserOrdersActorResponse>,
  'get_wasm_info' : ActorMethod<[], Array<[string, string]>>,
  'init_es' : ActorMethod<
    [Principal, number, Principal, number],
    BooleanActorResponse,
  >,
  'load_state' : ActorMethod<[StateExportData], BooleanActorResponse>,
  'mint_liquidity' : ActorMethod<
    [MintLiquidityRequest],
    MintLiquidityActorResponse,
  >,
  'remove_events' : ActorMethod<
    [RemoveFusionEventsRequest],
    RemoveFusionEventsResponse,
  >,
  'submit_ask_limit_order' : ActorMethod<
    [bigint, bigint],
    SubmitOrderActorResponse,
  >,
  'submit_bid_limit_order' : ActorMethod<
    [bigint, bigint],
    SubmitOrderActorResponse,
  >,
  'submit_order' : ActorMethod<[SubmitOrderDetails], SubmitOrderActorResponse>,
  'swap_exact_tokens_for_tokens' : ActorMethod<
    [SwapExactTokensForTokensRequest],
    SubmitOrderActorResponse,
  >,
  'swap_tokens_for_exact_tokens' : ActorMethod<
    [SwapTokensForExactTokensRequest],
    SubmitOrderActorResponse,
  >,
  'try_submit_order' : ActorMethod<
    [SubmitOrderDetails],
    SubmitOrderActorResponse,
  >,
  'try_swap_exact_tokens_for_tokens' : ActorMethod<
    [TrySwapTokenRequest],
    TrySwapTokenActorResponse,
  >,
  'try_swap_tokens_for_exact_tokens' : ActorMethod<
    [TrySwapTokenRequest],
    TrySwapTokenActorResponse,
  >,
  'version' : ActorMethod<[], GetVersionResponse>,
}
