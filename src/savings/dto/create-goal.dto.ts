import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateGoalDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  target: number;
}
