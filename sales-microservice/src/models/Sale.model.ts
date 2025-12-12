import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { SaleItem } from './SaleItem.model';
import { User } from './User.model';

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn('increment')
  id: bigint;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  sale_date: Date;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
  total_amount: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
  total_cost: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
  gross_profit: number;

  @OneToMany(() => SaleItem, saleItem => saleItem.sale)
  saleItems: SaleItem[];
}
