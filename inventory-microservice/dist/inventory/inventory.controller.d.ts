import { InventoryService } from './inventory.service';
import { UpdateInventoryDto } from './dtos/UpdateInventory.dto';
import { AdjustInventoryDto } from './dtos/AdjustInventory.dto';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    getInventory(): Promise<import("../models/Inventory.model").Inventory[]>;
    getInventoryItem(rawMaterialId: number): Promise<import("../models/Inventory.model").Inventory>;
    updateInventory(data: {
        rawMaterialId: number;
        dto: UpdateInventoryDto;
    }): Promise<import("../models/Inventory.model").Inventory>;
    adjustInventory(data: {
        rawMaterialId: number;
        dto: AdjustInventoryDto;
    }): Promise<import("../models/Inventory.model").Inventory>;
    getInventoryHistory(rawMaterialId: number): Promise<import("../models/InventoryLog.model").InventoryLog[]>;
}
