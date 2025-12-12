import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InventoryService } from './inventory.service';
import { UpdateInventoryDto } from './dtos/UpdateInventory.dto';
import { AdjustInventoryDto } from './dtos/AdjustInventory.dto';

@Controller()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @MessagePattern({ cmd: 'get-inventory' })
  getInventory() {
    return this.inventoryService.getInventory();
  }

  @MessagePattern({ cmd: 'get-inventory-item' })
  getInventoryItem(@Payload() rawMaterialId: number) {
    return this.inventoryService.getInventoryItem(rawMaterialId);
  }

  @MessagePattern({ cmd: 'update-inventory' })
  updateInventory(@Payload() data: { rawMaterialId: number, dto: UpdateInventoryDto }) {
    return this.inventoryService.updateInventory(data.rawMaterialId, data.dto);
  }

  @MessagePattern({ cmd: 'adjust-inventory' })
  adjustInventory(@Payload() data: { rawMaterialId: number, dto: AdjustInventoryDto }) {
    return this.inventoryService.adjustInventory(data.rawMaterialId, data.dto);
  }

  @MessagePattern({ cmd: 'get-inventory-history' })
  getInventoryHistory(@Payload() rawMaterialId: number) {
    return this.inventoryService.getInventoryHistory(rawMaterialId);
  }
}
