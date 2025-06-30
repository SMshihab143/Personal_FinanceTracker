import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Category } from '../category/category.entity'; // ✅ Import the Category entity

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, Category]) // ✅ Register both
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
