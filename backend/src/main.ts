import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 引入全局异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    origin: '*', // 允许的来源
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的 HTTP 方法
    credentials: true, // 是否允许携带凭证
  });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
