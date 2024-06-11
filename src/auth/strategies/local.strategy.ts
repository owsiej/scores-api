import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticationService } from '../services/authentication.service';
import { UserDocument } from '../../users/schema/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthenticationService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserDocument> {
    const user = await this.authService.verifyUserByUsername(username);

    if (!user) {
      throw new BadRequestException(`User ${username} does not exists`);
    }
    const isPasswordValid = await this.authService.verifyPassword(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Wrong password');
    }
    return user;
  }
}
