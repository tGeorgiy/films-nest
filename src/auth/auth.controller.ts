import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from '../users/dto/createUser.dto';
import { AuthService } from './auth.service';
import { SignIn, SignInDTO } from './dto/signIn.dto';
import { User } from '../users/dto/user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: User,
  })
  async signUp(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return await this.authService.signUp(createUserDTO);
  }

  @Post('signIn')
  @ApiOkResponse({
    description: 'The user has been successfully sign in.',
    type: SignIn,
  })
  async signIn(@Body() signInDTO: SignInDTO): Promise<SignIn> {
    return await this.authService.validateUser(signInDTO);
  }
}
