import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../transaction/transaction.entity';
import { Debt } from '../debt/debt.entity';
import { SavingsGoal } from '../savings/savings.entity';

@Injectable()
export class SummaryService {
  constructor(
    @InjectRepository(Transaction)
    private readonly txRepo: Repository<Transaction>,
    @InjectRepository(Debt)
    private readonly debtRepo: Repository<Debt>,
    @InjectRepository(SavingsGoal)
    private readonly goalRepo: Repository<SavingsGoal>,
  ) {}

  async getUserSummary(userId: number) {
    const [income, expense] = await Promise.all([
      this.txRepo.sum('amount', { user: { id: userId }, type: 'income' }),

     this.txRepo.sum('amount', { user: { id: userId }, type: 'expense' })

    ]);

    const [debts, goals] = await Promise.all([
      this.debtRepo.find({ where: { user: { id: userId } } }),
      this.goalRepo.find({ where: { user: { id: userId } } }),
    ]);

    const totalDebt = debts.reduce((sum, d) => sum + +d.currentBalance, 0);

    const saved = goals.reduce((sum, g) => sum + +g.saved, 0);
    const target = goals.reduce((sum, g) => sum + +g.target, 0);

    return {
    income: +(income ?? 0),
    expense: +(expense ?? 0),

      totalDebt,
      totalSaved: saved,
      savingGoalTotal: target,
    };
  }
}
