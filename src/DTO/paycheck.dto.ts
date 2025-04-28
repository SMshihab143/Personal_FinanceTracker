import { IsNumber, IsString, IsDateString } from 'class-validator';

export class CreatePaycheckDto {
  @IsNumber()
  amount: number;

  @IsString()
  payee: string;

  @IsDateString()
  date: string;
}
