import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  providers: [
    {
      provide: 'NATS_SERVICE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.NATS,
          options: {
            servers: ['nats://nats:4222'],
          },
        });
      },
    },
  ],
  exports: ['NATS_SERVICE'],
})
export class NatsClientModule {}
