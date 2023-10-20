import { Injectable, UseFilters } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from './../../prisma/service';
import {
  UserArleadyExistException,
  UserNotFoundException,
} from './../error/error.exception';
import { HttpExceptionFilter } from './../error/error.filter';
import { CreateUserDTO } from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { User } from './dto/user.dto';

@Injectable()
@UseFilters(new HttpExceptionFilter())
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    try {
      const { password, ...user } = await this.prismaService.user.create({
        data: createUserDTO,
      });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new UserArleadyExistException();
      }
    }
  }

  async getByEmail(email: string) {
    try {
      return await this.prismaService.user.findFirst({
        where: {
          email,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new UserNotFoundException();
      }
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const { password, ...user } = await this.prismaService.user.delete({
        where: {
          id,
        },
      });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new UserNotFoundException();
      }
    }
  }

  async update(id: number, updateUserDTO: UpdateUserDTO): Promise<User> {
    try {
      const { password, ...user } = await this.prismaService.user.update({
        where: {
          id,
        },
        data: updateUserDTO,
      });
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new UserNotFoundException();
      }
    }
  }
}
