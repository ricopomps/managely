"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const CreateProduct_dto_1 = require("./CreateProduct.dto");
class UpdateProductDto extends (0, mapped_types_1.PartialType)(CreateProduct_dto_1.CreateProductDto) {
}
exports.UpdateProductDto = UpdateProductDto;
//# sourceMappingURL=UpdateProduct.dto.js.map