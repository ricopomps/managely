"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Inventory_model_1 = require("../models/Inventory.model");
const RawMaterial_model_1 = require("../models/RawMaterial.model");
const InventoryLog_model_1 = require("../models/InventoryLog.model");
let InventoryService = class InventoryService {
    inventoryRepository;
    rawMaterialRepository;
    inventoryLogRepository;
    constructor(inventoryRepository, rawMaterialRepository, inventoryLogRepository) {
        this.inventoryRepository = inventoryRepository;
        this.rawMaterialRepository = rawMaterialRepository;
        this.inventoryLogRepository = inventoryLogRepository;
    }
    async getInventory() {
        return this.inventoryRepository.find({ relations: ['rawMaterial'] });
    }
    async getInventoryItem(rawMaterialId) {
        const item = await this.inventoryRepository.findOne({
            where: { raw_material_id: rawMaterialId },
            relations: ['rawMaterial'],
        });
        if (!item) {
            throw new common_1.NotFoundException(`Inventory item for raw material ID ${rawMaterialId} not found.`);
        }
        return item;
    }
    async updateInventory(rawMaterialId, updateInventoryDto) {
        const rawMaterial = await this.rawMaterialRepository.findOneBy({ id: rawMaterialId });
        if (!rawMaterial) {
            throw new common_1.NotFoundException(`Raw material with ID ${rawMaterialId} not found.`);
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
    async adjustInventory(rawMaterialId, adjustInventoryDto) {
        const rawMaterial = await this.rawMaterialRepository.findOneBy({ id: rawMaterialId });
        if (!rawMaterial) {
            throw new common_1.NotFoundException(`Raw material with ID ${rawMaterialId} not found.`);
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
    async getInventoryHistory(rawMaterialId) {
        return this.inventoryLogRepository.find({
            where: { raw_material_id: rawMaterialId },
            order: { log_date: 'DESC' },
        });
    }
};
exports.InventoryService = InventoryService;
exports.InventoryService = InventoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Inventory_model_1.Inventory)),
    __param(1, (0, typeorm_1.InjectRepository)(RawMaterial_model_1.RawMaterial)),
    __param(2, (0, typeorm_1.InjectRepository)(InventoryLog_model_1.InventoryLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], InventoryService);
//# sourceMappingURL=inventory.service.js.map