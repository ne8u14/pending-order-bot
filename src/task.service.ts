import { Injectable, Logger } from '@nestjs/common';

import { PendingOrderService } from './pendingOrder.service';

@Injectable()
export class TasksService {
  constructor(
    private pendingOrderService: PendingOrderService,
    private logger: Logger,
  ) {}
  async handleCron() {
    this.logger.debug(' handle cron');
    await this.pendingOrderService.get_DETH_DICP_depth();
    await this.pendingOrderService.get_DETH_DICP_kline();
  }
}
