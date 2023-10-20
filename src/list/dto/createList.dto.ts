import { ApiProperty } from '@nestjs/swagger';

export class CreateListDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
}
