import { Module } from '@nestjs/common';
import { UsersController as UsersController } from './users.controller';

@Module({
  controllers: [UsersController]
})
export class UsersModule {}
