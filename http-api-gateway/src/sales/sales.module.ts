import { Module } from '@nestjs/common';
import { NatsClientModule } from '../nats-client/nats-client.module';
import { SalesController } from './sales.controller';

@Module({
  imports: [NatsClientModule],
  controllers: [SalesController],
})
export class SalesModule {}
