import { IsInt, IsPositive } from 'class-validator';

export class CheckProductionDto {
  @IsInt()
  @IsPositive()
  quantityToProduce: number;
}
