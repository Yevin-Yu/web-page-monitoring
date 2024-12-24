// src/keyCode/keyCode.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';
import { randomBytes } from 'crypto';

@Entity()
export class KeyCode {
  @PrimaryGeneratedColumn()
  id: number;
  // 项目名称
  @Column()
  name: string;

  // code 自动生成 16位 字母数字
  @Column({ unique: true })
  code: string;

  // 用户id
  @Column()
  userId: number;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // 在插入之前调用 generateKeyCode 方法生成 code
  @BeforeInsert()
  generateKeyCode() {
    this.code = this.generateRandomString(16);
  }

  // 生成指定长度的随机字符串
  private generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const charactersLength = characters.length;
    const randomValues = randomBytes(length);
    return Array.from(randomValues)
      .map(byte => characters[byte % charactersLength])
      .join('');
  }
}
