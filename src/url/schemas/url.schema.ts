import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UrlsDocument = Urls & Document;

@Schema()
export class Urls {
    @Prop({unique: true})
    shortener: string;

    @Prop({ required: true})
    url: string;

    @Prop({ required: true})
    created_at: Date;

    @Prop({ required: true})
    created_by: string
}

export const UrlSchema = SchemaFactory.createForClass(Urls);