import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersMicroService } from '../users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private usersService: UsersMicroService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToRpc().getData();
    const userId = request.userId;
    if (!userId) {
      throw new UnauthorizedException('User ID not found in request');
    }

    const user = await this.usersService.readById(userId);
    if (!user) {
        throw new UnauthorizedException('User not found');
    }

    const hasRole = () => roles.some((role) => user.permissions.some((p) => p.name === role));

    if (user && user.permissions && hasRole()) {
        return true;
      }

    throw new UnauthorizedException('Insufficient permissions');
  }
}
