import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '../transaction/transaction.entity';
import { TaxService } from './tax.service';
import { TaxExportService } from './tax-export.service';
import { TaxController } from './tax.controller';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    forwardRef(() => TransactionModule), // ✅ use forwardRef
  ],
  providers: [TaxService, TaxExportService],
  controllers: [TaxController],
})
export class TaxModule {}
