import { Module } from '@nestjs/common';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { ScoresModule } from './scores/scores.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ScoresModule,
    UserModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_STRING, {
      dbName: process.env.MONGO_DATABASE_NAME,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

/*

moduly- dziela aplikacje na mniejsze czesci
controllery - odpowiadaja za endpointy
serwisy - zapisy do bazy danych
dto- modele
guards - autoryzacja

2. scores - dodawanie score, wyciaganie wszystkich scores oraz danego zawodnika

         * blokada na dodawanie scoresow rownych 0
*/
