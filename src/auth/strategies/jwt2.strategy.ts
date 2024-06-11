import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthenticationService } from '../services/authentication.service';
import { UserDocument } from '../../users/schema/user.schema';
import { Request } from 'express';
import { JwtTokenPayload } from '../../common/models/jwt-token.payload';

@Injectable()
export class JwtAccessTokenStrategyScore extends PassportStrategy(
  Strategy,
  'jwt-access-scores',
) {
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
      throw new UnauthorizedException(`Invalid token.`);
    }

    if (!user.refreshToken) {
      throw new UnauthorizedException(`Access denied. Token revoked.`);
    }

    const inputUsername = req.body.username;

    if (user.username !== inputUsername) {
      throw new UnauthorizedException('Invalid username.');
    }
    return user;
  }
}
