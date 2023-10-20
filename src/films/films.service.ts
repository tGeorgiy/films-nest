import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../../prisma/service';
import { MovieNotFoundException } from '../error/error.exception';
import { CreateFilmDTO } from './dto/createFilm.dto';
import { Film } from './dto/film.dto';
import { UpdateFilmDTO } from './dto/updateFilm.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: number, createFilmDTO: CreateFilmDTO): Promise<Film> {
    return await this.prismaService.film.create({
      data: {
        userId: userId,
        ...createFilmDTO,
        vote_average: 0,
      },
    });
  }

  async get(): Promise<Film[]> {
    return await this.prismaService.film.findMany({
      orderBy: {
        vote_average: 'desc',
      },
    });
  }

  async getTop(): Promise<Film[]> {
    return await this.prismaService.film.findMany({
      take: 100,
      orderBy: {
        vote_average: 'desc',
      },
    });
  }

  async updateVoteAverage(filmId: number): Promise<void> {
    const aggregations = await this.prismaService.vote.aggregate({
      _avg: {
        value: true,
      },
      where: {
        filmId: filmId,
      },
    });
    await this.prismaService.film.update({
      where: {
        id: filmId,
      },
      data: {
        vote_average: aggregations._avg.value,
      },
    });
  }

  async delete(id: number): Promise<Film> {
    try {
      return await this.prismaService.film.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new MovieNotFoundException();
      }
    }
  }

  async update(id: number, updateFilmDTO: UpdateFilmDTO): Promise<Film> {
    try {
      return await this.prismaService.film.update({
        where: {
          id,
        },
        data: updateFilmDTO,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new MovieNotFoundException();
      }
    }
  }

  async getById(id: number): Promise<Film> {
    const movie = await this.prismaService.film.findFirst({
      where: {
        id,
      },
    });
    if (!movie) {
      throw new MovieNotFoundException();
    }

    return movie;
  }

  async getByName(title: string): Promise<Film> {
    const movie = await this.prismaService.film.findFirst({
      where: {
        title,
      },
    });
    if (!movie) {
      return null;
    }

    return movie;
  }

  async createVote(userId: number, id: number, value: number) {
    const vote = await this.prismaService.vote.create({
      data: {
        userId,
        filmId: id,
        value,
      },
    });

    await this.updateVoteAverage(id);

    return vote;
  }
}
