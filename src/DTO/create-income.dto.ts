import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateIncomeDto {
  @IsIn(['paycheck', 'recurring', 'sidehustle'])
  type: 'paycheck' | 'recurring' | 'sidehustle';

  @IsNumber()
  amount: number;

  @IsString()
  @IsNotEmpty()
  payee: string;

  @IsString()
  description: string;
}
