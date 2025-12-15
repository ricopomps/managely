import { RawMaterial } from './RawMaterial.model';
export declare class InventoryLog {
    id: number;
    raw_material_id: number;
    user_id: number;
    change_quantity: number;
    new_quantity: number;
    reason: string;
    log_date: Date;
    rawMaterial: RawMaterial;
}
