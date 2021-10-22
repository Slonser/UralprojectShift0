import { Injectable } from '@nestjs/common';
import { Url } from './url.entity';
import { getConnection } from 'typeorm';

@Injectable()
export class UrlService {
  async findOne(id: string): Promise<Url> {
    return await getConnection()
      .createQueryBuilder()
      .select("Url")
      .from(Url,"Url")
      .where('Url.id = :id', { id: id })
      .getOne();
  }

  async incrementById(id: string) {
    await getConnection()
      .createQueryBuilder()
      .update(Url)
      .where('id = :id', { id: id })
      .set({ views: () => 'views + 1' })
      .execute();
  }
}
