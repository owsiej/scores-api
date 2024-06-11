import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Post,
  Req,
  UseFilters,
  UseGuards,
  forwardRef,
} from '@nestjs/common';
import { MongoExceptionFilter } from 'src/common/filters/mongo-exceptions.filter';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtTokensDto } from '../dto/create-token.dto';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from 'src/users/services/user.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { UserDocument } from 'src/users/schema/user.schema';
import { Request } from 'express';
import { JwtAuthGuardLogout } from '../guards/jwt3-auth.guard';
import { JwtRefreshAuthGuard } from '../guards/jwt4-auth.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiNoContentResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthUserDto } from '../dto/auth-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthenticationController {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private authenticationService: AuthenticationService,
  ) {}

  @ApiConflictResponse({
    description: 'User with given name already exists.',
    schema: {
      example: {
        message: 'User with given name already exists.',
        statusCode: 409,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Invalid body properties',
    schema: {
      example: {
        message: 'User ${user} does not exists',
        error: 'Not Found',
        statusCode: 404,
      },
    },
  })
  @Post('register')
  @UseFilters(MongoExceptionFilter)
  async register(@Body() createUserDto: CreateUserDto): Promise<JwtTokensDto> {
    createUserDto.password = await this.authenticationService.hashPassword(
      createUserDto.password,
    );
    const user = await this.userService.createUser(createUserDto);
    const tokens = await this.authenticationService.generateJwtTokens(user);
    await this.userService.updateUserRefreshToken(
      user._id,
      tokens.refresh_token,
    );
    return tokens;
  }

  @ApiBadRequestResponse({
    description: 'Invalid username',
    schema: {
      example: {
        message: 'User ${username} does not exists',
        error: 'Not Found',
        statusCode: 400,
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid password or body properties.',
    schema: {
      example: {
        message: 'Wrong password',
        error: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @ApiBody({ type: AuthUserDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request): Promise<JwtTokensDto> {
    const user = req.user as UserDocument;
    const tokens = await this.authenticationService.generateJwtTokens(user);
    await this.userService.updateUserRefreshToken(
      user._id,
      tokens.refresh_token,
    );
    return tokens;
  }

  @ApiUnauthorizedResponse({
    description: 'Invalid token.',
    schema: {
      example: {
        statusCode: 401,
        message: 'invalid token',
      },
    },
  })
  @ApiNoContentResponse({
    description: 'Successful logout.',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuardLogout)
  @Post('logout')
  @HttpCode(204)
  async logout(@Req() req: Request): Promise<void> {
    const user = req.user as UserDocument;
    await this.userService.updateUserRefreshToken(user._id, null);
  }

  @ApiUnauthorizedResponse({
    description: 'Invalid token or token revoked.',
    schema: {
      example: {
        statusCode: 401,
        message: 'invalid token',
      },
    },
  })
  @ApiBearerAuth()
  @UseGuards(JwtRefreshAuthGuard)
  @Post('refresh-token')
  async refreshToken(@Req() req: Request): Promise<JwtTokensDto> {
    const user = req.user as UserDocument;
    const tokens = await this.authenticationService.generateJwtTokens(user);
    await this.userService.updateUserRefreshToken(
      user._id,
      tokens.refresh_token,
    );
    return tokens;
  }
}
