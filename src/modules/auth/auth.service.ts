import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from '../users/user.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signin(credentials: LoginUserDto) {
    const { email, password } = credentials;

    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credenttials');

    const matchPass = await bcrypt.compare(password, user.password);

    if (!matchPass) throw new UnauthorizedException('Invalid credenttials');

    const userPayload = {
      sub: user.id,
      id: user.id,
      email: user.email,
      roles: user.role,
    };

    const token = this.jwtService.sign(userPayload);
    return { user, token };
  }

  async signup(data: CreateUserDto) {
    const dbUser = await this.usersService.findByEmail(data.email);
    if (dbUser) throw new BadRequestException('Email is already in use');

    // const password = Math.random().toString(36).slice(-8);
    const password = 'coco_1234';
    const hashedPass = await bcrypt.hash(password, 10);
    if (!hashedPass)
      throw new BadRequestException('Password could not be hashed');

    return await this.usersService.create({
      ...data,
      password: hashedPass,
    });
  }
}
