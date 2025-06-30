import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { DebtService } from './debt.service';
import { JwtAuthGuard } from '../auth/jwt-authguard';
import { GetUser } from '../auth/userinfo.decorator';
import { User } from '../user/entity/user.entity';
import { CreateDebtDto } from './dto/create-debt.dto';
import { PaymentScenarioDto } from './dto/payment-scenario.dto';

@UseGuards(JwtAuthGuard)
@Controller('debt')
export class DebtController {
  constructor(private readonly debtService: DebtService) {}

  @Post()
  createDebt(@GetUser() user: User, @Body() dto: CreateDebtDto) {
    return this.debtService.createDebt(user, dto);
  }

  @Get()
  getUserDebts(@GetUser() user: User) {
    return this.debtService.getUserDebts(user.id);
  }

  @Post(':id/simulate')
  simulate(@Param('id') id: number, @Body() dto: PaymentScenarioDto) {
    return this.debtService.simulatePayoff(id, dto);
  }
}
