import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Budget } from './budget.entity';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';
import { Category } from '../category/category.entity';
import { Transaction } from '../transaction/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Budget, Category,Transaction])],
  providers: [BudgetService],
  controllers: [BudgetController],
})
export class BudgetModule {}
