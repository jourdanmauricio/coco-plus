import { PartialType } from '@nestjs/mapped-types';
import {
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { UUID } from 'crypto';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  position: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  passes: number;

  @IsNumber()
  @IsPositive()
  passesAvailable: number;

  @IsEmpty()
  @IsString()
  status: string;

  @IsEmpty()
  @IsUUID()
  companyId: UUID;
}

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {}
