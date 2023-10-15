import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UrlsDocument = Urls & Document;

@Schema()
export class Urls {
    @Prop({unique: true})
    shortener: string;

    @Prop()
    url: string;
}

export const UrlSchema = SchemaFactory.createForClass(Urls);