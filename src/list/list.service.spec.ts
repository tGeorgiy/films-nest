import { Test, TestingModule } from '@nestjs/testing';
import { ListService } from './list.service';
import { PrismaService } from '../../prisma/service';
import { CreateListDTO } from './dto/createList.dto';
import { UpdateListDTO } from './dto/updateList.dto';
import { AddFilmDTO } from './dto/addFilm.dto';

describe('ListService', () => {
  let service: ListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListService, PrismaService],
    }).compile();

    service = module.get<ListService>(ListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create list', async () => {
    const createList: CreateListDTO = {
      name: 'List #1',
      description: 'My favorite films',
    };
    const list = await service.create(1, createList);
    expect(list).toStrictEqual(await service.getById(list['id']));
  });

  it('list by id', async () => {
    const list = await service.getById(56);
    expect(list).toStrictEqual(await service.getById(56));
  });

  it('get list', async () => {
    const lists = await service.get();
    expect(await service.get()).toStrictEqual(lists);
  });

  it('delete list by id', async () => {
    const response = await service.delete(6);
    expect(response).toBe(response);
  });

  it('list by id', async () => {
    const updateList: UpdateListDTO = {
      name: 'List #1',
      description: 'My favorite films',
    };
    const response = await service.update(56, updateList);

    expect(response).toStrictEqual(await service.getById(56));
  });

  it('add film to list by id', async () => {
    const addFilm: AddFilmDTO = {
      filmId: 5,
    };
    const response = await service.addFilm(56, addFilm);

    expect(response).toStrictEqual(await service.getById(56));
  });
});
