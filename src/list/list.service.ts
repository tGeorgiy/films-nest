import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Film } from '../films/dto/film.dto';
import { PrismaService } from '../../prisma/service';
import { ListNotFoundException } from '../error/error.exception';
import { AddFilmDTO } from './dto/addFilm.dto';
import { CreateListDTO } from './dto/createList.dto';
import { List } from './dto/list.dto';
import { UpdateListDTO } from './dto/updateList.dto';

@Injectable()
export class ListService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userId: number, createListDTO: CreateListDTO): Promise<List> {
    return await this.prismaService.list.create({
      data: {
        userId,
        ...createListDTO,
      },
      include: {
        films: true,
      },
    });
  }

  async get(): Promise<List[]> {
    return await this.prismaService.list.findMany({});
  }

  async delete(id: number): Promise<List> {
    try {
      return await this.prismaService.list.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ListNotFoundException();
      }
    }
  }

  async update(id: number, updateListDTO: UpdateListDTO): Promise<List> {
    try {
      return await this.prismaService.list.update({
        where: {
          id,
        },
        include: {
          films: true,
        },
        data: updateListDTO,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new ListNotFoundException();
      }
    }
  }

  async getById(id: number): Promise<List> {
    const list = await this.prismaService.list.findFirst({
      where: {
        id,
      },
      include: {
        films: true,
      },
    });
    if (!list) {
      throw new ListNotFoundException();
    }

    return list;
  }

  async getByName(name: string): Promise<List> {
    const list = await this.prismaService.list.findFirst({
      where: {
        name,
      },
      include: {
        films: true,
      },
    });
    if (!list) {
      return null;
    }

    return list;
  }

  async addFilm(id: number, addFilmDTO: AddFilmDTO): Promise<Film> {
    return await this.prismaService.film.update({
      where: {
        id: +addFilmDTO.filmId,
      },
      include: {
        list: true,
      },
      data: {
        list: {
          connect: {
            id: id,
          },
        },
      },
    });
  }
}
