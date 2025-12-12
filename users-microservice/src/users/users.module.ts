import { Module } from "@nestjs/common";
import { UsersMicroserviceController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./models/User.model";
import { UsersMicroService } from "./users.service";
import { Permission } from "./models/Permission.model";


@Module({
  imports: [TypeOrmModule.forFeature([User, Permission])],
  controllers: [UsersMicroserviceController],
  providers: [UsersMicroService],
  exports: [TypeOrmModule.forFeature([User, Permission]), UsersMicroService],
})
export class UsersModule {}