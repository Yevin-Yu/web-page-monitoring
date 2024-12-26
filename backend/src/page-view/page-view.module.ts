import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageView } from './page-view.entity';
import { PageViewService } from './page-view.service';
import { PageViewController } from './page-view.controller';
import { TextPlainMiddleware } from '../common/interceptors/text-plain.middleware'; // 导入中间件
@Module({
  imports: [TypeOrmModule.forFeature([PageView])],
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
