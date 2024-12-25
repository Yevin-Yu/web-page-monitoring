import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PageView {
  // 主键
  @PrimaryGeneratedColumn()
  id: number;

  // 访问者唯一标识
  @Column()
  visitor_id: string;

  // key_code
  @Column()
  code: string;

  // 页面URL
  @Column()
  url: string;

  // 页面Title
  @Column()
  title: string;

  // 访问IP
  @Column()
  ip: string;

  // 访问地区
  @Column()
  region: string;

  // 来源
  @Column()
  referrer: string;

  // 访问时间
  @Column()
  visit_time: Date;

  // 页面关闭时间 
  @Column()
  close_time: Date;

  // 访问时长
  @Column()
  visit_duration: number;

  // 访问设备
  @Column()
  user_agent: string;
}
