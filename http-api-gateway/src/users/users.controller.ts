import { Body, Controller,Delete,Get,Inject, Param, ParseUUIDPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import CreateUserDto from "./dtos/CreateUser.dto";
import UserDto from "./dtos/User.dto";
import { AuthGuard } from "../auth/auth.guard";



@Controller("/users")
export class UsersController{

    constructor(@Inject('NATS_SERVICE') private natsClient:ClientProxy){
        
    }

    @Post()
    createUser(@Body() userDto:CreateUserDto){
        
        return this.natsClient.send({cmd: 'createUser'},userDto)
 
    }

    @Get()
    @UseGuards(AuthGuard)
    readUsers(){

        return this.natsClient.send({cmd : 'readUsers'},{})

    }

    @Put(':id')
    @UseGuards(AuthGuard)
    editUser(@Param('id',ParseUUIDPipe) userId:string,@Body() userDto:UserDto){

        return this.natsClient.send({cmd:'updateUser'},{userId,userDto})

    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteUser(@Param('id',ParseUUIDPipe) userId:string){
        
        return this.natsClient.send({cmd:'deleteUser'},userId)

    }

}