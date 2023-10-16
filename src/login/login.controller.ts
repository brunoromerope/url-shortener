import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoggedUserDto } from './dto/loggedUser.dto';

@ApiTags('Login')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @ApiResponse({ status: 400, description: 'Bad Request'})
  @ApiResponse({ status: 404, description: 'USER_NOT_FOUND'})
  @ApiResponse({ status: 403, description: 'PASSWORD_INCORRECT'})
  @ApiOperation({ summary: 'Logs user into the system'})
  login(@Body() loginUser: LoginDto): Promise<LoggedUserDto>{
    return this.loginService.login(loginUser);
  }

  
}
