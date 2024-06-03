import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Date } from 'mongoose';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: Date;
}
