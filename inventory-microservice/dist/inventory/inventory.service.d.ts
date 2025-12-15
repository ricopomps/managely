import { Repository } from 'typeorm';
import { Inventory } from '../models/Inventory.model';
import { RawMaterial } from '../models/RawMaterial.model';
import { InventoryLog } from '../models/InventoryLog.model';
import { UpdateInventoryDto } from './dtos/UpdateInventory.dto';
import { AdjustInventoryDto } from './dtos/AdjustInventory.dto';
export declare class InventoryService {
    private inventoryRepository;
    private rawMaterialRepository;
    private inventoryLogRepository;
    constructor(inventoryRepository: Repository<Inventory>, rawMaterialRepository: Repository<RawMaterial>, inventoryLogRepository: Repository<InventoryLog>);
    getInventory(): Promise<Inventory[]>;
    getInventoryItem(rawMaterialId: number): Promise<Inventory>;
    updateInventory(rawMaterialId: number, updateInventoryDto: UpdateInventoryDto): Promise<Inventory>;
    adjustInventory(rawMaterialId: number, adjustInventoryDto: AdjustInventoryDto): Promise<Inventory>;
    getInventoryHistory(rawMaterialId: number): Promise<InventoryLog[]>;
}
