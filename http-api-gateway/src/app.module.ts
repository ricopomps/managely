import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PaymentsModule } from './payments/payments.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { InventoryModule } from './inventory/inventory.module';
import { RawMaterialsModule } from './raw-materials/raw-materials.module';

@Module({
  imports: [UsersModule, PaymentsModule, AuthModule, HealthModule, ProductsModule, SalesModule, RawMaterialsModule, InventoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
