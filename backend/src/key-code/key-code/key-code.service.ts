import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KeyCode } from '../key-code.entity';
import { verifyLogin } from '../../auth/auth.utils';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class KeyCodeService {
    constructor(
        @InjectRepository(KeyCode)
        private keyCodeRepository: Repository<KeyCode>,
        private readonly jwtService: JwtService
    ) { }

    // 创建keyCode
    async createKeyCode(
        code: KeyCode,
        headers: Record<string, string>
    ): Promise<string> {
        // 用户名 不能为空 且唯一
        if (!code.name) {
            throw new BadRequestException('项目名称不能为空');
        }
        if (await this.keyCodeRepository.findOne({ where: { name: code.name } })) {
            throw new BadRequestException('项目名称已存在')
        }
        // 获取userId 添加到keyCode中
        const user = await verifyLogin(headers, this.jwtService, false);
        code.userId = parseInt(user.id);
        // 保存keyCode
        const keyCode = this.keyCodeRepository.create(code);
        await this.keyCodeRepository.save(keyCode);
        return '创建成功';
    }

    // 获取keyCode
    async getKeyCodes(
        headers: Record<string, string>
    ): Promise<KeyCode[]> {
        const user = await verifyLogin(headers, this.jwtService, false);
        if (user.id) {
            return this.keyCodeRepository.find({ where: { userId: parseInt(user.id) }, select: ['id', 'name', 'code', 'is_active', 'created_at', 'updated_at'] });
        } else {
            throw new BadRequestException('用户不存在');
        }
    }

    // 修改keyCode  name 或者 is_active
    async updateKeyCode(
        body: { id: string, name?: string, is_active?: boolean },
        headers: Record<string, string>
    ): Promise<string> {
        if (!body.id) {
            throw new BadRequestException('id不能为空');
        }
        if (!body.name && !body.is_active) {
            throw new BadRequestException('修改内容不能为空');
        }
        const user = await verifyLogin(headers, this.jwtService, false);
        const keyCode = await this.keyCodeRepository.findOne({ where: { id: parseInt(body.id), userId: parseInt(user.id) } });
        if (!keyCode) {
            throw new BadRequestException('修改数据不存在');
        } else {
            if (body.name) {
                keyCode.name = body.name;
            }
            if (body.is_active !== undefined) {
                keyCode.is_active = body.is_active;
            }
            await this.keyCodeRepository.save(keyCode);
            return '修改成功';
        }
    }

    // 删除keyCode
    async deleteKeyCode(
        body: { id: string },
        headers: Record<string, string>
    ): Promise<string> {
        if (!body.id) {
            throw new BadRequestException('id不能为空');
        }
        const user = await verifyLogin(headers, this.jwtService, false);
        const keyCode = await this.keyCodeRepository.findOne({ where: { id: parseInt(body.id), userId: parseInt(user.id) } });
        if (!keyCode) {
            throw new BadRequestException('删除数据不存在');
        } else {
            await this.keyCodeRepository.delete(keyCode.id);
            return '删除成功';
        }
    }
}
