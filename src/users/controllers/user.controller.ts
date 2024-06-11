import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from 'src/users/services/user.service';
import { FindUserDto } from 'src/users/dto/find-user.dto';
import { ApiBadRequestResponse, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBadRequestResponse({
    description: 'Invalid params.',
    schema: {
      example: {
        message: [],
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  @Get()
  async checkUserByName(@Query() name: FindUserDto): Promise<boolean> {
    return !!(await this.userService.findUserByUsername(name.username));
  }
}
