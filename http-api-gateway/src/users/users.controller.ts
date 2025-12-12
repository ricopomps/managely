import { Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import CreateUserDto from "./dtos/CreateUser.dto";
import UserDto from "./dtos/User.dto";
import { AuthGuard } from "../auth/auth.guard";
import { Roles } from "../auth/decorators/roles.decorator";
import { Role } from "../auth/enums/role.enum";



@Controller("/users")
@UseGuards(AuthGuard)
export class UsersController{

    constructor(@Inject('NATS_SERVICE') private natsClient:ClientProxy){
        
    }

    @Post()
    @Roles(Role.Admin)
    createUser(@Body() userDto:CreateUserDto){
        
        return this.natsClient.send({cmd: 'createUser'},userDto)
 
    }

    @Get()
    @Roles(Role.Admin,Role.Manager)
    readUsers(){

        return this.natsClient.send({cmd : 'readUsers'},{})

    }

    @Put(':id')
    @Roles(Role.Admin)
    editUser(@Param('id',ParseUUIDPipe) userId:string,@Body() userDto:UserDto){

        return this.natsClient.send({cmd:'updateUser'},{userId,userDto})

    }

    @Delete(':id')
    @Roles(Role.Admin)
    deleteUser(@Param('id',ParseUUIDPipe) userId:string){
        
        return this.natsClient.send({cmd:'deleteUser'},userId)

    }

}