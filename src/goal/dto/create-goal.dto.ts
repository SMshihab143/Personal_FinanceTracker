import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateGoalDto {
  @IsString()
  title: string;

  @IsNumber()
  targetAmount: number;

  @IsOptional()
  deadline?: Date;
}
