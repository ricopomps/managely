import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateRawMaterialDto } from './dtos/CreateRawMaterial.dto';
import { UpdateRawMaterialDto } from './dtos/UpdateRawMaterial.dto';

@Controller('raw-materials')
export class RawMaterialsController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Post()
  createRawMaterial(@Body() createRawMaterialDto: CreateRawMaterialDto) {
    return this.natsClient.send({ cmd: 'create-raw-material' }, createRawMaterialDto);
  }

  @Get()
  getAllRawMaterials() {
    return this.natsClient.send({ cmd: 'get-all-raw-materials' }, {});
  }

  @Get(':id')
  getRawMaterialById(@Param('id') id: string) {
    return this.natsClient.send({ cmd: 'get-raw-material-by-id' }, +id);
  }

  @Patch(':id')
  updateRawMaterial(@Param('id') id: string, @Body() updateRawMaterialDto: UpdateRawMaterialDto) {
    return this.natsClient.send({ cmd: 'update-raw-material' }, { id: +id, dto: updateRawMaterialDto });
  }

  @Delete(':id')
  deleteRawMaterial(@Param('id') id: string) {
    return this.natsClient.send({ cmd: 'delete-raw-material' }, +id);
  }
}
