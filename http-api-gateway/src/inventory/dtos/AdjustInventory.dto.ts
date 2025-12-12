import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AdjustInventoryDto {
  @IsNotEmpty()
  @IsNumber()
  rawMaterialId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  reason: string;
}
