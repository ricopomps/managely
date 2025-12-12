import { Module } from '@nestjs/common';
import { NatsClientModule } from '../nats-client/nats-client.module';
import { ProductsController } from './products.controller';

@Module({
  imports: [NatsClientModule],
  controllers: [ProductsController],
})
export class ProductsModule {}
