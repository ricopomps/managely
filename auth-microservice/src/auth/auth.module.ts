import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { NatsClientModule } from '../nats-client/nats-client.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    NatsClientModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const secret = config.get<string>('JWT_SECRET') || 'changeme';
        const raw = config.get<string>('JWT_EXPIRES_IN');
        // Convert common timespan strings to seconds to satisfy JwtModuleOptions type.
        // Supported: s (seconds), m (minutes), h (hours), d (days)
        const toSeconds = (v: string): number => {
          const match = v.match(/^\s*(\d+)\s*([smhd])\s*$/i);
          if (!match) return NaN;
          const amount = Number(match[1]);
          const unit = match[2].toLowerCase();
          switch (unit) {
            case 's':
              return amount;
            case 'm':
              return amount * 60;
            case 'h':
              return amount * 3600;
            case 'd':
              return amount * 86400;
            default:
              return NaN;
          }
        };

        let expiresIn: number = 3600; // default 1h
        if (raw) {
          if (/^\d+$/.test(raw)) {
            expiresIn = Number(raw);
          } else {
            const parsed = toSeconds(raw);
            expiresIn = Number.isFinite(parsed) ? parsed : 3600;
          }
        }

        return {
          secret,
          signOptions: { expiresIn },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
