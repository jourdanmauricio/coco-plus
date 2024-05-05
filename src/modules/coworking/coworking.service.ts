import { Injectable } from '@nestjs/common';
import { CreateCoworkingDto, UpdateCoworkingDto } from './coworking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Coworking } from 'src/entities/coworking.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { CreateUserDto } from '../users/user.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class CoworkingService {
  constructor(
    @InjectRepository(Coworking)
    private coworkingRepository: Repository<Coworking>,
    private readonly authService: AuthService,
  ) {}

  async findAll() {
    const corworking = await this.coworkingRepository.find();
    return corworking;
  }

  async findOne(id: UUID) {
    const coworking = await this.coworkingRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    return coworking;
  }

  async create(data: CreateCoworkingDto) {
    const newCoworking = this.coworkingRepository.create(data);
    return await this.coworkingRepository.save(newCoworking);
  }

  async createUser(id: UUID, data: CreateUserDto) {
    const newUser = await this.authService.signup(data);

    const changes = { status: 'active', user: [newUser] };
    const updCowork = await this.update(id, changes);

    return updCowork;
  }

  async ativateCoworking(id: UUID, data: CreateUserDto) {
    // Creo usuario Admin Cowork
    const newUser = await this.authService.signup(data);

    // ENVIAR EMAIL !!!!

    // Activo coworking
    const changes = { status: 'active', user: [newUser] };
    const updCowork = await this.update(id, changes);

    return updCowork;
  }

  async update(id: UUID, changes: UpdateCoworkingDto) {
    const coworking = await this.findOne(id);
    const updCoworking = this.coworkingRepository.merge(coworking, changes);
    return this.coworkingRepository.save(updCoworking);
  }

  remove(id: number) {
    return `This action removes a #${id} coworking`;
  }
}
