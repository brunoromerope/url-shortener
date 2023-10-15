import { IsNotEmpty } from "class-validator";

export class CreateUrlDto {
    @IsNotEmpty()
    url: string;
}