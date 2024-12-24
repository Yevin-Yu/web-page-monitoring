import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PageView {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  browser: string;

  @Column()
  ip: string;

  @Column()
  url: string;

  @Column()
  referrer: string;

  @Column()
  timestamp: Date;
}
