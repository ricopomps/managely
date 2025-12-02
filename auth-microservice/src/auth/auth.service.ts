import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import * as bcrypt from 'bcryptjs';
import LoginDto from './dtos/Login.dto';
import AuthResponseDto from './dtos/AuthResponse.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('NATS_SERVICE') private natsClient: ClientProxy,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    
    const user = await firstValueFrom(
      this.natsClient.send({ cmd: 'readByUsername' }, loginDto.username)
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // validate password
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const payload = { 
      sub: user.id, 
      username: user.username,
      email: user.email 
    };
    
    const access_token = await this.jwtService.signAsync(payload);

    // Return response withtout password
    return {
      access_token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
      },
    };
  }

  async validateToken(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      return {
        valid: true,
        payload,
      };
    } catch (error) {
      return {
        valid: false,
        error: error.message,
      };
    }
  }
}
