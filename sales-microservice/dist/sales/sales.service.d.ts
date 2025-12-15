import { Repository } from 'typeorm';
import { Sale } from '../models/Sale.model';
import { SaleItem } from '../models/SaleItem.model';
import { Product } from '../models/Product.model';
import { User } from '../models/User.model';
import { CreateSaleDto } from './dtos/CreateSale.dto';
import { ClientProxy } from '@nestjs/microservices';
export declare class SalesService {
    private salesRepository;
    private saleItemsRepository;
    private productsRepository;
    private usersRepository;
    private natsClient;
    constructor(salesRepository: Repository<Sale>, saleItemsRepository: Repository<SaleItem>, productsRepository: Repository<Product>, usersRepository: Repository<User>, natsClient: ClientProxy);
    createSale(createSaleDto: CreateSaleDto): Promise<Sale>;
    getAllSales(): Promise<Sale[]>;
    getSaleById(id: number): Promise<Sale | null>;
}
