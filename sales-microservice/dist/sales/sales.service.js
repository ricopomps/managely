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
exports.SalesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Sale_model_1 = require("../models/Sale.model");
const SaleItem_model_1 = require("../models/SaleItem.model");
const Product_model_1 = require("../models/Product.model");
const User_model_1 = require("../models/User.model");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
let SalesService = class SalesService {
    salesRepository;
    saleItemsRepository;
    productsRepository;
    usersRepository;
    natsClient;
    constructor(salesRepository, saleItemsRepository, productsRepository, usersRepository, natsClient) {
        this.salesRepository = salesRepository;
        this.saleItemsRepository = saleItemsRepository;
        this.productsRepository = productsRepository;
        this.usersRepository = usersRepository;
        this.natsClient = natsClient;
    }
    async createSale(createSaleDto) {
        const user = await this.usersRepository.findOneBy({ id: createSaleDto.user_id });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${createSaleDto.user_id} not found.`);
        }
        const itemsWithDetails = [];
        let totalAmount = 0;
        let totalCost = 0;
        for (const item of createSaleDto.items) {
            const product = await this.productsRepository.findOneBy({ id: item.product_id });
            if (!product) {
                throw new common_1.NotFoundException(`Product with ID ${item.product_id} not found.`);
            }
            const productCostResponse = await (0, rxjs_1.firstValueFrom)(this.natsClient.send({ cmd: 'get-product-cost' }, item.product_id));
            totalAmount += product.sale_price * item.quantity;
            totalCost += productCostResponse.totalCost * item.quantity;
            itemsWithDetails.push({
                product,
                quantity: item.quantity,
                unit_price_charged: product.sale_price,
                unit_cost_calculated: productCostResponse.totalCost,
            });
        }
        const grossProfit = totalAmount - totalCost;
        const newSale = this.salesRepository.create({
            user,
            total_amount: totalAmount,
            total_cost: totalCost,
            gross_profit: grossProfit,
        });
        const savedSale = await this.salesRepository.save(newSale);
        for (const item of itemsWithDetails) {
            const saleItem = this.saleItemsRepository.create({
                sale_id: savedSale.id,
                product_id: item.product.id,
                quantity: item.quantity,
                unit_price_charged: item.unit_price_charged,
                unit_cost_calculated: item.unit_cost_calculated,
            });
            await this.saleItemsRepository.save(saleItem);
            const recipe = await (0, rxjs_1.firstValueFrom)(this.natsClient.send({ cmd: 'get-product-recipe' }, item.product.id));
            for (const recipeItem of recipe) {
                await (0, rxjs_1.firstValueFrom)(this.natsClient.send({ cmd: 'adjust-inventory' }, {
                    rawMaterialId: recipeItem.raw_material_id,
                    dto: {
                        change_quantity: -(recipeItem.quantity_needed * item.quantity),
                        reason: `Sale #${savedSale.id}`,
                    }
                }));
            }
        }
        return savedSale;
    }
    getAllSales() {
        return this.salesRepository.find({ relations: ['user', 'saleItems', 'saleItems.product'] });
    }
    getSaleById(id) {
        return this.salesRepository.findOne({
            where: { id: BigInt(id) },
            relations: ['user', 'saleItems', 'saleItems.product'],
        });
    }
};
exports.SalesService = SalesService;
exports.SalesService = SalesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Sale_model_1.Sale)),
    __param(1, (0, typeorm_1.InjectRepository)(SaleItem_model_1.SaleItem)),
    __param(2, (0, typeorm_1.InjectRepository)(Product_model_1.Product)),
    __param(3, (0, typeorm_1.InjectRepository)(User_model_1.User)),
    __param(4, (0, common_1.Inject)('NATS_SERVICE')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        microservices_1.ClientProxy])
], SalesService);
//# sourceMappingURL=sales.service.js.map