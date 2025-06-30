// src/income/dto/update-income.dto.ts
import { IsOptional, IsString, IsNumber, IsDateString, IsIn } from 'class-validator';

export class UpdateIncomeDto {
  @IsOptional()
  @IsIn(['paycheck', 'recurring', 'sidehustle'])
  type?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsString()
  payee?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  date?: string;
}
