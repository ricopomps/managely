import { PartialType } from '@nestjs/mapped-types';
import { CreateRawMaterialDto } from './CreateRawMaterial.dto';

export class UpdateRawMaterialDto extends PartialType(CreateRawMaterialDto) {}
