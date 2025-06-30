import { IsNumber } from 'class-validator';

export class PaymentScenarioDto {
  @IsNumber()
  monthlyPayment: number;
}
