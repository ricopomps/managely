import { Repository } from 'typeorm';
import { RawMaterial } from '../models/RawMaterial.model';
import { CreateRawMaterialDto } from './dtos/CreateRawMaterial.dto';
import { UpdateRawMaterialDto } from './dtos/UpdateRawMaterial.dto';
export declare class RawMaterialsService {
    private rawMaterialsRepository;
    constructor(rawMaterialsRepository: Repository<RawMaterial>);
    create(createRawMaterialDto: CreateRawMaterialDto): Promise<RawMaterial>;
    findAll(): Promise<RawMaterial[]>;
    findOne(id: number): Promise<RawMaterial | null>;
    update(id: number, updateRawMaterialDto: UpdateRawMaterialDto): Promise<RawMaterial | null>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
