import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageView } from './page-view.entity';
import { PageViewService } from './page-view.service';
import { PageViewController } from './page-view.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TextPlainMiddleware } from '../common/interceptors/text-plain.middleware'; // 导入中间件
@Module({
  imports: [
    TypeOrmModule.forFeature([PageView]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [PageViewService],
  controllers: [PageViewController],
})
export class PageViewModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TextPlainMiddleware)
      .forRoutes(PageViewController); // 为 BeaconController 应用中间件
  }
}
