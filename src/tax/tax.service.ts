import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from '../transaction/transaction.entity';
import { Repository, Between } from 'typeorm';

@Injectable()
export class TaxService {
  constructor(
    @InjectRepository(Transaction)
    private readonly txRepo: Repository<Transaction>
  ) {}

  async generateTaxReport(userId: number, year: number, quarter: number) {
    const startMonth = (quarter - 1) * 3;
    const start = new Date(year, startMonth, 1);
    const end = new Date(year, startMonth + 3, 0);

    const transactions = await this.txRepo.find({
      where: {
        user: { id: userId },
        isTaxDeductible: true,
        date: Between(start, end),
      },
    });

    const total = transactions.reduce((sum, tx) => sum + +tx.amount, 0);

    return {
      quarter,
      year,
      totalDeductible: +total.toFixed(2),
      count: transactions.length,
      transactions,
    };
  }
}
