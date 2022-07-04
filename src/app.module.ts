import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TasksService } from './task.service';
import { PendingOrderService } from './pendingOrder.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [
    Logger,
    SchedulerRegistry,
    ConfigService,
    TasksService,
    PendingOrderService,
  ],
})
export class AppModule {}
