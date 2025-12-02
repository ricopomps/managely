import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./models/User.model";
import CreateUserDto from "./dtos/CreateUser.dto";
import UserDto from "./dtos/User.dto";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersMicroService{

    constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    
  ) {}

  async createUser(userDto: CreateUserDto): Promise<any> {
    const registeredUser = await this.usersRepository.findOneBy({ username: userDto.username });

    if (registeredUser != null) {
      throw new BadRequestException("User already registered with this username");
    }

    const newUser = this.usersRepository.create({
      username: userDto.username,
      password: userDto.password,
      displayName: userDto?.displayName,
      email: userDto.email,
    });

    newUser.password = await bcrypt.hash(userDto.password, 10);
    const savedUser = await this.usersRepository.save(newUser);

    return {
      id: savedUser.id,
      username: savedUser.username,
      displayName: savedUser.displayName,
      email: savedUser.email,
    };
  }

  async readUsers(): Promise<any[]> {
    const users = await this.usersRepository.find({
      select: ['id', 'username', 'displayName', 'email'],
    });
    return users;
  }

 

  async updateUser(userId: string, userDto: UserDto): Promise<any> {
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    this.usersRepository.merge(user, userDto);
    const savedUser = await this.usersRepository.save(user);

    return {
      id: savedUser.id,
      username: savedUser.username,
      displayName: savedUser.displayName,
      email: savedUser.email,
    };
  }

  async deleteUser(userId: string): Promise<any> {
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    await this.usersRepository.remove(user);

    return {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      email: user.email,
    };
  }
  
  async readByUsername(username: string): Promise<User> {
    if (!username) {
      throw new BadRequestException("Username cannot be null or empty");
    }

    const registeredUser = await this.usersRepository.findOneBy({ username });

    if (!registeredUser) {
      throw new NotFoundException(`User with username '${username}' doesn't exist`);
    }

    return registeredUser;
  }

  

}
