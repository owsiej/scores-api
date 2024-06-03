import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { User } from 'src/schemas/user.schema';
import { AuthUserDto } from '../dto/user/auth-user';
import { MongoExceptionFilter } from 'src/filters/mongo-exceptions.filter';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('login')
  @UseFilters(MongoExceptionFilter)
  register(@Body() authUserDto: AuthUserDto): Promise<User> {
    const { name, dateOfBirth } = authUserDto;
    return this.userService.createUser({
      name: name,
      dateOfBirth: dateOfBirth,
    });
  }
}
