// src/users/dto/user-profile.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class UserProfileDto {
  @ApiProperty({
    example: '65a4b31a-7a54-4677-bd24-209e87bf1baf',
    description: 'Unique identifier of the authenticated user',
  })
  userId: string;

  @ApiProperty({
    example: 'api@teste.com',
    description: 'Email address of the authenticated user',
  })
  email: string;
}
