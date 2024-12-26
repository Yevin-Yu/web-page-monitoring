import { Controller, Post, Body, Req } from '@nestjs/common';
import { PageViewService } from './page-view.service';
import { PageView } from './page-view.entity';
import { Request } from 'express';
@Controller('page-view')
export class PageViewController {
    constructor(private readonly pageViewService: PageViewService) { }
    // 记录页面访问
    @Post()
    async logPageView(
        @Body() body: {
            visitor_id: string;
            code: string;
            url: string;
            title: string;
            ip: string;
            region: string;
            referrer: string;
            visit_time: string;
            user_agent: string;
        },
        @Req() request: Request // 通过 @Req() 获取请求对象
    ) {
        const ip = request.headers['x-forwarded-for'] || request.ip 
        const pageView = new PageView();
        // 将 body 中的属性赋值给 pageView
        pageView.visitor_id = body.visitor_id;
        pageView.code = body.code;
        pageView.url = body.url;
        pageView.title = body.title;
        pageView.ip = ip.toLocaleString();
        pageView.region = body.region;
        pageView.referrer = body.referrer;
        pageView.visit_time = new Date(body.visit_time)
        pageView.user_agent = body.user_agent;
        // 记录页面访问
        return await this.pageViewService.logPageView(pageView);
    }
    // 更新页面访问时间内
    @Post('update')
    async updatePageViewTime(
        @Body() body: string
    ) {
        // 解析 body
        const { code, visitor_id, close_time } = JSON.parse(body)
        return await this.pageViewService.updatePageViewTime(code, visitor_id, close_time);
    }
    // 根据userID 和 code 获取页面访问记录
    
}
