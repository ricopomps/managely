import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/User.model';
import CreateUserDto from './dtos/CreateUser.dto';
import UserDto from './dtos/User.dto';
import * as bcrypt from 'bcryptjs';
import { Permission } from './models/Permission.model';

@Injectable()
export class UsersMicroService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  async onModuleInit() {
    const count = await this.permissionsRepository.count();
    if (count === 0) {
      const permissionsToSeed = [
        { name: 'Admin', description: 'Full access to all system features.' },
        { name: 'Manager', description: 'Access to inventory, financial and sales data.' },
        {name: 'Operator', description: 'Access to create sales and manage inventory.',
        },
      ];

      const permissionEntities =
        this.permissionsRepository.create(permissionsToSeed);
      await this.permissionsRepository.save(permissionEntities);
      console.log('Permissions seeded successfully.');
    }

    const userCount = await this.usersRepository.count();
    if (userCount === 0) {
      const adminPermission = await this.permissionsRepository.findOneBy({
        name: 'Admin',
      });
      if (adminPermission) {
        const adminUser = this.usersRepository.create({
          username: 'admin',
          email: 'admin@managely.com',
          password: await bcrypt.hash('admin123', 10),
          permissions: [adminPermission],
        });
        await this.usersRepository.save(adminUser);
        console.log('Default admin user created successfully.');
      }
    }
  }

  private _formatUserResponse(user: User) {
    return {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      email: user.email,
      roles: user.permissions ? user.permissions.map((p) => p.name) : [],
    };
  }

  async createUser(userDto: CreateUserDto): Promise<any> {
    const registeredUser = await this.usersRepository.findOneBy({
      username: userDto.username,
    });

    if (registeredUser != null) {
      throw new BadRequestException('User already registered with this username');
    }

    const newUser = this.usersRepository.create(userDto);

    newUser.password = await bcrypt.hash(userDto.password, 10);
    const savedUser = await this.usersRepository.save(newUser);

    return this._formatUserResponse(savedUser);
  }

  async readUsers(): Promise<any[]> {
    const users = await this.usersRepository.find();
    return users.map((user) => this._formatUserResponse(user));
  }

  async updateUser(userId: string, userDto: UserDto): Promise<any> {
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    this.usersRepository.merge(user, userDto);
    const savedUser = await this.usersRepository.save(user);

    return this._formatUserResponse(savedUser);
  }

  async deleteUser(userId: string): Promise<any> {
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
    const formattedUser = this._formatUserResponse(user);
    await this.usersRepository.remove(user);

    return formattedUser;
  }

  async readByUsername(username: string): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { username },
      relations: ['permissions'],
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async readById(id: string): Promise<any> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with ID '${id}' doesn't exist`);
    }

    return this._formatUserResponse(user);
  }
}
