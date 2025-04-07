import { IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUrlDto {
  @ApiProperty({
    example: 'https://example.com/new-url',
    description: 'The new original URL to replace the current one',
  })
  @IsUrl()
  originalUrl: string;
}
