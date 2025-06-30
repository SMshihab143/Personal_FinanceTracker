import { IsString, Matches } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  token: string;

  @Matches(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    { message: 'Password must be strong.' }
  )
  newPassword: string;
}
