import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime';

export class Film {
  @ApiProperty()
  id: number;
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
  vote_average: Decimal.Value;
}
