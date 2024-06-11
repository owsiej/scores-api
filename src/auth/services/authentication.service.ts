import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { JwtTokensDto } from 'src/auth/dto/create-token.dto';
import { UserDocument } from 'src/users/schema/user.schema';
import { UserService } from '../../users/services/user.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
  ) {}
  async hashPassword(password: string): Promise<string> {
    return await hash(password, 10);
  }

  async verifyPassword(
    givenPassword: string,
    databasePassword: string,
  ): Promise<boolean> {
    return await compare(givenPassword, databasePassword);
  }

  async verifyUserByUsername(username: string): Promise<UserDocument> {
    const user = await this.userService.findUserByUsername(username);
    if (!user) {
      return null;
    }
    return user;
  }

  async verifyUserById(userId: string): Promise<UserDocument> {
    const user = await this.userService.findUserById(userId);
    if (!user) {
      return null;
    }
    return user;
  }

  async generateJwtTokens(user: UserDocument): Promise<JwtTokensDto> {
    const payload = {
      id: user._id,
    };
    const userBirthday = new Date(new String(user.dateOfBirth).toString());
    const now = new Date();
    const userAge =
      Math.abs(now.getTime() - userBirthday.getTime()) / 31_556_952_000;

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET_KEY'),
        expiresIn: ((userAge % 10) * 10).toFixed(0) + 'm',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_REFRESH_SECRET_KEY'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async verifyAccessToken(token: string) {
    const decodedToken = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get('JWT_SECRET_KEY'),
    });
    return decodedToken;
  }

  async verifyRefreshToken(token: string) {
    const decodedToken = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get('JWT_REFRESH_SECRET_KEY'),
    });
    return decodedToken;
  }
}
