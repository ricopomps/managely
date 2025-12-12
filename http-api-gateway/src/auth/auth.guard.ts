import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Reflector } from '@nestjs/core';
import { firstValueFrom } from 'rxjs';
import { ROLES_KEY } from './decorators/roles.decorator';
import { Role } from './enums/role.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsClient: ClientProxy,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader: string | undefined =
      request.headers['authorization'] || request.headers['Authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Authorization header');
    }

    const token = authHeader.substring('Bearer '.length);

    try {
      const { user } = await firstValueFrom(
        this.natsClient.send({ cmd: 'validate-token' }, { token }),
      );

      if (!user) {
        throw new UnauthorizedException('Invalid token');
      }
      request.user = user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = request;
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
