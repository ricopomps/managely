import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RawMaterial } from '../models/RawMaterial.model';
import { CreateRawMaterialDto } from './dtos/CreateRawMaterial.dto';
import { UpdateRawMaterialDto } from './dtos/UpdateRawMaterial.dto';

@Injectable()
export class RawMaterialsService {
  constructor(
    @InjectRepository(RawMaterial)
    private rawMaterialsRepository: Repository<RawMaterial>,
  ) {}

  create(createRawMaterialDto: CreateRawMaterialDto) {
    const newRawMaterial = this.rawMaterialsRepository.create(createRawMaterialDto);
    return this.rawMaterialsRepository.save(newRawMaterial);
  }

  findAll() {
    return this.rawMaterialsRepository.find();
  }

  findOne(id: number) {
    return this.rawMaterialsRepository.findOneBy({ id });
  }

  async update(id: number, updateRawMaterialDto: UpdateRawMaterialDto) {
    await this.rawMaterialsRepository.update(id, updateRawMaterialDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.rawMaterialsRepository.delete(id);
  }
}
