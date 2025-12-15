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
exports.InventoryLog = void 0;
const typeorm_1 = require("typeorm");
const RawMaterial_model_1 = require("./RawMaterial.model");
let InventoryLog = class InventoryLog {
    id;
    raw_material_id;
    user_id;
    change_quantity;
    new_quantity;
    reason;
    log_date;
    rawMaterial;
};
exports.InventoryLog = InventoryLog;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], InventoryLog.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], InventoryLog.prototype, "raw_material_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], InventoryLog.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], InventoryLog.prototype, "change_quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], InventoryLog.prototype, "new_quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], InventoryLog.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], InventoryLog.prototype, "log_date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => RawMaterial_model_1.RawMaterial),
    (0, typeorm_1.JoinColumn)({ name: 'raw_material_id' }),
    __metadata("design:type", RawMaterial_model_1.RawMaterial)
], InventoryLog.prototype, "rawMaterial", void 0);
exports.InventoryLog = InventoryLog = __decorate([
    (0, typeorm_1.Entity)('inventory_logs')
], InventoryLog);
//# sourceMappingURL=InventoryLog.model.js.map