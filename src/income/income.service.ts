import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Income, IncomeType } from './income.entity';
import { CreateIncomeDto } from '../DTO/create-income.dto';
import { UpdateIncomeDto } from '../DTO/updateincome.dto';
import { User } from '../user/entity/user.entity';

@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(Income)
    private readonly incomeRepo: Repository<Income>,
  ) {}

  /**
   * Create & save a new income row.
   * `dto.type` must be one of the IncomeType enum values.
   */
  async logIncome(dto: CreateIncomeDto, user: User) {
    // Ensure dto.type is a valid enum value; cast if client passes raw string.
    const type = dto.type as IncomeType;

    const income = this.incomeRepo.create({ ...dto, type, user });
    await this.incomeRepo.save(income);
    return { message: 'Income entry saved successfully.' };
  }

  /**
   * Forecast – return user’s income sorted by date ASC.
   */
  async getForecast(userId: number) {
    return this.incomeRepo.find({
      where: { user: { id: userId } },
      order: { date: 'ASC' },
    });
  }

  /**
   * Update a row after verifying ownership.
   */
  async update(id: number, dto: UpdateIncomeDto, userId: number) {
    const income = await this.incomeRepo.findOne({
      where: { id, user: { id: userId } },
    });
    if (!income) throw new NotFoundException('Income not found');

    // If type is provided, ensure it maps to the enum.
    if (dto.type) dto.type = dto.type as unknown as IncomeType;

    Object.assign(income, dto);
    await this.incomeRepo.save(income);
    return { message: 'Income updated.' };
  }

  /**
   * Remove one row.
   */
  async remove(id: number, userId: number) {
    const income = await this.incomeRepo.findOne({
      where: { id, user: { id: userId } },
    });
    if (!income) throw new NotFoundException('Income not found');

    await this.incomeRepo.remove(income);
    return { message: 'Income deleted.' };
  }

  /**
   * Remove all rows for a user – used in tests or reset.
   */
  async removeAll(userId: number) {
    await this.incomeRepo.delete({ user: { id: userId } });
    return { message: 'All income records deleted successfully.' };
  }

  /**
   * Find a single row.
   */
  async findOne(id: number, userId: number) {
    const income = await this.incomeRepo.findOne({
      where: { id, user: { id: userId } },
    });
    if (!income) throw new NotFoundException('Income not found');
    return income;
  }

  /**
   * Simple list, optionally filtered by type.
   */
  async findAll(userId: number, type?: IncomeType | string) {
    const query = this.incomeRepo
      .createQueryBuilder('income')
      .select([
        'income.id',
        'income.type',
        'income.amount',
        'income.payee',
        'income.description',
        'income.date',
      ])
      .where('income.userId = :userId', { userId });

    if (type) query.andWhere('income.type = :type', { type });
    return query.getMany();
  }

  /**
   * List with date range.
   */
  async findAllByDate(
    userId: number,
    type?: IncomeType | string,
    startDate?: string,
    endDate?: string,
  ) {
    const query = this.incomeRepo
      .createQueryBuilder('income')
      .where('income.userId = :userId', { userId });

    if (type) query.andWhere('income.type = :type', { type });

    if (startDate && endDate) {
      query.andWhere('income.date BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });
    }

    query.select([
      'income.id',
      'income.type',
      'income.amount',
      'income.payee',
      'income.description',
      'income.date',
    ]);

    return query.getMany();
  }

  /**
   * Helper that returns only entries saved with type = RECURRING.
   */
  async getRecurringIncome(userId: number) {
    return this.incomeRepo.find({
      where: { user: { id: userId }, type: IncomeType.RECURRING },
    });
  }
}
