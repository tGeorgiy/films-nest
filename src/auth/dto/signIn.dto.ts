import { ApiProperty } from '@nestjs/swagger';

export class SignInDTO {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

export class SignIn {
  @ApiProperty()
  access_token: string;
}
