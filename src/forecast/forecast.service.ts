import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../transaction/transaction.entity';
import { Repository, Between } from 'typeorm';

@Injectable()
export class ForecastService {
  constructor(
    @InjectRepository(Transaction)
    private readonly txRepo: Repository<Transaction>
  ) {}

  async forecastCashFlow(userId: number) {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth() - 3, 1); // 3 months ago
    const end = new Date(today.getFullYear(), today.getMonth(), 0);       // end of last month

    const transactions = await this.txRepo.find({
      where: {
        user: { id: userId },
        date: Between(start, end),
      },
    });

    const incomeTx = transactions.filter(tx => tx.type === 'income');
    const expenseTx = transactions.filter(tx => tx.type === 'expense');

    const avgIncome = incomeTx.reduce((sum, t) => sum + +t.amount, 0) / Math.max(1, incomeTx.length);
    const avgExpense = expenseTx.reduce((sum, t) => sum + +t.amount, 0) / Math.max(1, expenseTx.length);

    return {
      forecastMonth: today.toLocaleString('default', { month: 'long' }),
      averageIncome: +avgIncome.toFixed(2),
      averageExpense: +avgExpense.toFixed(2),
      forecastedCashFlow: +(avgIncome - avgExpense).toFixed(2),
    };
  }
}
