import { Body, Controller, Post, Inject, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import LoginDto from "./dtos/Login.dto";
import { AuthGuard } from "./auth.guard";
import { Roles } from "./decorators/roles.decorator";
import { Role } from "./enums/role.enum";

@Controller("/auth")
export class AuthController {
    constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.natsClient.send({ cmd: 'login' }, loginDto);
    }

    @Post('validate')
    @UseGuards(AuthGuard)
    @Roles(Role.Admin, Role.Manager, Role.Operator)
    validateToken(@Body() body: { token: string }) {
        return this.natsClient.send({ cmd: 'validate-token' }, body);
    }
}
