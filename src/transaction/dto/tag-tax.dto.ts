import { IsBoolean } from 'class-validator';

export class TagTaxDto {
  @IsBoolean()
  isTaxDeductible: boolean;
}
