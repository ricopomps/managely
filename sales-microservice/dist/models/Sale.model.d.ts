import { SaleItem } from './SaleItem.model';
import { User } from './User.model';
export declare class Sale {
    id: bigint;
    user: User;
    sale_date: Date;
    total_amount: number;
    total_cost: number;
    gross_profit: number;
    saleItems: SaleItem[];
}
