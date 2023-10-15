import { IsNotEmpty } from "class-validator";

export class FindUrlDto {
    @IsNotEmpty()
    shortener: string;
}