import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RawMaterial } from '../models/RawMaterial.model';
import { RawMaterialsController } from './raw-materials.controller';
import { RawMaterialsService } from  './raw-materials.service'

@Module({
  imports: [TypeOrmModule.forFeature([RawMaterial])],
  controllers: [RawMaterialsController],
  providers: [RawMaterialsService],
})
export class RawMaterialsModule {}
