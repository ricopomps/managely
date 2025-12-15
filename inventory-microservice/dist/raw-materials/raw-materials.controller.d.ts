import { RawMaterialsService } from './raw-materials.service';
import { CreateRawMaterialDto } from './dtos/CreateRawMaterial.dto';
import { UpdateRawMaterialDto } from './dtos/UpdateRawMaterial.dto';
export declare class RawMaterialsController {
    private rawMaterialsService;
    constructor(rawMaterialsService: RawMaterialsService);
    create(createRawMaterialDto: CreateRawMaterialDto): Promise<import("../models/RawMaterial.model").RawMaterial>;
    findAll(): Promise<import("../models/RawMaterial.model").RawMaterial[]>;
    findOne(id: number): Promise<import("../models/RawMaterial.model").RawMaterial | null>;
    update(data: {
        id: number;
        dto: UpdateRawMaterialDto;
    }): Promise<import("../models/RawMaterial.model").RawMaterial | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
