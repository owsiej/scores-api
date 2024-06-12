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

  async updateUserRefreshToken(
    userId: ObjectId,
    token: string | null,
  ): Promise<void> {
    await this.userModel.updateOne(
      { _id: userId },
      {
        refreshToken: token,
      },
    );
  }
}
