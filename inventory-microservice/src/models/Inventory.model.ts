import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { RawMaterial } from './RawMaterial.model';

@Entity('inventory')
export class Inventory {
  @PrimaryColumn()
  raw_material_id: number;

  @OneToOne(() => RawMaterial, rawMaterial => rawMaterial.inventory)
  @JoinColumn({ name: 'raw_material_id' })
  rawMaterial: RawMaterial;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
  quantity: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_in_date: Date;
}
