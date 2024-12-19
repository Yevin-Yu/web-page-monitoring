import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

@Injectable()
export class LoggerService {
  private logger: winston.Logger;

  constructor() {
    const transport = new winston.transports.DailyRotateFile({
      filename: 'logs/%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    });

    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf((info) => {
          return `===========\n[${info.timestamp}][${info.level}]\n${info.message}\n===========\n`;
        })
      ),
      transports: [transport],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string) {
    this.logger.error(message);
  }

  // 其他日志方法...
}
