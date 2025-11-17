import { Body, Controller,Delete,Get,Inject, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import UserDto from "./dtos/User.dto";



@Controller("/users")
export class UsersController{

    constructor(@Inject('NATS_SERVICE') private natsClient:ClientProxy){
        
    }

    @Post()
    createUser(@Body() userDto:UserDto){
        
        return this.natsClient.send({cmd: 'createUser'},userDto)
 
    }

    @Get()
    readUsers(){

        return this.natsClient.send({cmd : 'readUsers'},{})

    }

    @Put(':id')
    editUser(@Param('id',ParseUUIDPipe)userId:string,@Body() userDto:UserDto){

        return this.natsClient.send({cmd:'updateUser'},{userId,userDto})

    }

    @Delete(':id')
    deleteUser(@Param('id',ParseUUIDPipe) userId:string){
        
        return this.natsClient.send({cmd:'deleteUser'},userId)

    }

   

}