import { Principal } from '@dfinity/principal';
import { Injectable, Logger } from '@nestjs/common';
import {
  createDBTCActor,
  createDETHActor,
  createDICPActor,
  createFusionActor,
  createOrderbook_depthActor,
  createOrderbook_klineActor,
  DBTC_DICP_orderbook_depth,
  DETH_DICP_fusion,
  DETH_DICP_orderbook_depth,
  DETH_DICP_orderbook_kline,
  DETH_DICP_user,
} from '../scripts/declarations';
import { defaultPVADecimals } from './PVADecimals';
import { get_canister_id, get_max, get_min, get_order_count } from './dfxJson';
import { DepthDto } from './pendingOrder.dto';
import { SubmitOrderDetails } from '../scripts/declarations/fusion/fusion.did';
import * as math from 'mathjs';
import { KlineTick } from '../scripts/declarations/orderbook_kline/orderbook_kline.did';

@Injectable()
export class PendingOrderDETH2DICPService {
  constructor(private logger: Logger) {}

  async cancelAllOrder(): Promise<void> {
    const actor = createFusionActor(DETH_DICP_fusion, DETH_DICP_user);
    const response = await actor.cancel_all_orders();
    this.logger.debug(response);
  }

  async createBidOrder(): Promise<void> {
    const actor = createFusionActor(DETH_DICP_fusion, DETH_DICP_user);
    const kline = await this.getKline();
    //ask
    const inputs: SubmitOrderDetails[] = [];
    for (let i = 0; i < get_order_count(); i++) {
      const r =
        Math.floor(Math.random() * (get_max() - get_min() + 1)) + get_min();
      const price =
        kline.high -
        defaultPVADecimals.toPrice((r / math.evaluate('10^6')).toString());
      this.logger.debug(`bid random: ${BigInt(r)}`);
      this.logger.debug(`bid price: ${BigInt(price)}`);
      inputs.push({
        Limit: {
          order_direction: { Bid: null },
          price: BigInt(price),
          volume: defaultPVADecimals.toVolume(
            (Math.random() * 100 + 10).toString(),
          ),
        },
      });
    }
    for (let i = 0; i < get_order_count(); i++) {
      const r =
        Math.floor(Math.random() * (get_max() - get_min() + 1)) + get_min();
      const price =
        kline.high +
        defaultPVADecimals.toPrice((r / math.evaluate('10^6')).toString());
      this.logger.debug(`bid random: ${BigInt(r)}`);
      this.logger.debug(`bid price: ${BigInt(price)}`);
      inputs.push({
        Limit: {
          order_direction: { Bid: null },
          price: BigInt(price),
          volume: defaultPVADecimals.toVolume(
            (Math.random() * 100 + 10).toString(),
          ),
        },
      });
    }
    const response = await actor.batch_submit_order(inputs);
    this.logger.debug(`bid response: ${JSON.stringify(response)}`);
  }
  async createAskOrder(): Promise<void> {
    const actor = createFusionActor(DETH_DICP_fusion, DETH_DICP_user);
    const kline = await this.getKline();
    //ask
    const inputs: SubmitOrderDetails[] = [];
    for (let i = 0; i < get_order_count(); i++) {
      const r =
        Math.floor(Math.random() * (get_max() - get_min() + 1)) + get_min();
      const price =
        kline.low -
        defaultPVADecimals.toPrice((r / math.evaluate('10^6')).toString());
      this.logger.debug(`ask random: ${BigInt(r)}`);
      this.logger.debug(`ask price: ${BigInt(price)}`);
      inputs.push({
        Limit: {
          order_direction: { Ask: null },
          price: BigInt(price),
          volume: defaultPVADecimals.toVolume(
            (Math.random() * 100 + 10).toString(),
          ),
        },
      });
    }
    for (let i = 0; i < get_order_count(); i++) {
      const r =
        Math.floor(Math.random() * (get_max() - get_min() + 1)) + get_min();
      const price =
        kline.low +
        defaultPVADecimals.toPrice((r / math.evaluate('10^6')).toString());
      this.logger.debug(`ask random: ${BigInt(r)}`);
      this.logger.debug(`ask price: ${BigInt(price)}`);
      inputs.push({
        Limit: {
          order_direction: { Ask: null },
          price: BigInt(price),
          volume: defaultPVADecimals.toVolume(
            (Math.random() * 100 + 10).toString(),
          ),
        },
      });
    }
    const response = await actor.batch_submit_order(inputs);
    this.logger.debug(`ask response: ${JSON.stringify(response)}`);
  }

  async getDepth(): Promise<DepthDto> {
    const actor = createOrderbook_depthActor(
      DETH_DICP_orderbook_depth,
      DETH_DICP_user,
    );
    const response = await actor.get_reverse_depth(0, 1);
    if ('Ok' in response) {
      this.logger.debug(response.Ok.asks);
      this.logger.debug(response.Ok.bids);

      return {
        bidPrice: response.Ok.bids[0][0],
        bidVolume: response.Ok.bids[0][1],
        askPrice: response.Ok.asks[0][0],
        askVolume: response.Ok.asks[0][1],
      };
    }
  }

  async getKline(): Promise<KlineTick> {
    const actor = createOrderbook_klineActor(
      DETH_DICP_orderbook_kline,
      DETH_DICP_user,
    );

    const response = await actor.get_current_kline(5);
    if ('Ok' in response) {
      this.logger.debug(`kline: ${JSON.stringify(response.Ok[0])}`);
      return response.Ok[0];
    }
    throw new Error('kline error');
  }

  async approve(
    user: string,
    amount: string,
    canisterId: string,
  ): Promise<void> {
    const actor = createDBTCActor(user);
    const response = await actor.approve(
      [],
      canisterId,
      defaultPVADecimals.toAmount(amount.toString()),
      [],
    );
  }
}
