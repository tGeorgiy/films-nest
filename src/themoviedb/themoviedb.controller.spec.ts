import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/service';
import { FilmsService } from '../films/films.service';
import { ListService } from '../list/list.service';
import { ThemoviedbController } from './themoviedb.controller';
import { MovieDBService } from './themoviedb.service';

describe('ThemoviedbController', () => {
  let controller: ThemoviedbController;

  const requestMock = {
    query: {},
    user: {
      userId: 1,
    },
  } as unknown as Request;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThemoviedbController],
      providers: [MovieDBService, ListService, FilmsService, PrismaService],
    }).compile();

    controller = module.get<ThemoviedbController>(ThemoviedbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('/GET list by id in themoviedb', async () => {
    const list = await controller.get(requestMock, 1);
    expect(list).toStrictEqual(list);
  });
});
