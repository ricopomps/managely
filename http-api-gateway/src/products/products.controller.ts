import { Controller, Get, Post, Body, Param, Inject, Patch, Delete } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { UpdateProductDto } from './dtos/UpdateProduct.dto';
import { CreateRecipeDto } from './dtos/CreateRecipe.dto';
import { UpdateRecipeDto } from './dtos/UpdateRecipe.dto';
import { CheckProductionDto } from './dtos/CheckProduction.dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.natsClient.send({ cmd: 'create-product' }, createProductDto);
  }

  @Get()
  getAllProducts() {
    return this.natsClient.send({ cmd: 'get-all-products' }, {});
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.natsClient.send({ cmd: 'get-product-by-id' }, +id);
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.natsClient.send({ cmd: 'update-product' }, { id: +id, dto: updateProductDto });
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.natsClient.send({ cmd: 'delete-product' }, +id);
  }

  @Post(':id/recipe')
  addRecipeToProduct(@Param('id') id: string, @Body() createRecipeDto: CreateRecipeDto) {
    return this.natsClient.send({ cmd: 'add-recipe-to-product' }, { productId: +id, dto: createRecipeDto });
  }

  @Get(':id/recipe')
  getProductRecipe(@Param('id') id: string) {
    return this.natsClient.send({ cmd: 'get-product-recipe' }, +id);
  }

  @Get(':id/cost')
  getProductCost(@Param('id') id: string) {
    return this.natsClient.send({ cmd: 'get-product-cost' }, +id);
  }

  @Patch(':productId/recipe/:rawMaterialId')
  updateRecipeItem(
    @Param('productId') productId: string,
    @Param('rawMaterialId') rawMaterialId: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ) {
    return this.natsClient.send(
      { cmd: 'update-recipe-item' },
      { productId: +productId, rawMaterialId: +rawMaterialId, dto: updateRecipeDto },
    );
  }

  @Delete(':productId/recipe/:rawMaterialId')
  deleteRecipeItem(
    @Param('productId') productId: string,
    @Param('rawMaterialId') rawMaterialId: string,
  ) {
    return this.natsClient.send(
      { cmd: 'delete-recipe-item' },
      { productId: +productId, rawMaterialId: +rawMaterialId },
    );
  }

  @Post(':id/check-production')
  checkProductionFeasibility(@Param('id') id: string, @Body() checkProductionDto: CheckProductionDto) {
    return this.natsClient.send({ cmd: 'check-production-feasibility' }, { productId: +id, dto: checkProductionDto });
  }
}
