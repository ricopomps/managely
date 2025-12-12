import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from './Product.model';
import { RawMaterial } from './RawMaterial.model';

@Entity('recipes')
export class Recipe {
  @PrimaryColumn({ type: 'integer' })
  product_id: number;

  @PrimaryColumn({ type: 'integer' })
  raw_material_id: number;

  @ManyToOne(() => Product, product => product.recipes)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => RawMaterial, rawMaterial => rawMaterial.recipes)
  @JoinColumn({ name: 'raw_material_id' })
  rawMaterial: RawMaterial;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
  quantity_needed: number;
}
