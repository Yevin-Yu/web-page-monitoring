import { Controller, Post, Body } from '@nestjs/common';
import { PageViewService } from './page-view.service';

@Controller('page-view')
export class PageViewController {
    constructor(private readonly pageViewService: PageViewService) { }

    @Post()
    async logPageView(@Body() body: { code: string; browser: string; ip: string; url: string; referrer: string }) {
        const { code, browser, ip, url, referrer } = body;
        await this.pageViewService.logPageView(code, browser, ip, url, referrer);
    }
}
