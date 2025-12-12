import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Sale } from './Sale.model';
import { Product } from './Product.model';

@Entity('sale_items')
export class SaleItem {
  @PrimaryColumn({ type: 'bigint' })
  sale_id: bigint;

  @PrimaryColumn({ type: 'integer' })
  product_id: number;

  @ManyToOne(() => Sale, sale => sale.saleItems)
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;

  @ManyToOne(() => Product, product => product.saleItems)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'integer', nullable: false })
  quantity: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
  unit_price_charged: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
  unit_cost_calculated: number;
}
