import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCoworkingDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly lat: string;

  @IsString()
  @IsNotEmpty()
  readonly long: string;

  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @IsString()
  @IsNotEmpty()
  readonly open: string;

  @IsString()
  @IsNotEmpty()
  readonly close: string;

  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsNumber()
  @IsNotEmpty()
  readonly spaces: number;

  @IsString()
  @IsNotEmpty()
  readonly thumbnail: string;

  @IsString()
  @IsNotEmpty()
  readonly status: string;
}

export class UpdateCoworkingDto extends PartialType(CreateCoworkingDto) {}
