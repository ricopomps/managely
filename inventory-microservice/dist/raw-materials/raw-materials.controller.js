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
exports.RawMaterialsController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const raw_materials_service_1 = require("./raw-materials.service");
const CreateRawMaterial_dto_1 = require("./dtos/CreateRawMaterial.dto");
let RawMaterialsController = class RawMaterialsController {
    rawMaterialsService;
    constructor(rawMaterialsService) {
        this.rawMaterialsService = rawMaterialsService;
    }
    create(createRawMaterialDto) {
        return this.rawMaterialsService.create(createRawMaterialDto);
    }
    findAll() {
        return this.rawMaterialsService.findAll();
    }
    findOne(id) {
        return this.rawMaterialsService.findOne(id);
    }
    update(data) {
        return this.rawMaterialsService.update(data.id, data.dto);
    }
    remove(id) {
        return this.rawMaterialsService.remove(id);
    }
};
exports.RawMaterialsController = RawMaterialsController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create-raw-material' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateRawMaterial_dto_1.CreateRawMaterialDto]),
    __metadata("design:returntype", void 0)
], RawMaterialsController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get-all-raw-materials' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RawMaterialsController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get-raw-material-by-id' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RawMaterialsController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update-raw-material' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RawMaterialsController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete-raw-material' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], RawMaterialsController.prototype, "remove", null);
exports.RawMaterialsController = RawMaterialsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [raw_materials_service_1.RawMaterialsService])
], RawMaterialsController);
//# sourceMappingURL=raw-materials.controller.js.map