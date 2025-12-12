import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../models/Product.model';
import { Recipe } from '../models/Recipe.model';
import { RawMaterial } from '../models/RawMaterial.model';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { UpdateProductDto } from './dtos/UpdateProduct.dto';
import { CreateRecipeDto } from './dtos/CreateRecipe.dto';
import { UpdateRecipeDto } from './dtos/UpdateRecipe.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Recipe)
    private recipesRepository: Repository<Recipe>,
    @InjectRepository(RawMaterial)
    private rawMaterialsRepository: Repository<RawMaterial>,
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
  ) {}

  createProduct(createProductDto: CreateProductDto) {
    const newProduct = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(newProduct);
  }

  getAllProducts() {
    return this.productsRepository.find();
  }

  getProductById(id: number) {
    return this.productsRepository.findOneBy({ id });
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    await this.productsRepository.update(id, updateProductDto);
    return this.getProductById(id);
  }

  deleteProduct(id: number) {
    return this.productsRepository.delete(id);
  }

  async addRecipeToProduct(productId: number, createRecipeDto: CreateRecipeDto) {
    const product = await this.productsRepository.findOneBy({ id: productId });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found.`);
    }

    const rawMaterial = await this.rawMaterialsRepository.findOneBy({ id: createRecipeDto.raw_material_id });
    if (!rawMaterial) {
      throw new NotFoundException(`Raw material with ID ${createRecipeDto.raw_material_id} not found.`);
    }

    const newRecipe = this.recipesRepository.create({
      product_id: productId,
      ...createRecipeDto,
    });

    return this.recipesRepository.save(newRecipe);
  }

  async getProductRecipe(productId: number) {
    return this.recipesRepository.find({
      where: { product_id: productId },
      relations: ['rawMaterial'],
    });
  }

  async getProductCost(productId: number) {
    const recipes = await this.getProductRecipe(productId);
    if (!recipes.length) {
      return { productId, totalCost: 0 };
    }

    const totalCost = recipes.reduce((sum, recipe) => {
      return sum + recipe.quantity_needed * recipe.rawMaterial.unit_cost;
    }, 0);

    return { productId, totalCost };
  }

  async updateRecipeItem(productId: number, rawMaterialId: number, updateRecipeDto: UpdateRecipeDto) {
    const recipeItem = await this.recipesRepository.findOneBy({ product_id: productId, raw_material_id: rawMaterialId });
    if (!recipeItem) {
      throw new NotFoundException(`Recipe item for product ${productId} and raw material ${rawMaterialId} not found.`);
    }

    recipeItem.quantity_needed = updateRecipeDto.quantity_needed;
    return this.recipesRepository.save(recipeItem);
  }

  async deleteRecipeItem(productId: number, rawMaterialId: number) {
    const result = await this.recipesRepository.delete({ product_id: productId, raw_material_id: rawMaterialId });
    if (result.affected === 0) {
        throw new NotFoundException(`Recipe item for product ${productId} and raw material ${rawMaterialId} not found.`);
    }
    return { message: 'Recipe item deleted successfully' };
  }

  async checkProductionFeasibility(productId: number, quantityToProduce: number) {
    const product = await this.productsRepository.findOneBy({ id: productId });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found.`);
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

    const feasibilityDetails: {
      rawMaterialId: number;
      required: number;
      available: number | string;
      message: string;
    }[] = [];
    let isFeasible = true;

    for (const material of requiredMaterials) {
      try {
        const inventoryItem = await firstValueFrom(
          this.natsClient.send({ cmd: 'get-inventory-item' }, material.rawMaterialId)
        );

        if (!inventoryItem || inventoryItem.quantity < material.requiredQuantity) {
          isFeasible = false;
          feasibilityDetails.push({
            rawMaterialId: material.rawMaterialId,
            required: material.requiredQuantity,
            available: inventoryItem ? inventoryItem.quantity : 0,
            message: 'Insufficient stock',
          });
        } else {
          feasibilityDetails.push({
            rawMaterialId: material.rawMaterialId,
            required: material.requiredQuantity,
            available: inventoryItem.quantity,
            message: 'Sufficient stock',
          });
        }
      } catch (error) {
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
}
