import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../users/user.dto';
// import { CreateEmployeeDto } from '../employees/employee.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // // role(adminCompañy)
  // @Post('signup/employee')
  // signupEmployee(@Body() user: CreateUserDto & CreateEmployeeDto) {
  //   return this.authService.signup(user);
  // }

  // // role(adminCoworking)
  // @Post('signup/coworking')
  // signupCoworking(@Body() data: CreateUserDto) {
  //   return this.authService.signup(data);
  // }

  @Post('signin')
  signin(@Body() credentials: LoginUserDto) {
    return this.authService.signin(credentials);
  }
}
