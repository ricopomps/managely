import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UsersModule } from '../src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../src/users/models/User.model';
import { Permission } from '../src/users/models/Permission.model';
import { UsersMicroserviceController } from '../src/users/users.controller';
import { UsersMicroService } from '../src/users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateUserDto from '../src/users/dtos/CreateUser.dto';
import { AuthModule } from '../src/auth/auth.module';

describe('UsersMicroserviceController (e2e)', () => {
  let app: INestApplication;
  let usersService: UsersMicroService;
  let usersController: UsersMicroserviceController;
  let userRepository: Repository<User>;
  let permissionRepository: Repository<Permission>;
  let adminUser: User;
  let regularUser: User;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        UsersModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User, Permission],
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    usersService = moduleFixture.get<UsersMicroService>(UsersMicroService);
    usersController = moduleFixture.get<UsersMicroserviceController>(
      UsersMicroserviceController,
    );
    userRepository = moduleFixture.get<Repository<User>>(
      getRepositoryToken(User),
    );
    permissionRepository = moduleFixture.get<Repository<Permission>>(
      getRepositoryToken(Permission),
    );

    const adminPermission = await permissionRepository.save({ name: 'admin' });
    const userPermission = await permissionRepository.save({ name: 'user' });

    const adminCreateDto: CreateUserDto = {
        username: 'admin',
        password: 'password',
        email: 'admin@test.com',
        permissions: [adminPermission],
    }
    adminUser = await usersService.createUser(adminCreateDto);

    const userCreateDto: CreateUserDto = {
        username: 'user',
        password: 'password',
        email: 'user@test.com',
        permissions: [userPermission],
    }
    regularUser = await usersService.createUser(userCreateDto);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user if called by an admin', async () => {
      const newUserDto: CreateUserDto = {
        username: 'newuser',
        password: 'password',
        email: 'newuser@test.com',
      };
      const payload = { ...newUserDto, userId: adminUser.id };
      const result = await usersController.createUser(payload);
      expect(result).toBeDefined();
      expect(result.username).toEqual(newUserDto.username);
    });

    it('should throw an error if called by a non-admin', async () => {
        const newUserDto: CreateUserDto = {
          username: 'newuser2',
          password: 'password',
          email: 'newuser2@test.com',
        };
        const payload = { ...newUserDto, userId: regularUser.id };
        await expect(usersController.createUser(payload)).rejects.toThrow();
      });
  });

  describe('readUsers', () => {
    it('should return users if called by an admin', async () => {
      const result = await usersController.readUsers();
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should return users if called by a regular user', async () => {
        const result = await usersController.readUsers();
        expect(result).toBeInstanceOf(Array);
        expect(result.length).toBeGreaterThan(0);
      });
  });

  describe('updateUser', () => {
    it('should update a user if called by an admin', async () => {
      const updatedDisplayName = 'Updated User';
      const payload = {
        userId: regularUser.id,
        userDto: { displayName: updatedDisplayName },
      };
      const result = await usersController.updateUser(payload);
      const updatedUser = await usersService.readById(regularUser.id);
      expect(updatedUser.displayName).toEqual(updatedDisplayName);
    });

    it('should throw an error if called by a non-admin', async () => {
        const updatedDisplayName = 'Updated User 2';
        const payload = {
            userId: regularUser.id,
            userDto: { displayName: updatedDisplayName },
          };
        await expect(usersController.updateUser(payload)).rejects.toThrow();
      });
  });

  describe('deleteUser', () => {
    it('should delete a user if called by an admin', async () => {
      const userToDelete = await usersService.createUser({
        username: 'todelete',
        password: 'password',
        email: 'todelete@test.com',
      });
      const payload = {id: userToDelete.id, userId: adminUser.id};
      const result = await usersController.deleteUser(userToDelete.id);
      expect(result).toBeDefined();
      await expect(usersService.readById(userToDelete.id)).rejects.toThrow();
    });

    it('should throw an error if called by a non-admin', async () => {
        const userToDelete = await usersService.createUser({
          username: 'todelete2',
          password: 'password',
          email: 'todelete2@test.com',
        });
        const payload = {id: userToDelete.id, userId: regularUser.id};
        await expect(usersController.deleteUser(userToDelete.id)).rejects.toThrow();
      });
  });

  describe('readByUsername', () => {
    it('should return a user if called by an admin', async () => {
      const result = await usersController.readByUsername(regularUser.username);
      expect(result).toBeDefined();
      expect(result.username).toEqual(regularUser.username);
    });

    it('should return a user if called by a regular user', async () => {
        const result = await usersController.readByUsername(adminUser.username);
        expect(result).toBeDefined();
        expect(result.username).toEqual(adminUser.username);
      });
  });
});
