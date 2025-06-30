// dto/user-login.dto.ts
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserLoginDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  uniqueCode?: string;          // ← optional now
}
