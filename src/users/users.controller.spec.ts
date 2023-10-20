import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './../../prisma/service';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, PrismaService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('/DELETE user by id', async () => {
    const response = await controller.delete(20);
    expect(response).toBe(response);
  });

  it('/update user by id', async () => {
    const updateUser: UpdateUserDTO = {
      firstName: 'New first name',
      lastName: 'New last name',
    };
    const response = await controller.update(16, updateUser);
    expect(response).toBe(response);
  });
});
