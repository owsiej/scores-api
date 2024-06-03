import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { Date } from 'mongoose';

export class AuthUserDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[A-Z-a-z0-9]{4,15}$/)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{4}$/)
  token: string;

  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: Date;
}
