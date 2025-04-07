// src/urls/dto/user-url.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class ListUrlDtoResponse {
  @ApiProperty({ example: 'cm96b4p3j0001s036w5vgb4wc' })
  id: string;

  @ApiProperty({ example: 'wR1sc7' })
  shortCode: string;

  @ApiProperty({ example: 'https://americanas.com' })
  originalUrl: string;

  @ApiProperty({ example: '65a4b31a-7a54-4677-bd24-209e87bf1baf' })
  userId: string;

  @ApiProperty({ example: 'https://yourdomain.com/wR1sc7' })
  newUrl: string;

  @ApiProperty({ example: 5 })
  clicks: number;

  @ApiProperty({ example: null, nullable: true })
  deletedAt: string | null;

  @ApiProperty({ example: new Date().toISOString() })
  createdAt: string;

  @ApiProperty({ example: new Date().toISOString() })
  updatedAt: string;
}
