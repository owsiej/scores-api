import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/controllers/dto/user/create-user.dto';
import { User } from 'src/schemas/user.schema';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(process.env.MONGO_COLLECTION_USERS)
    private userModel: Model<User>,
    private authenticationService: AuthenticationService,
  ) {}

  async createUser(userData: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(userData);
    return createdUser.save();
  }
}
/*
1. user - weryfikowanie gracza na podstawie podanej daty urodzin,
        - prowadzamy nazwe uzytkownika:
              * jezeli dany użytkownik istnieje to nalezy podac date urodzin do niego przypisaną
          * jezeli uzytkownik jest mlodszy niz 12 lat to czas waznosci tokenu jest krotszy
          * jezeli wybierzemy istniejacy juz nick to musimy podac przypisana do niego date urodzin
          * token bedzie tylko dla danej sesji i pod niego ustalamy sobie jwt token
          * PODSUMOWUJAC: wchodzimy do gry login, token, data urodzenia,
                            - login i data urodzenia leca do database i do local storage
                            - token wykorzystywany jest do tworzenia jwt tokena, ktory tez leci do local storage
                            - jezeli token wygasnie pojawi sie powiadomienie ze twoja sejsa wygasla i jezeli chcesz ja
                              kontynuowac to wpisz token, jezeli nie pamietasz to zaloguj do nowa 
*/
