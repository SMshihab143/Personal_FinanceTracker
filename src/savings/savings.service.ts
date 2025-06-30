import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SavingsGoal } from './savings.entity';
import { User } from '../user/entity/user.entity';
import { CreateGoalDto } from './dto/create-goal.dto';

@Injectable()
export class SavingsService {
  constructor(
    @InjectRepository(SavingsGoal)
    private readonly goalRepo: Repository<SavingsGoal>
  ) {}

  create(user: User, dto: CreateGoalDto) {
    const goal = this.goalRepo.create({ ...dto, user });
    return this.goalRepo.save(goal);
  }

  findAll(userId: number) {
    return this.goalRepo.find({ where: { user: { id: userId } } });
  }

  async addSaving(id: number, amount: number) {
    const goal = await this.goalRepo.findOneBy({ id });
    if (!goal) throw new Error('Goal not found');
    goal.saved = +goal.saved + amount;
    return this.goalRepo.save(goal);
  }
}
