import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class CreateRecipeDto {
  @IsInt()
  raw_material_id: number;

  @IsNumber()
  @IsPositive()
  quantity_needed: number;
}
