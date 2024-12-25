import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PageView } from './page-view.entity';

@Injectable()
export class PageViewService {
  constructor(
    @InjectRepository(PageView)
    private readonly pageViewRepository: Repository<PageView>,
  ) { }

  // 记录页面访问
  async logPageView(pageView: PageView): Promise<string> {
    if (!pageView.code) {
      throw new BadRequestException('keyCode错误');
    }
    // 验证 code 是否存在
    const codeExists = await this.pageViewRepository.query(
      `SELECT COUNT(*) as count FROM key_code WHERE code = ?`,
      [pageView.code]
    );
    if (!codeExists[0].count) {
      throw new BadRequestException('keyCode错误');
    }
    // 检查是否存在pageView.code的表
    const tableName = pageView.code.replace(/[^a-zA-Z0-9_]/g, ''); // 确保表名安全
    const tableExists = await this.pageViewRepository.query(
      `SHOW TABLES LIKE ?`,
      [tableName]
    );
    // 如果不存在则创建 
    if (tableExists.length === 0) {
      // 如果表不存在，则创建表
      await this.pageViewRepository.query(
        `CREATE TABLE ${tableName} (
            id INT AUTO_INCREMENT PRIMARY KEY,
            visitor_id VARCHAR(255),
            code VARCHAR(255),
            url VARCHAR(255),
            title VARCHAR(255),
            ip VARCHAR(45),
            region VARCHAR(100),
            referrer VARCHAR(255),
            visit_time DATETIME,
            close_time DATETIME,
            visit_duration INT,
            user_agent VARCHAR(255)
          )`
      );
    }

    // 如果存在则插入数据 插入数据到动态表
    await this.pageViewRepository.query(
      `INSERT INTO ${tableName} (visitor_id, code, url, title, ip, region, referrer, visit_time, close_time, visit_duration, user_agent) VALUES (?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?)`,
      [
        pageView.visitor_id,
        pageView.code,
        pageView.url,
        pageView.title,
        pageView.ip,
        pageView.region,
        pageView.referrer,
        pageView.visit_time,
        pageView.close_time,
        pageView.visit_duration,
        pageView.user_agent
      ]
    );
    return '数据已保存'
  }

  // 更新页面访问时间
  async updatePageViewTime(visitor_id: string, code: string, close_time: string): Promise<string> {
    if (!code) {
      throw new BadRequestException('keyCode错误');
    }
    // 验证 code 是否存在
    const codeExists = await this.pageViewRepository.query(
      `SELECT COUNT(*) as count FROM key_code WHERE code = ?`,
      [code]
    );
    if (!codeExists[0].count) {
      throw new BadRequestException('keyCode错误');
    }
    // 检查是否存在pageView.code的表
    const tableName = code.replace(/[^a-zA-Z0-9_]/g, ''); // 确保表名安全
    const tableExists = await this.pageViewRepository.query(
      `SHOW TABLES LIKE ?`,
      [tableName]
    );
    if (tableExists.length === 0) {
      throw new BadRequestException('未找到对应数据');
    }
    // 获取该条数据
    const data = await this.pageViewRepository.query(
      `SELECT * FROM ${tableName} WHERE visitor_id = ?`,
      [visitor_id]
    )
    // 获取数据时间 减去 当前时间 /秒
    const duration = Math.floor((new Date(close_time).getTime() - new Date(data[0].visit_time).getTime()) / 1000)

    // 更新数据到动态表
    await this.pageViewRepository.query(
      `UPDATE ${tableName} SET visit_duration = ?,close_time=? WHERE visitor_id = ?`,
      [duration, close_time, visitor_id]
    )

    return '数据已更新'
  }
}
