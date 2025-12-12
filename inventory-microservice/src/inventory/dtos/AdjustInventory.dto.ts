import { IsNumber, IsString, IsOptional, IsInt } from 'class-validator';

export class AdjustInventoryDto {
  @IsNumber()
  change_quantity: number;

  @IsString()
  @IsOptional()
  reason?: string;

  @IsInt()
  @IsOptional()
  user_id?: number;
}
