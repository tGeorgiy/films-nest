import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/service';
import { UsersService } from '../users/users.service';
import { CreateUserDTO } from '../users/dto/createUser.dto';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt/constants';
import { SignInDTO } from './dto/signIn.dto';

describe('AuthService', () => {
  let service: AuthService;
  let userServise: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '24h' },
        }),
      ],
      providers: [AuthService, UsersService, PrismaService, JwtStrategy],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userServise = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('signUp method', async () => {
    const dto = new CreateUserDTO();
    dto.firstName = 'test';
    dto.lastName = 'test';
    dto.email = 'testw3@gmail.com';
    dto.password = 'test';
    const result = await service.signUp(dto);
    const { password, ...user } = await userServise.getByEmail(
      'testw3@gmail.com',
    );

    expect(result).toEqual(user);
  });

  it('validate user method', async () => {
    const dto = new SignInDTO();
    dto.email = 'test1@gmail.com';
    dto.password = 'test';
    const result = await service.validateUser(dto);

    expect(result).toEqual({ access_token: result.access_token });
  });
});
