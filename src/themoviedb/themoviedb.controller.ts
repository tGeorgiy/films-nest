import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt.auth.guard';
import { MovieDBService } from './themoviedb.service';
import { List } from '../list/dto/list.dto';

@ApiTags('themoviedb')
@ApiBearerAuth()
@Controller('themoviedb')
@UseGuards(JwtAuthGuard)
export class ThemoviedbController {
  constructor(private readonly movieDBService: MovieDBService) {}

  @Get(':id')
  async get(@Request() req, @Param('id') id: number): Promise<List> {
    return await this.movieDBService.fetch(req.user.userId, +id);
  }
}
