import { Injectable, Logger } from '@nestjs/common';

import { PendingOrderService } from './pendingOrder.service';
import { DBTC_DICP_user } from '../scripts/declarations';
import { get_canister_id } from './dfxJson';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  constructor(
    private pendingOrderService: PendingOrderService,
    private logger: Logger,
  ) {}
  @Cron(CronExpression.EVERY_5_SECONDS)
  async handleCronDETH2DICP() {
    this.logger.debug(' handle cron');
    await this.pendingOrderService.approveDBTC(
      DBTC_DICP_user,
      '10^4',
      get_canister_id('DBTC_DICP_fusion').toText(),
    );
    await this.pendingOrderService.cancelDETH2DICPAllOrder();
    await this.pendingOrderService.createDETH2DICPOrder();
  }
}
