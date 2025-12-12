import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../models/Product.model';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Recipe } from '../models/Recipe.model';
import { RawMaterial } from '../models/RawMaterial.model';
import { NatsClientModule } from '../nats-client/nats-client.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Recipe, RawMaterial]), NatsClientModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
