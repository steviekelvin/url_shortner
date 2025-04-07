import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'api@teste.com',
    description: 'Valid email address used for user registration',
    type: String,
    format: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'StrongPassword123!',
    description:
      'User password. It should be at least 6 characters and include letters and numbers.',
    type: String,
    format: 'password',
    minLength: 6,
    required: true,
  })
  @IsNotEmpty()
  password: string;
}
