import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dtos/CreateSale.dto';

@Controller()
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @MessagePattern({ cmd: 'create-sale' })
  createSale(@Payload() createSaleDto: CreateSaleDto) {
    return this.salesService.createSale(createSaleDto);
  }

  @MessagePattern({ cmd: 'get-all-sales' })
  getAllSales() {
    return this.salesService.getAllSales();
  }

  @MessagePattern({ cmd: 'get-sale-by-id' })
  getSaleById(@Payload() id: number) {
    return this.salesService.getSaleById(id);
  }
}
