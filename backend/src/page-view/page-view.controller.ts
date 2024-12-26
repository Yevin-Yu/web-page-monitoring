import { Controller, Post, Body, Req, Get, Headers } from '@nestjs/common';
import { PageViewService } from './page-view.service';
import { PageView } from './page-view.entity';
import { Request } from 'express';
import { Code } from 'typeorm';
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

    // code 获取页面访问记录 
    @Post('list')
    async getPageViewList(
        @Body() body: {
            code: string;
            page_index: number;
            page_size: number;
        },
        @Headers() headers: Record<string, string>
    ) {
        const { code, page_index, page_size } = body
        return await this.pageViewService.getPageViewList(code, page_index, page_size, headers);
    }

    // 根据 id 删除页面访问记录
    @Post('delete')
    async deletePageView(
        @Body() body: {
            code: string,
            visitor_id: string;
        },
        @Headers() headers: Record<string, string>
    ) {
        const { code, visitor_id } = body
        return await this.pageViewService.deletePageView(code, visitor_id, headers);
    }
}
