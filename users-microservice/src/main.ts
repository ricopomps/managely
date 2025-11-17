if (typeof (global as any).crypto === 'undefined') {

  (global as any).crypto = require('crypto');
  
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  
  console.log('Users microservices is running')
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule,{

    transport: Transport.NATS,
    options:{

      servers: ['nats://nats'],

    },

  },);
  
  await app.listen();

}

bootstrap();
