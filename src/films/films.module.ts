import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/service';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

@Module({
  providers: [FilmsService, PrismaService],
  controllers: [FilmsController],
})
export class FilmsModule {}
