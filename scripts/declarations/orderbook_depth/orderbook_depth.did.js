export const idlFactory = ({ IDL }) => {
  const CanisterNames = IDL.Variant({
    'OrderbookDepth' : IDL.Null,
    'AmountToken' : IDL.Null,
    'OrderbookKline' : IDL.Null,
    'SELF' : IDL.Null,
    'CanisterManagement' : IDL.Null,
    'BucketManager' : IDL.Null,
    'OrderbookTradeList' : IDL.Null,
    'VolumeToken' : IDL.Null,
    'EventStorage' : IDL.Null,
    'Fusion' : IDL.Null,
    'BalanceKeeper' : IDL.Null,
  });
  const InitArgs = IDL.Record({
    'dev_named_canister_ids' : IDL.Vec(IDL.Tuple(CanisterNames, IDL.Principal)),
  });
  const StateExportData = IDL.Record({ 'state_data' : IDL.Vec(IDL.Nat8) });
  const ErrorInfo = IDL.Record({ 'code' : IDL.Nat32, 'message' : IDL.Text });
  const StateExportResponse = IDL.Variant({
    'Ok' : StateExportData,
    'Err' : ErrorInfo,
  });
  const OrderBookDepth = IDL.Record({
    'asks' : IDL.Vec(IDL.Tuple(IDL.Nat, IDL.Nat)),
    'bids' : IDL.Vec(IDL.Tuple(IDL.Nat, IDL.Nat)),
  });
  const Result = IDL.Variant({ 'Ok' : OrderBookDepth, 'Err' : ErrorInfo });
  const BooleanActorResponse = IDL.Variant({
    'Ok' : IDL.Bool,
    'Err' : ErrorInfo,
  });
  const GetVersionResponse = IDL.Variant({
    'Ok' : IDL.Nat64,
    'Err' : ErrorInfo,
  });
  return IDL.Service({
    'export_state' : IDL.Func([], [StateExportResponse], []),
    'get_depth' : IDL.Func([IDL.Nat8, IDL.Nat16], [Result], ['query']),
    'get_reverse_depth' : IDL.Func([IDL.Nat8, IDL.Nat16], [Result], ['query']),
    'get_wasm_info' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))],
        ['query'],
      ),
    'load_state' : IDL.Func([StateExportData], [BooleanActorResponse], []),
    'trigger_event_processing' : IDL.Func([], [], ['oneway']),
    'version' : IDL.Func([], [GetVersionResponse], ['query']),
  });
};
export const init = ({ IDL }) => {
  const CanisterNames = IDL.Variant({
    'OrderbookDepth' : IDL.Null,
    'AmountToken' : IDL.Null,
    'OrderbookKline' : IDL.Null,
    'SELF' : IDL.Null,
    'CanisterManagement' : IDL.Null,
    'BucketManager' : IDL.Null,
    'OrderbookTradeList' : IDL.Null,
    'VolumeToken' : IDL.Null,
    'EventStorage' : IDL.Null,
    'Fusion' : IDL.Null,
    'BalanceKeeper' : IDL.Null,
  });
  const InitArgs = IDL.Record({
    'dev_named_canister_ids' : IDL.Vec(IDL.Tuple(CanisterNames, IDL.Principal)),
  });
  return [IDL.Opt(InitArgs)];
};
