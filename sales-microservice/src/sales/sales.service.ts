import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from '../models/Sale.model';
import { SaleItem } from '../models/SaleItem.model';
import { Product } from '../models/Product.model';
import { User } from '../models/User.model';
import { CreateSaleDto } from './dtos/CreateSale.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private salesRepository: Repository<Sale>,
    @InjectRepository(SaleItem)
    private saleItemsRepository: Repository<SaleItem>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
  ) {}

  async createSale(createSaleDto: CreateSaleDto) {
    const user = await this.usersRepository.findOneBy({ id: createSaleDto.user_id });
    if (!user) {
      throw new NotFoundException(`User with ID ${createSaleDto.user_id} not found.`);
    }

    const itemsWithDetails: {
      product: Product;
      quantity: number;
      unit_price_charged: number;
      unit_cost_calculated: number;
    }[] = [];
    let totalAmount = 0;
    let totalCost = 0;

    for (const item of createSaleDto.items) {
      const product = await this.productsRepository.findOneBy({ id: item.product_id });
      if (!product) {
        throw new NotFoundException(`Product with ID ${item.product_id} not found.`);
      }

      const productCostResponse: { totalCost: number } = await firstValueFrom(
        this.natsClient.send({ cmd: 'get-product-cost' }, item.product_id)
      );
      
      totalAmount += product.sale_price * item.quantity;
      totalCost += productCostResponse.totalCost * item.quantity;

      itemsWithDetails.push({
        product,
        quantity: item.quantity,
        unit_price_charged: product.sale_price,
        unit_cost_calculated: productCostResponse.totalCost,
      });
    }

    const grossProfit = totalAmount - totalCost;

    const newSale = this.salesRepository.create({
      user,
      total_amount: totalAmount,
      total_cost: totalCost,
      gross_profit: grossProfit,
    });

    const savedSale = await this.salesRepository.save(newSale);

    for (const item of itemsWithDetails) {
      const saleItem = this.saleItemsRepository.create({
        sale_id: savedSale.id,
        product_id: item.product.id,
        quantity: item.quantity,
        unit_price_charged: item.unit_price_charged,
        unit_cost_calculated: item.unit_cost_calculated,
      });
      await this.saleItemsRepository.save(saleItem);

      // Adjust inventory
      const recipe: any[] = await firstValueFrom(
        this.natsClient.send({ cmd: 'get-product-recipe' }, item.product.id)
      );
      
      for (const recipeItem of recipe) {
        await firstValueFrom(
          this.natsClient.send({ cmd: 'adjust-inventory' }, {
            rawMaterialId: recipeItem.raw_material_id,
            dto: {
              change_quantity: - (recipeItem.quantity_needed * item.quantity),
              reason: `Sale #${savedSale.id}`,
            }
          })
        );
      }
    }

    return savedSale;
  }

  getAllSales() {
    return this.salesRepository.find({ relations: ['user', 'saleItems', 'saleItems.product'] });
  }

  getSaleById(id: number) {
    return this.salesRepository.findOne({
      where: { id: BigInt(id) },
      relations: ['user', 'saleItems', 'saleItems.product'],
    });
  }
}
