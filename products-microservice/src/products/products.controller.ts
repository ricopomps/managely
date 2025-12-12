import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { UpdateProductDto } from './dtos/UpdateProduct.dto';
import { CreateRecipeDto } from './dtos/CreateRecipe.dto';
import { UpdateRecipeDto } from './dtos/UpdateRecipe.dto';
import { CheckProductionDto } from './dtos/CheckProduction.dto';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: 'create-product' })
  createProduct(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @MessagePattern({ cmd: 'get-all-products' })
  getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @MessagePattern({ cmd: 'get-product-by-id' })
  getProductById(@Payload() id: number) {
    return this.productsService.getProductById(id);
  }

  @MessagePattern({ cmd: 'update-product' })
  updateProduct(@Payload() data: { id: number; dto: UpdateProductDto }) {
    return this.productsService.updateProduct(data.id, data.dto);
  }

  @MessagePattern({ cmd: 'delete-product' })
  deleteProduct(@Payload() id: number) {
    return this.productsService.deleteProduct(id);
  }

  @MessagePattern({ cmd: 'add-recipe-to-product' })
  addRecipeToProduct(@Payload() data: { productId: number; dto: CreateRecipeDto }) {
    return this.productsService.addRecipeToProduct(data.productId, data.dto);
  }

  @MessagePattern({ cmd: 'get-product-recipe' })
  getProductRecipe(@Payload() productId: number) {
    return this.productsService.getProductRecipe(productId);
  }

  @MessagePattern({ cmd: 'get-product-cost' })
  getProductCost(@Payload() productId: number) {
    return this.productsService.getProductCost(productId);
  }

  @MessagePattern({ cmd: 'update-recipe-item' })
  updateRecipeItem(@Payload() data: { productId: number; rawMaterialId: number; dto: UpdateRecipeDto }) {
    return this.productsService.updateRecipeItem(data.productId, data.rawMaterialId, data.dto);
  }

  @MessagePattern({ cmd: 'delete-recipe-item' })
  deleteRecipeItem(@Payload() data: { productId: number; rawMaterialId: number }) {
    return this.productsService.deleteRecipeItem(data.productId, data.rawMaterialId);
  }

  @MessagePattern({ cmd: 'check-production-feasibility' })
  checkProductionFeasibility(@Payload() data: { productId: number; dto: CheckProductionDto }) {
    return this.productsService.checkProductionFeasibility(data.productId, data.dto.quantityToProduce);
  }
}
