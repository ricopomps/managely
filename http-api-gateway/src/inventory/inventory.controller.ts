import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AdjustInventoryDto } from './dtos/AdjustInventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Get()
  getInventory() {
    return this.natsClient.send({ cmd: 'get-inventory' }, {});
  }

  @Post('adjust')
  adjustInventory(@Body() adjustInventoryDto: AdjustInventoryDto) {
    return this.natsClient.send({ cmd: 'adjust-inventory' }, adjustInventoryDto);
  }

  @Get('history')
  getInventoryHistory() {
    return this.natsClient.send({ cmd: 'get-inventory-history' }, {});
  }
}
