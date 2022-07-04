import { createActor as createWICP } from './token_WICP';
import { createActor as createWUSD } from './token_WUSD';
import { createActor as createFusion } from './fusion';
import { createActor as createOrderbook_kline } from './orderbook_kline';
import { createActor as createOrderbook_depth } from './orderbook_depth';
import { identity } from '@deland-labs/ic-dev-kit';
import { get_canister_id, get_host } from '../../src/dfxJson';

const createDBTCActor = (user?: string) => {
  const canisterId = get_canister_id('token_test_DBTC');
  if (user === undefined) {
    return createWUSD(canisterId, {
      agentOptions: { host: get_host() },
    });
  }
  const identityInfo = identity.identityFactory.getIdentity(user)!;
  return createWUSD(canisterId, {
    agentOptions: {
      host: get_host(),
      identity: identityInfo.agentOptions.identity,
    },
  });
};

// create a dft_basic2 actor
const createDETHActor = (user?: string) => {
  const canisterId = get_canister_id('token_test_DETH');
  if (user === undefined) {
    return createWUSD(canisterId, {
      agentOptions: { host: identity.identityFactory.getDefaultHost() },
    });
  }
  const identityInfo = identity.identityFactory.getIdentity(user)!;
  return createWUSD(canisterId, {
    agentOptions: {
      host: get_host(),
      identity: identityInfo.agentOptions.identity,
    },
  });
};
// create a dft_basic2 actor
const createDICPActor = (user?: string) => {
  const canisterId = get_canister_id('token_test_DICP');
  if (user === undefined) {
    return createWICP(canisterId, {
      agentOptions: { host: identity.identityFactory.getDefaultHost() },
    });
  }
  const identityInfo = identity.identityFactory.getIdentity(user)!;
  return createWICP(canisterId, {
    agentOptions: {
      host: get_host(),
      identity: identityInfo.agentOptions.identity,
    },
  });
};

// create a fusion actor
const createFusionActor = (name: string, user?: string) => {
  const canisterId = get_canister_id(name);
  if (user === undefined) {
    return createFusion(canisterId, {
      agentOptions: { host: get_host() },
    });
  }
  const identityInfo = identity.identityFactory.getIdentity(user)!;
  return createFusion(canisterId, {
    agentOptions: {
      host: get_host(),
      identity: identityInfo.agentOptions.identity,
    },
  });
};

const createOrderbook_klineActor = (name: string, user?: string) => {
  const canisterId = get_canister_id(name);
  if (user === undefined) {
    return createOrderbook_kline(canisterId, {
      agentOptions: { host: get_host() },
    });
  }
  const identityInfo = identity.identityFactory.getIdentity(user)!;
  return createOrderbook_kline(canisterId, {
    agentOptions: {
      host: get_host(),
      identity: identityInfo.agentOptions.identity,
    },
  });
};
const createOrderbook_depthActor = (name: string, user?: string) => {
  const canisterId = get_canister_id(name);
  if (user === undefined) {
    return createOrderbook_depth(canisterId, {
      agentOptions: { host: get_host() },
    });
  }
  const identityInfo = identity.identityFactory.getIdentity(user)!;
  return createOrderbook_depth(canisterId, {
    agentOptions: {
      host: get_host(),
      identity: identityInfo.agentOptions.identity,
    },
  });
};

export {
  createDBTCActor,
  createDETHActor,
  createDICPActor,
  createFusionActor,
  createOrderbook_klineActor,
  createOrderbook_depthActor,
};

export const token_test_DBTC = 'token_test_DBTC';
export const token_test_DETH = 'token_test_DETH';
export const token_test_DICP = 'token_test_DICP';
export const DBTC_DICP_fusion = 'DBTC_DICP_fusion';
export const DBTC_DICP_orderbook_kline = 'DBTC_DICP_orderbook_kline';
export const DBTC_DICP_orderbook_depth = 'DBTC_DICP_orderbook_depth';
export const DETH_DICP_fusion = 'DETH_DICP_fusion';
export const DETH_DICP_orderbook_kline = 'DETH_DICP_orderbook_kline';
export const DETH_DICP_orderbook_depth = 'DETH_DICP_orderbook_depth';
export const DBTC_DICP_user = 'DBTC_DICP_user';
export const DETH_DICP_user = 'DETH_DICP_user';
