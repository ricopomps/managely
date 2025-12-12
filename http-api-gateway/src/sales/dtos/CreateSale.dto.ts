import { SaleItemDto } from './SaleItem.dto';

export class CreateSaleDto {
  user_id: number;
  items: SaleItemDto[];
}
