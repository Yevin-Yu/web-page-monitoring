import { Injectable, ConflictException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Code, Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

import { verifyLogin } from '../auth/auth.utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }

  async register(email: string, password: string): Promise<string> {
    // 邮箱密码不能为空
    if (!email || !password) {
      throw new BadRequestException('邮箱或密码不能为空');
    }
    // 验证邮箱格式
    if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)) {
      throw new BadRequestException('邮箱格式不正确');
    }
    // 密码长度不能小于6 必须 包括数字和字母】
    if (password.length < 6 || !/[0-9]/.test(password) || !/[a-zA-Z]/.test(password)) {
      throw new BadRequestException('密码长度不能小于6，必须包含数字和字母');
    }
    // 检查邮箱是否已存在
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      // 抛出 HttpException
      throw new ConflictException('该邮箱已被注册，请使用其他邮箱。');
    }
    // 创建新用户并保存到数据库
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ email, password: hashedPassword });
    await this.userRepository.save(user);
    return '注册成功'
  }

  async login(email: string, password: string): Promise<object> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('邮箱不存在');
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new BadRequestException('密码错误');
    }
    // 更新用户登录时间
    user.last_login = new Date();
    await this.userRepository.save(user);
    // 生成 JWT
    const token = this.jwtService.sign({ email: user.email, id: user.id });
    return {
      token
    }
  }
  // 获取用户信息
  async getUserInfo(headers: Record<string, string>): Promise<object> {
    const user = await verifyLogin(headers, this.jwtService, false);
    // 获取请求头中的 token
    return user
  }
}
