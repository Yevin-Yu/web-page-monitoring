// auth.utils.ts
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface UserToken {
    id: string;
    email: string;
}

export async function verifyLogin(headers: Record<string, string>, jwtService: JwtService, isLogger: boolean): Promise<UserToken> {
    const token = headers.authorization?.split(' ')[1];
    if (!token) {
        if (isLogger) return null
        throw new UnauthorizedException('登陆过期，请重新登陆');
    }

    let decoded = null;
    try {
        decoded = jwtService.verify(token);
    } catch (error) {
        if (isLogger) return null
        throw new UnauthorizedException('登陆过期，请重新登陆');
    }

    return {
        email: decoded.email,
        id: decoded.id,
    };
}
