import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RawMaterialsModule } from './raw-materials/raw-materials.module';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [
    RawMaterialsModule,
    InventoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
