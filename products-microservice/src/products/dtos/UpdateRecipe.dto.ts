import { IsNumber, IsPositive } from 'class-validator';

export class UpdateRecipeDto {
  @IsNumber()
  @IsPositive()
  quantity_needed: number;
}
