import * as MovieDB from 'node-themoviedb';
import { config } from 'dotenv';
import { ListService } from '../list/list.service';
import { FilmsService } from '../films/films.service';
import { CreateFilmDTO } from 'src/films/dto/createFilm.dto';
import { Injectable } from '@nestjs/common';
import { List } from '../list/dto/list.dto';

config();

@Injectable()
export class MovieDBService {
  mdb: MovieDB;
  constructor(
    private listService: ListService,
    private readonly filmService: FilmsService,
  ) {
    this.mdb = new MovieDB(process.env.API_KEY);
  }

  async fetch(userId: number, id: number): Promise<List> {
    const { data } = await this.mdb.list.getDetails({
      pathParameters: { list_id: id },
    });

    let list = await this.listService.getByName(data.name);
    if (!list) {
      list = await this.listService.create(userId, {
        name: data.name,
        description: data.description,
      });
    } 
    await Promise.all(
      data.items.map(async (movie) => {
        const { data } = await this.mdb.movie.getDetails({
          pathParameters: { movie_id: movie.id },
        }); 
        let film = await this.filmService.getByName(data.title);

        if (!film) {
          const createDTO: CreateFilmDTO = {
            title: data?.title,
            original_language: data.original_language,
            original_title: data.original_title,
            poster_path: data.homepage + data.poster_path.replace('/', ''),
            description: data.overview,
            listId: list.id,
            country: data.production_countries[0]?.name || '',
            release_date: data.release_date,
            vote_average: data.vote_average,
          };
          film = await this.filmService.create(userId, createDTO);
        }

        await this.listService.addFilm(list.id, { filmId: film.id });
      }),
    );

    return await this.listService.getById(list.id);
  }
}
