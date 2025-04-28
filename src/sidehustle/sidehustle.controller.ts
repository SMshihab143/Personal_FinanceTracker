import { Controller, Get, Post, Body } from '@nestjs/common';
import { SideHustleService } from './sidehustle.service';
import { CreateSideHustleDto } from '../DTO/sidehustle.dto';
import { SideHustle } from './sidehustle.entity';

@Controller('sidehustle')
export class SideHustleController {
  constructor(private readonly sideHustleService: SideHustleService) {}

  @Post()
  create(@Body() createDto: CreateSideHustleDto): Promise<SideHustle> {
    return this.sideHustleService.create(createDto);
  }

  @Get()
  findAll(): Promise<SideHustle[]> {
    return this.sideHustleService.findAll();
  }
}
