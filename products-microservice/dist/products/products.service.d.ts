import { Repository } from 'typeorm';
import { Product } from '../models/Product.model';
import { Recipe } from '../models/Recipe.model';
import { RawMaterial } from '../models/RawMaterial.model';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { UpdateProductDto } from './dtos/UpdateProduct.dto';
import { CreateRecipeDto } from './dtos/CreateRecipe.dto';
import { UpdateRecipeDto } from './dtos/UpdateRecipe.dto';
import { ClientProxy } from '@nestjs/microservices';
export declare class ProductsService {
    private productsRepository;
    private recipesRepository;
    private rawMaterialsRepository;
    private natsClient;
    constructor(productsRepository: Repository<Product>, recipesRepository: Repository<Recipe>, rawMaterialsRepository: Repository<RawMaterial>, natsClient: ClientProxy);
    createProduct(createProductDto: CreateProductDto): Promise<Product>;
    getAllProducts(): Promise<Product[]>;
    getProductById(id: number): Promise<Product | null>;
    updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<Product | null>;
    deleteProduct(id: number): Promise<import("typeorm").DeleteResult>;
    addRecipeToProduct(productId: number, createRecipeDto: CreateRecipeDto): Promise<Recipe>;
    getProductRecipe(productId: number): Promise<Recipe[]>;
    getProductCost(productId: number): Promise<{
        productId: number;
        totalCost: number;
    }>;
    updateRecipeItem(productId: number, rawMaterialId: number, updateRecipeDto: UpdateRecipeDto): Promise<Recipe>;
    deleteRecipeItem(productId: number, rawMaterialId: number): Promise<{
        message: string;
    }>;
    checkProductionFeasibility(productId: number, quantityToProduce: number): Promise<{
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
