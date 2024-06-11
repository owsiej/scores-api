import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthenticationService } from '../services/authentication.service';
import { UserDocument } from '../../users/schema/user.schema';
import { JwtTokenPayload } from '../../common/models/jwt-token.payload';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    configService: ConfigService,
    private authService: AuthenticationService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_REFRESH_SECRET_KEY'),
    });
  }

  protected async validate(payload: JwtTokenPayload): Promise<UserDocument> {
    const user = await this.authService.verifyUserById(payload.id);
    if (!user) {
      throw new UnauthorizedException(`Invalid token.`);
    }

    if (!user.refreshToken) {
      throw new UnauthorizedException(`Access denied. Token revoked.`);
    }

    return user;
  }
}
