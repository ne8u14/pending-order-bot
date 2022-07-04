import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type BooleanActorResponse = { 'Ok' : boolean } |
  { 'Err' : ErrorInfo };
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
export type GetVersionResponse = { 'Ok' : bigint } |
  { 'Err' : ErrorInfo };
export interface InitArgs {
  'dev_named_canister_ids' : Array<[CanisterNames, Principal]>,
}
export interface KlineTick {
  'low' : bigint,
  'high' : bigint,
  'close' : bigint,
  'open' : bigint,
  'volume' : bigint,
  'tick_index' : bigint,
}
export type Result = { 'Ok' : [] | [KlineTick] } |
  { 'Err' : ErrorInfo };
export type Result_1 = { 'Ok' : Array<KlineTick> } |
  { 'Err' : ErrorInfo };
export interface StateExportData { 'state_data' : Array<number> }
export type StateExportResponse = { 'Ok' : StateExportData } |
  { 'Err' : ErrorInfo };
export interface _SERVICE {
  'export_state' : ActorMethod<[], StateExportResponse>,
  'get_current_kline' : ActorMethod<[number], Result>,
  'get_kline_ticks' : ActorMethod<[number, number, number], Result_1>,
  'get_reverse_current_kline' : ActorMethod<[number], Result>,
  'get_reverse_kline_ticks' : ActorMethod<[number, number, number], Result_1>,
  'get_wasm_info' : ActorMethod<[], Array<[string, string]>>,
  'load_state' : ActorMethod<[StateExportData], BooleanActorResponse>,
  'trigger_event_processing' : ActorMethod<[], undefined>,
  'version' : ActorMethod<[], GetVersionResponse>,
}
