import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Query,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { JwtAuthGuard } from '../auth/jwt-authguard';
import { GetUser } from '../auth/userinfo.decorator';
import { User } from '../user/entity/user.entity';
import { LogTransactionDto } from './dto/log-transaction.dto';
import{ TagTaxDto} from './dto/tag-tax.dto';

@UseGuards(JwtAuthGuard)
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  createTransaction(@Body() dto: LogTransactionDto, @GetUser() user: User) {
    return this.transactionService.logTransaction(user, dto);
  }

  @Get()
  getUserTransactions(@GetUser() user: User) {
    return this.transactionService.getAllUserTransactions(user.id);
  }

  @Get('summary')
  getMonthlySummary(
    @GetUser() user: User,
    @Query('month') month: number,
    @Query('year') year: number,
  ) {
    return this.transactionService.getMonthlySummary(user.id, month, year);
  }

  @Delete(':id')
  deleteTransaction(@Param('id') id: number) {
    return this.transactionService.deleteTransaction(id);
  }

  @Patch(':id')
  updateTransaction(
    @Param('id') id: number,
    @Body() dto: Partial<LogTransactionDto>,
  ) {
    return this.transactionService.updateTransaction(id, dto);
  }

  @Patch(':id/tax-tag')
tagAsTaxDeductible(@Param('id') id: number, @Body() dto: TagTaxDto) {
  return this.transactionService.tagTaxDeductible(id, dto.isTaxDeductible);
}

}
