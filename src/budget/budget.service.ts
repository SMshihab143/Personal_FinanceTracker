import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Budget } from './budget.entity';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { User } from '../user/entity/user.entity';
import { Category } from '../category/category.entity';
import { Transaction } from '../transaction/transaction.entity';


@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Budget)
    private readonly budgetRepo: Repository<Budget>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    @InjectRepository(Transaction)
  private readonly txRepo: Repository<Transaction>,
  ) {}

  async setBudget(user: User, dto: CreateBudgetDto) {
    const category = await this.categoryRepo.findOne({ where: { id: dto.categoryId } });
    if (!category) throw new BadRequestException('Invalid category');

    const existing = await this.budgetRepo.findOne({
      where: { user: { id: user.id }, category: { id: category.id }, month: dto.month, year: dto.year },
    });

    if (existing) {
      existing.amount = dto.amount;
      return this.budgetRepo.save(existing);
    }

    const budget = this.budgetRepo.create({
      user: { id: user.id },
      category: { id: category.id },
      month: dto.month,
      year: dto.year,
      amount: dto.amount,
    });

    return this.budgetRepo.save(budget);
  }

  async getBudgets(userId: number, month: number, year: number) {
    return this.budgetRepo.find({
      where: { user: { id: userId }, month, year },
      relations: ['category'],
    });
  }

  async getOverspendingAlerts(userId: number, month: number, year: number) {
  const budgets = await this.budgetRepo.find({
    where: { user: { id: userId }, month, year },
    relations: ['category'],
  });

  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0);

  // Load actual expenses from Transaction table
  const txs = await this.txRepo.find({
    where: {
      user: { id: userId },
      type: 'expense',
      date: Between(start, end),
    },
    relations: ['category'],
  });

  // Group expenses by categoryId
  const expenseMap = new Map<number, number>();
  txs.forEach((tx) => {
    const catId = tx.category?.id;
    if (!catId) return;
    expenseMap.set(catId, (expenseMap.get(catId) || 0) + +tx.amount);
  });

  // Compare and generate alerts
  const alerts = budgets.map((budget) => {
    const spent = expenseMap.get(budget.category.id) || 0;
    const percentUsed = (spent / +budget.amount) * 100;
    return {
      category: budget.category.name,
      limit: +budget.amount,
      spent,
      percentUsed: percentUsed.toFixed(2),
      overspent: spent > +budget.amount,
    };
  });

  return alerts.filter((a) => a.overspent);
}
}
