import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto, UpdateEmployeeDto } from './employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employees } from 'src/entities/employees.entity';
import { UUID } from 'crypto';
import { AuthService } from '../auth/auth.service';
import { CompaniesService } from '../companies/companies.service';
import { CreateUserDto } from '../users/user.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employees)
    private usersRepository: Repository<Employees>,
    private readonly authService: AuthService,
    private readonly companiesService: CompaniesService,
  ) {}

  async findAll() {
    const employees = await this.usersRepository.find();
    return employees;
  }

  async findOne(id: UUID) {
    const employees = await this.usersRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    return employees;
  }

  async create(data: CreateUserDto & CreateEmployeeDto) {
    // Crear usuario "employee"
    const user = {
      name: data.name,
      lastname: data.lastname,
      identification: data.identification,
      email: data.email,
      role: data.role,
    };

    const newUser = await this.authService.signup(user);
    // busar company
    const company = await this.companiesService.findOne(data.companyId);
    // Crear employee

    const employee = {
      position: data.position,
      passes: data.passes,
      passesAvailable: data.passesAvailable,
      status: 'active',
      companyId: company.id as UUID,
      company: company,
      user: newUser,
    };

    const newEmployee = this.usersRepository.create(employee);
    return await this.usersRepository.save(newEmployee);
  }

  update(id: number, changes: UpdateEmployeeDto) {
    return `This action updates a #${id} ${changes} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
