import { Injectable, Inject } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom, timeout } from 'rxjs';
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
    try {
      const user$ = this.natsClient
        .send('readByUsername', loginDto.username)
        .pipe(timeout(3000));
      const user = await lastValueFrom(user$);

      if (!user) throw new RpcException({ status: 401, message: 'User not found' });

      const ok = await bcrypt.compare(loginDto.password, user.password);
      if (!ok) throw new RpcException({ status: 401, message: 'Invalid credentials' });

      const roles = user.permissions ? user.permissions.map((p) => p.name) : [];

      // Generate JWT token
      const payload = {
        sub: user.id,
        username: user.username,
        email: user.email,
        roles: roles, // Add roles to the payload
      };

      const access_token = await this.jwtService.signAsync(payload);

      // Return response without password
      return {
        access_token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          displayName: user.displayName,
          roles: roles, // Also include roles in the user object
        },
      };
    } catch (err: any) {
      if (err instanceof RpcException) throw err;
      if (err?.name === 'TimeoutError') {
        throw new RpcException({ status: 504, message: 'Users service timeout' });
      }
      throw new RpcException({ status: 500, message: err?.message ?? 'Auth login failed' });
    }
  }

  async validateToken(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      // The user object for the guard is the payload itself
      return { user: payload };
    } catch (error) {
      throw new RpcException({ status: 401, message: 'Invalid or expired token' });
    }
  }
}
