/* eslint-disable */
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { nanoid } from 'nanoid';

@Injectable()
export class UrlsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(originalUrl: string, userId?: string) {
    const shortCode = nanoid(6);
    return this.prisma.url.create({
      data: { originalUrl, shortCode, userId },
    });
  }

  async findByShortCode(shortCode: string) {
    const url = await this.prisma.url.findUnique({
      where: { shortCode },
    });

    if (!url || (url && url?.deletedAt)) {
      console.log('url', url);
      console.log('deletedAt', url?.deletedAt);
      throw new NotFoundException('URL not found');
    }

    await this.prisma.url.update({
      where: { id: url.id },
      data: { clicks: { increment: 1 } },
    });

    return url;
  }

  async findAllByUser(userId: string) {
    return this.prisma.url.findMany({
      where: { userId, deletedAt: null },
    });
  }

  async update(id: string, userId: string, originalUrl: string) {
    const url = await this.prisma.url.findUnique({ where: { id } });
    if (!url || url.deletedAt) throw new NotFoundException('URL not found');
    if (url.userId !== userId) throw new ForbiddenException('Unauthorized');

    return this.prisma.url.update({ where: { id }, data: { originalUrl } });
  }

  async remove(id: string, userId: string) {
    const url = await this.prisma.url.findUnique({ where: { id } });
    if (!url || url.deletedAt) throw new NotFoundException('URL not found');
    if (url.userId !== userId) throw new ForbiddenException('Unauthorized');

    return this.prisma.url.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
