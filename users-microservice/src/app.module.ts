import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module'; 

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'db_user'), 
        port: configService.get<number>('DB_PORT', 5432),

        username: configService.get<string>('DB_USER'),

        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),

        entities: [__dirname + '/**/*.{entity,model}{.ts,.js}'], 
        synchronize: process.env.NODE_ENV !== 'production', 
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
})
export class AppModule {}