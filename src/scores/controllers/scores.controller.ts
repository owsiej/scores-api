import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { CreateScoreDto } from 'src/scores/dto/create-score.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ScoreGuard } from 'src/scores/guards/scores.guard';
import { ScoreDocument } from 'src/scores/schema/score.schema';
import { UserDocument } from 'src/users/schema/user.schema';
import { ScoresService } from 'src/scores/services/scores.service';

@Controller('scores')
export class ScoresController {
  constructor(private scoreService: ScoresService) {}

  @UseGuards(ScoreGuard, JwtAuthGuard)
  @Post()
  async addScore(@Req() req: Request, @Body() createScoreDto: CreateScoreDto) {
    const score = await this.scoreService.createScore(
      createScoreDto,
      req.user as UserDocument,
    );
    return score;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  async getUserScores(@Req() req: Request): Promise<ScoreDocument[]> {
    const user = req.user as UserDocument;
    return await this.scoreService.getUserAllScores(user._id.toString());
  }

  @Get()
  async getAllScores(): Promise<ScoreDocument[]> {
    return await this.scoreService.getAllScores();
  }
}
