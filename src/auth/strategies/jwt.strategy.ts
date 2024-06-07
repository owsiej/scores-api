import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthenticationService } from '../services/authentication.service';
import { UserDocument } from '../../users/schema/user.schema';
import { Request } from 'express';
import { JwtTokenPayload } from '../../common/models/jwt-token.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private authService: AuthenticationService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_KEY'),
      passReqToCallback: true,
    });
  }

  protected async validate(
    req: Request,
    payload: JwtTokenPayload,
  ): Promise<UserDocument> {
    const user = await this.authService.verifyUserById(payload.id);
    if (!user) {
      throw new NotFoundException(`User with given id does not exists`);
    }
    let inputUsername: string;
    const requestMethod = req.method;

    switch (requestMethod) {
      case 'POST':
        inputUsername = req.body.username;
        break;
      case 'GET':
        inputUsername = req.params.username;
        break;
    }
    if (user.username !== inputUsername) {
      console.log('halo');
      throw new UnauthorizedException();
    }
    return user;
  }
}
