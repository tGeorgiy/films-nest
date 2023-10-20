import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDTO } from '../users/dto/createUser.dto';
import { PrismaService } from '../../prisma/service';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtConstants } from './jwt/constants';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { SignInDTO } from './dto/signIn.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let userServise: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [
        PassportModule,
        UsersModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '24h' },
        }),
      ],
      providers: [AuthService, UsersService, PrismaService, JwtStrategy],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    userServise = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('/POST signUp', async () => {
    const dto = new CreateUserDTO();
    dto.firstName = 'test';
    dto.lastName = 'test';
    dto.email = 'test@gmail.com';
    dto.password = 'test';
    const response = await controller.signUp(dto);
    const { password, ...user } = await userServise.getByEmail(
      'test@gmail.com',
    );

    expect(response).toEqual(user);
  });

  it('/POST signIn', async () => {
    const dto = new SignInDTO();
    dto.email = 'test1@gmail.com';
    dto.password = 'test';
    const response = await controller.signIn(dto);

    expect(response).toEqual({ access_token: response.access_token });
  });
});
