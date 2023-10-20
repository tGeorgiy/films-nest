import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  id: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  email: string;
}
