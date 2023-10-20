import { ApiProperty } from '@nestjs/swagger';

export class UpdateListDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
}
