import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
// 配置
import { ConfigModule, ConfigService } from '@nestjs/config';
// 中间件 拦截器
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { DatabaseExceptionFilter } from './common/interceptors/database-exception.interceptor';
// 日志
import { LoggerService } from './common/logger/logger.service';
import { LoggerMiddleware } from './common/logger/logger.middleware';
// 用户模块
import { UserModule } from './users/user.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    // env配置
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // JWT
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
    // 数据库
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // 在开发环境中使用，生产环境中建议设置为 false
      }),
      inject: [ConfigService], // 注入 ConfigService
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
    LoggerService, // 引入日志服务
    LoggerMiddleware
  ],
})
export class AppModule implements NestModule {
  // 配置中间件
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
