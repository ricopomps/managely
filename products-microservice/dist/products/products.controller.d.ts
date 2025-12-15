import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { UpdateProductDto } from './dtos/UpdateProduct.dto';
import { CreateRecipeDto } from './dtos/CreateRecipe.dto';
import { UpdateRecipeDto } from './dtos/UpdateRecipe.dto';
import { CheckProductionDto } from './dtos/CheckProduction.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    createProduct(createProductDto: CreateProductDto): Promise<import("../models/Product.model").Product>;
    getAllProducts(): Promise<import("../models/Product.model").Product[]>;
    getProductById(id: number): Promise<import("../models/Product.model").Product | null>;
    updateProduct(data: {
        id: number;
        dto: UpdateProductDto;
    }): Promise<import("../models/Product.model").Product | null>;
    deleteProduct(id: number): Promise<import("typeorm").DeleteResult>;
    addRecipeToProduct(data: {
        productId: number;
        dto: CreateRecipeDto;
    }): Promise<import("../models/Recipe.model").Recipe>;
    getProductRecipe(productId: number): Promise<import("../models/Recipe.model").Recipe[]>;
    getProductCost(productId: number): Promise<{
        productId: number;
        totalCost: number;
    }>;
    updateRecipeItem(data: {
        productId: number;
        rawMaterialId: number;
        dto: UpdateRecipeDto;
    }): Promise<import("../models/Recipe.model").Recipe>;
    deleteRecipeItem(data: {
        productId: number;
        rawMaterialId: number;
    }): Promise<{
        message: string;
    }>;
    checkProductionFeasibility(data: {
        productId: number;
        dto: CheckProductionDto;
    }): Promise<{
        isFeasible: boolean;
        message: string;
        details: {
            rawMaterialId: number;
            required: number;
            available: number | string;
            message: string;
        }[];
    }>;
}
