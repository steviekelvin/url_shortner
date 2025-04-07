import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'User email',
    type: 'string',
    required: true,
    format: 'email',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'StrongPassword123!',
    minLength: 6,
    type: 'string',
    required: true,
  })
  @IsNotEmpty()
  password: string;
}
