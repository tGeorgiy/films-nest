import {
  Body,
  Controller,
  Delete,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './../auth/jwt/jwt.auth.guard';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { User } from './dto/user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Delete(':id')
  @ApiOkResponse({
    description: 'Delete user by id.',
    type: User,
  })
  async delete(@Param('id') id: number): Promise<User> {
    return await this.usersService.delete(+id);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Update user by id.',
    type: User,
  })
  async update(
    @Param('id') id: number,
    @Body() updateUserDTO: UpdateUserDTO,
  ): Promise<User> {
    return await this.usersService.update(+id, updateUserDTO);
  }
}
