import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/service';
import { CreateFilmDTO } from './dto/createFilm.dto';
import { UpdateFilmDTO } from './dto/updateFilm.dto';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;
  const requestMock = {
    query: {},
    user: {
      userId: 1,
    },
  } as unknown as Request;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService, PrismaService],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('/POST create film', async () => {
    const createFilmDTO: CreateFilmDTO = {
      title: 'The Infernal Machine',
      original_title: 'The Infernal Machine',
      original_language: 'ENG',
      description:
        'Reclusive and controversial author Bruce Cogburn is drawn out of hiding by an obsessive fan',
      poster_path:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/aVWD3YLIkbkApXF2ntRHgK8J0Je.jpg',
      country: 'USA',
      release_date: '23.09.2022',
    };
    const newMovie = await controller.create(requestMock, createFilmDTO);
    expect(newMovie).toStrictEqual(await service.getById(newMovie['id']));
  });

  it('/GET film by id', async () => {
    const movie = await controller.getById(5);
    expect(movie).toStrictEqual(await service.getById(5));
  });

  it('/GET top films', async () => {
    const newMovie = await controller.getTop();
    expect(newMovie).toStrictEqual(await service.getTop());
  });

  it('/GET get films', async () => {
    const films = await service.get();
    expect(await controller.get(requestMock)).toStrictEqual(films);
  });

  it('/DELETE film by id', async () => {
    const response = await controller.delete(3);
    expect(response).toBe(response);
  });

  it('/UPDATE film by id', async () => {
    const updateFilmDTO: UpdateFilmDTO = {
      title: 'The Infernal Machine',
      original_title: 'The Infernal Machine',
      original_language: 'ENG',
      description:
        'Reclusive and controversial author Bruce Cogburn is drawn out of hiding by an obsessive fan',
      poster_path:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/aVWD3YLIkbkApXF2ntRHgK8J0Je.jpg',
      country: 'USA',
      release_date: '23.09.2022',
    };
    const response = await controller.update(19, updateFilmDTO);

    expect(response).toStrictEqual(await service.getById(19));
  });
});
