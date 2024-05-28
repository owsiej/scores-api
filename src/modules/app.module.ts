import { Module } from '@nestjs/common';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { ScoresModule } from './scores/scores.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ScoresModule, UserModule],
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

1. user - weryfikowanie gracza na podstawie podanej daty urodzin,
          * jezeli wybierzemy istniejacy juz nick to musimy podac przypisana do niego date urodzin
          * token bedzie tylko dla danej sesji i pod niego ustalamy sobie jwt token
          * PODSUMOWUJAC: wchodzimy do gry login, token, data urodzenia,
                            - login i data urodzenia leca do database i do local storage
                            - token wykorzystywany jest do tworzenia jwt tokena, ktory tez leci do local storage
                            - jezeli token wygasnie pojawi sie powiadomienie ze twoja sejsa wygasla i jezeli chcesz ja
                              kontynuowac to wpisz token, jezeli nie pamietasz to zaloguj do nowa 
2. scores - dodawanie score, wyciaganie wszystkich scores oraz danego zawodnika
         * blokada na dodawanie scoresow rownych 0
*/
