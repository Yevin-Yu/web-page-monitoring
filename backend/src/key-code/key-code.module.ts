import { Module } from '@nestjs/common';
import { KeyCodeService } from './key-code/key-code.service';
import { KeyCodeController } from './key-code/key-code.controller';
import { KeyCode } from './key-code.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    TypeOrmModule.forFeature([KeyCode]),// 确保导入 KeyCode 实体
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [KeyCodeService],
  controllers: [KeyCodeController]
})
export class KeyCodeModule { }
