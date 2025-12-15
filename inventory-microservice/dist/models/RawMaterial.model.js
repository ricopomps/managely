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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawMaterial = void 0;
const typeorm_1 = require("typeorm");
const Inventory_model_1 = require("./Inventory.model");
let RawMaterial = class RawMaterial {
    id;
    name;
    unit_of_measure;
    unit_cost;
    inventory;
};
exports.RawMaterial = RawMaterial;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RawMaterial.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 150, unique: true, nullable: false }),
    __metadata("design:type", String)
], RawMaterial.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: false }),
    __metadata("design:type", String)
], RawMaterial.prototype, "unit_of_measure", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], RawMaterial.prototype, "unit_cost", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Inventory_model_1.Inventory, inventory => inventory.rawMaterial),
    __metadata("design:type", Inventory_model_1.Inventory)
], RawMaterial.prototype, "inventory", void 0);
exports.RawMaterial = RawMaterial = __decorate([
    (0, typeorm_1.Entity)('raw_materials')
], RawMaterial);
//# sourceMappingURL=RawMaterial.model.js.map