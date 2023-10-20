import { ApiProperty } from '@nestjs/swagger';

export class AddFilmDTO {
  @ApiProperty()
  filmId: number;
}
