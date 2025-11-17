import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./models/User.model";
import UserDto from "./dtos/User.dto";



@Injectable()
export class UsersMicroService{

    constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    
  ) {}

  async createUser(userDto:UserDto):Promise<User>{

    const newUser = this.usersRepository.create({
      
      "username" : userDto.username,
      "password" : userDto.password,
      "displayName" : userDto?.displayName,
      "email" : userDto.email

    }) 

    return this.usersRepository.save(newUser)

  }

  async readUsers() :Promise<User[]>{

    return this.usersRepository.find();

  }

 

  async updateUser(userId:string,userDto : UserDto): Promise<User>{

    const user = await this.usersRepository.findOneBy({id:userId});

    if(!user){

      throw new NotFoundException(`User with ID ${userId} not found.`);

    }

    this.usersRepository.merge(user,userDto);

    return this.usersRepository.save(user);

  }

  async deleteUser(userId:string):Promise<User>{

    const user = await this.usersRepository.findOneBy({id:userId})

    if(!user){

      throw new NotFoundException(`User with ID ${userId} not found.`)

    }

    return this.usersRepository.remove(user);
    
  }

  

}