import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SideHustle } from './sidehustle.entity';
import { CreateSideHustleDto } from '../DTO/sidehustle.dto';

@Injectable()
export class SideHustleService {
  constructor(
    @InjectRepository(SideHustle)
    private sideHustleRepository: Repository<SideHustle>,
  ) {}

  async create(createDto: CreateSideHustleDto): Promise<SideHustle> {
    const record = this.sideHustleRepository.create(createDto);
    return this.sideHustleRepository.save(record);
  }

  async findAll(): Promise<SideHustle[]> {
    return this.sideHustleRepository.find();
  }
}
