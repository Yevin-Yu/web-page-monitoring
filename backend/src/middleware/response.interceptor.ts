import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return {
          code: 1,
          message: '成功',
          data: data || null,
        };
      }),
      catchError((error) => {
        // 处理错误
        const response = {
          code: 0,
          message: error.message || '发生错误',
          data: null,
        };

        // 如果是 HttpException，获取状态码
        if (error instanceof HttpException) {
          const status = error.getStatus();
          return throwError(() => new HttpException(response, 200));
        }
        // 其他错误，返回 500 状态码
        return throwError(() => new HttpException(response, 500));
      }),
    );
  }
}
