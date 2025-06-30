import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Debt } from './debt.entity';
import { Repository } from 'typeorm';
import { CreateDebtDto } from './dto/create-debt.dto';
import { User } from '../user/entity/user.entity';
import { PaymentScenarioDto } from './dto/payment-scenario.dto';

@Injectable()
export class DebtService {
  constructor(
    @InjectRepository(Debt)
    private readonly debtRepo: Repository<Debt>,
  ) {}

  async createDebt(user: User, dto: CreateDebtDto) {
    const debt = this.debtRepo.create({
      ...dto,
      user: { id: user.id },
    });
    return this.debtRepo.save(debt);
  }

  async getUserDebts(userId: number) {
    return this.debtRepo.find({ where: { user: { id: userId } } });
  }

  async simulatePayoff(debtId: number, dto: PaymentScenarioDto) {
    const debt = await this.debtRepo.findOne({ where: { id: debtId } });
    if (!debt) throw new NotFoundException('Debt not found');

    let balance = +debt.currentBalance;
    const monthlyRate = +debt.interestRate / 12 / 100;
    const payment = dto.monthlyPayment;
    let months = 0;
    let totalInterest = 0;

    while (balance > 0 && months < 600) {
      const interest = balance * monthlyRate;
      totalInterest += interest;
      balance += interest - payment;
      if (balance < 0) balance = 0;
      months++;
    }

    return {
      months,
      totalInterest: +totalInterest.toFixed(2),
      payoffDate: new Date(Date.now() + months * 30 * 24 * 60 * 60 * 1000),
    };
  }
}
