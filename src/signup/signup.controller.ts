import { Body, Controller, Post } from '@nestjs/common';
import { SignupService } from './signup.service';
import { SignupDto } from './dto/signup.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignedUserDto } from './dto/signedUser.dto';

@ApiTags('Signup')
@Controller('signup')
export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  @Post()
  @ApiResponse({ status: 400, description: 'Bad Request'})
  @ApiResponse({ status: 422, description: 'DUPLICATED_KEY'})
  @ApiOperation({ summary: 'Signs user into the system'})
  signUp(@Body() signupUser: SignupDto): Promise<SignedUserDto> {
    return this.signupService.signup(signupUser);
  }
}
