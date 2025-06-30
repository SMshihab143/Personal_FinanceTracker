import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { IncomeModule } from './income/income.module';
import { AccountLinkingModule } from './account-linking/account-linking.module';
import { DebtModule } from './debt/debt.module';
import { ForecastModule } from './forecast/forecast.module';
import { BudgetModule } from './budget/budget.module';
import { GoalModule } from './goal/goal.module';
import { TaxModule } from './tax/tax.module';
import { SavingsModule } from './savings/savings.module';

import { User } from './user/entity/user.entity';
import { BankAccount } from './account-linking/account.entity';
import { Debt } from './debt/debt.entity';

import { MailService } from './mail/mail.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { CategoryModule } from './category/category.module';
import { TransactionModule } from './transaction/transaction.module';
import { SummaryModule } from './summary/summary.module';

@Module({
  imports: [
    
    ConfigModule.forRoot({ isGlobal: true }),


    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'Finance_Tracker',
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, 
      // dropSchema: true,
    }),

    
    UserModule,
    AuthModule,
    IncomeModule,
    AccountLinkingModule,
    DebtModule,
    ForecastModule,
    BudgetModule,
    GoalModule,
    TaxModule,
    SavingsModule,
    CategoryModule,
    TransactionModule,
    SummaryModule,

    
    TypeOrmModule.forFeature([User, BankAccount, Debt]),
  ],

  controllers: [AppController, UserController],
  providers: [AppService, MailService, UserService],
})
export class AppModule {}
