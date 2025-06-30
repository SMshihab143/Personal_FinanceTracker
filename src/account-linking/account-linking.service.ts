import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankAccount } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountService {
  constructor(@InjectRepository(BankAccount) private repo: Repository<BankAccount>) {}

  create(dto: CreateAccountDto, userId: number) {
    const account = this.repo.create({ ...dto, syncStatus: 'pending', user: { id: userId } });
    return this.repo.save(account);
  }

  findAll(userId: number) {
    return this.repo.find({ where: { user: { id: userId } } });
  }

  async update(id: number, dto: UpdateAccountDto) {
    const account = await this.repo.findOneBy({ id });
    if (!account) throw new NotFoundException('Account not found');
    Object.assign(account, dto);
    return this.repo.save(account);
  }

  async delete(id: number) {
    const account = await this.repo.findOneBy({ id });
    if (!account) throw new NotFoundException('Account not found');
    return this.repo.remove(account);
  }
}
