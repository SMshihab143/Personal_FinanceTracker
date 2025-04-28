import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Paycheck } from './paycheck.entity';
import { CreatePaycheckDto } from '../DTO/paycheck.dto';

@Injectable()
export class PaycheckService {
  constructor(
    @InjectRepository(Paycheck)
    private paycheckRepository: Repository<Paycheck>,
  ) {}

  async create(createPaycheckDto: CreatePaycheckDto): Promise<Paycheck> {
    const paycheck = this.paycheckRepository.create(createPaycheckDto);
    return this.paycheckRepository.save(paycheck);
  }

  async findAll(): Promise<Paycheck[]> {
    return this.paycheckRepository.find();
  }
}
