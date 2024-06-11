import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateScoreDto } from 'src/scores/dto/create-score.dto';
import { Score, ScoreDocument } from 'src/scores/schema/score.schema';
import { UserDocument } from 'src/users/schema/user.schema';
import { UserService } from 'src/users/services/user.service';

@Injectable()
export class ScoresService {
  constructor(
    @InjectModel(Score.name) private scoreModel: Model<Score>,
    private userService: UserService,
  ) {}

  async createScore(
    score: CreateScoreDto,
    user: UserDocument,
  ): Promise<ScoreDocument> {
    const createdScore = new this.scoreModel({
      score: score.score,
      user: user,
      username: user.username,
    });
    return await createdScore.save();
  }

  async getUserAllScores(userId: string): Promise<ScoreDocument[]> {
    const userScores = await this.userService.findUserById(userId);

    return (
      await userScores.populate({
        path: 'scores',
        select: 'score username user',
      })
    ).get('scores');
  }

  async getAllScores(): Promise<ScoreDocument[]> {
    return await this.scoreModel.find({});
  }
}
