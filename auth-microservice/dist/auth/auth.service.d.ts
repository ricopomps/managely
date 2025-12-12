import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import LoginDto from './dtos/Login.dto';
import AuthResponseDto from './dtos/AuthResponse.dto';
export declare class AuthService {
    private jwtService;
    private natsClient;
    constructor(jwtService: JwtService, natsClient: ClientProxy);
    login(loginDto: LoginDto): Promise<AuthResponseDto>;
    validateToken(token: string): Promise<any>;
}
