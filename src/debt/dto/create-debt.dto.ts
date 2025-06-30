import { IsNumber, IsDateString, IsString } from 'class-validator';

export class CreateDebtDto {
  @IsString()
  name: string;

  @IsNumber()
  originalAmount: number;

  @IsNumber()
  currentBalance: number;

  @IsNumber()
  interestRate: number;

  @IsDateString()
  dueDate: Date;
}
