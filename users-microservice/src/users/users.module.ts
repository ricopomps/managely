import { Module } from "@nestjs/common";
import { UsersMicroserviceController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./models/User.model";
import { UsersMicroService } from "./users.service";

@Module({

    imports:[TypeOrmModule.forFeature([User])],
    controllers:[UsersMicroserviceController],
    providers:[UsersMicroService],
    exports: [TypeOrmModule.forFeature([User]), UsersMicroService],

})
export class UsersModule{}