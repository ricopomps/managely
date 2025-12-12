import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = 500;
    let message: any = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message = typeof res === 'string' ? res : (res as any).message ?? message;
    } else if (exception instanceof RpcException) {
      const payload = exception.getError();
      if (payload && typeof payload === 'object') {
        status = (payload as any).status ?? status;
        message = (payload as any).message ?? message;
      } else if (typeof payload === 'string') {
        message = payload;
      }
    } else if (exception?.message) {
      message = exception.message;
    }

    // Basic log for debugging
    // eslint-disable-next-line no-console
    console.error(`[${request.method}] ${request.url} ->`, exception);

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
