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
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const products_service_1 = require("./products.service");
const CreateProduct_dto_1 = require("./dtos/CreateProduct.dto");
let ProductsController = class ProductsController {
    productsService;
    constructor(productsService) {
        this.productsService = productsService;
    }
    createProduct(createProductDto) {
        return this.productsService.createProduct(createProductDto);
    }
    getAllProducts() {
        return this.productsService.getAllProducts();
    }
    getProductById(id) {
        return this.productsService.getProductById(id);
    }
    updateProduct(data) {
        return this.productsService.updateProduct(data.id, data.dto);
    }
    deleteProduct(id) {
        return this.productsService.deleteProduct(id);
    }
    addRecipeToProduct(data) {
        return this.productsService.addRecipeToProduct(data.productId, data.dto);
    }
    getProductRecipe(productId) {
        return this.productsService.getProductRecipe(productId);
    }
    getProductCost(productId) {
        return this.productsService.getProductCost(productId);
    }
    updateRecipeItem(data) {
        return this.productsService.updateRecipeItem(data.productId, data.rawMaterialId, data.dto);
    }
    deleteRecipeItem(data) {
        return this.productsService.deleteRecipeItem(data.productId, data.rawMaterialId);
    }
    checkProductionFeasibility(data) {
        return this.productsService.checkProductionFeasibility(data.productId, data.dto.quantityToProduce);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'create-product' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateProduct_dto_1.CreateProductDto]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "createProduct", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get-all-products' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getAllProducts", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get-product-by-id' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getProductById", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update-product' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "updateProduct", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete-product' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "deleteProduct", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'add-recipe-to-product' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "addRecipeToProduct", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get-product-recipe' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getProductRecipe", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'get-product-cost' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "getProductCost", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'update-recipe-item' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "updateRecipeItem", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'delete-recipe-item' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "deleteRecipeItem", null);
__decorate([
    (0, microservices_1.MessagePattern)({ cmd: 'check-production-feasibility' }),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "checkProductionFeasibility", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map