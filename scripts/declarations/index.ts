import {createActor as createWICP} from "./token_WICP";
import {createActor as createWUSD} from "./token_WUSD";
import {createActor as createFusion} from "./fusion";
import {createActor as createOrderbook_kline} from "./orderbook_kline";
import {createActor as createOrderbook_depth} from "./orderbook_depth";
import { identity, canister } from '@deland-labs/ic-dev-kit';
import { get_host, get_monitor_principal } from '../../src/dfxJson';




const createWICPActor = (user?: string) => {
    const canisterId = canister.get_id("token_WICP");
    if (user === undefined) {
        return createWICP(canisterId, {
            agentOptions: {host: identity.identityFactory.getDefaultHost()},
        });
    }
    const identityInfo = identity.identityFactory.getIdentity(user)!;
    return createWICP(canisterId, {
        agentOptions: identityInfo.agentOptions,
    });
};

// create a dft_basic2 actor
const createWUSDActor = (user?: string) => {
    const canisterId = canister.get_id("token_WUSD");
    if (user === undefined) {
        return createWUSD(canisterId, {
            agentOptions: {host: identity.identityFactory.getDefaultHost()},
        });
    }
    const identityInfo = identity.identityFactory.getIdentity(user)!;
    return createWUSD(canisterId, {
        agentOptions: identityInfo.agentOptions,
    });
};

// create a fusion actor
const createFusionActor = (user?: string) => {
    const canisterId = canister.get_id("fusion");
    if (user === undefined) {
        return createFusion(canisterId, {
            agentOptions: {host: identity.identityFactory.getDefaultHost()},
        });
    }
    const identityInfo = identity.identityFactory.getIdentity(user)!;
    return createFusion(canisterId, {
        agentOptions: identityInfo.agentOptions,
    });
};

const createOrderbook_klineActor = (user?: string) => {
    const canisterId = canister.get_id("orderbook_kline");
    if (user === undefined) {
        return createOrderbook_kline(canisterId, {
            agentOptions: {host: identity.identityFactory.getDefaultHost()},
        });
    }
    const identityInfo = identity.identityFactory.getIdentity(user)!;
    return createOrderbook_kline(canisterId, {
        agentOptions: identityInfo.agentOptions,
    });
};

const createOrderbook_trade_listActor = (user?: string) => {
    const canisterId = canister.get_id("orderbook_trade_list");
    if (user === undefined) {
        return createOrderbook_trade_list(canisterId, {
            agentOptions: {host: identity.identityFactory.getDefaultHost()},
        });
    }
    const identityInfo = identity.identityFactory.getIdentity(user)!;
    return createOrderbook_trade_list(canisterId, {
        agentOptions: identityInfo.agentOptions,
    });
};


export {
    createWICPActor,
    createWUSDActor,
    createFusionActor,
    createOrderbook_klineActor,
    createOrderbook_trade_listActor,
};
