import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
    
    @IsNotEmpty()
    readonly _id: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    
}