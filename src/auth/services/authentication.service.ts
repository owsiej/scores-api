import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { JwtToken } from 'src/auth/dto/create-token.dto';
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

  async generateJwtToken(user: UserDocument): Promise<JwtToken> {
    const payload = {
      id: user._id,
    };
    const userBirthday = new Date(new String(user.dateOfBirth).toString());
    const now = new Date();
    const userAge =
      Math.abs(now.getTime() - userBirthday.getTime()) / 31_556_952_000;

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: ((userAge % 10) * 10).toFixed(0) + 'm',
    });
    return {
      accessToken: token,
    };
  }

  async verifyToken(token: string) {
    const decodedToken = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get('JWT_SECRET_KEY'),
    });
    return decodedToken;
  }
}
