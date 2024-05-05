import { OmitType, PartialType } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRequestCoworkingDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastname: string;

  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly identification: string;

  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  readonly address: string;

  @IsString()
  @IsNotEmpty()
  readonly website: string;

  @IsString()
  @IsNotEmpty()
  readonly open: string;

  @IsString()
  @IsNotEmpty()
  readonly close: string;

  @IsNumber()
  @IsNotEmpty()
  readonly quantityBeneficiaries: number;

  @IsNumber()
  @IsNotEmpty()
  readonly capacity: number;

  @IsString()
  @IsNotEmpty()
  readonly message: string;

  @IsEmpty()
  readonly status: string;

  @IsString()
  @IsNotEmpty()
  readonly type: string;
}

export class CreateRequestCompanyDto extends OmitType(
  CreateRequestCoworkingDto,
  ['open', 'close', 'capacity'],
) {}

export class UpdateRequestCompanyDto extends PartialType(
  CreateRequestCompanyDto,
) {}
export class UpdateRequestCoworkingDto extends PartialType(
  CreateRequestCoworkingDto,
) {}
