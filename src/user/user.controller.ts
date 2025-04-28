import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserLoginDto } from './dto/user-login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() userSignupDto: UserSignupDto) {
    return this.userService.signup(userSignupDto);
  }

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    return this.userService.login(userLoginDto);
  }
}
