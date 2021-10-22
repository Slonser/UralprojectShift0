import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private AppService: AppService) {}
  @Post('shorten')
  async create(
    @Body() body: { urlToShorten: string },
  ): Promise<{ status: string; shortenedUrl?: string }> {
    return await this.AppService.createUrl(body.urlToShorten);
  }

  @Get(':id')
  async redirectFromShorten(
    @Param('id') id: string,
    @Res() res,
  ): Promise<{ status: string; redirectTo?: string }> {
    const longUrl = await this.AppService.getLongUrl(id)
    if (longUrl != undefined) {
      await this.AppService.incrementViews(id)
      const answer = { status: 'Found', redirectTo: longUrl };
      return res
        .set({ location: longUrl })
        .status(HttpStatus.MOVED_PERMANENTLY)
        .send(answer);
    }
    return res.send({ status: 'Not Found' });
  }

  @Get(':id/views')
  async getViews(@Param('id') id: string) {
    const views = await this.AppService.getViews(id)
    if (views != undefined)
      return { status: 'Found', viewCount: views };
    return { status: 'Not Found' };
  }
}
