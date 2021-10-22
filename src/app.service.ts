import { Injectable } from '@nestjs/common';
import { Url } from './url.entity';
import { customAlphabet } from 'nanoid';
import { isUri } from 'valid-url';
import { UrlService } from './url.service';



@Injectable()
export class AppService {
  constructor(
    private readonly urlService: UrlService
  ) {}
  async getLongUrl(id: string): Promise<string|undefined> {
    const result = await this.urlService.findOne(id)
    if(result) {
      console.log(result.longUrl)
      return result.longUrl
    }
    return undefined;
  }


  async getViews(id: string): Promise<number|undefined> {
    const result = await this.urlService.findOne(id)
    if(result)
      return result.views
    return undefined;
  }


  async incrementViews(id: string){
    await this.urlService.incrementById(id)
  }
  async createUrl(urlToShorten: string): Promise<{ status: string, shortenedUrl?: string }>{
    if (!isUri(urlToShorten))
      return { status: 'Invalid URL' };
    const nanoid = customAlphabet('1234567890abcdef', 8);
    const id = nanoid();
    const url = new Url(id, urlToShorten);
    await url.save();
    return { status: 'Created', shortenedUrl: id };
  }
}
