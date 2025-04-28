import { Controller, Get, Post, Body } from '@nestjs/common';
import { PaycheckService } from './paycheck.service';
import { CreatePaycheckDto } from '../DTO/paycheck.dto';
import { Paycheck } from './paycheck.entity';

@Controller('paycheck')
export class PaycheckController {
  constructor(private readonly paycheckService: PaycheckService) {}

  @Post()
  create(@Body() createPaycheckDto: CreatePaycheckDto): Promise<Paycheck> {
    return this.paycheckService.create(createPaycheckDto);
  }

  @Get()
  findAll(): Promise<Paycheck[]> {
    return this.paycheckService.findAll();
  }
}
