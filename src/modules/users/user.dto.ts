import { PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastname: string;

  @IsString()
  @IsNotEmpty()
  readonly identification: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsEmpty()
  readonly password?: string;

  @IsString()
  @IsNotEmpty()
  readonly role: string;

  @IsEmpty()
  readonly activationDate?: Date;

  @IsString()
  @IsOptional()
  readonly recoveryToken?: string;
}

export class LoginUserDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
