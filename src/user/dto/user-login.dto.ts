import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserLoginDto {
  @IsEmail() email: string;

  @IsNotEmpty() password: string;

  @IsNotEmpty() uniqueCode: string;
}