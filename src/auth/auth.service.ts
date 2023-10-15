import { HttpException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/user.schema';
import { Model } from 'mongoose';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Users.name) private userModel: Model<Users>,
        private jwtService: JwtService
        ) {}

    async login(loginUserDto: LoginDto): Promise<any> {
        const { email, password } = loginUserDto;
        
        const findUser = await this.userModel.findOne({email});
        if(!findUser) throw new HttpException('USER_NOT_FOUND', 404);

        const checkPassword = await compare(password, findUser.password);
        if(!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403);

        const payload = {
            id: findUser._id,
            email: findUser.email
        }

        const token = this.jwtService.sign(payload);

        const data = {
            user: findUser,
            token,
        }

        return data;
    }

    async signup(registerUserDto: LoginDto): Promise<any> {

        try{
            const { password } = registerUserDto;
            const plainToHash = await hash(password, 10);
            registerUserDto = {
                ...registerUserDto,
                password: plainToHash
            }

            return await this.userModel.create(registerUserDto);
        }catch(err){
            if(err.code === 11000) {
                throw new HttpException('DUPLICATED_KEY', 422)
            }
            throw err;
        }
    }
}
