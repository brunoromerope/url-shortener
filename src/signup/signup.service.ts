import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from 'src/auth/schemas/user.schema';
import { SignupDto } from './dto/signup.dto';
import { Model } from 'mongoose';
import { hash } from 'bcryptjs';
import { SignedUserDto } from './dto/signedUser.dto';

@Injectable()
export class SignupService {
    constructor(
        @InjectModel(Users.name) private userModel: Model<Users>,
        ) {}
    
    async signup(registerUserDto: SignupDto): Promise<any> {
    
        try{
            const { password } = registerUserDto;
            const plainToHash = await hash(password, 10);
            registerUserDto = {
                ...registerUserDto,
                password: plainToHash
            }

            const newUser = await this.userModel.create(registerUserDto);

            const data = {
                _id: newUser._id,
                email: newUser.email
            }
    
            return data;

        }catch(err){
            if(err.code === 11000) {
                throw new HttpException('DUPLICATED_KEY', 422)
            }
            throw err;
        }
    }
}
