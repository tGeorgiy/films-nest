import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDTO {
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
}
