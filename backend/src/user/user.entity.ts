import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }) // 确保用户名唯一
  email: string;

  @Column()
  password: string; // 在实际应用中，密码应该加密存储

  // 创建时间
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // 默认值为当前时间
  created_at: Date;

  // 最后修改时间
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // 默认值为当前时间
  last_modified: Date;

  // 最后登录时间
  @Column({ type: 'timestamp', nullable: true }) // 可以为空
  last_login: Date;
}
