import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Res,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UrlsService } from './urls.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Response } from 'express';
import { OptionalJwtAuthGuard } from 'src/auth/optional-jwt-auth.guard';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ListUrlDtoResponse } from './dto/list-url.dto';
import { CreateUrlResponseDto } from './dto/create-url.response.dto';
import { UpdateUrlDto } from './dto/update-url.dto';
import { DeleteUrlResponseDto } from './dto/delete-url.response.dto';

@Controller()
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}
  protected readonly baseUrl = process.env.BASE_URL;

  @Post('shorten')
  @UseGuards(OptionalJwtAuthGuard)
  @ApiOperation({ summary: 'Shorten a new URL (authenticated or anonymous)' })
  @ApiBody({ type: CreateUrlResponseDto })
  @ApiResponse({
    status: 201,
    description: 'Short URL created successfully',
    type: CreateUrlResponseDto,
  })
  async shorten(
    @Body('originalUrl') originalUrl: string,
    @Request() req,
  ): Promise<CreateUrlResponseDto> {
    const userId = req.user?.userId;
    const result = await this.urlsService.create(originalUrl, userId);
    const response: CreateUrlResponseDto = {
      ...result,
      newUrl: `${this.baseUrl}/${result.shortCode}`,
    };
    return response;
  }

  @Get(':shortCode')
  @ApiResponse({
    status: 302,
    description: 'Redirects to the original URL',
  })
  async redirect(@Param('shortCode') shortCode: string, @Res() res: Response) {
    const url = await this.urlsService.findByShortCode(shortCode);
    return res.redirect(url.originalUrl);
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: 200,
    description: 'List of URLs created by the user',
    type: [ListUrlDtoResponse],
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
  @Get('urls/mine')
  async list(@Request() req) {
    const urls = await this.urlsService.findAllByUser(req.user.userId);
    return urls.map((url) => ({
      ...url,
      newUrl: `${this.baseUrl}/${url.shortCode}`,
    }));
  }

  @UseGuards(JwtAuthGuard)
  @Patch('urls/:id')
  @ApiOperation({ summary: 'Update a shortened URL (auth required)' })
  @ApiBody({ type: CreateUrlResponseDto })
  @ApiResponse({
    status: 200,
    description: 'Short URL updated successfully',
    type: CreateUrlResponseDto,
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
  @ApiResponse({
    status: 404,
    description: 'URL not found',
    schema: {
      example: {
        message: 'URL not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUrlDto,
    @Request() req,
  ): Promise<CreateUrlResponseDto> {
    const url = await this.urlsService.update(
      id,
      req.user.userId,
      body.originalUrl,
    );
    return {
      ...url,
      newUrl: `${process.env.BASE_URL}/${url.shortCode}`,
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete a shortened URL (auth required)' })
  @ApiResponse({
    status: 200,
    description: 'Short URL deleted successfully',
    type: DeleteUrlResponseDto,
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
  @ApiResponse({
    status: 404,
    description: 'URL not found',
    schema: {
      example: {
        message: 'URL not found',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  @Delete('urls/:id')
  async remove(
    @Param('id') id: string,
    @Request() req,
  ): Promise<DeleteUrlResponseDto> {
    const url = await this.urlsService.remove(id, req.user.userId);
    return {
      ...url,
      newUrl: `${process.env.BASE_URL}/${url.shortCode}`,
    };
  }
}
