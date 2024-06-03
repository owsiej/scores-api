import { Module } from '@nestjs/common';
import { UserController } from '../../controllers/user/user.controller';
import { UserService } from 'src/services/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemas/user.schema';
import { AuthenticationService } from 'src/services/authentication/authentication.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: process.env.MONGO_COLLECTION_USERS, schema: UserSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, AuthenticationService],
})
export class UserModule {}
