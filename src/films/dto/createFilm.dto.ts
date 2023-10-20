import { ApiProperty } from '@nestjs/swagger';

export class CreateFilmDTO {
  @ApiProperty()
  title: string;
  @ApiProperty()
  original_title: string;
  @ApiProperty()
  original_language: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  poster_path: string;
  @ApiProperty()
  country: string;
  @ApiProperty()
  release_date: string;
  @ApiProperty()
  listId?: number;
  @ApiProperty()
  vote_average?: number;
}
