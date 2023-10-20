import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/service';
import { CreateFilmDTO } from './dto/createFilm.dto';
import { UpdateFilmDTO } from './dto/updateFilm.dto';
import { FilmsService } from './films.service';

describe('FilmsService', () => {
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmsService, PrismaService],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create film', async () => {
    const createFilmDTO: CreateFilmDTO = {
      title: 'The Infernal Machine112w1',
      original_title: 'The Infernal Machine',
      original_language: 'ENG',
      description:
        'Reclusive and controversial author Bruce Cogburn is drawn out of hiding by an obsessive fan',
      poster_path:
        'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/aVWD3YLIkbkApXF2ntRHgK8J0Je.jpg',
      country: 'USA',
      release_date: '23.09.2022',
    };
    const movie = await service.create(1, createFilmDTO);

    expect(movie).toStrictEqual(await service.getById(movie['id']));
  });

  it('update film', async () => {
    const updateFilm: UpdateFilmDTO = {
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
    const movie = await service.update(19, updateFilm);

    expect(movie).toStrictEqual(await service.getById(19));
  });

  it('delete film', async () => {
    const movie = await service.delete(1);

    expect(movie).toBe(await service.getById(1));
  });

  it('film by id', async () => {
    const movie = await service.getById(5);
    expect(movie).toStrictEqual(await service.getById(5));
  });

  it('get top films', async () => {
    const newMovie = await service.getTop();
    expect(newMovie).toStrictEqual(await service.getTop());
  });

  it('get films', async () => {
    const films = await service.get();
    expect(await service.get()).toStrictEqual(films);
  });
});
