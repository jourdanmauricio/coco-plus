import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employees } from 'src/entities/employees.entity';
import { AuthModule } from '../auth/auth.module';
import { CompaniesModule } from '../companies/companies.module';

@Module({
  imports: [AuthModule, CompaniesModule, TypeOrmModule.forFeature([Employees])],
  controllers: [EmployeesController],
  providers: [EmployeesService],
  exports: [EmployeesService],
})
export class EmployeesModule {}
