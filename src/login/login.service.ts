import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from 'src/auth/schemas/user.schema';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcryptjs';

@Injectable()
export class LoginService {
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
            _id: findUser._id,
            email: findUser.email
        }

        const token = this.jwtService.sign(payload);

        const data = {
            user: payload,
            token,
        }

        return data;
    }
}
