import { Injectable, Logger } from '@nestjs/common';
import {
  DBTC_DICP_fusion,
  DBTC_DICP_user,
  DETH_DICP_fusion,
  DETH_DICP_user,
} from '../scripts/declarations';
import { get_canister_id } from './dfxJson';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PendingOrderDETH2DICPService } from './pendingOrder.DETH2DICP.service';
import { PendingOrderDBTC2DICPService } from './pendingOrder.DBTC2DICP.service';

@Injectable()
export class TasksService {
  constructor(
    private pendingOrderDETH2DICPService: PendingOrderDETH2DICPService,
    private pendingOrderDBTC2DICPService: PendingOrderDBTC2DICPService,
    private logger: Logger,
  ) {}
  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCronDETH2DICP() {
    this.logger.debug(' handle cron');
    await this.pendingOrderDETH2DICPService.getKline();
    await this.pendingOrderDETH2DICPService.approve(
      DETH_DICP_user,
      '10^4',
      get_canister_id(DETH_DICP_fusion).toText(),
    );
    await this.pendingOrderDETH2DICPService.cancelAllOrder();
    await this.pendingOrderDETH2DICPService.createBidOrder();
    await this.pendingOrderDETH2DICPService.createAskOrder();
    await this.pendingOrderDETH2DICPService.getKline();
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCronDBTC2DICP() {
    this.logger.debug(' handle cron');
    await this.pendingOrderDBTC2DICPService.getKline();
    await this.pendingOrderDBTC2DICPService.approve(
      DBTC_DICP_user,
      '10^4',
      get_canister_id(DBTC_DICP_fusion).toText(),
    );
    await this.pendingOrderDBTC2DICPService.cancelAllOrder();
    await this.pendingOrderDBTC2DICPService.createBidOrder();
    await this.pendingOrderDBTC2DICPService.createAskOrder();
    await this.pendingOrderDBTC2DICPService.getKline();
  }
}
535710000000000000000000000000000;
