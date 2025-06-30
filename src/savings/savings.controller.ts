import { Controller, Post, Body, UseGuards, Get, Query } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-authguard';
import { GetUser } from '../auth/userinfo.decorator';
import { User } from '../user/entity/user.entity';
import { CreateGoalDto } from './dto/create-goal.dto';
import { SavingsService } from './savings.service';

@UseGuards(JwtAuthGuard)
@Controller('savings')
export class SavingsController {
  constructor(private readonly savingsService: SavingsService) {}

  @Post()
  createGoal(@Body() dto: CreateGoalDto, @GetUser() user: User) {
    return this.savingsService.create(user, dto);
  }

  @Get()
  getGoals(@GetUser() user: User) {
    return this.savingsService.findAll(user.id);
  }

  @Post('add')
  addSaving(@Query('id') id: number, @Query('amount') amount: number) {
    return this.savingsService.addSaving(+id, +amount);
  }
}
