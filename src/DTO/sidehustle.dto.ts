import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateSideHustleDto {
  @IsString()
  projectName: string;

  @IsString()
  clientName: string;

  @IsNumber()
  amountEarned: number;

  @IsDateString()
  receivedDate: string;
}
