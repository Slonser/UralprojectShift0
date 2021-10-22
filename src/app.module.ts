import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { Url } from './url.entity';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UrlModule } from './url.module'



@Module({
  imports: [
    UrlModule,
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.dev`]
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject: [ConfigService],
      useFactory: async(configService: ConfigService) => {
        return {
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          type: 'postgres',
          logging: true,
          synchronize: true,
          entities: [Url]
        };
      }
,
    }),
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
