import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { Repository, Between } from 'typeorm';
import { User } from '../user/entity/user.entity';
import { LogTransactionDto } from './dto/log-transaction.dto';
import { Category } from '../category/category.entity';
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class TransactionService {
  constructor(
  @InjectRepository(Transaction)
  private readonly txRepo: Repository<Transaction>,

  @InjectRepository(Category)
  private readonly categoryRepo: Repository<Category>,
) {}


 async logTransaction(user: User, dto: LogTransactionDto) {
  const category = dto.categoryId
    ? await this.categoryRepo.findOne({ where: { id: dto.categoryId } })
    : undefined;

  const tx = this.txRepo.create({
    type: dto.type,
    amount: Number(dto.amount),
    description: dto.description,
    payee: dto.payee || undefined,
    user: { id: user.id }, // ✅ Only assign the ID
    category: category ? { id: category.id } : undefined, // ✅ Use just the ID
  });

  return this.txRepo.save(tx);
}

async tagTaxDeductible(id: number, isTaxDeductible: boolean) {
  const tx = await this.txRepo.findOne({ where: { id } });
  if (!tx) throw new NotFoundException('Transaction not found');

  tx.isTaxDeductible = isTaxDeductible;
  return this.txRepo.save(tx);
}



  async getAllUserTransactions(userId: number) {
    return this.txRepo.find({
      where: { user: { id: userId } },
      relations: ['category'],
      order: { date: 'DESC' },
    });
  }

  async getMonthlySummary(userId: number, month: number, year: number) {
    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 0);

    const transactions = await this.txRepo.find({
      where: {
        user: { id: userId },
        date: Between(start, end),
      },
    });

    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + +t.amount, 0);

    const expense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + +t.amount, 0);

    return { income, expense };
  }

  async deleteTransaction(id: number) {
    return this.txRepo.delete(id);
  }

  async updateTransaction(id: number, dto: Partial<LogTransactionDto>) {
    return this.txRepo.update(id, dto);
  }
}
