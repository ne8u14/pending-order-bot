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
  async handleCron() {
    this.logger.debug(' handle cron');
    await this.pendingOrderService.getDETH2DICPDepth();
    await this.pendingOrderService.getDETH2DICPKline();
    await this.pendingOrderService.approveDBTC(
      DBTC_DICP_user,
      1000,
      get_canister_id('DBTC_DICP_fusion').toText(),
    );
  }
}
