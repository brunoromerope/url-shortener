import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { UrlService } from './url/url.service';
import { UrlDto } from './url/dto/create-url.dto';
import { ShortenedDto } from './url/dto/find-url.dto';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('url')
@ApiBearerAuth()
@ApiResponse({ status: 401, description: 'Unauthorized'})
@Controller()
export class AppController {
  constructor(private readonly urlService: UrlService) {}

  @UseGuards(JwtAuthGuard)
  @Post('encode')
  encode(@Body() urlString: UrlDto, @Request() req): Promise<ShortenedDto> {
    return this.urlService.encode(urlString, req);
  }

  @UseGuards(JwtAuthGuard)
  @Post('decode')
  @ApiResponse({ status: 404, description: 'SHORTENER_NOT_FOUND'})
  decode(@Body() encodedString: ShortenedDto, @Request() req): Promise<UrlDto> {
    return this.urlService.decoded(encodedString, req);
  }

}
