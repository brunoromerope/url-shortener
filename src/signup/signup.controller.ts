import { Body, Controller, Post } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupDto } from './dto/signup.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('signup')
@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post()
  signUp(@Body() signupUser: SignupDto) {
    return this.signupService.signup(signupUser);
  }
}
