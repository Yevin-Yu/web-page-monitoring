import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({  // 连接数据库
      type: 'mysql',
      host: 'xxx', // 数据库主机
      port: 3306, // 数据库端口
      username: 'iyuwb-tongji', // 数据库用户名
      password: 'xxxx', // 数据库密码
      database: 'iyuwb-tongji', // 数据库名称
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 实体文件路径
      synchronize: true, // 在开发环境中使用，生产环境中建议设置为 false
    }),
    UserModule, // 引入用户模块
  ],
})
export class AppModule { }
