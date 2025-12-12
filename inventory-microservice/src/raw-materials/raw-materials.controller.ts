import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RawMaterialsService } from './raw-materials.service';
import { CreateRawMaterialDto } from './dtos/CreateRawMaterial.dto';
import { UpdateRawMaterialDto } from './dtos/UpdateRawMaterial.dto';

@Controller()
export class RawMaterialsController {
  constructor(private rawMaterialsService: RawMaterialsService) {}

  @MessagePattern({ cmd: 'create-raw-material' })
  create(@Payload() createRawMaterialDto: CreateRawMaterialDto) {
    return this.rawMaterialsService.create(createRawMaterialDto);
  }

  @MessagePattern({ cmd: 'get-all-raw-materials' })
  findAll() {
    return this.rawMaterialsService.findAll();
  }

  @MessagePattern({ cmd: 'get-raw-material-by-id' })
  findOne(@Payload() id: number) {
    return this.rawMaterialsService.findOne(id);
  }

  @MessagePattern({ cmd: 'update-raw-material' })
  update(@Payload() data: { id: number; dto: UpdateRawMaterialDto }) {
    return this.rawMaterialsService.update(data.id, data.dto);
  }

  @MessagePattern({ cmd: 'delete-raw-material' })
  remove(@Payload() id: number) {
    return this.rawMaterialsService.remove(id);
  }
}
