import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject('NATS_SERVICE') private readonly natsClient: ClientProxy) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader: string | undefined = request.headers['authorization'] || request.headers['Authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Authorization header');
    }

    const token = authHeader.substring('Bearer '.length);

    // Validate token via auth-microservice
    const result = await firstValueFrom(
      this.natsClient.send({ cmd: 'validateToken' }, { token })
    );

    if (!result || result.valid !== true) {
      throw new UnauthorizedException('Invalid token');
    }

    // Attach payload to request for downstream usage
    request.user = result.payload;
    return true;
  }
}
