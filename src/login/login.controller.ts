import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggedUserDto } from './dto/loggedUser.dto';

@ApiTags('login')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @ApiResponse({ status: 400, description: 'Bad Request'})
  @ApiResponse({ status: 404, description: 'USER_NOT_FOUND'})
  @ApiResponse({ status: 403, description: 'PASSWORD_INCORRECT'})
  login(@Body() loginUser: LoginDto): Promise<LoggedUserDto>{
    return this.loginService.login(loginUser);
  }

  
}
