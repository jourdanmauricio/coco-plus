import { CreateUserDto } from './../users/user.dto';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CompanyDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  // positive o cero
  @IsNotEmpty()
  readonly quantityBeneficiaries: number;

  @IsString()
  @IsNotEmpty()
  readonly businessSector: string;

  @IsNumber()
  // positive o cero
  @IsNotEmpty()
  readonly size: number;
}

export class CreateCompanyDto {
  @ValidateNested()
  @Type(() => CompanyDto)
  company: CompanyDto;

  @ValidateNested()
  @Type(() => CreateUserDto)
  readonly user: CreateUserDto;
}

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}
