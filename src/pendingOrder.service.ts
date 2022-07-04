import { Principal } from '@dfinity/principal';
import { Injectable, Logger } from '@nestjs/common';
import {
  createDBTCActor,
  createDETHActor,
  createDICPActor,
  createOrderbook_depthActor,
  createOrderbook_klineActor,
  DBTC_DICP_orderbook_depth,
  DETH_DICP_orderbook_depth,
  DETH_DICP_orderbook_kline,
  DETH_DICP_user,
} from '../scripts/declarations';
import logger from 'node-color-log';
import { defaultPVADecimals } from './PVADecimals';
import { get_canister_id } from './dfxJson';

@Injectable()
export class PendingOrderService {
  constructor(private logger: Logger) {}

  async getDETH2DICPDepth(): Promise<void> {
    const actor = createOrderbook_depthActor(
      DETH_DICP_orderbook_depth,
      DETH_DICP_user,
    );
    const response = await actor.get_depth(0, 100);
    if ('Ok' in response) {
      logger.debug(response.Ok.asks);
      logger.debug(response.Ok.bids);
    }
  }

  async getDETH2DICPKline(): Promise<void> {
    const actor = createOrderbook_klineActor(
      DETH_DICP_orderbook_kline,
      DETH_DICP_user,
    );

    const response = await actor.get_current_kline(5);
    if ('Ok' in response) {
      logger.debug(response.Ok);
    }
  }

  async approveDBTC(
    user: string,
    amount: number,
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
