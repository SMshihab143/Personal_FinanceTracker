import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Goal } from './goal.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entity/user.entity';
import { CreateGoalDto } from './dto/create-goal.dto';
import { ContributeDto } from './dto/contribute.dto';

@Injectable()
export class GoalService {
  constructor(
    @InjectRepository(Goal)
    private readonly goalRepo: Repository<Goal>,
  ) {}

  async createGoal(user: User, dto: CreateGoalDto) {
    const goal = this.goalRepo.create({
      ...dto,
      currentAmount: 0,
      isFulfilled: false,
      user: { id: user.id },
    });
    return this.goalRepo.save(goal);
  }

  async getGoals(userId: number) {
    return this.goalRepo.find({
      where: { user: { id: userId } },
      order: { deadline: 'ASC' },
    });
  }

  async contributeToGoal(goalId: number, dto: ContributeDto) {
    const goal = await this.goalRepo.findOne({ where: { id: goalId } });
    if (!goal) throw new NotFoundException('Goal not found');

    if (goal.isFulfilled) {
      throw new BadRequestException('This goal is already fulfilled.');
    }

    const newAmount = goal.currentAmount + dto.amount;

    if (newAmount > goal.targetAmount) {
      throw new BadRequestException('Contribution exceeds target');
    }

    goal.currentAmount = newAmount;

    if (goal.currentAmount >= goal.targetAmount) {
      goal.isFulfilled = true;
    }

    return this.goalRepo.save(goal);
  }
}
