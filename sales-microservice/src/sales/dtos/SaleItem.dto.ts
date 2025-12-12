import { IsInt, IsPositive } from 'class-validator';

export class SaleItemDto {
  @IsInt()
  product_id: number;

  @IsInt()
  @IsPositive()
  quantity: number;
}
