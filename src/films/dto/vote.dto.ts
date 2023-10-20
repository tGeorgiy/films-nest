import { ApiProperty } from '@nestjs/swagger';

export class VoteDTO {
  @ApiProperty()
  value: number;
}
