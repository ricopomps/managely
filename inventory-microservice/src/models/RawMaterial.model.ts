import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Inventory } from './Inventory.model';

@Entity('raw_materials')
export class RawMaterial {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 150, unique: true, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  unit_of_measure: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
  unit_cost: number;

  @OneToOne(() => Inventory, inventory => inventory.rawMaterial)
  inventory: Inventory;
}
