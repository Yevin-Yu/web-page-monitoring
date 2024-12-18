import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
// 中间件 拦截器
import { ResponseInterceptor } from './middleware/response.interceptor';
import { DatabaseExceptionFilter } from './middleware/database-exception.interceptor';
// 日志
import { LoggerService } from './logger/logger.service';
import { LoggerMiddleware } from './middleware/logger.middleware';
// 用户模块
import { UserModule } from './user/user.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({  // 连接数据库
      type: 'mysql',
      host: 'xxx', // 数据库主机
      port: 3306, // 数据库端口
      username: 'xxxx', // 数据库用户名
      password: 'xxxx', // 数据库密码
      database: 'iyuwb-tongji', // 数据库名称
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 实体文件路径
      synchronize: true, // 在开发环境中使用，生产环境中建议设置为 false
    }),
    UserModule, // 引入用户模块
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor, // 响应拦截器
    },
    {
      provide: APP_FILTER,
      useClass: DatabaseExceptionFilter, // 数据库异常拦截器
    },
    LoggerService // 引入日志服务
  ],
})
export class AppModule implements NestModule { 
  // 配置中间件
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
