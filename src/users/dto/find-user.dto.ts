import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class FindUserDto extends PickType(CreateUserDto, [
  'username',
] as const) {}
