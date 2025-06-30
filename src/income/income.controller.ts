import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Query,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-authguard';
import { IncomeService } from './income.service';
import { CreateIncomeDto } from '../DTO/create-income.dto';
import { UpdateIncomeDto } from '../DTO/updateincome.dto';
import { GetUser } from '../auth/userinfo.decorator';
import { User } from 'src/user/entity/user.entity';
import { IncomeType } from './income.entity';

@UseGuards(JwtAuthGuard)
@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  /* ---------- CREATE ---------- */
  @Post()
  create(@Body() dto: CreateIncomeDto, @GetUser() user: User) {
    // dto.type should be one of IncomeType (paycheck | recurring | sidehustle)
    return this.incomeService.logIncome(dto, user);
  }

  /* ---------- READ ---------- */
  @Get('forecast')
  forecast(@GetUser() user: User) {
    return this.incomeService.getForecast(user.id);
  }

  @Get()
  find(
    @Query('type') type: IncomeType | string,                 // optional
    @Query('startDate') startDate: string,       // optional
    @Query('endDate') endDate: string,           // optional
    @GetUser() user: User,
  ) {
    if (startDate && endDate) {
      return this.incomeService.findAllByDate(user.id, type, startDate, endDate);
    }
    return this.incomeService.findAll(user.id, type);
  }

  /* ---------- UPDATE ---------- */
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateIncomeDto,
    @GetUser() user: User,
  ) {
    return this.incomeService.update(+id, dto, user.id);
  }

  /* ---------- DELETE ---------- */
  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.incomeService.remove(+id, user.id);
  }

  @Delete()
  removeAll(@GetUser() user: User) {
    return this.incomeService.removeAll(user.id);
  }
}
