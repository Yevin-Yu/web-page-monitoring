import { Controller, Post, Body, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<string> {
    return this.userService.register(email, password);
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string
  ): Promise<object> {
    return this.userService.login(email, password);
  }

  // 获取用户信息
  @Post('info')
  async getUserInfo(
    @Headers() headers: Record<string, string>
  ): Promise<object> {
    return this.userService.getUserInfo(headers);
  }
}
