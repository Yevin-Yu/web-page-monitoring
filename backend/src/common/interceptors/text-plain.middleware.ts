import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TextPlainMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (req.is('text/plain')) {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString(); // 将数据块拼接成字符串
            });
            req.on('end', () => {
                req.body = body; // 将解析后的数据赋值给 req.body
                next();
            });
        } else {
            next();
        }
    }
}
