import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UrlService } from './url/url.service';
import { CreateUrlDto } from './url/dto/create-url.dto';
import { FindUrlDto } from './url/dto/find-url.dto';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('url')
@Controller()
export class AppController {
  constructor(private readonly urlService: UrlService) {}

  @UseGuards(JwtAuthGuard)
  @Post('encode')
  encode(@Body() urlString: CreateUrlDto): Promise<string> {
    return this.urlService.encode(urlString);
  }

  @UseGuards(JwtAuthGuard)
  @Post('decode')
  decode(@Body() encodedString: FindUrlDto): Promise<string> {
    return this.urlService.decoded(encodedString);
  }

}
