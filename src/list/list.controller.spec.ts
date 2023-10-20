import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/service';
import { AddFilmDTO } from './dto/addFilm.dto';
import { CreateListDTO } from './dto/createList.dto';
import { UpdateListDTO } from './dto/updateList.dto';
import { ListController } from './list.controller';
import { ListService } from './list.service';

describe('ListController', () => {
  let controller: ListController;
  let service: ListService;
  const requestMock = {
    query: {},
    user: {
      userId: 1,
    },
  } as unknown as Request;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListController],
      providers: [ListService, PrismaService],
    }).compile();

    controller = module.get<ListController>(ListController);
    service = module.get<ListService>(ListService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('/POST create list', async () => {
    const createList: CreateListDTO = {
      name: 'List #1',
      description: 'My favorite films',
    };
    const list = await controller.create(requestMock, createList);
    expect(list).toStrictEqual(await service.getById(list['id']));
  });

  it('/GET list by id', async () => {
    const list = await controller.getById(56);
    expect(list).toStrictEqual(await service.getById(56));
  });

  it('/GET get list', async () => {
    expect(await controller.get()).toStrictEqual(await service.get());
  });

  it('/DELETE list by id', async () => {
    const response = await controller.delete(40);
    expect(response).toBe(response);
  });

  it('/UPDATE list by id', async () => {
    const updateList: UpdateListDTO = {
      name: 'List #1',
      description: 'My favorite films',
    };
    const response = await controller.update(56, updateList);

    expect(response).toStrictEqual(await service.getById(56));
  });

  it('/add film to list by id', async () => {
    const addFilm: AddFilmDTO = {
      filmId: 5,
    };
    const response = await controller.addFilm(56, addFilm);
    const list = await service.getById(56);

    expect(response).toStrictEqual(list);
  });
});
