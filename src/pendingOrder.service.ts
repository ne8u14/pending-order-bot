import { Principal } from '@dfinity/principal';
import { Injectable, Logger } from '@nestjs/common';
import {
  createDETHActor,
  createOrderbook_depthActor,
  createOrderbook_klineActor,
  DETH_DICP_user,
} from '../scripts/declarations';
import logger from 'node-color-log';

@Injectable()
export class PendingOrderService {
  constructor(private logger: Logger) {}

  async get_DETH_DICP_depth(): Promise<void> {
    const actor = createOrderbook_depthActor('DETC_DICP', DETH_DICP_user);
    const response = await actor.get_depth(0, 100);
    if ('Ok' in response) {
      logger.debug(response.Ok.asks);
      logger.debug(response.Ok.bids);
    }
  }
  async get_DETH_DICP_kline(): Promise<void> {
    const actor = createOrderbook_klineActor('DETC_DICP');

    const response = await actor.get_current_kline(5);
    if ('Ok' in response) {
      logger.debug(response.Ok);
    }
  }
}
