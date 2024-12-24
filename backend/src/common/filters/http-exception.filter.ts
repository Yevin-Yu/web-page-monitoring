import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: QueryFailedError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = '请求失败';

        if (exception instanceof HttpException) { 
            status = exception.getStatus();
            const responseBody = exception.getResponse();

            // 检查 responseBody 的类型
            if (typeof responseBody === 'string') {
                message = responseBody; // 如果是字符串，直接赋值
            } else {
                // 如果是对象，提取 message 字段
                message = (responseBody as any).message || '请求失败';
            }
        } 
    
        response.status(status).json({
            code: 0,
            message: message,
            data: null,
        });
    }
}
