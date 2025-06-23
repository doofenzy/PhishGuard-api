import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlDto } from './dto/url.dto';
import { AuthGuard } from 'src/guard/auth.guards';

@UseGuards(AuthGuard)
@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  async checkUrl(@Body() urlDto: UrlDto, @Req() req) {
    return this.urlService.checkUrl(urlDto, req.userId);
  }
}
