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
exports.RawMaterialsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const RawMaterial_model_1 = require("../models/RawMaterial.model");
let RawMaterialsService = class RawMaterialsService {
    rawMaterialsRepository;
    constructor(rawMaterialsRepository) {
        this.rawMaterialsRepository = rawMaterialsRepository;
    }
    create(createRawMaterialDto) {
        const newRawMaterial = this.rawMaterialsRepository.create(createRawMaterialDto);
        return this.rawMaterialsRepository.save(newRawMaterial);
    }
    findAll() {
        return this.rawMaterialsRepository.find();
    }
    findOne(id) {
        return this.rawMaterialsRepository.findOneBy({ id });
    }
    async update(id, updateRawMaterialDto) {
        await this.rawMaterialsRepository.update(id, updateRawMaterialDto);
        return this.findOne(id);
    }
    remove(id) {
        return this.rawMaterialsRepository.delete(id);
    }
};
exports.RawMaterialsService = RawMaterialsService;
exports.RawMaterialsService = RawMaterialsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(RawMaterial_model_1.RawMaterial)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RawMaterialsService);
//# sourceMappingURL=raw-materials.service.js.map