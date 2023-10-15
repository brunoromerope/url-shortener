import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UrlService } from './url/url.service';

@Injectable()
export class AppService {
    constructor(
        private readonly configService: ConfigService,
        private readonly ulrService: UrlService
        ) {}

    getPort(): number {
        return this.configService.get<number>('PORT') | 3000;
    }

    async redirect(shortener: string): Promise<string> {
        
        const { url } = await this.ulrService.decoded({shortener: shortener}, true);
        
        return url;
    }
}
