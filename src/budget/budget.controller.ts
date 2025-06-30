import { Controller, Post, Body, UseGuards, Get, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-authguard';
import { GetUser } from '../auth/userinfo.decorator';
import { User } from '../user/entity/user.entity';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { BudgetService } from './budget.service';

@UseGuards(JwtAuthGuard)
@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post()
  setBudget(@Body() dto: CreateBudgetDto, @GetUser() user: User) {
    return this.budgetService.setBudget(user, dto);
  }

  @Get()
  getBudgets(
    @GetUser() user: User,
    @Query('month') month: number,
    @Query('year') year: number,
  ) {
    return this.budgetService.getBudgets(user.id, month, year);
  }

  @Get('alerts')
getOverspendingAlerts(
  @GetUser() user: User,
  @Query('month') month: number,
  @Query('year') year: number,
) {
  return this.budgetService.getOverspendingAlerts(user.id, month, year);
}

}
