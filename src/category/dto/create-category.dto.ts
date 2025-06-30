import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  monthlyLimit: number;
}
