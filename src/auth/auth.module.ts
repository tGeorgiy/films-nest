import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from '../../prisma/service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt/constants';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, UsersService, PrismaService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
