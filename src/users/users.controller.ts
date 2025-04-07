import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { UserProfileDto } from './dto/user-profile.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  @ApiOperation({ summary: 'Get the profile of the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'Authenticated user profile',
    type: UserProfileDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - missing or invalid token',
    schema: {
      example: {
        message: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  getProfile(@Request() req): UserProfileDto {
    return req.user;
  }
}
