import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from '../models/Sale.model';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { SaleItem } from '../models/SaleItem.model';
import { Product } from '../models/Product.model';
import { User } from '../models/User.model';
import { NatsClientModule } from '../nats-client/nats-client.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale, SaleItem, Product, User]),
    NatsClientModule,
  ],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
