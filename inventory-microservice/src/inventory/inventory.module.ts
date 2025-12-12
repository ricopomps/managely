import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from '../models/Inventory.model';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { RawMaterial } from '../models/RawMaterial.model';
import { InventoryLog } from '../models/InventoryLog.model';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory, RawMaterial, InventoryLog])],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
