import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  /* 
  for better security, we enforce a minimum
  length and require at least one uppercase
  letter one lowercase letter, and one number
  */

  @MinLength(8)
  @IsString()
  @Matches(/^(?=.*[0-9])/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
  })
  password: string;
}
