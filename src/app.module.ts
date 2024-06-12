import { Module } from '@nestjs/common';
import { ScoresModule } from './scores/scores.module';
import { UserModule } from './users/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from './auth/authentication.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { NotFoundExceptionFilter } from './common/filters/global-not-found-exceptions.filter';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 10000,
        limit: 13,
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScoresModule,
    UserModule,
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_CONNECTION_STRING'),
        dbName: configService.get<string>('MONGO_DATABASE_NAME'),
      }),
      inject: [ConfigService],
    }),
    AuthenticationModule,
  ],

  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: NotFoundExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
