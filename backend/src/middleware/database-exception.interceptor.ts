import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
  } from '@nestjs/common';
  import { Response } from 'express';
  import { QueryFailedError } from 'typeorm'; // 如果你使用 TypeORM
  
  @Catch(QueryFailedError)
  export class DatabaseExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
  
      let status = HttpStatus.BAD_REQUEST;
      let message = '数据库错误';
  
      response.status(status).json({
        code: 0,
        message: message,
        data: null,
      });
    }
  }
  