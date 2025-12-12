import { Module } from '@nestjs/common';
import { RolesGuard } from './roles.guard';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [RolesGuard],
  exports: [RolesGuard],
})
export class AuthModule {}
