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
import { get_canister_id, get_order_count, get_range } from './dfxJson';
import { DepthDto } from './pendingOrder.dto';
import { SubmitOrderDetails } from '../scripts/declarations/fusion/fusion.did';

@Injectable()
export class PendingOrderService {
  constructor(private logger: Logger) {}

  async cancelDETH2DICPAllOrder(): Promise<void> {
    const actor = createFusionActor(DETH_DICP_fusion, DETH_DICP_user);
    const response = await actor.cancel_all_orders();
    this.logger.debug(response);
  }

  async createDETH2DICPOrder(): Promise<void> {
    const actor = createFusionActor(DETH_DICP_fusion, DETH_DICP_user);
    const depthDto = await this.getDETH2DICPDepth();
    //ask
    const inputs: SubmitOrderDetails[] = [];
    for (let i = 0; i < get_order_count(); i++) {
      const price =
        Math.floor(Math.random() * Number(depthDto.askPrice) + get_range()) + 1;
      this.logger.debug(`price: ${price}`);
      inputs.push({
        Limit: {
          order_direction: { Ask: null },
          price: BigInt(price),
          volume: defaultPVADecimals.toVolume('1'),
        },
      });
    }
    const response = await actor.batch_submit_order(inputs);
    this.logger.debug(response);
  }

  async getDETH2DICPDepth(): Promise<DepthDto> {
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

  async getDETH2DICPKline(): Promise<void> {
    const actor = createOrderbook_klineActor(
      DETH_DICP_orderbook_kline,
      DETH_DICP_user,
    );

    const response = await actor.get_current_kline(5);
    if ('Ok' in response) {
      for (const kline of response.Ok) {
        this.logger.debug(kline);
      }
    }
  }

  async approveDBTC(
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
    this.logger.debug(response);
  }

  async approveDETH(
    user: string,
    amount: number,
    canisterId: string,
  ): Promise<void> {
    const actor = createDETHActor(user);
    const response = await actor.approve(
      [],
      canisterId,
      defaultPVADecimals.toAmount(amount.toString()),
      [],
    );
    this.logger.debug(response);
  }
  async approveDICP(
    user: string,
    amount: number,
    canisterId: string,
  ): Promise<void> {
    const actor = createDICPActor(user);
    const response = await actor.approve(
      [],
      canisterId,
      defaultPVADecimals.toVolume(amount.toString()),
      [],
    );
    this.logger.debug(response);
  }
}
