// src/urls/dto/create-short-url.response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateUrlResponseDto {
  @ApiProperty({ example: 'cm96iyhtm0000nn76q627o26s' })
  id: string;

  @ApiProperty({ example: 'SHlqd1' })
  shortCode: string;

  @ApiProperty({ example: 'https://example.com/my-link' })
  originalUrl: string;

  @ApiProperty({ example: 'https://yourdomain.com/SHlqd1' })
  newUrl: string;

  @ApiProperty({ example: '65a4b31a-7a54-4677-bd24-209e...' })
  userId: string | null;

  @ApiProperty({ example: 0 })
  clicks: number;

  @ApiProperty({ example: null, nullable: true })
  deletedAt: Date | null;

  @ApiProperty({ example: new Date().toISOString() })
  createdAt: Date;

  @ApiProperty({ example: new Date().toISOString() })
  updatedAt: Date;
}
