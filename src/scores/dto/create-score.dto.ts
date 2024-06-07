import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateUserDto } from '../../users/dto/create-user.dto';

export class CreateScoreDto extends PickType(CreateUserDto, [
  'username',
] as const) {
  @IsNotEmpty()
  @IsNumber()
  score: number;
}
