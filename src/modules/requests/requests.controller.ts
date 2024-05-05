import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import {
  CreateRequestCompanyDto,
  CreateRequestCoworkingDto,
  UpdateRequestCompanyDto,
} from './requests.dto';
import { UUID } from 'crypto';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Get()
  findAll() {
    return this.requestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.requestsService.findOne(id);
  }

  @Post('company')
  createCompany(@Body() data: CreateRequestCompanyDto) {
    return this.requestsService.create(data);
  }

  @Post('coworking')
  createCoworking(@Body() data: CreateRequestCoworkingDto) {
    return this.requestsService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: UUID,
    @Body() updateRequestDto: UpdateRequestCompanyDto,
  ) {
    return this.requestsService.update(id, updateRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: UUID) {
    return this.requestsService.remove(+id);
  }
}
