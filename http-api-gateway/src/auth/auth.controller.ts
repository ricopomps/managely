import { Body, Controller, Post, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import LoginDto from "./dtos/Login.dto";

@Controller("/auth")
export class AuthController {
    constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.natsClient.send({ cmd: 'login' }, loginDto);
    }

    @Post('validate')
    validateToken(@Body() body: { token: string }) {
        return this.natsClient.send({ cmd: 'validateToken' }, body);
    }
}
