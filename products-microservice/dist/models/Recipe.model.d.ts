import { Product } from './Product.model';
import { RawMaterial } from './RawMaterial.model';
export declare class Recipe {
    product_id: number;
    raw_material_id: number;
    product: Product;
    rawMaterial: RawMaterial;
    quantity_needed: number;
}
