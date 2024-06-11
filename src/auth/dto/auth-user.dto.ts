import { PickType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class AuthUserDto extends PickType(CreateUserDto, [
  'username',
  'password',
] as const) {}
