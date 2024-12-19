import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'A3B7C9D1E2F4G5H8',
      signOptions: { expiresIn: '604800s' }, // one week
    }),
  ],
  providers: [
    UserService
  ],
  controllers: [UserController],
})
export class UserModule { }
