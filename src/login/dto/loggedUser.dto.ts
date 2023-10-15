import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserDto } from './user.dto';

export class LoggedUserDto {
    
    @IsNotEmpty()
    readonly user: UserDto;
    
    @IsNotEmpty()
    readonly token: string;
    
}