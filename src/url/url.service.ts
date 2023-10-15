import { Injectable } from '@nestjs/common';
import * as Base62 from 'base62/lib/ascii';
import { Urls, UrlsDocument } from './schemas/url.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUrlDto } from './dto/create-url.dto';
import { FindUrlDto } from './dto/find-url.dto';

@Injectable()
export class UrlService {
    constructor(@InjectModel(Urls.name) private urlsModel: Model<UrlsDocument>) {}


    async encode(originalUrl: CreateUrlDto): Promise<any> {
        const encodedString = Base62.encode(Date.now());
        const newUrl = await this.urlsModel.create({ shortener: encodedString, url: originalUrl.url}); 
        
        return { shortener: newUrl.shortener};
    }

    async decoded(shortenedUrl: FindUrlDto): Promise<any> {
        const findUrl = await this.urlsModel.findOne({shortener: shortenedUrl.shortener});

        return {url: findUrl.url};
    }
}
