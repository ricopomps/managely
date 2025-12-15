import { Inventory } from './Inventory.model';
export declare class RawMaterial {
    id: number;
    name: string;
    unit_of_measure: string;
    unit_cost: number;
    inventory: Inventory;
}
