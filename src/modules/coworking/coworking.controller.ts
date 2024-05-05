import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CoworkingService } from './coworking.service';
import { CreateCoworkingDto, UpdateCoworkingDto } from './coworking.dto';
import { UUID } from 'crypto';
import { CreateUserDto } from '../users/user.dto';

@Controller('coworking')
export class CoworkingController {
  constructor(private readonly coworkingService: CoworkingService) {}

  @Get()
  findAll() {
    return this.coworkingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.coworkingService.findOne(id);
  }

  // Crea coworking (desde landing)
  @Post()
  create(@Body() data: CreateCoworkingDto) {
    return this.coworkingService.create(data);
  }

  // Crea user con role coworking desde dashboard coworking (user admin)
  @Post('user/:id')
  createUser(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() data: CreateUserDto,
  ) {
    return this.coworkingService.createUser(id, data);
  }

  // Activa cowork y crea user role: adminCoworking desde dashboard superadmin Coco+
  @Put('activate/:id')
  async ativateCoworking(
    @Param('id', ParseUUIDPipe) id: UUID,
    @Body() data: CreateUserDto,
  ) {
    const updCoworking = await this.coworkingService.ativateCoworking(id, data);
    return updCoworking;
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: UUID,
    @Body() changes: UpdateCoworkingDto,
  ) {
    return this.coworkingService.update(id, changes);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coworkingService.remove(+id);
  }
}
