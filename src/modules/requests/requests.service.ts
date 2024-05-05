import { Injectable } from '@nestjs/common';
import {
  CreateRequestCompanyDto,
  CreateRequestCoworkingDto,
  UpdateRequestCompanyDto,
} from './requests.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'src/entities/request.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private requestsRepository: Repository<Request>,
  ) {}

  async create(data: CreateRequestCompanyDto | CreateRequestCoworkingDto) {
    const newRquest = this.requestsRepository.create(data);
    return await this.requestsRepository.save(newRquest);
  }

  async findAll() {
    const requests = await this.requestsRepository.find();
    return requests;
  }

  async findOne(id: UUID) {
    const request = await this.requestsRepository.findOneBy({ id });
    return request;
  }

  async update(id: UUID, changes: UpdateRequestCompanyDto) {
    const request = await this.findOne(id);
    const updRequest = this.requestsRepository.merge(request, changes);
    return this.requestsRepository.save(updRequest);
  }

  remove(id: number) {
    return `This action removes a #${id} request`;
  }
}
