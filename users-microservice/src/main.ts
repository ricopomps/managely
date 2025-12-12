if (typeof (global as any).crypto === 'undefined') {

  (global as any).crypto = require('crypto');
  
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: ['nats://nats'],
    },
  });

  await app.startAllMicroservices();
  
  console.log('Users microservice is running');

}

bootstrap();
