import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }) // 确保用户名唯一
  email: string;

  @Column()
  password: string; // 在实际应用中，密码应该加密存储
}
