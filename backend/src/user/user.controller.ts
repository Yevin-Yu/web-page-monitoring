import { Controller, Post, Body,ConflictException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<User> {
    return this.userService.register(email, password);
  }
}
