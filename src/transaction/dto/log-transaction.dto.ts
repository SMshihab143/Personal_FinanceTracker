import { IsIn, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class LogTransactionDto {
  @IsIn(['income', 'expense'])
  type: 'income' | 'expense';

  @IsNumber()
  amount: number;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  payee?: string;

  @IsOptional()
  categoryId?: number;
}
