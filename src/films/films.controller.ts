import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtAuthGuard } from '../auth/jwt/jwt.auth.guard';
import { MovieArleadyExistException } from '../error/error.exception';
import { CreateFilmDTO } from './dto/createFilm.dto';
import { Film } from './dto/film.dto';
import { UpdateFilmDTO } from './dto/updateFilm.dto';
import { VoteDTO } from './dto/vote.dto';
import { FilmsService } from './films.service';

@ApiTags('films')
@ApiBearerAuth()
@Controller('films')
@UseGuards(JwtAuthGuard)
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The film has been successfully created.',
    type: Film,
  })
  async create(
    @Request() req,
    @Body() createFilmDTO: CreateFilmDTO,
  ): Promise<Film> {
    try {
      return await this.filmsService.create(req.user.userId, createFilmDTO);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new MovieArleadyExistException();
      }
    }
  }

  @Get()
  @ApiOkResponse({
    description: 'Get all films.',
    type: [Film],
  })
  async get(@Request() req): Promise<Film[]> {
    return await this.filmsService.get();
  }

  @Get('top')
  @ApiOkResponse({
    description: 'Get top 100 films.',
    type: [Film],
  })
  async getTop(): Promise<Film[]> {
    return await this.filmsService.getTop();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Get film by id.',
    type: Film,
  })
  async getById(@Param('id') id: number): Promise<Film> {
    return await this.filmsService.getById(+id);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete film by id.',
    type: Film,
  })
  async delete(@Param('id') id: number): Promise<Film> {
    return await this.filmsService.delete(+id);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Update film by id.',
    type: Film,
  })
  async update(
    @Param('id') id: number,
    @Body() updateFilmDTO: UpdateFilmDTO,
  ): Promise<Film> {
    return await this.filmsService.update(+id, updateFilmDTO);
  }

  @Post(':id/vote')
  async createVote(
    @Request() req,
    @Param('id') id: number,
    @Body() voteDTO: VoteDTO,
  ): Promise<any> {
    return await this.filmsService.createVote(
      req.user.userId,
      +id,
      +voteDTO.value,
    );
  }
}
