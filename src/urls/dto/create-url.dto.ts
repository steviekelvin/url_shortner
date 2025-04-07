import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class CreateUrlDto {
  @ApiProperty({
    example: 'https://example.com/my-link',
    description: 'Original URL that will be shortened',
  })
  @IsString()
  @IsUrl()
  originalUrl: string;
}
