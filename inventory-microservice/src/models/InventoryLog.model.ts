import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { RawMaterial } from './RawMaterial.model';

@Entity('inventory_logs')
export class InventoryLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  raw_material_id: number;

  @Column({ nullable: true })
  user_id: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  change_quantity: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  new_quantity: number;

  @Column({ length: 255, nullable: true })
  reason: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  log_date: Date;

  @ManyToOne(() => RawMaterial)
  @JoinColumn({ name: 'raw_material_id' })
  rawMaterial: RawMaterial;
}
