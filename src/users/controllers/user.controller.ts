import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  Req,
  UseFilters,
  UseGuards,
  forwardRef,
} from '@nestjs/common';
import { UserService } from 'src/users/services/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { MongoExceptionFilter } from 'src/common/filters/mongo-exceptions.filter';
import { AuthenticationService } from 'src/auth/services/authentication.service';
import { FindUserDto } from 'src/users/dto/find-user.dto';
import { JwtToken } from 'src/auth/dto/create-token.dto';
import { Request } from 'express';
import { UserDocument } from 'src/users/schema/user.schema';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    @Inject(forwardRef(() => AuthenticationService))
    private authenticationService: AuthenticationService,
  ) {}

  @Post('register')
  @UseFilters(MongoExceptionFilter)
  async register(@Body() createUserDto: CreateUserDto): Promise<JwtToken> {
    createUserDto.password = await this.authenticationService.hashPassword(
      createUserDto.password,
    );
    const user = await this.userService.createUser(createUserDto);
    return this.authenticationService.generateJwtToken(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @UseFilters(MongoExceptionFilter)
  async login(@Req() req: Request): Promise<JwtToken> {
    return this.authenticationService.generateJwtToken(
      req.user as UserDocument,
    );
  }

  @Get()
  async checkUserByName(@Query() name: FindUserDto): Promise<boolean> {
    return !!(await this.userService.findUserByUsername(name.username));
  }
}
