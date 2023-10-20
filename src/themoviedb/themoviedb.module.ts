import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/service';
import { FilmsService } from '../films/films.service';
import { ListService } from '../list/list.service';
import { ThemoviedbController } from './themoviedb.controller';
import { MovieDBService } from './themoviedb.service';

@Module({
  providers: [MovieDBService, ListService, FilmsService, PrismaService],
  controllers: [ThemoviedbController],
})
export class ThemoviedbModule {}
