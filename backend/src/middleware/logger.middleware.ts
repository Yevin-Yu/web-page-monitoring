// src/middleware/logger.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) { }

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url } = req;
    const start = Date.now();

    // 保存原始的 res.send 方法
    const originalSend = res.send;

    // 重写 res.send 方法,在发送响应之前记录响应数据
    res.send = (...args) => {
      const responseData = args[0];
      const logMessage = {
        ip: req.ip,
        body: req.body || req.query,
        method,
        url,
        statusCode: res.statusCode,
        duration: Date.now() - start,
        response: responseData,
      };
      const logMessageString = `[ip:${logMessage.ip}] [method:${logMessage.method}] [url:${logMessage.url}] [statusCode:${logMessage.statusCode}] [duration:${logMessage.duration}]\n[body:${JSON.stringify(logMessage.body)}]\n[response:${JSON.stringify(logMessage.response)}]`;
      this.loggerService.log(logMessageString);
      // 调用原始的 res.send 方法发送响应
      return originalSend.apply(res, args);
    };

    next();
  }
}
