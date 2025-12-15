import { SaleItem } from './SaleItem.model';
export declare class Product {
    id: number;
    name: string;
    description: string;
    sale_price: number;
    saleItems: SaleItem[];
}
