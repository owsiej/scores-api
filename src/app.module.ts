import { Module } from '@nestjs/common';
import { ScoresModule } from './scores/scores.module';
import { UserModule } from './users/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationModule } from './auth/authentication.module';

@Module({
  imports: [
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
  providers: [],
})
export class AppModule {}
