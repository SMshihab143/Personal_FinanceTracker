// src/summary/summary.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SummaryController } from './summary.controller';
import { SummaryService } from './summary.service';
import { Transaction } from '../transaction/transaction.entity';
import { Debt } from '../debt/debt.entity';
import { SavingsGoal } from '../savings/savings.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, Debt, SavingsGoal]),
  ],
  controllers: [SummaryController],
  providers: [SummaryService],
})
export class SummaryModule {}
