import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Url, UrlSchema } from '../schema/url.schema';
import { User, UserSchema } from '../schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UrlController],
  providers: [UrlService],
})
export class UrlModule {}
