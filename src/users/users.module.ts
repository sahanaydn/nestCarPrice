import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { CurrentUserInterceptos } from './interceptors/current-user.interceptor';
//to apply global interceptor
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    {
      //we set up a globally scopped interceptor
      useClass: CurrentUserInterceptos,
      provide: APP_INTERCEPTOR,
    },
  ],
})
export class UsersModule {}
