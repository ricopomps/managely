import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateRawMaterialDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsNotEmpty()
  measurementUnit: string;
}
