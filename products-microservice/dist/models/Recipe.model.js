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
exports.Recipe = void 0;
const typeorm_1 = require("typeorm");
const Product_model_1 = require("./Product.model");
const RawMaterial_model_1 = require("./RawMaterial.model");
let Recipe = class Recipe {
    product_id;
    raw_material_id;
    product;
    rawMaterial;
    quantity_needed;
};
exports.Recipe = Recipe;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'integer' }),
    __metadata("design:type", Number)
], Recipe.prototype, "product_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'integer' }),
    __metadata("design:type", Number)
], Recipe.prototype, "raw_material_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Product_model_1.Product, product => product.recipes),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", Product_model_1.Product)
], Recipe.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => RawMaterial_model_1.RawMaterial, rawMaterial => rawMaterial.recipes),
    (0, typeorm_1.JoinColumn)({ name: 'raw_material_id' }),
    __metadata("design:type", RawMaterial_model_1.RawMaterial)
], Recipe.prototype, "rawMaterial", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], Recipe.prototype, "quantity_needed", void 0);
exports.Recipe = Recipe = __decorate([
    (0, typeorm_1.Entity)('recipes')
], Recipe);
//# sourceMappingURL=Recipe.model.js.map