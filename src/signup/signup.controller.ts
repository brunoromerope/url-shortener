import { Body, Controller, Post } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupDto } from './dto/signup.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignedUserDto } from './dto/signedUser.dto';

@ApiTags('signup')
@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post()
  @ApiResponse({ status: 400, description: 'Bad Request'})
  @ApiResponse({ status: 422, description: 'DUPLICATED_KEY'})
  signUp(@Body() signupUser: SignupDto): Promise<SignedUserDto> {
    return this.signupService.signup(signupUser);
  }
}
