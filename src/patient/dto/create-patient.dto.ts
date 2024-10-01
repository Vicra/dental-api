import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { CreateAddressDto } from './create-address.dto';

export enum Sex {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  INTERSEX = 'INTERSEX',
}

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(Sex)
  @IsNotEmpty()
  sex: Sex;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsDateString()
  @IsOptional()
  dob: string;

  @IsNotEmpty()
  @IsOptional()
  address: CreateAddressDto;
}
