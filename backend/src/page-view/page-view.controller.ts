import { Controller, Post, Body } from '@nestjs/common';
import { PageViewService } from './page-view.service';
import { PageView } from './page-view.entity';

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
        }
    ) {
        const pageView = new PageView();

        // 将 body 中的属性赋值给 pageView
        pageView.visitor_id = body.visitor_id;
        pageView.code = body.code;
        pageView.url = body.url;
        pageView.title = body.title;
        pageView.ip = body.ip;
        pageView.region = body.region;
        pageView.referrer = body.referrer;
        pageView.visit_time = new Date(body.visit_time)
        pageView.user_agent = body.user_agent;

        // 记录页面访问
        return await this.pageViewService.logPageView(pageView);
    }
    // 更新页面访问时间内
    @Post('update')
    async updatePageViewTime(@Body() body: { visitor_id: string, code: string, close_time: string }) {
        console.log(body)
        return await this.pageViewService.updatePageViewTime(body.visitor_id, body.code, body.close_time);
    }
}
