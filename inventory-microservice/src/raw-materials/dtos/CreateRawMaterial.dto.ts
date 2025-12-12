import { IsString, IsNumber, IsPositive } from 'class-validator';

export class CreateRawMaterialDto {
  @IsString()
  name: string;

  @IsString()
  unit_of_measure: string;

  @IsNumber()
  @IsPositive()
  unit_cost: number;
}
