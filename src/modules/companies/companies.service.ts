import { Injectable } from '@nestjs/common';
import { CreateCompanyDto, UpdateCompanyDto } from './company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/entities/company.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { AuthService } from '../auth/auth.service';
import { Employees } from 'src/entities/employees.entity';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    @InjectRepository(Employees)
    private employeesRepository: Repository<Employees>,
    private readonly authService: AuthService,
  ) {}

  async findAll() {
    const companies = await this.companyRepository.find();
    return companies;
  }

  async findOne(id: UUID) {
    const company = await this.companyRepository.findOneBy({ id });
    return company;
  }

  async create(data: CreateCompanyDto) {
    // Create user adminCompany
    const { user, company } = data;

    const newUser = await this.authService.signup(user);

    // ENVIAR EMAIL

    // Create Company
    const companys = this.companyRepository.create(company);
    const newCompany = await this.companyRepository.save(companys);

    // Create user Employee

    const employee = {
      position: 'admin',
      passes: 0,
      passesAvailable: 0,
      status: 'active',
      companyId: newCompany.id as UUID,
      company: newCompany,
      user: newUser,
    };

    // const newEmployee = await this.employeesService.create(employee);
    const newEmployee = this.employeesRepository.create(employee);
    return await this.employeesRepository.save(newEmployee);

    return newEmployee;
    // const newCompany = this.companyRepository.create(data);
    // return await this.companyRepository.save(newCompany);
  }

  update(id: number, changes: UpdateCompanyDto) {
    return `This action updates a #${id} company ${changes}`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
