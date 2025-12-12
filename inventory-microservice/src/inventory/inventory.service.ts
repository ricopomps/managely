import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from '../models/Inventory.model';
import { RawMaterial } from '../models/RawMaterial.model';
import { InventoryLog } from '../models/InventoryLog.model';
import { UpdateInventoryDto } from './dtos/UpdateInventory.dto';
import { AdjustInventoryDto } from './dtos/AdjustInventory.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
    @InjectRepository(RawMaterial)
    private rawMaterialRepository: Repository<RawMaterial>,
    @InjectRepository(InventoryLog)
    private inventoryLogRepository: Repository<InventoryLog>,
  ) {}

  async getInventory() {
    return this.inventoryRepository.find({ relations: ['rawMaterial'] });
  }

  async getInventoryItem(rawMaterialId: number) {
    const item = await this.inventoryRepository.findOne({
      where: { raw_material_id: rawMaterialId },
      relations: ['rawMaterial'],
    });
    if (!item) {
      throw new NotFoundException(`Inventory item for raw material ID ${rawMaterialId} not found.`);
    }
    return item;
  }

  async updateInventory(rawMaterialId: number, updateInventoryDto: UpdateInventoryDto) {
    const rawMaterial = await this.rawMaterialRepository.findOneBy({ id: rawMaterialId });
    if (!rawMaterial) {
      throw new NotFoundException(`Raw material with ID ${rawMaterialId} not found.`);
    }

    let inventoryItem = await this.inventoryRepository.findOneBy({ raw_material_id: rawMaterialId });

    if (!inventoryItem) {
      inventoryItem = this.inventoryRepository.create({
        raw_material_id: rawMaterialId,
        quantity: 0,
      });
    }

    inventoryItem.quantity = updateInventoryDto.quantity;
    inventoryItem.last_in_date = new Date();

    return this.inventoryRepository.save(inventoryItem);
  }

  async adjustInventory(rawMaterialId: number, adjustInventoryDto: AdjustInventoryDto) {
    const rawMaterial = await this.rawMaterialRepository.findOneBy({ id: rawMaterialId });
    if (!rawMaterial) {
      throw new NotFoundException(`Raw material with ID ${rawMaterialId} not found.`);
    }

    let inventoryItem = await this.inventoryRepository.findOneBy({ raw_material_id: rawMaterialId });

    if (!inventoryItem) {
      inventoryItem = this.inventoryRepository.create({
        raw_material_id: rawMaterialId,
        quantity: 0,
      });
    }

    const newQuantity = inventoryItem.quantity + adjustInventoryDto.change_quantity;

    const log = this.inventoryLogRepository.create({
      raw_material_id: rawMaterialId,
      change_quantity: adjustInventoryDto.change_quantity,
      new_quantity: newQuantity,
      reason: adjustInventoryDto.reason,
      user_id: adjustInventoryDto.user_id,
    });

    await this.inventoryLogRepository.save(log);

    inventoryItem.quantity = newQuantity;
    inventoryItem.last_in_date = new Date();

    return this.inventoryRepository.save(inventoryItem);
  }

  async getInventoryHistory(rawMaterialId: number) {
    return this.inventoryLogRepository.find({
      where: { raw_material_id: rawMaterialId },
      order: { log_date: 'DESC' },
    });
  }
}
