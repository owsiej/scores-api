import { Module, forwardRef } from '@nestjs/common';
import { UserModule } from '../users/user.module';
import { AuthenticationService } from 'src/auth/services/authentication.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../users/schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessTokenStrategyUsers } from 'src/auth/strategies/jwt1.strategy';
import { ScoresModule } from '../scores/scores.module';
import { AuthenticationController } from './controllers/authentication.controller';
import { JwtAccessTokenStrategyScore } from './strategies/jwt2.strategy';
import { JwtAccessTokenStrategyLogout } from './strategies/jwt3.strategy';
import { JwtRefreshTokenStrategy } from './strategies/jwt4strategy';

@Module({
  imports: [
    UserModule,
    forwardRef(() => ScoresModule),
    PassportModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({}),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    LocalStrategy,
    JwtAccessTokenStrategyUsers,
    JwtAccessTokenStrategyScore,
    JwtAccessTokenStrategyLogout,
    JwtRefreshTokenStrategy,
  ],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
