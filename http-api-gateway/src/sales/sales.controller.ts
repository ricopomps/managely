import { Controller, Get, Post, Body, Param, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateSaleDto } from './dtos/CreateSale.dto';

@Controller('sales')
export class SalesController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Post()
  createSale(@Body() createSaleDto: CreateSaleDto) {
    return this.natsClient.send({ cmd: 'create-sale' }, createSaleDto);
  }

  @Get()
  getAllSales() {
    return this.natsClient.send({ cmd: 'get-all-sales' }, {});
  }

  @Get(':id')
  getSaleById(@Param('id') id: string) {
    return this.natsClient.send({ cmd: 'get-sale-by-id' }, +id);
  }
}
