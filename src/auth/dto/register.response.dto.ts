import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponseDto {
  @ApiProperty({
    example: '65a4b31a-7a54-4677-bd24-209e87bf1baf',
    description: 'Unique identifier of the user',
    format: 'uuid',
  })
  id: string;

  @ApiProperty({
    example: 'api@teste.com',
    description: 'Email address of the user',
    type: String,
    format: 'email',
  })
  email: string;

  @ApiProperty({
    example: '$2b$10$jfQc8c5RtNMh9sF/irn...',
    description: 'Hashed password of the user',
    type: String,
    format: 'password',
  })
  password: string;

  @ApiProperty({
    example: new Date().toISOString(),
    description: 'Date when the user was created',
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    example: new Date().toISOString(),
    description: 'Date when the user was last updated',
    format: 'date-time',
  })
  updatedAt: Date;
}
