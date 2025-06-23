import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Url } from '../schema/url.schema';
import { Model } from 'mongoose';
import { UrlDto } from './dto/url.dto';
import axios from 'axios';

@Injectable()
export class UrlService {
  constructor(@InjectModel(Url.name) private urlModel: Model<Url>) {}

  async checkUrl(urlDto: UrlDto, userId: string) {
    const { url } = urlDto;
    const user = userId;

    const existingUrl = await this.urlModel.findOne({ url });

    if (existingUrl) {
      return { existingUrl };
    }

    return this.checkUrlAndCreate(url, user);
  }

  async checkUrlAndCreate(url: string, userId: string) {
    const response = await axios.post('http://127.0.0.1:8000/detect/', { url });
    const isPhishing = response.data.prediction;

    const newUrl = new this.urlModel({
      url,
      status: isPhishing,
      createdBy: userId,
    });

    return await newUrl.save();
  }
}
