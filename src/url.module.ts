import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlService } from './url.service';
import { Repository } from 'typeorm';
import { Url } from './url.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Url])],
  providers: [UrlService],
  exports: [UrlService]
})
export class UrlModule {}