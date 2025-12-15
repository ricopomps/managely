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
exports.SaleItem = void 0;
const typeorm_1 = require("typeorm");
const Sale_model_1 = require("./Sale.model");
const Product_model_1 = require("./Product.model");
let SaleItem = class SaleItem {
    sale_id;
    product_id;
    sale;
    product;
    quantity;
    unit_price_charged;
    unit_cost_calculated;
};
exports.SaleItem = SaleItem;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'bigint' }),
    __metadata("design:type", BigInt)
], SaleItem.prototype, "sale_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'integer' }),
    __metadata("design:type", Number)
], SaleItem.prototype, "product_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Sale_model_1.Sale, sale => sale.saleItems),
    (0, typeorm_1.JoinColumn)({ name: 'sale_id' }),
    __metadata("design:type", Sale_model_1.Sale)
], SaleItem.prototype, "sale", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Product_model_1.Product, product => product.saleItems),
    (0, typeorm_1.JoinColumn)({ name: 'product_id' }),
    __metadata("design:type", Product_model_1.Product)
], SaleItem.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: false }),
    __metadata("design:type", Number)
], SaleItem.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], SaleItem.prototype, "unit_price_charged", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], SaleItem.prototype, "unit_cost_calculated", void 0);
exports.SaleItem = SaleItem = __decorate([
    (0, typeorm_1.Entity)('sale_items')
], SaleItem);
//# sourceMappingURL=SaleItem.model.js.map