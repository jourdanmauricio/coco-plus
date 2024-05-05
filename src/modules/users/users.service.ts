import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findAll() {
    const corworking = await this.usersRepository.find({
      relations: ['coworkings', 'employee', 'employee.company'],
    });
    return corworking;
  }

  async findByEmail(email: string): Promise<Users> {
    const user = await this.usersRepository.findOneBy({ email });
    return user;
  }

  async findOne(id: UUID): Promise<Users> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['coworkings', 'employee', 'employee.company'],
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async create(user: CreateUserDto) {
    const newUser = this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }

  async update(id: UUID, data: UpdateUserDto) {
    const user = await this.findOne(id);
    if (data.password) {
      const hashedPass = await bcrypt.hash(data.password, 10);
      data = { ...data, password: hashedPass };
    }
    const updUser = this.usersRepository.merge(user, data);
    return this.usersRepository.save(updUser);
  }

  async remove(id: UUID) {
    const user = await this.findOne(id);
    await this.usersRepository.delete(user.id);
    return id;
  }
}
