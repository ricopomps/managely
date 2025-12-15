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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Product_model_1 = require("../models/Product.model");
const Recipe_model_1 = require("../models/Recipe.model");
const RawMaterial_model_1 = require("../models/RawMaterial.model");
const microservices_1 = require("@nestjs/microservices");
const common_2 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let ProductsService = class ProductsService {
    productsRepository;
    recipesRepository;
    rawMaterialsRepository;
    natsClient;
    constructor(productsRepository, recipesRepository, rawMaterialsRepository, natsClient) {
        this.productsRepository = productsRepository;
        this.recipesRepository = recipesRepository;
        this.rawMaterialsRepository = rawMaterialsRepository;
        this.natsClient = natsClient;
    }
    createProduct(createProductDto) {
        const newProduct = this.productsRepository.create(createProductDto);
        return this.productsRepository.save(newProduct);
    }
    getAllProducts() {
        return this.productsRepository.find();
    }
    getProductById(id) {
        return this.productsRepository.findOneBy({ id });
    }
    async updateProduct(id, updateProductDto) {
        await this.productsRepository.update(id, updateProductDto);
        return this.getProductById(id);
    }
    deleteProduct(id) {
        return this.productsRepository.delete(id);
    }
    async addRecipeToProduct(productId, createRecipeDto) {
        const product = await this.productsRepository.findOneBy({ id: productId });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${productId} not found.`);
        }
        const rawMaterial = await this.rawMaterialsRepository.findOneBy({ id: createRecipeDto.raw_material_id });
        if (!rawMaterial) {
            throw new common_1.NotFoundException(`Raw material with ID ${createRecipeDto.raw_material_id} not found.`);
        }
        const newRecipe = this.recipesRepository.create({
            product_id: productId,
            ...createRecipeDto,
        });
        return this.recipesRepository.save(newRecipe);
    }
    async getProductRecipe(productId) {
        return this.recipesRepository.find({
            where: { product_id: productId },
            relations: ['rawMaterial'],
        });
    }
    async getProductCost(productId) {
        const recipes = await this.getProductRecipe(productId);
        if (!recipes.length) {
            return { productId, totalCost: 0 };
        }
        const totalCost = recipes.reduce((sum, recipe) => {
            return sum + recipe.quantity_needed * recipe.rawMaterial.unit_cost;
        }, 0);
        return { productId, totalCost };
    }
    async updateRecipeItem(productId, rawMaterialId, updateRecipeDto) {
        const recipeItem = await this.recipesRepository.findOneBy({ product_id: productId, raw_material_id: rawMaterialId });
        if (!recipeItem) {
            throw new common_1.NotFoundException(`Recipe item for product ${productId} and raw material ${rawMaterialId} not found.`);
        }
        recipeItem.quantity_needed = updateRecipeDto.quantity_needed;
        return this.recipesRepository.save(recipeItem);
    }
    async deleteRecipeItem(productId, rawMaterialId) {
        const result = await this.recipesRepository.delete({ product_id: productId, raw_material_id: rawMaterialId });
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Recipe item for product ${productId} and raw material ${rawMaterialId} not found.`);
        }
        return { message: 'Recipe item deleted successfully' };
    }
    async checkProductionFeasibility(productId, quantityToProduce) {
        const product = await this.productsRepository.findOneBy({ id: productId });
        if (!product) {
            throw new common_1.NotFoundException(`Product with ID ${productId} not found.`);
        }
        const recipe = await this.getProductRecipe(productId);
        if (!recipe.length) {
            return {
                isFeasible: false,
                message: `Product with ID ${productId} has no recipe.`,
                details: [],
            };
        }
        const requiredMaterials = recipe.map(item => ({
            rawMaterialId: item.raw_material_id,
            requiredQuantity: item.quantity_needed * quantityToProduce,
        }));
        const feasibilityDetails = [];
        let isFeasible = true;
        for (const material of requiredMaterials) {
            try {
                const inventoryItem = await (0, rxjs_1.firstValueFrom)(this.natsClient.send({ cmd: 'get-inventory-item' }, material.rawMaterialId));
                if (!inventoryItem || inventoryItem.quantity < material.requiredQuantity) {
                    isFeasible = false;
                    feasibilityDetails.push({
                        rawMaterialId: material.rawMaterialId,
                        required: material.requiredQuantity,
                        available: inventoryItem ? inventoryItem.quantity : 0,
                        message: 'Insufficient stock',
                    });
                }
                else {
                    feasibilityDetails.push({
                        rawMaterialId: material.rawMaterialId,
                        required: material.requiredQuantity,
                        available: inventoryItem.quantity,
                        message: 'Sufficient stock',
                    });
                }
            }
            catch (error) {
                isFeasible = false;
                feasibilityDetails.push({
                    rawMaterialId: material.rawMaterialId,
                    required: material.requiredQuantity,
                    available: 'N/A',
                    message: 'Failed to retrieve inventory data',
                });
            }
        }
        return {
            isFeasible,
            message: isFeasible ? 'Production is feasible.' : 'Production is not feasible due to insufficient materials.',
            details: feasibilityDetails,
        };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Product_model_1.Product)),
    __param(1, (0, typeorm_1.InjectRepository)(Recipe_model_1.Recipe)),
    __param(2, (0, typeorm_1.InjectRepository)(RawMaterial_model_1.RawMaterial)),
    __param(3, (0, common_2.Inject)('NATS_SERVICE')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository, typeof (_a = typeof microservices_1.ClientProxy !== "undefined" && microservices_1.ClientProxy) === "function" ? _a : Object])
], ProductsService);
//# sourceMappingURL=products.service.js.map