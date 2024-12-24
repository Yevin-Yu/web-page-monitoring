import { Controller, Get, Post, Body, Param, Put, Delete, Headers } from '@nestjs/common';
import { KeyCodeService } from './key-code.service';
import { KeyCode } from '../key-code.entity';

@Controller('keycode')
export class KeyCodeController {
    constructor(private readonly keyCodeService: KeyCodeService) { }

    @Post('/create')
    create(
        @Body() body: { name: string },
        @Headers() headers: Record<string, string>
    ): Promise<string> {
        const code: KeyCode = new KeyCode();
        code.name = body.name;
        return this.keyCodeService.createKeyCode(code, headers);
    }

    // 查看当前用户的所有keycode
    @Get('/list')
    list(@Headers() headers: Record<string, string>): Promise<KeyCode[]> {
        return this.keyCodeService.getKeyCodes(headers);
    }

    // 修改项目名称 或者 修改是否禁用
    @Post('/update')
    update(
        @Body() body: { id: string, name?: string, is_active?: boolean },
        @Headers() headers: Record<string, string>
    ): Promise<string> {
        return this.keyCodeService.updateKeyCode(body, headers);
    }

    // 删除项目
    @Post('/delete')
    delete(
        @Body() body: { id: string },
        @Headers() headers: Record<string, string>
    ): Promise<string> {
        return this.keyCodeService.deleteKeyCode(body, headers);
    }
}
``
