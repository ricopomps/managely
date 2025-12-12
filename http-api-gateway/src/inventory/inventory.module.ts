import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { NatsClientModule } from '../nats-client/nats-client.module';

@Module({
  imports: [NatsClientModule],
  controllers: [InventoryController],
  providers: [],
})
export class InventoryModule {}
