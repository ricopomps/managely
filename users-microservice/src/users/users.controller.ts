import { Controller, Inject, Post } from "@nestjs/common";
import { EventPattern, MessagePattern, Payload } from "@nestjs/microservices";
import UserDto from "./dtos/User.dto";
import { fromEventPattern } from "rxjs";
import { UsersMicroService } from "./users.service";
import { UUID } from "crypto";


@Controller()
export class UsersMicroserviceController{

    constructor(private usersService: UsersMicroService){}

    @MessagePattern({cmd : 'createUser'}) 
    createUser(@Payload() userDto: UserDto){
       
        return this.usersService.createUser(userDto); 

    }

    @MessagePattern({cmd : 'readUsers'})
    readUsers(){

        return this.usersService.readUsers()

    }



    @MessagePattern({ cmd: 'updateUser' })
    updateUser(@Payload() data: { userId: string; userDto: UserDto },
    ) {
  
    return this.usersService.updateUser(data.userId, data.userDto);
    }

    @MessagePattern({cmd: 'deleteUser'})
    deleteUser(@Payload() id:string){

        return this.usersService.deleteUser(id);

    }
    

    @EventPattern('paymentCreated')
    paymentCreated(@Payload() data:any){
        console.log(data);
    }

}
