import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './account-linking.controller';
import { AccountService } from './account-linking.service';
import { BankAccount } from './account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BankAccount])],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountLinkingModule {}
