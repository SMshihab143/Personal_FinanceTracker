import { IsNumber, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateBudgetDto {
  @IsNumber() month: number;
  @IsNumber() year: number;
  @IsNumber() @Min(0) amount: number;
  @IsNumber() categoryId: number;
}
