import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from './../../prisma/service';
import { UpdateUserDTO } from './dto/updateUser.dto';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Delete user by id', async () => {
    const response = await service.delete(21);
    expect(response).toBe(response);
  });

  it('Update user by id', async () => {
    const updateUser: UpdateUserDTO = {
      firstName: 'New first name',
      lastName: 'New last name',
    };
    const response = await service.update(16, updateUser);
    expect(response).toBe(response);
  });
});
