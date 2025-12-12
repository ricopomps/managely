import { Controller, Inject, Post, UseGuards } from "@nestjs/common";
import { EventPattern, MessagePattern, Payload } from "@nestjs/microservices";
import CreateUserDto from "./dtos/CreateUser.dto";
import UpdateUserDto from "./dtos/User.dto";
import { fromEventPattern } from "rxjs";
import { UsersMicroService } from "./users.service";
import { UUID } from "crypto";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";


@Controller()
export class UsersMicroserviceController{

    constructor(private usersService: UsersMicroService){}

    @MessagePattern({cmd : 'createUser'})
    @UseGuards(RolesGuard)
    @Roles('admin')
    createUser(@Payload() userDto: CreateUserDto){

        return this.usersService.createUser(userDto);

    }

    @MessagePattern({cmd : 'readUsers'})
    @UseGuards(RolesGuard)
    @Roles('admin', 'user')
    readUsers(){

        return this.usersService.readUsers()

    }


    @MessagePattern({ cmd: 'updateUser' })
    @UseGuards(RolesGuard)
    @Roles('admin')
    updateUser(@Payload() data: { userId: string; userDto: UpdateUserDto }) {

        return this.usersService.updateUser(data.userId, data.userDto);

    }

    @MessagePattern({cmd: 'deleteUser'})
    @UseGuards(RolesGuard)
    @Roles('admin')
    deleteUser(@Payload() id:string){

        return this.usersService.deleteUser(id);

    }


    @MessagePattern('readByUsername')
    readByUsername(@Payload() username: string) {
        console.log('readByUsername', username);
        return this.usersService.readByUsername(username);
    }


}
