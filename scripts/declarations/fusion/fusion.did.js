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
  const OrderDirection = IDL.Variant({ 'Ask' : IDL.Null, 'Bid' : IDL.Null });
  const SwapExactTokensForTokensRequest = IDL.Record({
    'amount_out_min' : IDL.Nat,
    'order_direction' : OrderDirection,
    'exact_token' : IDL.Nat,
  });
  const SwapTokensForExactTokensRequest = IDL.Record({
    'order_direction' : OrderDirection,
    'amount_in_max' : IDL.Nat,
    'exact_token' : IDL.Nat,
  });
  const SubmitOrderDetails = IDL.Variant({
    'Limit' : IDL.Record({
      'order_direction' : OrderDirection,
      'volume' : IDL.Nat,
      'price' : IDL.Nat,
    }),
    'SwapExactTokensForTokens' : SwapExactTokensForTokensRequest,
    'SwapTokensForExactTokens' : SwapTokensForExactTokensRequest,
  });
  const OrderId = IDL.Record({ 'id' : IDL.Nat });
  const SubmitOrderResponse = IDL.Record({
    'state_version_before_submission' : IDL.Nat64,
    'order_id' : OrderId,
  });
  const ErrorInfo = IDL.Record({ 'code' : IDL.Nat32, 'message' : IDL.Text });
  const SubmitOrderActorResponse = IDL.Variant({
    'Ok' : SubmitOrderResponse,
    'Err' : ErrorInfo,
  });
  const BurnLiquidityRequest = IDL.Record({ 'liquidity' : IDL.Nat });
  const BurnLiquidityResponse = IDL.Record({
    'pool_volume' : IDL.Nat,
    'user_liquidity' : IDL.Nat,
    'volume' : IDL.Nat,
    'pool_amount' : IDL.Nat,
    'amount' : IDL.Nat,
    'pool_liquidity' : IDL.Nat,
  });
  const BurnLiquidityActorResponse = IDL.Variant({
    'Ok' : BurnLiquidityResponse,
    'Err' : ErrorInfo,
  });
  const BooleanActorResponse = IDL.Variant({
    'Ok' : IDL.Bool,
    'Err' : ErrorInfo,
  });
  const StateExportData = IDL.Record({ 'state_data' : IDL.Vec(IDL.Nat8) });
  const StateExportResponse = IDL.Variant({
    'Ok' : StateExportData,
    'Err' : ErrorInfo,
  });
  const GetFusionEventsRequest = IDL.Record({ 'limit' : IDL.Nat32 });
  const EventData = IDL.Record({
    'code' : IDL.Nat8,
    'data' : IDL.Vec(IDL.Nat8),
    'version' : IDL.Nat64,
  });
  const GetFusionEventsResponse = IDL.Record({
    'left_count' : IDL.Nat32,
    'events' : IDL.Vec(EventData),
  });
  const SwapInfoResponse = IDL.Record({
    'pool_volume' : IDL.Nat,
    'user_liquidity' : IDL.Nat,
    'pool_amount' : IDL.Nat,
    'pool_liquidity' : IDL.Nat,
  });
  const GetSwapInfoActorResponse = IDL.Variant({
    'Ok' : SwapInfoResponse,
    'Err' : ErrorInfo,
  });
  const MyOrderItem = IDL.Record({
    'id' : OrderId,
    'order_direction' : OrderDirection,
    'volume' : IDL.Nat,
    'created_at' : IDL.Nat64,
    'filled' : IDL.Nat,
    'price' : IDL.Nat,
  });
  const GetUserOrdersActorResponse = IDL.Variant({
    'Ok' : IDL.Vec(MyOrderItem),
    'Err' : ErrorInfo,
  });
  const MintLiquidityRequest = IDL.Record({
    'volume' : IDL.Nat,
    'amount' : IDL.Nat,
  });
  const MintLiquidityActorResponse = IDL.Variant({
    'Ok' : BurnLiquidityRequest,
    'Err' : ErrorInfo,
  });
  const RemoveFusionEventsRequest = IDL.Record({
    'end_version_excluded' : IDL.Nat64,
    'start_version_included' : IDL.Nat64,
  });
  const RemoveFusionEventsResponse = IDL.Record({ 'left_count' : IDL.Nat32 });
  const TrySwapTokenRequest = IDL.Record({
    'order_direction' : OrderDirection,
    'exact_token' : IDL.Nat,
  });
  const TrySwapTokenResponse = IDL.Record({ 'value' : IDL.Nat });
  const TrySwapTokenActorResponse = IDL.Variant({
    'Ok' : TrySwapTokenResponse,
    'Err' : ErrorInfo,
  });
  const GetVersionResponse = IDL.Variant({
    'Ok' : IDL.Nat64,
    'Err' : ErrorInfo,
  });
  return IDL.Service({
    'batch_submit_order' : IDL.Func(
        [IDL.Vec(SubmitOrderDetails)],
        [SubmitOrderActorResponse],
        [],
      ),
    'burn_liquidity' : IDL.Func(
        [BurnLiquidityRequest],
        [BurnLiquidityActorResponse],
        [],
      ),
    'cancel_all_orders' : IDL.Func([], [BooleanActorResponse], []),
    'cancel_order' : IDL.Func([OrderId], [BooleanActorResponse], []),
    'export_state' : IDL.Func([], [StateExportResponse], []),
    'get_events' : IDL.Func(
        [GetFusionEventsRequest],
        [GetFusionEventsResponse],
        ['query'],
      ),
    'get_swap_info' : IDL.Func([], [GetSwapInfoActorResponse], ['query']),
    'get_user_orders' : IDL.Func([], [GetUserOrdersActorResponse], ['query']),
    'get_wasm_info' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))],
        ['query'],
      ),
    'init_es' : IDL.Func(
        [IDL.Principal, IDL.Nat8, IDL.Principal, IDL.Nat8],
        [BooleanActorResponse],
        [],
      ),
    'load_state' : IDL.Func([StateExportData], [BooleanActorResponse], []),
    'mint_liquidity' : IDL.Func(
        [MintLiquidityRequest],
        [MintLiquidityActorResponse],
        [],
      ),
    'remove_events' : IDL.Func(
        [RemoveFusionEventsRequest],
        [RemoveFusionEventsResponse],
        [],
      ),
    'submit_ask_limit_order' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [SubmitOrderActorResponse],
        [],
      ),
    'submit_bid_limit_order' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [SubmitOrderActorResponse],
        [],
      ),
    'submit_order' : IDL.Func(
        [SubmitOrderDetails],
        [SubmitOrderActorResponse],
        [],
      ),
    'swap_exact_tokens_for_tokens' : IDL.Func(
        [SwapExactTokensForTokensRequest],
        [SubmitOrderActorResponse],
        [],
      ),
    'swap_tokens_for_exact_tokens' : IDL.Func(
        [SwapTokensForExactTokensRequest],
        [SubmitOrderActorResponse],
        [],
      ),
    'try_submit_order' : IDL.Func(
        [SubmitOrderDetails],
        [SubmitOrderActorResponse],
        ['query'],
      ),
    'try_swap_exact_tokens_for_tokens' : IDL.Func(
        [TrySwapTokenRequest],
        [TrySwapTokenActorResponse],
        ['query'],
      ),
    'try_swap_tokens_for_exact_tokens' : IDL.Func(
        [TrySwapTokenRequest],
        [TrySwapTokenActorResponse],
        ['query'],
      ),
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
