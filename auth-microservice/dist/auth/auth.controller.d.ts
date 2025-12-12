import { AuthService } from './auth.service';
import LoginDto from './dtos/Login.dto';
import ValidateTokenDto from './dtos/ValidateToken.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<import("./dtos/AuthResponse.dto").default>;
    validateToken(validateTokenDto: ValidateTokenDto): Promise<any>;
}
