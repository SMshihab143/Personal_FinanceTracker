import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-authguard';
import { GetUser } from '../auth/userinfo.decorator';
import { User } from '../user/entity/user.entity';
import { GoalService } from './goal.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { ContributeDto } from './dto/contribute.dto';

@UseGuards(JwtAuthGuard)
@Controller('goal')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Post()
  createGoal(@GetUser() user: User, @Body() dto: CreateGoalDto) {
    return this.goalService.createGoal(user, dto);
  }

  @Get()
  getGoals(@GetUser() user: User) {
    return this.goalService.getGoals(user.id);
  }

  @Post(':id/contribute')
  contribute(@Param('id') goalId: number, @Body() dto: ContributeDto) {
    return this.goalService.contributeToGoal(goalId, dto);
  }
}
