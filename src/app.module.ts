import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TasksService } from './task.service';
import { PendingOrderDETH2DICPService } from './pendingOrder.DETH2DICP.service';
import { PendingOrderDBTC2DICPService } from './pendingOrder.DBTC2DICP.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [
    Logger,
    SchedulerRegistry,
    ConfigService,
    TasksService,
    PendingOrderDETH2DICPService,
    PendingOrderDBTC2DICPService,
  ],
})
export class AppModule {}
