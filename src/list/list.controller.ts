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
import { Film } from '../films/dto/film.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt.auth.guard';
import { AddFilmDTO } from './dto/addFilm.dto';
import { CreateListDTO } from './dto/createList.dto';
import { List } from './dto/list.dto';
import { UpdateListDTO } from './dto/updateList.dto';
import { ListService } from './list.service';

@ApiTags('list')
@ApiBearerAuth()
@Controller('list')
@UseGuards(JwtAuthGuard)
export class ListController {
  constructor(private readonly listService: ListService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The list has been successfully created.',
    type: List,
  })
  async create(
    @Request() req,
    @Body() createListDTO: CreateListDTO,
  ): Promise<List> {
    try {
      return await this.listService.create(req.user.userId, createListDTO);
    } catch (error) {
      console.log('errror', error);
    }
  }

  @Get()
  @ApiOkResponse({
    description: 'Get all lists.',
    type: [List],
  })
  async get(): Promise<List[]> {
    return await this.listService.get();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Get list by id.',
    type: List,
  })
  async getById(@Param('id') id: number): Promise<List> {
    return await this.listService.getById(+id);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete list by id.',
    type: List,
  })
  async delete(@Param('id') id: number): Promise<List> {
    return await this.listService.delete(+id);
  }

  @Post(':id/add_item')
  @ApiCreatedResponse({
    description: 'The film add to list.',
    type: List,
  })
  async addFilm(
    @Param('id') id: number,
    @Body() addFilmDTO: AddFilmDTO,
  ): Promise<Film> {
    return await this.listService.addFilm(+id, addFilmDTO);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Update list by id.',
    type: List,
  })
  async update(
    @Param('id') id: number,
    @Body() updateListDTO: UpdateListDTO,
  ): Promise<List> {
    return await this.listService.update(+id, updateListDTO);
  }
}
