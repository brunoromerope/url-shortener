import { HttpException, Injectable } from '@nestjs/common';
import * as Base62 from 'base62/lib/ascii';
import { Urls, UrlsDocument } from './schemas/url.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UrlDto } from './dto/create-url.dto';
import { ShortenedDto } from './dto/find-url.dto';

@Injectable()
export class UrlService {
    constructor(@InjectModel(Urls.name) private urlsModel: Model<UrlsDocument>) {}


    async encode(originalUrl: UrlDto, req: any): Promise<any> {
        const encodedString = Base62.encode(Date.now());
        
        const newUrl = await this.urlsModel.create(
            { 
                shortener: encodedString, 
                url: originalUrl.url,
                created_at: new Date(),
                created_by: req.user.id
            }
        ); 
        
        return { shortener: newUrl.shortener};
    }

    async decoded(shortenedUrl: ShortenedDto, req: any): Promise<any> {
        const findUrl = await this.urlsModel.findOne({shortener: shortenedUrl.shortener});
        if(!findUrl) throw new HttpException('SHORTENER_NOT_FOUND', 404);

        return {url: findUrl.url};
    }
}
