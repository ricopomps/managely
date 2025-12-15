import { Sale } from './Sale.model';
import { Product } from './Product.model';
export declare class SaleItem {
    sale_id: bigint;
    product_id: number;
    sale: Sale;
    product: Product;
    quantity: number;
    unit_price_charged: number;
    unit_cost_calculated: number;
}
