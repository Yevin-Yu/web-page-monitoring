import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Code, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async register(email: string, password: string): Promise<User> {
    // 邮箱密码不能为空
    if (!email || !password) {
      throw new BadRequestException('邮箱或密码不能为空');
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
    const user = this.userRepository.create({ email, password });
    return this.userRepository.save(user);
  }
}
