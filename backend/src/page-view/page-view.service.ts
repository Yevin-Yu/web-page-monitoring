import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageView } from './page-view.entity';

@Injectable()
export class PageViewService {
  constructor(
    @InjectRepository(PageView)
    private readonly pageViewRepository: Repository<PageView>,
  ) {}

  async logPageView(code: string, browser: string, ip: string, url: string, referrer: string): Promise<void> {
    try {
      // 检查表是否存在
      const tableExists = await this.checkIfTableExists(code);
      
      if (!tableExists) {
        // 创建表
        await this.createTable(code);
      }

      // 插入数据到动态表
      await this.pageViewRepository.query(`
        INSERT INTO ${code} (code, browser, ip, url, referrer, timestamp) 
        VALUES (?, ?, ?, ?, ?, ?);
      `, [code, browser, ip, url, referrer, new Date()]);
    } catch (error) {
      console.error('Error saving page view:', error);
    }
  }

  private async checkIfTableExists(code: string): Promise<boolean> {
    const result = await this.pageViewRepository.query(`
      SELECT COUNT(*) AS count 
      FROM information_schema.tables 
      WHERE table_schema = DATABASE() 
      AND table_name = '${code}';
    `);
    return result[0].count > 0;
  }

  private async createTable(code: string): Promise<void> {
    // 创建表的 SQL 语句
    await this.pageViewRepository.query(`
      CREATE TABLE ${code} (
        id INT AUTO_INCREMENT PRIMARY KEY,
        code VARCHAR(255),
        browser VARCHAR(255),
        ip VARCHAR(255),
        url TEXT,
        referrer TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }
}
