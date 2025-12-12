import { Module } from '@nestjs/common';
import { RawMaterialsController } from './raw-materials.controller';
import { NatsClientModule } from '../nats-client/nats-client.module';

@Module({
  imports: [NatsClientModule],
  controllers: [RawMaterialsController],
  providers: [],
})
export class RawMaterialsModule {}
