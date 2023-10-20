import { ApiProperty } from '@nestjs/swagger';
import { Film } from 'src/films/dto/film.dto';

export class List {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  films?: Film[];
}
