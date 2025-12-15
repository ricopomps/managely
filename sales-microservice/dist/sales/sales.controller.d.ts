import { SalesService } from './sales.service';
import { CreateSaleDto } from './dtos/CreateSale.dto';
export declare class SalesController {
    private readonly salesService;
    constructor(salesService: SalesService);
    createSale(createSaleDto: CreateSaleDto): Promise<import("../models/Sale.model").Sale>;
    getAllSales(): Promise<import("../models/Sale.model").Sale[]>;
    getSaleById(id: number): Promise<import("../models/Sale.model").Sale | null>;
}
