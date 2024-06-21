import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from 'src/users/services/user.service';
import { FindUserDto } from 'src/users/dto/find-user.dto';
import { ApiBadRequestResponse, ApiTags } from '@nestjs/swagger';
import { CreateErrorResponseDto } from 'src/common/dto/create-response-error.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBadRequestResponse({
    description: 'Invalid params.',
    type: CreateErrorResponseDto,
  })
  @Get()
  async checkUserByName(@Query() name: FindUserDto): Promise<boolean> {
    return !!(await this.userService.findUserByUsername(name.username));
  }
}
