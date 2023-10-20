import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../users/dto/createUser.dto';
import { UsersService } from '../users/users.service';
import { SignIn, SignInDTO } from './dto/signIn.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/dto/user.dto';
import {
  UserNotFoundException,
  WrongCredentialsException,
} from '../error/error.exception';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDTO: CreateUserDTO): Promise<User> {
    createUserDTO.password = await bcrypt.hash(createUserDTO.password, 10);
    return await this.userService.create(createUserDTO);
  }

  async validateUser(signInDTO: SignInDTO): Promise<SignIn> {
    const user = await this.userService.getByEmail(signInDTO.email);

    if (!user) {
      throw new UserNotFoundException();
    }

    const isPasswordMatching = await bcrypt.compare(
      signInDTO.password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new WrongCredentialsException();
    }
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
