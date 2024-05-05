import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  // UseGuards,
  Req,
  ForbiddenException,
  // Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UUID } from 'crypto';
// import { AuthGuard } from './../../guards/auth.guard';
import { Role } from 'src/models/roles.enum';

@Controller('users')
// @UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('profile')
  //getProfile(@Req() request) {
  getProfile(@Param('id', ParseUUIDPipe) id: UUID) {
    // const user = request.user;
    // return this.usersService.findOne(user.id);
    return this.usersService.findOne(id);
  }

  @Get(':id')
  // @Roles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  getUserById(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() user: CreateUserDto, @Req() request) {
    if (request.user.role === Role.EMPLOYEE)
      throw new ForbiddenException(
        'You do not have permission and are not allowed to access this route',
      );
    if (request.user.role === Role.ADMIN_COMPANY && user.role !== Role.EMPLOYEE)
      throw new ForbiddenException(
        'You do not have permission and are not allowed to access this route',
      );

    if (
      request.user.role === Role.ADMIN_COWORKING &&
      user.role !== Role.COWORKING
    )
      throw new ForbiddenException(
        'You do not have permission and are not allowed to access this route',
      );

    return this.usersService.create(user);
  }

  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: UUID, @Body() payload: UpdateUserDto) {
    return this.usersService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: UUID) {
    return this.usersService.remove(id);
  }
}
