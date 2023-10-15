import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignedUserDto {
    
    @IsNotEmpty()
    readonly _id: string;

    @IsEmail()
    readonly email: string;
    
    
}