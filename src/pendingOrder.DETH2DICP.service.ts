import { Injectable, Logger } from '@nestjs/common';
import {
  createDBTCActor,
  createFusionActor,
  createOrderbook_depthActor,
  createOrderbook_klineActor,
  DETH_DICP_fusion,
  DETH_DICP_orderbook_depth,
  DETH_DICP_orderbook_kline,
  DETH_DICP_user,
} from '../scripts/declarations';
import { defaultPVADecimals } from './PVADecimals';
import {
  get_order_count,
  get_random_price,
  get_random_volume,
} from './dfxJson';
import { DepthDto } from './pendingOrder.dto';
import { SubmitOrderDetails } from '../scripts/declarations/fusion/fusion.did';
import { KlineTick } from '../scripts/declarations/orderbook_kline/orderbook_kline.did';

@Injectable()
export class PendingOrderDETH2DICPService {
  private readonly user: string;
  private readonly canisterFusion: string;
  private readonly canisterKline: string;
  private readonly canisterDepth: string;

  constructor(private logger: Logger) {
    this.user = DETH_DICP_user;
    this.canisterFusion = DETH_DICP_fusion;
    this.canisterKline = DETH_DICP_orderbook_kline;
    this.canisterDepth = DETH_DICP_orderbook_depth;
  }

  async cancelAllOrder(): Promise<void> {
    const actor = createFusionActor(this.canisterFusion, this.user);
    const response = await actor.cancel_all_orders();
    this.logger.debug(`cancel all order`);
  }

  async createBidOrder(): Promise<void> {
    const actor = createFusionActor(this.canisterFusion, this.user);
    const kline = await this.getKline();
    //ask
    const inputs: SubmitOrderDetails[] = [];
    for (let i = 0; i < get_order_count(); i++) {
      const price = kline.close - get_random_price();
      this.logger.debug(`bid price: ${BigInt(price)}`);
      const volume = get_random_volume();
      this.logger.debug(`bid volume: ${BigInt(volume)}`);
      inputs.push({
        Limit: {
          order_direction: { Bid: null },
          price: BigInt(price),
          volume: volume,
        },
      });
    }
    const response = await actor.batch_submit_order(inputs);
    this.logger.debug(`bid response: ${JSON.stringify(response)}`);
  }
  async createAskOrder(): Promise<void> {
    const actor = createFusionActor(this.canisterFusion, this.user);
    const kline = await this.getKline();
    //ask
    const inputs: SubmitOrderDetails[] = [];
    for (let i = 0; i < get_order_count(); i++) {
      const price = kline.close + get_random_price();
      this.logger.debug(`ask price: ${BigInt(price)}`);
      const volume = get_random_volume();
      this.logger.debug(`ask volume: ${BigInt(volume)}`);
      inputs.push({
        Limit: {
          order_direction: { Ask: null },
          price: BigInt(price),
          volume: volume,
        },
      });
    }
    const response = await actor.batch_submit_order(inputs);
    this.logger.debug(`ask response: ${JSON.stringify(response)}`);
  }

  async getDepth(): Promise<DepthDto> {
    const actor = createOrderbook_depthActor(this.canisterDepth, this.user);
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
    const actor = createOrderbook_klineActor(this.canisterKline, this.user);

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
