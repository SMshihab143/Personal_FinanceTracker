import { IsNumber } from 'class-validator';

export class ContributeDto {
  @IsNumber()
  amount: number;
}
