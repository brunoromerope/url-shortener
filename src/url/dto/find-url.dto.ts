import { IsNotEmpty } from "class-validator";

export class ShortenedDto {
    @IsNotEmpty()
    shortener: string;
}