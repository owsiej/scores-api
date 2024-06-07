import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { FindUserDto } from 'src/users/dto/find-user.dto';
import { User, UserDocument } from 'src/users/schema/user.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async createUser(userData: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(userData);
    return await createdUser.save();
  }

  async findUserByUsername(
    username: FindUserDto | string,
  ): Promise<UserDocument> {
    return await this.userModel.findOne({
      username: username,
    });
  }

  async findUserById(userId: string): Promise<UserDocument> {
    return await this.userModel.findOne({
      _id: new ObjectId(userId),
    });
  }
}
/*
frontend - wysyla zapytanie do backend czy dany uzytkownik istnieje (get po name), jezeli istnieje to po sumbit idzie do api/login a jak nie to /register
         - front musi porywnywac podana i shashowana date urodzin,
         - dodaje ostatnia date urodzin i username do local storage i od razu uzupelnia tymi danymi formularz (serwis)
         - ma dostep rowniez do tokenu w localStorage i jezeli taki token istnieje to wysyla do api przez endpoint login albo przez nowy typu verifySession
           te wszystkie dane i jezeli token jest aktywny i all gra to przenosi od razu do gry a jezeli nie to do formularza logowania
         - blokada post score z points ponizej 10
         - interceptor z dodawaniem auth headera do requestow

TODO

zrobic auth controller
refresh token
dodac exception filter albo rozszerzyc handleRequest w JwtGuard zeby rozszerzyc bledy jwt tokena
swagger
odpalic cors
*/
